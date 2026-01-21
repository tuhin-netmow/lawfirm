import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Save, X, Calendar as CalendarIcon } from "lucide-react";
import { Link } from "react-router";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function CreateTask() {
    const [date, setDate] = useState<Date>();

    return (
        <div className="w-full max-w-4xl mx-auto pb-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">Create New Task</h2>
                    <p className="text-gray-500">Assign a new task to yourself or a team member</p>
                </div>
                <div className="flex gap-3">
                    <Link to="/dashboard/migration/tasks">
                        <Button variant="outline" className="gap-2">
                            <X size={16} /> Cancel
                        </Button>
                    </Link>
                    <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                        <Save size={16} /> Save Task
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Task Information</CardTitle>
                            <CardDescription>Details about the task</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Task Title</Label>
                                <Input placeholder="e.g. Verify Financial Documents for Ahmed" />
                            </div>

                            <div className="space-y-2">
                                <Label>Related Client</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Client (Optional)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ahmed">Ahmed Hassan</SelectItem>
                                        <SelectItem value="fatima">Fatima Rahman</SelectItem>
                                        <SelectItem value="kamal">Kamal Uddin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea placeholder="Enter task details..." className="h-32" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Priority</Label>
                                    <Select defaultValue="medium">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="high">High</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="low">Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Type</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="doc">Document Verification</SelectItem>
                                            <SelectItem value="call">Client Call</SelectItem>
                                            <SelectItem value="email">Email Follow-up</SelectItem>
                                            <SelectItem value="admin">Administrative</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Assignment</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Assign To</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Agent" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="me">Assign to Me</SelectItem>
                                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                                        <SelectItem value="mike">Mike Chen</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Due Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
