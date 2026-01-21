
import { useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// --- Types ---
type JobStatus = 'Pending' | 'In Progress' | 'Waiting Parts' | 'Completed';

interface Job {
    id: string;
    job_no: string;
    customer: string;
    vehicle: string;
    service: string;
    status: JobStatus;
    priority: 'Normal' | 'Urgent';
    mechanic?: string;
}

// --- Mock Data ---
const initialJobs: Job[] = [
    { id: '1', job_no: 'JB-1001', customer: 'John Doe', vehicle: 'Toyota Camry', service: 'Full Service', status: 'Pending', priority: 'Normal' },
    { id: '2', job_no: 'JB-1002', customer: 'Jane Smith', vehicle: 'Honda Civic', service: 'Brake Pad Replacement', status: 'In Progress', priority: 'Urgent', mechanic: 'Mike' },
    { id: '3', job_no: 'JB-1003', customer: 'Bob Johnson', vehicle: 'Ford F-150', service: 'Oil Change', status: 'Pending', priority: 'Normal' },
    { id: '4', job_no: 'JB-1004', customer: 'Alice Brown', vehicle: 'Tesla Model 3', service: 'Tire Rotation', status: 'Waiting Parts', priority: 'Normal' },
    { id: '5', job_no: 'JB-1005', customer: 'Charlie Wilson', vehicle: 'BMW X5', service: 'Engine Diagnostic', status: 'Completed', priority: 'Urgent', mechanic: 'Sarah' },
];

const JobBoard = () => {
    const [jobs, setJobs] = useState<Job[]>(initialJobs);

    const columns: JobStatus[] = ['Pending', 'In Progress', 'Waiting Parts', 'Completed'];

    const moveJob = (jobId: string, newStatus: JobStatus) => {
        setJobs(jobs.map(j => j.id === jobId ? { ...j, status: newStatus } : j));
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Job Board</h1>
                    <p className="text-muted-foreground mt-1">Track and manage active service jobs.</p>
                </div>
                <Link to="/dashboard/jobs/create">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> New Job Card
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[calc(100vh-200px)] min-h-[500px]">
                {columns.map((status) => (
                    <Card key={status} className="h-full bg-muted/20 flex flex-col border-none shadow-none">
                        <CardHeader className="py-3 px-3 bg-background/50 rounded-t-lg border-b sticky top-0 backdrop-blur-sm z-10 mx-1 mt-1">
                            <div className="flex justify-between items-center">
                                <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${status === 'Pending' ? 'bg-yellow-500' :
                                        status === 'In Progress' ? 'bg-blue-500' :
                                            status === 'Waiting Parts' ? 'bg-orange-500' :
                                                'bg-green-500'
                                        }`} />
                                    {status}
                                </CardTitle>
                                <Badge variant="secondary" className="ml-2 font-mono">{jobs.filter(j => j.status === status).length}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 p-2 overflow-y-auto space-y-3">
                            {jobs.filter(j => j.status === status).map((job) => (
                                <Card key={job.id} className="bg-card hover:shadow-md transition-all cursor-pointer border-l-4 group"
                                    style={{ borderLeftColor: status === 'Completed' ? '#22c55e' : status === 'In Progress' ? '#3b82f6' : status === 'Waiting Parts' ? '#f97316' : '#eab308' }}>
                                    <CardContent className="p-3 space-y-2">
                                        <div className="flex justify-between items-start">
                                            <Badge variant="outline" className="font-mono text-[10px]">{job.job_no}</Badge>
                                            {job.priority === 'Urgent' && (
                                                <Badge variant="destructive" className="h-5 px-1.5 text-[10px]">Urgent</Badge>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm">{job.vehicle}</h4>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                                                <User className="h-3 w-3" /> {job.customer}
                                            </div>
                                        </div>
                                        <div className="pt-2 border-t flex flex-col gap-1.5">
                                            <div className="text-xs font-medium text-foreground bg-muted/50 p-1 rounded px-2">
                                                {job.service}
                                            </div>
                                            {job.mechanic && (
                                                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                                    {job.mechanic}
                                                </div>
                                            )}
                                        </div>

                                        {/* Quick Actions for "Moving" without DND library */}
                                        <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                                            {status !== 'Pending' && (
                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveJob(job.id, columns[columns.indexOf(status) - 1])} title="Move Back">
                                                    &lt;
                                                </Button>
                                            )}
                                            {status !== 'Completed' && (
                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveJob(job.id, columns[columns.indexOf(status) + 1])} title="Move Forward">
                                                    &gt;
                                                </Button>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            {jobs.filter(j => j.status === status).length === 0 && (
                                <div className="text-center py-8 text-xs text-muted-foreground border-2 border-dashed rounded-lg opacity-50">
                                    No Jobs
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default JobBoard;
