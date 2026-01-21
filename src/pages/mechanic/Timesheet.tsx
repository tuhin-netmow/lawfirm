
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square, Calendar as CalendarIcon, Plus } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock Data
const initialLogs = [
    { id: 1, date: "2024-05-22", job_no: "JC-1001", task: "Oil Change", start: "09:00", end: "10:30", duration: "1h 30m", type: "Billable" },
    { id: 2, date: "2024-05-22", job_no: "-", task: "Lunch Break", start: "12:00", end: "13:00", duration: "1h 00m", type: "Break" },
    { id: 3, date: "2024-05-22", job_no: "JC-1005", task: "Diagnostics", start: "13:30", end: "15:00", duration: "1h 30m", type: "Billable" },
    { id: 4, date: "2024-05-21", job_no: "JC-1002", task: "Brake Repair", start: "10:00", end: "12:00", duration: "2h 00m", type: "Billable" },
];

const Timesheet = () => {
    const [status, setStatus] = useState<"Idle" | "Working" | "Break">("Idle");
    const [currentTask, setCurrentTask] = useState("");
    const [startTime, setStartTime] = useState<Date | null>(null);

    const handleClockIn = () => {
        setStatus("Working");
        setStartTime(new Date());
    };

    const handleBreak = () => {
        setStatus("Break");
    };

    const handleStop = () => {
        setStatus("Idle");
        setStartTime(null);
        setCurrentTask("");
    };

    return (
        <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Timesheet</h1>
                    <p className="text-muted-foreground mt-1">Track your daily work hours and breaks.</p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-md">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Timer Card */}
                <Card className={`md:col-span-2 border-l-4 ${status === 'Working' ? 'border-l-green-500' : status === 'Break' ? 'border-l-yellow-500' : 'border-l-gray-300'}`}>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>Current Status</span>
                            <Badge variant={status === 'Working' ? 'success' : status === 'Break' ? 'warning' : 'secondary'} className="text-lg px-3 py-1">
                                {status === 'Working' ? 'CLOCKED IN' : status === 'Break' ? 'ON BREAK' : 'CLOCKED OUT'}
                            </Badge>
                        </CardTitle>
                        <CardDescription>
                            {status === 'Working' ? `Working on: ${currentTask || 'General Task'}` : 'Not currently tracking time.'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {status !== 'Idle' && (
                            <div className="flex flex-col items-center justify-center py-6">
                                <span className="text-5xl font-mono font-bold tracking-widest text-primary">02:14:35</span>
                                <p className="text-sm text-muted-foreground mt-2">Started at {startTime?.toLocaleTimeString() || '09:00 AM'}</p>
                            </div>
                        )}

                        <div className="flex gap-4 justify-center mt-4">
                            {status === 'Idle' ? (
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="lg" className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white">
                                            <Play className="mr-2 h-5 w-5" /> Clock In
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Start Work Session</DialogTitle>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="job">Job Reference (Optional)</Label>
                                                <Input id="job" placeholder="Scanning/Entering Job #" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="task">Task Description</Label>
                                                <Input
                                                    id="task"
                                                    placeholder="What are you working on?"
                                                    value={currentTask}
                                                    onChange={(e) => setCurrentTask(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button onClick={handleClockIn}>Start Timer</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            ) : (
                                <>
                                    {status === 'Working' && (
                                        <Button size="lg" variant="secondary" className="flex-1 md:flex-none border-yellow-500 text-yellow-600 hover:text-yellow-700 bg-yellow-100 hover:bg-yellow-200" onClick={handleBreak}>
                                            <Pause className="mr-2 h-5 w-5" /> Take Break
                                        </Button>
                                    )}
                                    {status === 'Break' && (
                                        <Button size="lg" className="flex-1 md:flex-none bg-green-600 hover:bg-green-700 text-white" onClick={handleClockIn}>
                                            <Play className="mr-2 h-5 w-5" /> Resume Work
                                        </Button>
                                    )}
                                    <Button size="lg" variant="destructive" className="flex-1 md:flex-none" onClick={handleStop}>
                                        <Square className="mr-2 h-5 w-5" /> Stop Day
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Weekly Summary Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Summary</CardTitle>
                        <CardDescription>May 20 - May 26</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Total Hours</span>
                                <span className="font-bold">24h 30m</span>
                            </div>
                            <Progress value={60} className="h-2" />
                            <p className="text-xs text-muted-foreground text-right">Goal: 40h</p>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Billable Hours</span>
                                <span>20h 15m</span>
                            </div>
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Break Time</span>
                                <span>4h 15m</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Daily Logs</CardTitle>
                        <CardDescription>Detailed breakdown of your time entries.</CardDescription>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Plus className="mr-2 h-4 w-4" /> Add Manual Entry
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Manual Time Entry</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Date</Label>
                                        <Input type="date" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Type</Label>
                                        <Select defaultValue="billable">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="billable">Billable</SelectItem>
                                                <SelectItem value="non-billable">Non-Billable</SelectItem>
                                                <SelectItem value="break">Break</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Start Time</Label>
                                        <Input type="time" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>End Time</Label>
                                        <Input type="time" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Job / Task</Label>
                                    <Input placeholder="Description..." />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button>Save Entry</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Job Ref</TableHead>
                                <TableHead>Task / Description</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Start</TableHead>
                                <TableHead>End</TableHead>
                                <TableHead className="text-right">Duration</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {initialLogs.map((log) => (
                                <TableRow key={log.id}>
                                    <TableCell className="font-medium text-xs text-muted-foreground">{log.date}</TableCell>
                                    <TableCell>{log.job_no}</TableCell>
                                    <TableCell>{log.task}</TableCell>
                                    <TableCell>
                                        <Badge variant={log.type === 'Billable' ? 'success' : log.type === 'Break' ? 'secondary' : 'outline'}>
                                            {log.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="font-mono text-sm">{log.start}</TableCell>
                                    <TableCell className="font-mono text-sm">{log.end}</TableCell>
                                    <TableCell className="text-right font-medium">{log.duration}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default Timesheet;
