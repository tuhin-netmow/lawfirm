
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Calendar, ClipboardCheck, User, CheckCircle, Clock } from "lucide-react";
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock Data for Inspections
const initialInspections = [
    {
        id: "1",
        insp_no: "INS-2024-089",
        job_no: "JC-2024-002",
        customer: "Sarah Johnson",
        vehicle: "Honda CR-V",
        date: "2024-05-21",
        inspector: "Mike A.",
        status: "Completed",
        issues_found: 2,
        severity: "Medium"
    },
    {
        id: "2",
        insp_no: "INS-2024-090",
        job_no: "JC-2024-005",
        customer: "Michael Chen",
        vehicle: "Toyota Camry",
        date: "2024-05-22",
        inspector: "Sarah L.",
        status: "In Progress",
        issues_found: 0,
        severity: "Low"
    },
    {
        id: "3",
        insp_no: "INS-2024-091",
        job_no: "JC-2024-007",
        customer: "Jessica Williams",
        vehicle: "Ford Ranger",
        date: "2024-05-22",
        inspector: "Dave C.",
        status: "Pending",
        issues_found: 0,
        severity: "Low"
    },
    {
        id: "4",
        insp_no: "INS-2024-088",
        job_no: "JC-2024-001",
        customer: "John Smith",
        vehicle: "Tesla Model 3",
        date: "2024-05-20",
        inspector: "Mike A.",
        status: "Completed",
        issues_found: 5,
        severity: "High"
    },
];

const InspectionsList = () => {
    const [inspections] = useState(initialInspections);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredInspections = inspections.filter(i =>
        i.insp_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Completed": return <Badge variant="success" className="gap-1"><CheckCircle className="h-3 w-3" /> Completed</Badge>;
            case "In Progress": return <Badge variant="info" className="gap-1"><Clock className="h-3 w-3" /> In Progress</Badge>;
            case "Pending": return <Badge variant="secondary">Pending</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    const getSeverityBadge = (severity: string) => {
        switch (severity) {
            case "High": return <Badge variant="destructive">High</Badge>;
            case "Medium": return <Badge variant="warning">Medium</Badge>;
            case "Low": return <Badge variant="outline" className="text-muted-foreground">Low</Badge>;
            default: return null;
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Vehicle Inspections</h1>
                    <p className="text-muted-foreground mt-1">Manage and review vehicle health checks and inspections.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Start Inspection
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>New Inspection</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="jobCard">Job Card Reference</Label>
                                <Input id="jobCard" placeholder="Scan or enter Job Card #..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="inspector">Inspector</Label>
                                <Input id="inspector" placeholder="Select inspector..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="template">Inspection Template</Label>
                                <Input id="template" placeholder="e.g. Standard 40-Point Check" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button>Create Record</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Inspection Records</CardTitle>
                        <div className="flex space-x-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search Ref, Vehicle, Customer..."
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
                                <TableHead>Ref No</TableHead>
                                <TableHead>Job & Vehicle</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Date / Inspector</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Issues Found</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredInspections.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                                        No inspections found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredInspections.map((insp) => (
                                    <TableRow key={insp.id}>
                                        <TableCell className="font-mono font-medium">
                                            {insp.insp_no}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium">{insp.vehicle}</span>
                                                <span className="text-xs text-muted-foreground">{insp.job_no}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-sm">
                                                <User className="h-3 w-3 text-muted-foreground" /> {insp.customer}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {insp.date}</span>
                                                <span className="flex items-center gap-1"><User className="h-3 w-3" /> {insp.inspector}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(insp.status)}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-sm">{insp.issues_found}</span>
                                                {insp.issues_found > 0 && getSeverityBadge(insp.severity)}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>View Report</DropdownMenuItem>
                                                    <DropdownMenuItem>Edit Findings</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>Print PDF</DropdownMenuItem>
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

export default InspectionsList;
