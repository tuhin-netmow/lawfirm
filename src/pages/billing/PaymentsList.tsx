
import { DataTable } from "@/components/dashboard/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    PlusCircle,
    Search,
    Filter,
    Download,
    CreditCard,
    MoreHorizontal,
    FileText
} from "lucide-react";
import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router";

// Mock Payment Type
interface Payment {
    id: number;
    payment_number: string;
    invoice_number: string;
    client_name: string;
    date: string;
    amount: number;
    method: 'Credit Card' | 'Bank Transfer' | 'Check' | 'Cash' | 'Trust Transfer';
    status: 'Completed' | 'Pending' | 'Failed';
}

const MOCK_PAYMENTS: Payment[] = [
    {
        id: 1,
        payment_number: "PAY-2024-001",
        invoice_number: "INV-2024-001",
        client_name: "John Smith",
        date: "2024-03-05",
        amount: 1500.00,
        method: "Credit Card",
        status: "Completed"
    },
    {
        id: 2,
        payment_number: "PAY-2024-002",
        invoice_number: "INV-2024-005",
        client_name: "Robert Paulson",
        date: "2024-03-12",
        amount: 600.00,
        method: "Bank Transfer",
        status: "Completed"
    },
    {
        id: 3,
        payment_number: "PAY-2024-003",
        invoice_number: "INV-2024-003",
        client_name: "TechCorp Inc.",
        date: "2024-02-28",
        amount: 2500.00,
        method: "Check",
        status: "Pending" // e.g., check clearing
    },
    {
        id: 4,
        payment_number: "PAY-2024-004",
        invoice_number: "INV-2024-001",
        client_name: "John Smith",
        date: "2024-01-15",
        amount: 500.00,
        method: "Trust Transfer",
        status: "Completed"
    },
    {
        id: 5,
        payment_number: "PAY-2024-005",
        invoice_number: "INV-2024-002",
        client_name: "Sarah Conner",
        date: "2024-03-25",
        amount: 2350.50,
        method: "Credit Card",
        status: "Failed"
    }
];

export default function PaymentsList() {
    const [pageIndex, setPageIndex] = useState(0);
    const navigate = useNavigate(); // Hook for navigation
    const data = MOCK_PAYMENTS;

    const getStatusBadge = (status: Payment['status']) => {
        switch (status) {
            case 'Completed': return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
            case 'Pending': return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
            case 'Failed': return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    const columns: ColumnDef<Payment>[] = [
        {
            accessorKey: "payment_number",
            header: "Payment #",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 font-medium text-slate-700">
                    <CreditCard className="w-4 h-4 text-slate-400" />
                    {row.getValue("payment_number")}
                </div>
            )
        },
        {
            accessorKey: "date",
            header: "Date",
            cell: ({ row }) => <span className="text-slate-600">{row.getValue("date")}</span>
        },
        {
            accessorKey: "client_name",
            header: "Client",
            cell: ({ row }) => <span className="font-medium">{row.getValue("client_name")}</span>
        },
        {
            accessorKey: "invoice_number",
            header: "Invoice",
            cell: ({ row }) => (
                <div className="flex items-center gap-1 text-sm text-blue-600 hover:underline cursor-pointer">
                    <FileText className="w-3 h-3" />
                    {row.getValue("invoice_number")}
                </div>
            )
        },
        {
            accessorKey: "amount",
            header: "Amount",
            cell: ({ row }) => <span className="font-bold text-slate-700">${row.original.amount.toFixed(2)}</span>
        },
        {
            accessorKey: "method",
            header: "Method",
            cell: ({ row }) => <span className="text-sm text-slate-600">{row.getValue("method")}</span>
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => getStatusBadge(row.original.status)
        },
        {
            id: "actions",
            header: "",
            cell: () => (
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            )
        }
    ];

    return (
        <div className="w-full space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
                    <p className="text-muted-foreground mt-1">Track all incoming payments and transactions.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                    <Button
                        className="bg-blue-600 hover:bg-blue-500"
                        onClick={() => navigate("/dashboard/billing/receive-payment")}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" /> Receive Payment
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <CardTitle>Recent Transactions</CardTitle>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search payment # or client..."
                                    className="pl-8 h-10 w-full md:w-[250px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={data}
                        pageIndex={pageIndex}
                        pageSize={10}
                        onPageChange={setPageIndex}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
