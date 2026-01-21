import { DataTable } from "@/components/dashboard/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ColumnDef } from "@tanstack/react-table";
import {
    FileText,
    DollarSign,
    Calendar,
    CheckCircle,
    Clock,
    AlertCircle,
    Download,
    Eye,
    Plus,
} from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

interface Agreement {
    id: number;
    agreementNumber: string;
    clientName: string;
    clientNumber: string;
    servicePackage: string;
    totalAmount: number;
    paidAmount: number;
    remainingAmount: number;
    agreementDate: string;
    status: "draft" | "sent" | "signed" | "active" | "completed" | "cancelled";
    signedDate: string | null;
    consultant: string;
}

const mockAgreements: Agreement[] = [
    {
        id: 1,
        agreementNumber: "AGR-2026-001",
        clientName: "Rashid Khan",
        clientNumber: "CLI-2026-001",
        servicePackage: "Premium Partner Visa Package",
        totalAmount: 150000,
        paidAmount: 150000,
        remainingAmount: 0,
        agreementDate: "2026-01-02",
        status: "active",
        signedDate: "2026-01-02",
        consultant: "Sarah Johnson",
    },
    {
        id: 2,
        agreementNumber: "AGR-2026-002",
        clientName: "Ayesha Begum",
        clientNumber: "CLI-2026-002",
        servicePackage: "Standard Student Visa Package",
        totalAmount: 80000,
        paidAmount: 40000,
        remainingAmount: 40000,
        agreementDate: "2025-12-15",
        status: "active",
        signedDate: "2025-12-15",
        consultant: "Mike Chen",
    },
    {
        id: 3,
        agreementNumber: "AGR-2025-089",
        clientName: "Mohammad Ali",
        clientNumber: "CLI-2025-089",
        servicePackage: "Premium Skilled Migration Package",
        totalAmount: 200000,
        paidAmount: 200000,
        remainingAmount: 0,
        agreementDate: "2025-11-20",
        status: "completed",
        signedDate: "2025-11-20",
        consultant: "Sarah Johnson",
    },
    {
        id: 4,
        agreementNumber: "AGR-2026-003",
        clientName: "Imran Hossain",
        clientNumber: "CLI-2026-003",
        servicePackage: "Basic Tourist Visa Package",
        totalAmount: 25000,
        paidAmount: 0,
        remainingAmount: 25000,
        agreementDate: "2026-01-05",
        status: "sent",
        signedDate: null,
        consultant: "Sarah Johnson",
    },
    {
        id: 5,
        agreementNumber: "AGR-2025-076",
        clientName: "Sultana Parveen",
        clientNumber: "CLI-2025-076",
        servicePackage: "Standard Work Visa Package",
        totalAmount: 120000,
        paidAmount: 120000,
        remainingAmount: 0,
        agreementDate: "2025-10-05",
        status: "completed",
        signedDate: "2025-10-05",
        consultant: "Mike Chen",
    },
];

export default function Agreements() {
    const [pageIndex, setPageIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const pageSize = 10;

    const filteredAgreements = mockAgreements.filter((agreement) =>
        Object.values(agreement).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const totalValue = mockAgreements.reduce((sum, a) => sum + a.totalAmount, 0);
    const totalCollected = mockAgreements.reduce((sum, a) => sum + a.paidAmount, 0);
    const totalOutstanding = mockAgreements.reduce((sum, a) => sum + a.remainingAmount, 0);
    const activeAgreements = mockAgreements.filter((a) => a.status === "active").length;

    const stats = [
        {
            label: "Total Agreements",
            value: mockAgreements.length,
            color: "bg-blue-600",
            icon: <FileText className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Active",
            value: activeAgreements,
            color: "bg-green-600",
            icon: <CheckCircle className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Total Value",
            value: `৳${(totalValue / 1000).toFixed(0)}K`,
            color: "bg-purple-600",
            icon: <DollarSign className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Outstanding",
            value: `৳${(totalOutstanding / 1000).toFixed(0)}K`,
            color: "bg-yellow-600",
            icon: <AlertCircle className="w-10 h-10 opacity-80" />,
        },
    ];

    const getStatusBadge = (status: Agreement["status"]) => {
        const styles = {
            draft: "bg-gray-100 text-gray-800",
            sent: "bg-blue-100 text-blue-800",
            signed: "bg-purple-100 text-purple-800",
            active: "bg-green-100 text-green-800",
            completed: "bg-cyan-100 text-cyan-800",
            cancelled: "bg-red-100 text-red-800",
        };
        return styles[status];
    };

    const getStatusIcon = (status: Agreement["status"]) => {
        const icons = {
            draft: <FileText className="w-3 h-3" />,
            sent: <Clock className="w-3 h-3" />,
            signed: <CheckCircle className="w-3 h-3" />,
            active: <CheckCircle className="w-3 h-3" />,
            completed: <CheckCircle className="w-3 h-3" />,
            cancelled: <AlertCircle className="w-3 h-3" />,
        };
        return icons[status];
    };

    const columns: ColumnDef<Agreement>[] = [
        {
            accessorKey: "agreementNumber",
            header: "Agreement #",
            cell: ({ row }) => (
                <div className="font-medium text-blue-600">
                    {row.getValue("agreementNumber")}
                </div>
            ),
        },
        {
            accessorKey: "clientName",
            header: "Client",
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.original.clientName}</div>
                    <div className="text-sm text-gray-500">{row.original.clientNumber}</div>
                </div>
            ),
        },
        {
            accessorKey: "servicePackage",
            header: "Service Package",
            cell: ({ row }) => (
                <div className="max-w-xs">
                    <div className="font-medium text-sm">{row.getValue("servicePackage")}</div>
                </div>
            ),
        },
        {
            accessorKey: "totalAmount",
            header: "Total Amount",
            cell: ({ row }) => (
                <div className="font-semibold">
                    ৳{(row.getValue("totalAmount") as number).toLocaleString()}
                </div>
            ),
        },
        {
            accessorKey: "remainingAmount",
            header: "Outstanding",
            cell: ({ row }) => {
                const remaining = row.getValue("remainingAmount") as number;
                const color = remaining > 0 ? "text-red-600" : "text-green-600";
                return (
                    <div className={`font-semibold ${color}`}>
                        ৳{remaining.toLocaleString()}
                    </div>
                );
            },
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as Agreement["status"];
                return (
                    <Badge className={`${getStatusBadge(status)} gap-1`}>
                        {getStatusIcon(status)}
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "agreementDate",
            header: "Date",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-3 h-3 text-gray-500" />
                    {row.getValue("agreementDate")}
                </div>
            ),
        },
        {
            accessorKey: "consultant",
            header: "Consultant",
        },
        {
            id: "actions",
            header: "Actions",
            cell: () => (
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Eye className="w-3 h-3 mr-1" />
                        View
                    </Button>
                    <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">Service Agreements</h2>
                    <p className="text-gray-600 mt-1">
                        Manage client service agreements and track payments
                    </p>
                </div>

                <Link to="/dashboard/migration/clients/agreements/create">
                    <Button className="flex items-center gap-2">
                        <Plus size={18} />
                        Create Agreement
                    </Button>
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {stats.map((item, idx) => (
                    <div
                        key={idx}
                        className={`${item.color} text-white rounded-xl p-5 flex justify-between items-center shadow-lg`}
                    >
                        <div>
                            <h3 className="text-3xl font-bold">{item.value}</h3>
                            <p className="text-sm mt-1 opacity-90">{item.label}</p>
                        </div>
                        {item.icon}
                    </div>
                ))}
            </div>

            {/* Collection Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card className="border-green-200 bg-green-50">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-green-900 text-sm">Collected Amount</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-900">
                            ৳{totalCollected.toLocaleString()}
                        </div>
                        <div className="text-sm text-green-700 mt-1">
                            {((totalCollected / totalValue) * 100).toFixed(1)}% of total value
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-yellow-200 bg-yellow-50">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-yellow-900 text-sm">Outstanding Payments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-900">
                            ৳{totalOutstanding.toLocaleString()}
                        </div>
                        <div className="text-sm text-yellow-700 mt-1">
                            {((totalOutstanding / totalValue) * 100).toFixed(1)}% pending collection
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Data Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Agreements</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={filteredAgreements}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        totalCount={filteredAgreements.length}
                        onPageChange={setPageIndex}
                        onSearch={(value) => setSearchTerm(value)}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
