
import { DataTable } from "@/components/dashboard/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import type { Task } from "@/types/tasks.types";
import {
    PlusCircle,
    Search,
    Filter,
    MoreHorizontal,
    Calendar,
    Briefcase,
    UserCircle,
    CheckCircle2,
    Clock,
    AlertCircle
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

// Mock Data (Shared source of truth concept)
const MOCK_TASKS: Task[] = [
    {
        id: 1,
        title: "Draft Writ of Summons",
        description: "Prepare initial draft for Smith vs Jones.",
        status: "To Do",
        priority: "High",
        due_date: "2024-04-10",
        assignee_name: "Sarah Conner",
        matter_title: "Smith vs Jones",
        created_at: "2024-03-20"
    },
    {
        id: 2,
        title: "Client Meeting - Discovery",
        description: "Meeting to collect evidence documents.",
        status: "In Progress",
        priority: "Medium",
        due_date: "2024-04-05",
        assignee_name: "Michael Ross",
        matter_title: "Estate of Elder",
        created_at: "2024-03-22"
    },
    {
        id: 3,
        title: "Review Settlement Offer",
        description: "Analyze the offer from opposing counsel.",
        status: "Review",
        priority: "Critical",
        due_date: "2024-04-02",
        assignee_name: "Harvey Specter",
        matter_title: "TechCorp Merger",
        created_at: "2024-03-25"
    },
    {
        id: 4,
        title: "File Motion to Dismiss",
        description: "Finalize and submit to court.",
        status: "Done",
        priority: "High",
        due_date: "2024-03-28",
        assignee_name: "Jessica Pearson",
        matter_title: "Doe Family Trust",
        created_at: "2024-03-15"
    },
    {
        id: 5,
        title: "Update Billing Records",
        description: "Ensure all hours are logged for March.",
        status: "To Do",
        priority: "Low",
        due_date: "2024-04-15",
        assignee_name: "Louis Litt",
        created_at: "2024-03-28"
    }
];

export default function TasksList() {
    const navigate = useNavigate();
    const [pageIndex, setPageIndex] = useState(0);
    const tasks = MOCK_TASKS;

    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case "Critical": return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200">Critical</Badge>;
            case "High": return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200">High</Badge>;
            case "Medium": return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">Medium</Badge>;
            default: return <Badge variant="outline" className="text-slate-600">Low</Badge>;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Done": return <CheckCircle2 className="w-4 h-4 text-green-500" />;
            case "In Progress": return <Clock className="w-4 h-4 text-blue-500" />;
            case "Review": return <AlertCircle className="w-4 h-4 text-purple-500" />;
            default: return <div className="w-4 h-4 rounded-full border-2 border-slate-300" />;
        }
    };

    const columns: ColumnDef<Task>[] = [
        {
            accessorKey: "title",
            header: "Task Name",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-medium text-slate-900">{row.getValue("title")}</span>
                    {row.original.description && (
                        <span className="text-xs text-muted-foreground truncate max-w-[250px]">{row.original.description}</span>
                    )}
                </div>
            )
        },
        {
            accessorKey: "matter_title",
            header: "Matter",
            cell: ({ row }) => row.original.matter_title ? (
                <div className="flex items-center gap-1 text-blue-600 text-sm">
                    <Briefcase className="w-3 h-3" />
                    <span>{row.original.matter_title}</span>
                </div>
            ) : <span className="text-slate-400 text-xs italic">General</span>
        },
        {
            accessorKey: "assignee_name",
            header: "Assignee",
            cell: ({ row }) => row.original.assignee_name ? (
                <div className="flex items-center gap-2">
                    <div className="bg-slate-100 p-1 rounded-full"><UserCircle className="w-4 h-4 text-slate-500" /></div>
                    <span className="text-sm">{row.original.assignee_name}</span>
                </div>
            ) : <span className="text-slate-400">-</span>
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    {getStatusIcon(row.getValue("status"))}
                    <span className="text-sm">{row.getValue("status")}</span>
                </div>
            )
        },
        {
            accessorKey: "priority",
            header: "Priority",
            cell: ({ row }) => getPriorityBadge(row.getValue("priority"))
        },
        {
            accessorKey: "due_date",
            header: "Due Date",
            cell: ({ row }) => (
                <div className={`flex items-center gap-1 text-sm ${row.original.due_date && new Date(row.original.due_date) < new Date() && row.getValue("status") !== 'Done' ? 'text-red-600 font-medium' : 'text-slate-600'}`}>
                    <Calendar className="w-3 h-3" />
                    {row.getValue("due_date") || "-"}
                </div>
            )
        },
        {
            id: "actions",
            header: "Actions",
            cell: () => (
                <div className="flex items-center gap-2">
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
                    <h1 className="text-3xl font-bold tracking-tight">All Tasks</h1>
                    <p className="text-muted-foreground mt-1">Review and manage all firm tasks in a list view.</p>
                </div>
                <Button
                    className="bg-blue-600 hover:bg-blue-500"
                    onClick={() => navigate("/dashboard/tasks/create")}
                >
                    <PlusCircle className="mr-2 h-4 w-4" /> New Task
                </Button>
            </div>

            {/* FILTERS & TABLE */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <CardTitle>Tasks</CardTitle>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search tasks..."
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
                        data={tasks}
                        pageIndex={pageIndex}
                        pageSize={10}
                        onPageChange={setPageIndex}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
