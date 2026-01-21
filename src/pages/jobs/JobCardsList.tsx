
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Calendar, Car, User, FileText, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock Data for Job Cards
const initialJobCards = [
    {
        id: "1",
        job_no: "JC-2024-001",
        customer: "John Smith",
        vehicle: "Toyota Camry (ABC-1234)",
        service_type: "Full Detailing",
        date_in: "2024-05-20",
        due_date: "2024-05-20",
        status: "In Progress",
        priority: "Normal",
        mechanic: "Mike A.",
        amount: "$150.00"
    },
    {
        id: "2",
        job_no: "JC-2024-002",
        customer: "Sarah Johnson",
        vehicle: "Honda CR-V (XYZ-9876)",
        service_type: "Oil Change + Inspection",
        date_in: "2024-05-21",
        due_date: "2024-05-21",
        status: "Waiting Parts",
        priority: "Urgent",
        mechanic: "Sarah L.",
        amount: "$85.00"
    },
    {
        id: "3",
        job_no: "JC-2024-003",
        customer: "Mike Brown",
        vehicle: "Ford Ranger (LMN-4567)",
        service_type: "Brake Replacement",
        date_in: "2024-05-19",
        due_date: "2024-05-22",
        status: "Pending",
        priority: "Normal",
        mechanic: "Unassigned",
        amount: "TBD"
    },
    {
        id: "4",
        job_no: "JC-2024-004",
        customer: "Emily Davis",
        vehicle: "Tesla Model 3 (EV-001)",
        service_type: "Tire Rotation",
        date_in: "2024-05-18",
        due_date: "2024-05-18",
        status: "Completed",
        priority: "Normal",
        mechanic: "Dave C.",
        amount: "$40.00"
    },
];

const JobCardsList = () => {
    const navigate = useNavigate();
    const [jobCards] = useState(initialJobCards);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredJobs = jobCards.filter(job =>
        job.job_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Completed": return <Badge variant="success">Completed</Badge>;
            case "In Progress": return <Badge variant="info">In Progress</Badge>;
            case "Waiting Parts": return <Badge variant="warning">Waiting Parts</Badge>;
            case "Pending": return <Badge variant="secondary">Pending</Badge>;
            case "Cancelled": return <Badge variant="destructive">Cancelled</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    const getPriorityBadge = (priority: string) => {
        if (priority === 'Urgent') {
            return <Badge variant="destructive" className="h-5 px-1.5 text-[10px]">Urgent</Badge>;
        }
        return <Badge variant="outline" className="h-5 px-1.5 text-[10px] text-muted-foreground border-muted-foreground/30">Normal</Badge>;
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Job Cards</h1>
                    <p className="text-muted-foreground mt-1">Manage all service job cards and work orders.</p>
                </div>
                <Button onClick={() => navigate('/dashboard/jobs/create')}>
                    <Plus className="mr-2 h-4 w-4" /> New Job Card
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Job List</CardTitle>
                        <div className="flex space-x-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search Job #, Plate, Customer..."
                                    className="pl-8 w-[300px]"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Job No</TableHead>
                                <TableHead>Vehicle & Customer</TableHead>
                                <TableHead>Service Info</TableHead>
                                <TableHead>Dates</TableHead>
                                <TableHead>Mechanic</TableHead>
                                <TableHead>Status / Priority</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredJobs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                                        No jobs found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredJobs.map((job) => (
                                    <TableRow key={job.id}>
                                        <TableCell className="font-mono font-medium">
                                            {job.job_no}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col space-y-1">
                                                <div className="flex items-center gap-2 font-medium text-sm">
                                                    <Car className="h-3 w-3 text-muted-foreground" /> {job.vehicle}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <User className="h-3 w-3" /> {job.customer}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">{job.service_type}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> In: {job.date_in}</span>
                                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Due: {job.due_date}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm">
                                            {job.mechanic !== 'Unassigned' ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                    {job.mechanic}
                                                </div>
                                            ) : (
                                                <span className="text-muted-foreground italic text-xs">Unassigned</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1 items-start">
                                                {getStatusBadge(job.status)}
                                                {getPriorityBadge(job.priority)}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right font-medium">
                                            {job.amount}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <Settings className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => navigate(`/dashboard/jobs/view/${job.id}`)}>
                                                        View Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        Edit Job
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <FileText className="mr-2 h-4 w-4" /> Invoicing
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default JobCardsList;
