
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Task } from "@/types/tasks.types";
import {
    PlusCircle,
    MoreHorizontal,
    Calendar,
    Briefcase,
    UserCircle,
    Search,
    Filter
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

// Mock Data
const MOCK_TASKS: Task[] = [
    {
        id: 1,
        title: "Draft Writ of Summons",
        description: "Prepare initial draft for Smith vs Jones.",
        status: "To Do",
        priority: "High",
        due_date: "2024-04-10",
        assignee_name: "Sarah Conner",
        matter_title: "Smith vs Jones"
    },
    {
        id: 2,
        title: "Client Meeting - Discovery",
        description: "Meeting to collect evidence documents.",
        status: "In Progress",
        priority: "Medium",
        due_date: "2024-04-05",
        assignee_name: "Michael Ross",
        matter_title: "Estate of Elder"
    },
    {
        id: 3,
        title: "Review Settlement Offer",
        description: "Analyze the offer from opposing counsel.",
        status: "Review",
        priority: "Critical",
        due_date: "2024-04-02",
        assignee_name: "Harvey Specter",
        matter_title: "TechCorp Merger"
    },
    {
        id: 4,
        title: "File Motion to Dismiss",
        description: "Finalize and submit to court.",
        status: "Done",
        priority: "High",
        due_date: "2024-03-28",
        assignee_name: "Jessica Pearson",
        matter_title: "Doe Family Trust"
    },
    {
        id: 5,
        title: "Update Billing Records",
        description: "Ensure all hours are logged for March.",
        status: "To Do",
        priority: "Low",
        due_date: "2024-04-15",
        assignee_name: "Louis Litt"
    }
];

const COLUMNS = [
    { id: "To Do", label: "To Do", color: "bg-slate-100 border-slate-200" },
    { id: "In Progress", label: "In Progress", color: "bg-blue-50 border-blue-200" },
    { id: "Review", label: "Review", color: "bg-purple-50 border-purple-200" },
    { id: "Done", label: "Done", color: "bg-green-50 border-green-200" }
];

export default function TaskBoard() {
    const navigate = useNavigate();
    const [tasks] = useState<Task[]>(MOCK_TASKS);

    // Simple status filter (Mock functionality)
    // const [filter, setFilter] = useState("All"); 

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "Critical": return "bg-red-100 text-red-700 border-red-200";
            case "High": return "bg-orange-100 text-orange-700 border-orange-200";
            case "Medium": return "bg-blue-100 text-blue-700 border-blue-200";
            default: return "bg-slate-100 text-slate-700 border-slate-200";
        }
    };

    return (
        <div className="w-full h-full flex flex-col space-y-6">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Task Board</h1>
                    <p className="text-muted-foreground mt-1">Manage case work and deadlines visually.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            className="pl-8 h-10 w-full md:w-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        />
                    </div>
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Filter
                    </Button>
                    <Button
                        className="bg-blue-600 hover:bg-blue-500"
                        onClick={() => navigate("/dashboard/tasks/create")}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" /> New Task
                    </Button>
                </div>
            </div>

            {/* KANBAN BOARD */}
            <div className="flex-1 overflow-x-auto">
                <div className="flex gap-6 min-w-[1000px] h-full">
                    {COLUMNS.map(col => (
                        <div key={col.id} className={`flex-1 rounded-xl border p-4 ${col.color} flex flex-col gap-4 min-h-[500px]`}>
                            {/* Column Header */}
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-semibold text-slate-700">{col.label}</h3>
                                <Badge variant="secondary" className="bg-white/60">
                                    {tasks.filter(t => t.status === col.id).length}
                                </Badge>
                            </div>

                            {/* Task Cards */}
                            {tasks.filter(t => t.status === col.id).map(task => (
                                <Card key={task.id} className="shadow-sm hover:shadow-md transition-shadow cursor-pointer bg-white">
                                    <CardContent className="p-4 space-y-3">
                                        <div className="flex justify-between items-start">
                                            <Badge variant="outline" className={`text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                                                {task.priority}
                                            </Badge>
                                            <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 -mt-2 text-slate-400">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-sm leading-tight mb-1 line-clamp-2">{task.title}</h4>
                                            {task.matter_title && (
                                                <span className="text-xs text-blue-600 flex items-center gap-1">
                                                    <Briefcase className="w-3 h-3" /> {task.matter_title}
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                            {task.description}
                                        </p>

                                        <div className="flex justify-between items-center pt-2 border-t mt-2">
                                            {task.assignee_name && (
                                                <div className="flex items-center gap-1 text-xs text-slate-600" title={`Assigned to ${task.assignee_name}`}>
                                                    <UserCircle className="w-4 h-4" />
                                                    <span className="truncate max-w-[80px]">{task.assignee_name.split(' ')[0]}</span>
                                                </div>
                                            )}
                                            {task.due_date && (
                                                <div className={`flex items-center gap-1 text-xs ${new Date(task.due_date) < new Date() && task.status !== 'Done' ? 'text-red-500 font-medium' : 'text-slate-500'}`}>
                                                    <Calendar className="w-3 h-3" />
                                                    {task.due_date}
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Empty State for Column */}
                            {tasks.filter(t => t.status === col.id).length === 0 && (
                                <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-lg min-h-[100px]">
                                    <div className="opacity-50">Empty</div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
