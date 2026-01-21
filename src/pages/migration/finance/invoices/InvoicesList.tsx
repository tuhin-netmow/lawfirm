import { DataTable } from "@/components/dashboard/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    FileText,
    XCircle,
    Clock,
    DollarSign,
    MoreHorizontal,
    Plus,
    Filter,
    Download
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import type { ColumnDef } from "@tanstack/react-table";

// Mock Data
interface Invoice {
    id: number;
    invoiceNumber: string;
    client: string;
    amount: number;
    status: "paid" | "pending" | "overdue" | "draft";
    issueDate: string;
    dueDate: string;
}

const mockInvoices: Invoice[] = [
    {
        id: 1,
        invoiceNumber: "INV-2026-001",
        client: "Ahmed Hassan",
        amount: 2500.00,
        status: "paid",
        issueDate: "2026-01-01",
        dueDate: "2026-01-15"
    },
    {
        id: 2,
        invoiceNumber: "INV-2026-002",
        client: "Fatima Rahman",
        amount: 1500.00,
        status: "pending",
        issueDate: "2026-01-05",
        dueDate: "2026-01-19"
    },
    {
        id: 3,
        invoiceNumber: "INV-2026-003",
        client: "Kamal Uddin",
        amount: 3200.00,
        status: "overdue",
        issueDate: "2025-12-15",
        dueDate: "2025-12-29"
    },
    {
        id: 4,
        invoiceNumber: "INV-2026-004",
        client: "Nusrat Jahan",
        amount: 500.00,
        status: "draft",
        issueDate: "2026-01-07",
        dueDate: "2026-01-21"
    }
];

export default function InvoicesList() {
    const [pageIndex, setPageIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();

    // Determine filter based on URL
    const getPageContext = () => {
        if (location.pathname.includes("draft")) return { filter: "draft", title: "Draft Invoices" };
        if (location.pathname.includes("sent")) return { filter: "pending", title: "Sent Invoices" }; // assuming 'sent' maps to pending or similar
        if (location.pathname.includes("paid")) return { filter: "paid", title: "Paid Invoices" };
        if (location.pathname.includes("overdue")) return { filter: "overdue", title: "Overdue Invoices" };
        return { filter: "all", title: "All Invoices" };
    };

    const { filter, title } = getPageContext();

    const filteredInvoices = mockInvoices.filter((inv) => {
        const matchesSearch = inv.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());

        let matchesFilter = true;
        if (filter !== "all") {
            // Mapping for "sent" which essentially acts as pending in this mock
            if (filter === "pending" && (inv.status === "pending" || inv.status === "overdue")) {
                // keep logical grouping
            } else {
                matchesFilter = inv.status === filter;
            }
        }

        return matchesSearch && matchesFilter;
    });

    const pageSize = 10;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount);
    };

    const getStatusBadge = (status: Invoice["status"]) => {
        const styles = {
            paid: "bg-green-100 text-green-800",
            pending: "bg-blue-100 text-blue-800",
            overdue: "bg-red-100 text-red-800",
            draft: "bg-gray-100 text-gray-800"
        };
        return <Badge className={styles[status]}>{status.toUpperCase()}</Badge>;
    };

    const columns: ColumnDef<Invoice>[] = [
        {
            accessorKey: "invoiceNumber",
            header: "Invoice #",
            cell: ({ row }) => (
                <div className="font-medium text-blue-600">{row.getValue("invoiceNumber")}</div>
            ),
        },
        {
            accessorKey: "client",
            header: "Client",
        },
        {
            accessorKey: "amount",
            header: "Amount",
            cell: ({ row }) => (
                <div className="font-semibold">{formatCurrency(row.getValue("amount"))}</div>
            ),
        },
        {
            accessorKey: "issueDate",
            header: "Issue Date",
        },
        {
            accessorKey: "dueDate",
            header: "Due Date",
            cell: ({ row }) => {
                const isOverdue = row.original.status === 'overdue';
                return <span className={isOverdue ? "text-red-500 font-medium" : ""}>{row.getValue("dueDate")}</span>;
            },
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => getStatusBadge(row.getValue("status")),
        },
        {
            id: "actions",
            header: "Actions",
            cell: () => (
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                        <Download size={16} />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal size={16} />
                    </Button>
                </div>
            ),
        },
    ];

    const stats = [
        { label: "Total Revenue", value: "$45,200", icon: <DollarSign className="w-8 h-8 opacity-80" />, color: "bg-green-600" },
        { label: "Pending", value: "$12,500", icon: <Clock className="w-8 h-8 opacity-80" />, color: "bg-blue-600" },
        { label: "Overdue", value: "$3,200", icon: <XCircle className="w-8 h-8 opacity-80" />, color: "bg-red-600" },
        { label: "Drafts", value: "5", icon: <FileText className="w-8 h-8 opacity-80" />, color: "bg-gray-600" },
    ];

    return (
        <div className="w-full">
            <div className="flex flex-wrap justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">{title}</h2>
                    <p className="text-gray-600 mt-1">Manage invoices and billing</p>
                </div>
                <div className="flex gap-3">
                    <Link to="/dashboard/migration/finance/invoices/create">
                        <Button className="gap-2">
                            <Plus size={16} /> Create Invoice
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {stats.map((stat, i) => (
                    <div key={i} className={`${stat.color} text-white p-5 rounded-xl shadow-lg flex justify-between items-center`}>
                        <div>
                            <p className="text-sm opacity-90">{stat.label}</p>
                            <h3 className="text-2xl font-bold">{stat.value}</h3>
                        </div>
                        {stat.icon}
                    </div>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Invoices</CardTitle>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Filter size={14} /> Filter
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={filteredInvoices}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        totalCount={filteredInvoices.length}
                        onPageChange={setPageIndex}
                        onSearch={(term) => setSearchTerm(term)}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
