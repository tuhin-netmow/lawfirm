import { DataTable } from "@/components/dashboard/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ColumnDef } from "@tanstack/react-table";
import {
    Clock,
    Phone,
    Mail,
    Calendar,
    CheckCircle,
    AlertCircle,
    User,
    Plus,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

interface Followup {
    id: number;
    leadName: string;
    leadId: number;
    type: "call" | "email" | "meeting";
    scheduledDate: string;
    scheduledTime: string;
    status: "pending" | "completed" | "overdue" | "cancelled";
    assignedTo: string;
    notes: string;
    priority: "low" | "medium" | "high";
}

const mockFollowups: Followup[] = [
    {
        id: 1,
        leadName: "Ahmed Hassan",
        leadId: 1,
        type: "call",
        scheduledDate: "2026-01-07",
        scheduledTime: "10:00 AM",
        status: "pending",
        assignedTo: "Sarah Johnson",
        notes: "Discuss admission requirements",
        priority: "high",
    },
    {
        id: 2,
        leadName: "Fatima Rahman",
        leadId: 2,
        type: "email",
        scheduledDate: "2026-01-06",
        scheduledTime: "02:00 PM",
        status: "overdue",
        assignedTo: "Mike Chen",
        notes: "Send document checklist",
        priority: "high",
    },
    {
        id: 3,
        leadName: "Kamal Uddin",
        leadId: 3,
        type: "meeting",
        scheduledDate: "2026-01-08",
        scheduledTime: "11:00 AM",
        status: "pending",
        assignedTo: "Sarah Johnson",
        notes: "Initial consultation",
        priority: "medium",
    },
    {
        id: 4,
        leadName: "Nusrat Jahan",
        leadId: 4,
        type: "call",
        scheduledDate: "2026-01-05",
        scheduledTime: "03:00 PM",
        status: "completed",
        assignedTo: "Mike Chen",
        notes: "Confirmed appointment",
        priority: "medium",
    },
];

export default function Followups() {
    const [pageIndex, setPageIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const pageSize = 10;

    const filteredFollowups = mockFollowups.filter((followup) =>
        Object.values(followup).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const pendingCount = mockFollowups.filter((f) => f.status === "pending").length;
    const overdueCount = mockFollowups.filter((f) => f.status === "overdue").length;
    const completedCount = mockFollowups.filter((f) => f.status === "completed").length;
    const todayCount = mockFollowups.filter((f) => f.scheduledDate === "2026-01-06").length;

    const stats = [
        {
            label: "Pending",
            value: pendingCount,
            color: "bg-blue-600",
            icon: <Clock className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Overdue",
            value: overdueCount,
            color: "bg-red-600",
            icon: <AlertCircle className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Completed Today",
            value: completedCount,
            color: "bg-green-600",
            icon: <CheckCircle className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Today's Tasks",
            value: todayCount,
            color: "bg-purple-600",
            icon: <Calendar className="w-10 h-10 opacity-80" />,
        },
    ];

    const getStatusBadge = (status: Followup["status"]) => {
        const styles = {
            pending: "bg-blue-100 text-blue-800",
            completed: "bg-green-100 text-green-800",
            overdue: "bg-red-100 text-red-800",
            cancelled: "bg-gray-100 text-gray-800",
        };
        return styles[status];
    };

    const getTypeBadge = (type: Followup["type"]) => {
        const icons = {
            call: <Phone className="w-3 h-3" />,
            email: <Mail className="w-3 h-3" />,
            meeting: <User className="w-3 h-3" />,
        };
        const labels = {
            call: "Call",
            email: "Email",
            meeting: "Meeting",
        };
        return { icon: icons[type], label: labels[type] };
    };

    const getPriorityColor = (priority: Followup["priority"]) => {
        const colors = {
            high: "text-red-600",
            medium: "text-yellow-600",
            low: "text-green-600",
        };
        return colors[priority];
    };

    const columns: ColumnDef<Followup>[] = [
        {
            accessorKey: "leadName",
            header: "Lead Name",
            cell: ({ row }) => (
                <div className="font-medium">{row.getValue("leadName")}</div>
            ),
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => {
                const type = row.getValue("type") as Followup["type"];
                const { icon, label } = getTypeBadge(type);
                return (
                    <Badge variant="outline" className="gap-1">
                        {icon}
                        {label}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "scheduledDate",
            header: "Scheduled",
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.original.scheduledDate}</div>
                    <div className="text-sm text-gray-500">{row.original.scheduledTime}</div>
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as Followup["status"];
                return (
                    <Badge className={getStatusBadge(status)}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "priority",
            header: "Priority",
            cell: ({ row }) => {
                const priority = row.getValue("priority") as Followup["priority"];
                return (
                    <span className={`font-semibold ${getPriorityColor(priority)}`}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </span>
                );
            },
        },
        {
            accessorKey: "assignedTo",
            header: "Assigned To",
        },
        {
            accessorKey: "notes",
            header: "Notes",
            cell: ({ row }) => (
                <div className="max-w-xs truncate text-sm text-gray-600">
                    {row.getValue("notes")}
                </div>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    {row.original.status === "pending" && (
                        <>
                            <Button variant="outline" size="sm">
                                Complete
                            </Button>
                            <Button variant="ghost" size="sm">
                                Reschedule
                            </Button>
                        </>
                    )}
                    {row.original.status === "completed" && (
                        <Button variant="outline" size="sm" disabled>
                            Completed
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">Follow-ups</h2>
                    <p className="text-gray-600 mt-1">
                        Track and manage all scheduled follow-ups
                    </p>
                </div>

                <Link to="/dashboard/migration/leads/followups/create">
                    <Button className="flex items-center gap-2">
                        <Plus size={18} />
                        Schedule Follow-up
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

            {/* Overdue Alert */}
            {overdueCount > 0 && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-red-900">Overdue Follow-ups!</h3>
                            <p className="text-sm text-red-800 mt-1">
                                You have {overdueCount} overdue follow-up{overdueCount > 1 ? "s" : ""} that need
                                immediate attention.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Data Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Follow-ups</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={filteredFollowups}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        totalCount={filteredFollowups.length}
                        onPageChange={setPageIndex}
                        onSearch={(value) => setSearchTerm(value)}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
