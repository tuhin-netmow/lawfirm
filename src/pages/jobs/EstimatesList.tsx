
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Calendar, FileText, User, ArrowUpRight, Check, X } from "lucide-react";
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Mock Data for Estimates
const initialEstimates = [
    {
        id: "1",
        est_no: "EST-2024-001",
        job_no: "JC-2024-002",
        customer: "Sarah Johnson",
        date: "2024-05-21",
        total_amount: "$350.00",
        status: "Sent",
        items: 3,
        expiry: "2024-05-28"
    },
    {
        id: "2",
        est_no: "EST-2024-002",
        job_no: "JC-2024-005",
        customer: "Michael Chen",
        date: "2024-05-22",
        total_amount: "$1,200.00",
        status: "Approved",
        items: 5,
        expiry: "2024-05-29"
    },
    {
        id: "3",
        est_no: "EST-2024-003",
        job_no: "JC-2024-007",
        customer: "Jessica Williams",
        date: "2024-05-22",
        total_amount: "$850.50",
        status: "Draft",
        items: 2,
        expiry: "2024-05-29"
    },
    {
        id: "4",
        est_no: "EST-2024-004",
        job_no: "JC-2024-001",
        customer: "John Smith",
        date: "2024-05-20",
        total_amount: "$2,500.00",
        status: "Rejected",
        items: 8,
        expiry: "2024-05-27"
    },
];

const EstimatesList = () => {
    const [estimates] = useState(initialEstimates);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredEstimates = estimates.filter(est =>
        est.est_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        est.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        est.job_no.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Approved": return <Badge variant="success">Approved</Badge>;
            case "Sent": return <Badge variant="info">Sent</Badge>;
            case "Draft": return <Badge variant="secondary">Draft</Badge>;
            case "Rejected": return <Badge variant="destructive">Rejected</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Estimates & Quotations</h1>
                    <p className="text-muted-foreground mt-1">Create and manage service estimates for customers.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> New Estimate
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Create New Estimate</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="customer">Customer</Label>
                                    <Input id="customer" placeholder="Search customer..." />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="vehicle">Vehicle</Label>
                                    <Input id="vehicle" placeholder="Select vehicle..." />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="jobRef">Job Reference (Optional)</Label>
                                <Input id="jobRef" placeholder="e.g. JB-1002" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Input id="date" type="date" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="expiry">Expiry Date</Label>
                                    <Input id="expiry" type="date" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Line Items</Label>
                                <div className="border rounded-md p-4 space-y-2 bg-muted/50">
                                    <p className="text-sm text-muted-foreground text-center">Line item editor will be implemented here.</p>
                                    <Button variant="outline" size="sm" className="w-full">
                                        <Plus className="mr-2 h-3 w-3" /> Add Item
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button>Create Draft</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Estimates History</CardTitle>
                        <div className="flex space-x-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search Est #, Customer..."
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
                                <TableHead>Estimate No</TableHead>
                                <TableHead>Job Reference</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Date / Expiry</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Total Amount</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredEstimates.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                                        No estimates found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredEstimates.map((est) => (
                                    <TableRow key={est.id}>
                                        <TableCell className="font-mono font-medium">
                                            {est.est_no}
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm text-muted-foreground">{est.job_no}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 font-medium text-sm">
                                                <User className="h-3 w-3 text-muted-foreground" /> {est.customer}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col text-xs text-muted-foreground">
                                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {est.date}</span>
                                                <span className="flex items-center gap-1 text-red-400">Exp: {est.expiry}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm">
                                            {est.items} items
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(est.status)}
                                        </TableCell>
                                        <TableCell className="text-right font-bold">
                                            {est.total_amount}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem>
                                                        <ArrowUpRight className="mr-2 h-4 w-4" /> View / Send
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Check className="mr-2 h-4 w-4" /> Mark Approved
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <X className="mr-2 h-4 w-4" /> Mark Rejected
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        Download PDF
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

export default EstimatesList;
