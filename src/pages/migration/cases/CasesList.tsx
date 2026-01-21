import { DataTable } from "@/components/dashboard/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ColumnDef } from "@tanstack/react-table";
import {
    Briefcase,
    Calendar,
    CheckCircle,
    Clock,
    AlertCircle,
    ArrowRight,
    PlusCircle
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";

// Mock data
interface Case {
    id: number;
    caseNumber: string;
    clientName: string;
    visaType: string;
    stage: string;
    status: "active" | "completed" | "overdue" | "pending";
    nextAction: string;
    dueDate: string;
    assignedTo: string;
    progress: number;
}

const mockCases: Case[] = [
    {
        id: 1,
        caseNumber: "CASE-2026-001",
        clientName: "Ahmed Hassan",
        visaType: "Student Visa (500)",
        stage: "Document Collection",
        status: "active",
        nextAction: "Verify Transcript",
        dueDate: "2026-01-15",
        assignedTo: "Sarah Johnson",
        progress: 35
    },
    {
        id: 2,
        caseNumber: "CASE-2026-002",
        clientName: "Fatima Rahman",
        visaType: "Skilled Migration (189)",
        stage: "Visa Lodgement",
        status: "pending",
        nextAction: "Submit Application",
        dueDate: "2026-01-20",
        assignedTo: "Mike Chen",
        progress: 80
    },
    {
        id: 3,
        caseNumber: "CASE-2026-003",
        clientName: "John Smith",
        visaType: "Partner Visa (820)",
        stage: "Initial Assessment",
        status: "overdue",
        nextAction: "Client Meeting",
        dueDate: "2026-01-05",
        assignedTo: "Sarah Johnson",
        progress: 10
    },
    {
        id: 4,
        caseNumber: "CASE-2026-004",
        clientName: "Maria Garcia",
        visaType: "Visitor Visa (600)",
        stage: "Granted",
        status: "completed",
        nextAction: "Close Case",
        dueDate: "2026-01-02",
        assignedTo: "Mike Chen",
        progress: 100
    },
    {
        id: 5,
        caseNumber: "CASE-2026-005",
        clientName: "Chen Wei",
        visaType: "Business Visa (188)",
        stage: "State Nomination",
        status: "active",
        nextAction: "Review Financials",
        dueDate: "2026-02-01",
        assignedTo: "Sarah Johnson",
        progress: 45
    }
];

export default function CasesList() {
    const [pageIndex, setPageIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();

    // Determine filter based on URL
    const getFilterFromUrl = () => {
        if (location.pathname.includes("in-progress")) return "active";
        if (location.pathname.includes("completed")) return "completed";
        if (location.pathname.includes("overdue")) return "overdue";
        return null;
    };

    const activeFilter = getFilterFromUrl();

    // Filter cases
    const filteredCases = mockCases.filter((item) => {
        const matchesSearch = Object.values(item).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesFilter = activeFilter ?
            (activeFilter === "active" ? (item.status === "active" || item.status === "pending") : item.status === activeFilter)
            : true;

        return matchesSearch && matchesFilter;
    });

    const pageSize = 10;

    // Stats
    const stats = [
        {
            label: "Total Cases",
            value: mockCases.length,
            color: "bg-blue-600",
            icon: <Briefcase className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Active Cases",
            value: mockCases.filter((c) => c.status === "active" || c.status === "pending").length,
            color: "bg-green-600",
            icon: <Clock className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Completed",
            value: mockCases.filter((c) => c.status === "completed").length,
            color: "bg-purple-600",
            icon: <CheckCircle className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Overdue",
            value: mockCases.filter((c) => c.status === "overdue").length,
            color: "bg-red-600",
            icon: <AlertCircle className="w-10 h-10 opacity-80" />,
        },
    ];

    const getStatusColor = (status: Case["status"]) => {
        const colors = {
            active: "bg-blue-100 text-blue-800",
            pending: "bg-yellow-100 text-yellow-800",
            completed: "bg-green-100 text-green-800",
            overdue: "bg-red-100 text-red-800",
        };
        return colors[status];
    };

    const columns: ColumnDef<Case>[] = [
        {
            accessorKey: "caseNumber",
            header: "Case ID",
            cell: ({ row }) => (
                <Link
                    to={`/dashboard/migration/cases/${row.original.id}`}
                    className="font-medium text-blue-600 hover:underline"
                >
                    {row.getValue("caseNumber")}
                </Link>
            ),
        },
        {
            accessorKey: "clientName",
            header: "Client",
            cell: ({ row }) => (
                <div className="font-medium">{row.getValue("clientName")}</div>
            ),
        },
        {
            accessorKey: "visaType",
            header: "Visa Type",
        },
        {
            accessorKey: "stage",
            header: "Current Stage",
            cell: ({ row }) => (
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium">{row.getValue("stage")}</span>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{ width: `${row.original.progress}%` }}
                        ></div>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "nextAction",
            header: "Next Action",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ArrowRight className="w-3 h-3" />
                    {row.getValue("nextAction")}
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as Case["status"];
                return (
                    <Badge className={getStatusColor(status)}>
                        {status.toUpperCase()}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "dueDate",
            header: "Due Date",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-3 h-3 text-gray-500" />
                    {row.getValue("dueDate")}
                </div>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: () => (
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        View
                    </Button>
                </div>
            ),
        },
    ];

    const getPageTitle = () => {
        if (activeFilter === "active") return "In Progress Cases";
        if (activeFilter === "completed") return "Completed Cases";
        if (activeFilter === "overdue") return "Overdue Cases";
        return "All Cases";
    }

    return (
        <div className="w-full">
            {/* Page Header */}
            <div className="flex flex-wrap justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">{getPageTitle()}</h2>
                    <p className="text-gray-600 mt-1">Manage and track all migration cases</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <Link to="/dashboard/migration/cases/timeline">
                        <Button variant="outline" className="flex items-center gap-2">
                            <Clock size={18} />
                            Timeline View
                        </Button>
                    </Link>
                    <Link to="/dashboard/migration/cases/create">
                        <Button className="flex items-center gap-2">
                            <PlusCircle size={18} />
                            Create New Case
                        </Button>
                    </Link>
                </div>
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

            {/* Data Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Cases List</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={filteredCases}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        totalCount={filteredCases.length}
                        onPageChange={setPageIndex}
                        onSearch={(value) => setSearchTerm(value)}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
