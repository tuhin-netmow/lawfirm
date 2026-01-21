
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, CheckCircle, Clock, FileText, Camera } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Mock Data
const initialMyJobs = [
    {
        id: "1",
        job_no: "JC-1001",
        vehicle: "Toyota Camry (ABC-1234)",
        customer: "John Doe",
        status: "In Progress",
        tasks: [
            { id: 1, name: "Oil Change", status: "Completed" },
            { id: 2, name: "Replace Air Filter", status: "In Progress" },
            { id: 3, name: "Check Brakes", status: "Pending" }
        ],
        startTime: new Date(new Date().setHours(9, 30)), // Mock start time
        elapsed: "01:30:00"
    },
    {
        id: "2",
        job_no: "JC-1005",
        vehicle: "Honda Civic (XYZ-987)",
        customer: "Jane Smith",
        status: "Pending",
        tasks: [
            { id: 4, name: "Wheel Alignment", status: "Pending" },
            { id: 5, name: "Rotate Tires", status: "Pending" }
        ],
        startTime: null,
        elapsed: "00:00:00"
    },
    {
        id: "3",
        job_no: "JC-1002",
        vehicle: "Ford F-150 (LMN-456)",
        customer: "Bob Wilson",
        status: "Completed",
        tasks: [
            { id: 6, name: "Brake Pad Replacement", status: "Completed" }
        ],
        startTime: null,
        elapsed: "02:15:00"
    }
];

const MyJobs = () => {
    // State
    const [jobs, setJobs] = useState(initialMyJobs);
    const [activeJobId, setActiveJobId] = useState<string | null>("1"); // Mock active job

    // Handlers
    const toggleJobTimer = (id: string) => {
        if (activeJobId === id) {
            setActiveJobId(null); // Pause
        } else {
            setActiveJobId(id); // Start
        }
        // In real app, this would create a time log entry
    };

    const markTaskComplete = (jobId: string, taskId: number) => {
        setJobs(jobs.map(job => {
            if (job.id === jobId) {
                const newTasks = job.tasks.map(t =>
                    t.id === taskId ? { ...t, status: "Completed" } : t
                );
                return { ...job, tasks: newTasks };
            }
            return job;
        }));
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "In Progress": return <Badge variant="info" className="animate-pulse">In Progress</Badge>;
            case "Completed": return <Badge variant="success">Completed</Badge>;
            case "Pending": return <Badge variant="secondary">Pending</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    const calculateProgress = (tasks: any[]) => {
        if (tasks.length === 0) return 0;
        const completed = tasks.filter(t => t.status === "Completed").length;
        return (completed / tasks.length) * 100;
    };

    return (
        <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Jobs</h1>
                    <p className="text-muted-foreground mt-1">Manage your assigned tasks and time.</p>
                </div>
                {activeJobId && (
                    <div className="bg-primary/10 text-primary px-4 py-2 rounded-lg flex items-center gap-3 w-full md:w-auto animate-in fade-in slide-in-from-top-2">
                        <Clock className="h-5 w-5" />
                        <span className="font-mono font-bold text-lg">01:30:15</span>
                        <span className="text-xs uppercase font-semibold tracking-wider">Clocked In</span>
                    </div>
                )}
            </div>

            <Tabs defaultValue="active" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="active">Active & Pending</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="space-y-4">
                    {jobs.filter(j => j.status !== 'Completed').map(job => (
                        <Card key={job.id} className={`overflow-hidden transition-all ${activeJobId === job.id ? 'border-primary ring-1 ring-primary/50 shadow-lg' : ''}`}>
                            <CardHeader className="bg-muted/30 pb-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Badge variant="outline" className="font-mono">{job.job_no}</Badge>
                                            {getStatusBadge(job.status)}
                                        </div>
                                        <CardTitle className="text-xl">{job.vehicle}</CardTitle>
                                        <p className="text-sm text-muted-foreground">{job.customer}</p>
                                    </div>
                                    <Button
                                        size="lg"
                                        className={`rounded-full w-12 h-12 p-0 shadow-sm ${activeJobId === job.id ? 'bg-red-500 hover:bg-red-600' : 'bg-green-600 hover:bg-green-700'}`}
                                        onClick={() => toggleJobTimer(job.id)}
                                    >
                                        {activeJobId === job.id ? <Pause className="h-6 w-6 text-white" /> : <Play className="h-6 w-6 text-white ml-1" />}
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4 space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-medium">Task Progress</span>
                                        <span className="text-muted-foreground">{Math.round(calculateProgress(job.tasks))}%</span>
                                    </div>
                                    <Progress value={calculateProgress(job.tasks)} className="h-2" />
                                </div>

                                <div className="space-y-2">
                                    {job.tasks.map(task => (
                                        <div key={task.id} className="flex items-center justify-between p-2 rounded-lg bg-card border hover:bg-accent/50 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${task.status === 'Completed' ? 'bg-green-500' : task.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-300'}`} />
                                                <span className={`text-sm ${task.status === 'Completed' ? 'line-through text-muted-foreground' : 'font-medium'}`}>{task.name}</span>
                                            </div>
                                            {task.status !== 'Completed' && (
                                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => markTaskComplete(job.id, task.id)}>
                                                    <CheckCircle className="h-5 w-5 text-muted-foreground hover:text-green-600" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="bg-muted/30 py-3 flex justify-between gap-2">
                                <Button variant="outline" size="sm" className="flex-1">
                                    <Camera className="mr-2 h-4 w-4" /> Add Photo
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" className="flex-1">
                                            <FileText className="mr-2 h-4 w-4" /> Add Note
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Add Job Note - {job.job_no}</DialogTitle>
                                        </DialogHeader>
                                        <div className="py-4">
                                            <Label>Diagnosis / Notes</Label>
                                            <Textarea placeholder="Enter your observations..." className="mt-2" rows={4} />
                                        </div>
                                        <DialogFooter>
                                            <Button>Save Note</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </CardFooter>
                        </Card>
                    ))}
                    {jobs.filter(j => j.status !== 'Completed').length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">
                            No active jobs assigned to you.
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="history">
                    <div className="space-y-4">
                        {jobs.filter(j => j.status === 'Completed').map(job => (
                            <Card key={job.id} className="opacity-75 hover:opacity-100 transition-opacity">
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between">
                                        <div>
                                            <CardTitle className="text-lg">{job.vehicle}</CardTitle>
                                            <p className="text-sm text-muted-foreground">{job.customer} • {job.job_no}</p>
                                        </div>
                                        <Badge variant="secondary">Completed</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground">
                                    <div className="flex gap-4">
                                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> Time: {job.elapsed}</span>
                                        <span className="flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Tasks: {job.tasks.length}/{job.tasks.length}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default MyJobs;
