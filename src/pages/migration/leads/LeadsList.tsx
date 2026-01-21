import { DataTable } from "@/components/dashboard/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ColumnDef } from "@tanstack/react-table";
import {
    Users,
    UserPlus,
    Target,
    TrendingUp,
    Phone,
    Mail,
    Calendar,
    MoreHorizontal,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

// Mock data - Replace with actual API call
interface Lead {
    id: number;
    leadNumber: string;
    name: string;
    email: string;
    phone: string;
    visaType: string;
    destination: string;
    status: "new" | "contacted" | "follow_up" | "appointment" | "converted" | "lost";
    source: string;
    assignedTo: string;
    createdAt: string;
    score: number;
}

const mockLeads: Lead[] = [
    {
        id: 1,
        leadNumber: "LEAD-2026-001",
        name: "Ahmed Hassan",
        email: "ahmed.hassan@email.com",
        phone: "+880 1712-345678",
        visaType: "Student Visa",
        destination: "Australia",
        status: "contacted",
        source: "Website",
        assignedTo: "Sarah Johnson",
        createdAt: "2026-01-05",
        score: 85,
    },
    {
        id: 2,
        leadNumber: "LEAD-2026-002",
        name: "Fatima Rahman",
        email: "fatima.r@email.com",
        phone: "+880 1812-987654",
        visaType: "Skilled Migration",
        destination: "Canada",
        status: "follow_up",
        source: "Facebook Ads",
        assignedTo: "Mike Chen",
        createdAt: "2026-01-04",
        score: 92,
    },
    {
        id: 3,
        leadNumber: "LEAD-2026-003",
        name: "Kamal Uddin",
        email: "kamal.u@email.com",
        phone: "+880 1612-456789",
        visaType: "Tourist Visa",
        destination: "UK",
        status: "new",
        source: "Referral",
        assignedTo: "Sarah Johnson",
        createdAt: "2026-01-06",
        score: 67,
    },
    {
        id: 4,
        leadNumber: "LEAD-2026-004",
        name: "Nusrat Jahan",
        email: "nusrat.j@email.com",
        phone: "+880 1912-111222",
        visaType: "Work Visa",
        destination: "USA",
        status: "appointment",
        source: "Google Ads",
        assignedTo: "Mike Chen",
        createdAt: "2026-01-03",
        score: 78,
    },
    {
        id: 5,
        leadNumber: "LEAD-2026-005",
        name: "Rashid Khan",
        email: "rashid.k@email.com",
        phone: "+880 1512-333444",
        visaType: "Partner Visa",
        destination: "Australia",
        status: "converted",
        source: "Walk-in",
        assignedTo: "Sarah Johnson",
        createdAt: "2026-01-02",
        score: 95,
    },
];

export default function LeadsList() {
    const [pageIndex, setPageIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const pageSize = 10;

    // Filter leads based on search
    const filteredLeads = mockLeads.filter((lead) =>
        Object.values(lead).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    // Stats
    const stats = [
        {
            label: "Total Leads",
            value: mockLeads.length,
            color: "bg-blue-600",
            icon: <Users className="w-10 h-10 opacity-80" />,
        },
        {
            label: "New Leads",
            value: mockLeads.filter((l) => l.status === "new").length,
            color: "bg-green-600",
            icon: <UserPlus className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Conversion Rate",
            value: `${((mockLeads.filter((l) => l.status === "converted").length / mockLeads.length) * 100).toFixed(0)}%`,
            color: "bg-purple-600",
            icon: <Target className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Avg Score",
            value: Math.round(mockLeads.reduce((acc, l) => acc + l.score, 0) / mockLeads.length),
            color: "bg-yellow-600",
            icon: <TrendingUp className="w-10 h-10 opacity-80" />,
        },
    ];

    const getStatusColor = (status: Lead["status"]) => {
        const colors = {
            new: "bg-blue-100 text-blue-800",
            contacted: "bg-cyan-100 text-cyan-800",
            follow_up: "bg-yellow-100 text-yellow-800",
            appointment: "bg-purple-100 text-purple-800",
            converted: "bg-green-100 text-green-800",
            lost: "bg-red-100 text-red-800",
        };
        return colors[status];
    };

    const getStatusLabel = (status: Lead["status"]) => {
        const labels = {
            new: "New",
            contacted: "Contacted",
            follow_up: "Follow-up",
            appointment: "Appointment",
            converted: "Converted",
            lost: "Lost",
        };
        return labels[status];
    };

    const leadColumns: ColumnDef<Lead>[] = [
        {
            accessorKey: "leadNumber",
            header: "Lead #",
            cell: ({ row }) => (
                <Link
                    to={`/dashboard/migration/leads/${row.original.id}`}
                    className="font-medium text-blue-600 hover:underline"
                >
                    {row.getValue("leadNumber")}
                </Link>
            ),
        },
        { accessorKey: "name", header: "Name" },
        {
            accessorKey: "email",
            header: "Contact",
            cell: ({ row }) => (
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-3 h-3 text-gray-500" />
                        {row.original.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-3 h-3 text-gray-500" />
                        {row.original.phone}
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "visaType",
            header: "Visa Type",
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.original.visaType}</div>
                    <div className="text-sm text-gray-500">{row.original.destination}</div>
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as Lead["status"];
                return (
                    <Badge className={getStatusColor(status)}>
                        {getStatusLabel(status)}
                    </Badge>
                );
            },
        },
        { accessorKey: "source", header: "Source" },
        {
            accessorKey: "score",
            header: "Score",
            cell: ({ row }) => {
                const score = row.getValue("score") as number;
                const color =
                    score >= 80 ? "text-green-600" : score >= 60 ? "text-yellow-600" : "text-red-600";
                return (
                    <div className={`font-semibold ${color}`}>{score}/100</div>
                );
            },
        },
        { accessorKey: "assignedTo", header: "Assigned To" },
        {
            accessorKey: "createdAt",
            header: "Created",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-3 h-3 text-gray-500" />
                    {row.getValue("createdAt")}
                </div>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Link to={`/dashboard/migration/leads/${row.original.id}`}>
                        <Button variant="outline" size="sm">
                            View
                        </Button>
                    </Link>
                    <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="w-full">
            {/* Page Header */}
            <div className="flex flex-wrap justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">All Leads</h2>
                    <p className="text-gray-600 mt-1">Manage consultation inquiries and track conversions</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <Link to="/dashboard/migration/leads/pipeline">
                        <Button variant="outline" className="flex items-center gap-2">
                            <Target size={18} />
                            Pipeline View
                        </Button>
                    </Link>
                    <Link to="/dashboard/migration/leads/create">
                        <Button className="flex items-center gap-2">
                            <UserPlus size={18} />
                            Add Lead
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
                    <CardTitle>Leads List</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={leadColumns}
                        data={filteredLeads}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        totalCount={filteredLeads.length}
                        onPageChange={setPageIndex}
                        onSearch={(value) => setSearchTerm(value)}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
