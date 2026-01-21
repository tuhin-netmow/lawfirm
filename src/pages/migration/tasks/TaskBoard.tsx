import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal, Calendar } from "lucide-react";
import { Link } from "react-router";

// Mock Data for Kanban
const columns = [
    { title: "To Do", id: "to_do", color: "bg-gray-100" },
    { title: "In Progress", id: "in_progress", color: "bg-blue-50" },
    { title: "Review", id: "review", color: "bg-purple-50" },
    { title: "Completed", id: "completed", color: "bg-green-50" }
];

const tasks = [
    {
        id: 1,
        title: "Verify Financial Documents",
        client: "Ahmed Hassan",
        status: "in_progress",
        priority: "high",
        dueDate: "Jan 10",
        assignee: "SJ"
    },
    {
        id: 2,
        title: "Submit Visa Application",
        client: "Fatima Rahman",
        status: "to_do",
        priority: "high",
        dueDate: "Jan 12",
        assignee: "MC"
    },
    {
        id: 3,
        title: "Client Interview Prep",
        client: "Kamal Uddin",
        status: "review",
        priority: "medium",
        dueDate: "Jan 15",
        assignee: "SJ"
    },
    {
        id: 4,
        title: "Update Case Notes",
        client: "Nusrat Jahan",
        status: "completed",
        priority: "low",
        dueDate: "Jan 05",
        assignee: "MC"
    },
    {
        id: 5,
        title: "Follow up on Police Check",
        client: "Rashid Khan",
        status: "to_do",
        priority: "medium",
        dueDate: "Jan 18",
        assignee: "SJ"
    },
    {
        id: 6,
        title: "Draft SOP",
        client: "Rahim Ali",
        status: "in_progress",
        priority: "high",
        dueDate: "Jan 11",
        assignee: "MC"
    }
];

export default function TaskBoard() {
    return (
        <div className="w-full h-[calc(100vh-100px)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">Task Board</h2>
                    <p className="text-gray-600">Drag and drop tasks to manage workflow</p>
                </div>
                <div className="flex gap-3">
                    <Link to="/dashboard/migration/tasks">
                        <Button variant="outline">List View</Button>
                    </Link>
                    <Link to="/dashboard/migration/tasks/create">
                        <Button className="gap-2">
                            <Plus size={16} /> Create Task
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto">
                <div className="flex gap-6 h-full min-w-[1000px] pb-4">
                    {columns.map((col) => (
                        <div key={col.id} className="flex-1 min-w-[280px] bg-gray-50/50 rounded-xl p-4 border border-gray-200 flex flex-col">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                                    <span className={`w-3 h-3 rounded-full ${col.id === 'to_do' ? 'bg-gray-400' : col.id === 'in_progress' ? 'bg-blue-500' : col.id === 'review' ? 'bg-purple-500' : 'bg-green-500'}`}></span>
                                    {col.title}
                                </h3>
                                <Badge variant="secondary" className="bg-gray-200 text-gray-700">
                                    {tasks.filter(t => t.status === col.id).length}
                                </Badge>
                            </div>

                            <div className="flex-1 space-y-3 overflow-y-auto">
                                {tasks.filter(t => t.status === col.id).map((task) => (
                                    <Card key={task.id} className="cursor-grab hover:shadow-md transition-shadow">
                                        <CardContent className="p-4 space-y-3">
                                            <div className="flex justify-between items-start">
                                                <Badge className={`${task.priority === 'high' ? 'bg-red-100 text-red-800' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'} hover:bg-opacity-80`}>
                                                    {task.priority.toUpperCase()}
                                                </Badge>
                                                <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400">
                                                    <MoreHorizontal size={14} />
                                                </Button>
                                            </div>

                                            <div>
                                                <h4 className="font-medium text-sm line-clamp-2">{task.title}</h4>
                                                <p className="text-xs text-gray-500 mt-1">{task.client}</p>
                                            </div>

                                            <div className="flex justify-between items-center pt-2 border-t mt-2">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                    <Calendar size={12} />
                                                    {task.dueDate}
                                                </div>
                                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-700">
                                                    {task.assignee}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            <Button variant="ghost" className="w-full mt-3 text-gray-500 hover:text-gray-900 hover:bg-gray-200">
                                <Plus size={16} className="mr-2" /> Add Task
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
