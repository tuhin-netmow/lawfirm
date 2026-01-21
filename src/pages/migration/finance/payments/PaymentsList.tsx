import { DataTable } from "@/components/dashboard/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Filter, CreditCard } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import type { ColumnDef } from "@tanstack/react-table";

interface Payment {
    id: number;
    transactionId: string;
    invoiceNumber: string;
    client: string;
    amount: number;
    date: string;
    method: "bank_transfer" | "credit_card" | "cash";
    status: "completed" | "pending" | "failed";
}

const mockPayments: Payment[] = [
    {
        id: 1,
        transactionId: "TXN-8842",
        invoiceNumber: "INV-2026-001",
        client: "Ahmed Hassan",
        amount: 2500.00,
        date: "2026-01-02",
        method: "bank_transfer",
        status: "completed"
    },
    {
        id: 2,
        transactionId: "TXN-8843",
        invoiceNumber: "INV-2026-003",
        client: "Kamal Uddin",
        amount: 1000.00,
        date: "2026-01-06",
        method: "credit_card",
        status: "completed"
    },
    {
        id: 3,
        transactionId: "TXN-8844",
        invoiceNumber: "-",
        client: "Fatima Rahman",
        amount: 1500.00,
        date: "2026-01-07",
        method: "bank_transfer",
        status: "pending"
    }
];

export default function PaymentsList() {
    const [pageIndex, setPageIndex] = useState(0);
    const location = useLocation();

    const getPageContext = () => {
        if (location.pathname.includes("pending")) return { filter: "pending", title: "Pending Payments" };
        if (location.pathname.includes("history")) return { filter: "all", title: "Payment History" }; // history implies all basically
        return { filter: "all", title: "All Payments" };
    };

    const { filter, title } = getPageContext();

    const filteredData = mockPayments.filter(p => {
        if (filter === "pending") return p.status === "pending";
        return true;
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount);
    };

    const columns: ColumnDef<Payment>[] = [
        {
            accessorKey: "transactionId",
            header: "Transaction ID",
            cell: ({ row }) => <span className="font-mono text-sm text-gray-600">{row.getValue("transactionId")}</span>
        },
        {
            accessorKey: "date",
            header: "Date",
        },
        {
            accessorKey: "client",
            header: "Client",
        },
        {
            accessorKey: "amount",
            header: "Amount",
            cell: ({ row }) => <span className="font-bold text-green-700">{formatCurrency(row.getValue("amount"))}</span>
        },
        {
            accessorKey: "method",
            header: "Method",
            cell: ({ row }) => <Badge variant="outline">{row.getValue("method")}</Badge>
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                return <Badge className={status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>{status}</Badge>;
            }
        },
        {
            id: "actions",
            header: "Actions",
            cell: () => <Button variant="ghost" size="sm">View</Button>
        }
    ];

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">{title}</h2>
                    <p className="text-gray-600">Track and manage incoming payments</p>
                </div>
                <Link to="/dashboard/migration/finance/payments/create">
                    <Button className="gap-2">
                        <PlusCircle size={16} /> Record Payment
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                    <CardContent className="p-6 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Total Collected</p>
                            <h3 className="text-2xl font-bold">$48,250</h3>
                        </div>
                        <CreditCard className="w-8 h-8 text-blue-500 opacity-80" />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Pending Clearance</p>
                            <h3 className="text-2xl font-bold">$1,500</h3>
                        </div>
                        <CreditCard className="w-8 h-8 text-yellow-500 opacity-80" />
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Transactions</CardTitle>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Filter size={14} /> Filter
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={filteredData}
                        pageIndex={pageIndex}
                        pageSize={10}
                        totalCount={filteredData.length}
                        onPageChange={setPageIndex}
                        onSearch={() => { }}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
