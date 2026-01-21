
import { DataTable } from "@/components/dashboard/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import type { Invoice } from "@/types/billing.types";
import {
    PlusCircle,
    Search,
    Filter,
    Download,
    FileText,
    MoreHorizontal,
    DollarSign,
    AlertCircle,
    CheckCircle2
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const MOCK_INVOICES: Invoice[] = [
    {
        id: 1,
        invoice_number: "INV-2024-001",
        client_name: "John Smith",
        matter_title: "Smith vs Jones",
        issue_date: "2024-03-01",
        due_date: "2024-03-15",
        total_amount: 1500.00,
        balance_due: 0.00,
        status: "Paid"
    },
    {
        id: 2,
        invoice_number: "INV-2024-002",
        client_name: "Sarah Conner",
        matter_title: "Estate of Elder",
        issue_date: "2024-03-20",
        due_date: "2024-04-04",
        total_amount: 2350.50,
        balance_due: 2350.50,
        status: "Sent"
    },
    {
        id: 3,
        invoice_number: "INV-2024-003",
        client_name: "TechCorp Inc.",
        matter_title: "TechCorp Merger",
        issue_date: "2024-02-15",
        due_date: "2024-03-01",
        total_amount: 5000.00,
        balance_due: 5000.00,
        status: "Overdue"
    },
    {
        id: 4,
        invoice_number: "INV-2024-004",
        client_name: "Jane Doe",
        matter_title: "General Consultation",
        issue_date: "2024-04-05",
        due_date: "2024-04-19",
        total_amount: 450.00,
        balance_due: 450.00,
        status: "Draft"
    },
    {
        id: 5,
        invoice_number: "INV-2024-005",
        client_name: "Robert Paulson",
        matter_title: "Property Dispute",
        issue_date: "2024-03-10",
        due_date: "2024-03-24",
        total_amount: 1200.00,
        balance_due: 600.00,
        status: "Partially Paid"
    }
];

export default function InvoicesList() {
    const [pageIndex, setPageIndex] = useState(0);
    const navigate = useNavigate();
    const invoices = MOCK_INVOICES;

    const getStatusBadge = (status: Invoice['status']) => {
        switch (status) {
            case "Paid": return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Paid</Badge>;
            case "Overdue": return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Overdue</Badge>;
            case "Sent": return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Sent</Badge>;
            case "Draft": return <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">Draft</Badge>;
            case "Partially Paid": return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Partially Paid</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    const columns: ColumnDef<Invoice>[] = [
        {
            accessorKey: "invoice_number",
            header: "Invoice #",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 font-medium text-blue-600 cursor-pointer hover:underline">
                    <FileText className="w-4 h-4" />
                    {row.getValue("invoice_number")}
                </div>
            )
        },
        {
            accessorKey: "client_name",
            header: "Client",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-medium">{row.getValue("client_name")}</span>
                    <span className="text-xs text-muted-foreground">{row.original.matter_title}</span>
                </div>
            )
        },
        {
            accessorKey: "issue_date",
            header: "Issue Date",
            cell: ({ row }) => <span className="text-slate-600">{row.getValue("issue_date")}</span>
        },
        {
            accessorKey: "due_date",
            header: "Due Date",
            cell: ({ row }) => (
                <span className={`${row.original.status === 'Overdue' ? 'text-red-600 font-medium' : 'text-slate-600'}`}>
                    {row.getValue("due_date")}
                </span>
            )
        },
        {
            accessorKey: "total_amount",
            header: "Amount",
            cell: ({ row }) => <span className="font-medium">${row.original.total_amount.toFixed(2)}</span>
        },
        {
            accessorKey: "balance_due",
            header: "Balance Due",
            cell: ({ row }) => (
                <span className={`font-medium ${row.original.balance_due > 0 ? 'text-slate-900' : 'text-slate-400'}`}>
                    ${row.original.balance_due.toFixed(2)}
                </span>
            )
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => getStatusBadge(row.original.status)
        },
        {
            id: "actions",
            header: "Actions",
            cell: () => (
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                        <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="w-full space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
                    <p className="text-muted-foreground mt-1">Manage client billing and track payments.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Export Report
                    </Button>
                    <Button
                        className="bg-blue-600 hover:bg-blue-500"
                        onClick={() => navigate("/dashboard/billing/create")}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" /> Create Invoice
                    </Button>
                </div>
            </div>

            {/* METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue (YTD)</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$124,500.00</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
                        <AlertCircle className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">$5,000.00</div>
                        <p className="text-xs text-muted-foreground">Across 3 invoices</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Outstanding (Unpaid)</CardTitle>
                        <DollarSign className="h-4 w-4 text-slate-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$7,800.50</div>
                        <p className="text-xs text-muted-foreground">Due within 30 days</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Paid (This Month)</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$12,450.00</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <CardTitle>All Invoices</CardTitle>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search invoice or client..."
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
                        data={invoices}
                        pageIndex={pageIndex}
                        pageSize={10}
                        onPageChange={setPageIndex}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
