
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function CreateTask() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "To Do",
        priority: "Medium",
        due_date: "",
        assignee_id: "",
        matter_id: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API
        setTimeout(() => {
            console.log("Creating Task:", formData);
            setIsLoading(false);
            navigate("/dashboard/tasks/board");
        }, 1000);
    };

    return (
        <div className="w-full max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/dashboard/tasks/board">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Create New Task</h1>
                    <p className="text-muted-foreground text-sm">Assign work to yourself or team members.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Task Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Task Title <span className="text-red-500">*</span></Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="e.g. Draft Affidavits for Case #123"
                                required
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="matter_id">Related Matter</Label>
                                <Select
                                    value={formData.matter_id}
                                    onValueChange={(val) => setFormData(prev => ({ ...prev, matter_id: val }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a matter..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="101">Smith vs Jones</SelectItem>
                                        <SelectItem value="102">Estate of Elder</SelectItem>
                                        <SelectItem value="103">TechCorp Merger</SelectItem>
                                        <SelectItem value="general">General (Non-Billable)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="assignee_id">Assignee</Label>
                                <Select
                                    value={formData.assignee_id}
                                    onValueChange={(val) => setFormData(prev => ({ ...prev, assignee_id: val }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Assign to..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Sarah Conner</SelectItem>
                                        <SelectItem value="2">Michael Ross</SelectItem>
                                        <SelectItem value="3">Harvey Specter</SelectItem>
                                        <SelectItem value="me">Assign to Me</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select
                                    value={formData.status}
                                    onValueChange={(val) => setFormData(prev => ({ ...prev, status: val }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="To Do">To Do</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Review">Review</SelectItem>
                                        <SelectItem value="Done">Done</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="priority">Priority</Label>
                                <Select
                                    value={formData.priority}
                                    onValueChange={(val) => setFormData(prev => ({ ...prev, priority: val }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Low">Low</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="High">High</SelectItem>
                                        <SelectItem value="Critical">Critical</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="due_date">Due Date</Label>
                                <Input
                                    id="due_date"
                                    name="due_date"
                                    type="date"
                                    value={formData.due_date}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Add detailed instructions..."
                                className="min-h-[120px]"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Link to="/dashboard/tasks/board">
                                <Button variant="ghost" type="button">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-500">
                                {isLoading ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Create Task</>}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
