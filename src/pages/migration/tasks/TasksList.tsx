import { DataTable } from "@/components/dashboard/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    CheckSquare,
    Clock,
    CheckCircle,
    AlertCircle,
    User,
    Users,
    Calendar,
    PlusCircle,
    Filter,
    MoreHorizontal
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import type { ColumnDef } from "@tanstack/react-table";

// Mock Data
interface Task {
    id: number;
    title: string;
    priority: "high" | "medium" | "low";
    status: "to_do" | "in_progress" | "review" | "completed";
    assignee: string;
    dueDate: string;
    client: string;
    type: string;
}

const mockTasks: Task[] = [
    {
        id: 1,
        title: "Verify Financial Documents",
        priority: "high",
        status: "in_progress",
        assignee: "Sarah Johnson",
        dueDate: "2026-01-10",
        client: "Ahmed Hassan",
        type: "Document Verification"
    },
    {
        id: 2,
        title: "Submit Visa Application",
        priority: "high",
        status: "to_do",
        assignee: "Mike Chen",
        dueDate: "2026-01-12",
        client: "Fatima Rahman",
        type: "Submission"
    },
    {
        id: 3,
        title: "Client Interview Prep",
        priority: "medium",
        status: "review",
        assignee: "Sarah Johnson",
        dueDate: "2026-01-15",
        client: "Kamal Uddin",
        type: "Meeting"
    },
    {
        id: 4,
        title: "Update Case Notes",
        priority: "low",
        status: "completed",
        assignee: "Mike Chen",
        dueDate: "2026-01-05",
        client: "Nusrat Jahan",
        type: "Administrative"
    },
    {
        id: 5,
        title: "Follow up on Police Check",
        priority: "medium",
        status: "overdue" as any, // Simulate overdue for filtering logic mostly
        assignee: "Sarah Johnson",
        dueDate: "2026-01-04",
        client: "Rashid Khan",
        type: "Follow-up"
    }
];

export default function TasksList() {
    const [pageIndex, setPageIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();

    // Determine filter based on URL
    const getPageContext = () => {
        if (location.pathname.includes("my-tasks")) return { filter: "my", title: "My Tasks" };
        if (location.pathname.includes("team")) return { filter: "team", title: "Team Tasks" };
        if (location.pathname.includes("overdue")) return { filter: "overdue", title: "Overdue Tasks" };
        if (location.pathname.includes("completed")) return { filter: "completed", title: "Completed Tasks" };
        return { filter: "all", title: "All Tasks" };
    };

    const { filter, title } = getPageContext();

    // Mock currentUser for "My Tasks"
    const currentUser = "Sarah Johnson";

    const filteredTasks = mockTasks.filter((task) => {
        const matchesSearch = Object.values(task).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );

        let matchesFilter = true;
        const isOverdue = new Date(task.dueDate) < new Date("2026-01-07") && task.status !== "completed";

        if (filter === "my") matchesFilter = task.assignee === currentUser;
        if (filter === "completed") matchesFilter = task.status === "completed";
        if (filter === "overdue") matchesFilter = isOverdue;
        // "team" and "all" show everything in this mock, essentially

        return matchesSearch && matchesFilter;
    });

    const pageSize = 10;

    // Stats
    const stats = [
        {
            label: "Total Tasks",
            value: mockTasks.length,
            color: "bg-blue-600",
            icon: <CheckSquare className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Pending",
            value: mockTasks.filter(t => t.status !== "completed").length,
            color: "bg-yellow-600",
            icon: <Clock className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Completed",
            value: mockTasks.filter(t => t.status === "completed").length,
            color: "bg-green-600",
            icon: <CheckCircle className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Overdue",
            value: mockTasks.filter(t => new Date(t.dueDate) < new Date("2026-01-07") && t.status !== "completed").length,
            color: "bg-red-600",
            icon: <AlertCircle className="w-10 h-10 opacity-80" />,
        },
    ];

    const getPriorityBadge = (priority: Task["priority"]) => {
        const colors = {
            high: "bg-red-100 text-red-800",
            medium: "bg-yellow-100 text-yellow-800",
            low: "bg-green-100 text-green-800",
        };
        return <Badge className={colors[priority]}>{priority.toUpperCase()}</Badge>;
    };

    const getStatusBadge = (status: Task["status"]) => {
        const colors = {
            to_do: "bg-gray-100 text-gray-800",
            in_progress: "bg-blue-100 text-blue-800",
            review: "bg-purple-100 text-purple-800",
            completed: "bg-green-100 text-green-800",
        };
        // Handle mock 'overdue' status if present in data, though logically it's derived
        const displayStatus = status === ("overdue" as any) ? "Overdue" : status.replace("_", " ").toUpperCase();
        const colorClass = status === ("overdue" as any) ? "bg-red-100 text-red-800" : (colors[status] || "bg-gray-100");

        return <Badge className={colorClass}>{displayStatus}</Badge>;
    };

    const columns: ColumnDef<Task>[] = [
        {
            accessorKey: "title",
            header: "Task",
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.getValue("title")}</div>
                    <div className="text-sm text-gray-500">{row.original.client}</div>
                </div>
            ),
        },
        {
            accessorKey: "priority",
            header: "Priority",
            cell: ({ row }) => getPriorityBadge(row.getValue("priority")),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => getStatusBadge(row.getValue("status")),
        },
        {
            accessorKey: "assignee",
            header: "Assignee",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span>{row.getValue("assignee")}</span>
                </div>
            ),
        },
        {
            accessorKey: "dueDate",
            header: "Due Date",
            cell: ({ row }) => {
                const date = row.getValue("dueDate") as string;
                const isOverdue = new Date(date) < new Date("2026-01-07") && row.original.status !== "completed";
                return (
                    <div className={`flex items-center gap-2 ${isOverdue ? "text-red-600 font-medium" : "text-gray-600"}`}>
                        <Calendar className="w-4 h-4" />
                        {date}
                    </div>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: () => (
                <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            ),
        },
    ];

    return (
        <div className="w-full">
            <div className="flex flex-wrap justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">{title}</h2>
                    <p className="text-gray-600 mt-1">Manage daily activities and assignments</p>
                </div>
                <div className="flex gap-3">
                    <Link to="/dashboard/migration/tasks/create">
                        <Button className="gap-2">
                            <PlusCircle size={16} /> Create Task
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

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Tasks List</CardTitle>
                        <div className="flex gap-2">
                            <Link to="/dashboard/migration/tasks/board">
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Users size={14} /> Kanban Board
                                </Button>
                            </Link>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Filter size={14} /> Filter
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={filteredTasks}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        totalCount={filteredTasks.length}
                        onPageChange={setPageIndex}
                        onSearch={(value) => setSearchTerm(value)}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
