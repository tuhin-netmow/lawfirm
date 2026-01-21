
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Phone, Mail } from "lucide-react";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Mock Data for Leads
const initialLeads = [
    {
        id: "1",
        name: "John Smith",
        phone: "+1 555-0123",
        email: "john.smith@example.com",
        vehicle_plate: "ABC-1234",
        interested_service: "Full Detailing",
        source: "Walk-in",
        status: "New", // New, Contacted, Booked, Lost
        notes: "Interested in ceramic coating as well.",
        created_at: "2024-05-10",
    },
    {
        id: "2",
        name: "Sarah Johnson",
        phone: "+1 555-5678",
        email: "sarah.j@example.com",
        vehicle_plate: "XYZ-9876",
        interested_service: "Oil Change",
        source: "Facebook",
        status: "Contacted",
        notes: "Asked for a quote on synthetic oil.",
        created_at: "2024-05-11",
    },
    {
        id: "3",
        name: "Mike Brown",
        phone: "+1 555-9012",
        email: "",
        vehicle_plate: "LMN-4567",
        interested_service: "Brake Inspection",
        source: "Referral",
        status: "Booked",
        notes: "Booked for next Tuesday.",
        created_at: "2024-05-12",
    },
    {
        id: "4",
        name: "Emily Davis",
        phone: "+1 555-3456",
        email: "emily.d@example.com",
        vehicle_plate: "QRS-1122",
        interested_service: "Car Wash",
        source: "Website",
        status: "Lost",
        notes: "Price too high.",
        created_at: "2024-05-13",
    },
];

const LeadsList = () => {
    const [leads, setLeads] = useState(initialLeads);
    const [searchTerm, setSearchTerm] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // New Lead Form State
    const [newLead, setNewLead] = useState({
        name: "",
        phone: "",
        email: "",
        vehicle_plate: "",
        interested_service: "",
        source: "Walk-in",
        status: "New",
        notes: "",
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleCreateLead = () => {
        // Basic validation logic
        if (!newLead.name || (!newLead.phone && !newLead.email)) {
            alert("Name and at least one contact method (Phone or Email) are required.");
            return;
        }

        const leadToAdd = {
            ...newLead,
            id: (leads.length + 1).toString(),
            created_at: new Date().toISOString().split('T')[0],
        };

        setLeads([...leads, leadToAdd]);
        setIsCreateModalOpen(false);
        setNewLead({
            name: "",
            phone: "",
            email: "",
            vehicle_plate: "",
            interested_service: "",
            source: "Walk-in",
            status: "New",
            notes: "",
        });
    };

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.includes(searchTerm) ||
        lead.vehicle_plate.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "New": return <Badge variant="info">New</Badge>;
            case "Contacted": return <Badge variant="warning">Contacted</Badge>;
            case "Booked": return <Badge variant="success">Booked</Badge>;
            case "Lost": return <Badge variant="destructive">Lost</Badge>;
            default: return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Leads</h1>
                    <p className="text-muted-foreground mt-1">Manage and track potential customers.</p>
                </div>
                <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Lead
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Create New Lead</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name *</Label>
                                    <Input
                                        id="name"
                                        placeholder="Customer Name"
                                        value={newLead.name}
                                        onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone *</Label>
                                    <Input
                                        id="phone"
                                        placeholder="Phone Number"
                                        value={newLead.phone}
                                        onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        placeholder="Email Address"
                                        value={newLead.email}
                                        onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="plate">Vehicle Plate</Label>
                                    <Input
                                        id="plate"
                                        placeholder="License Plate"
                                        value={newLead.vehicle_plate}
                                        onChange={(e) => setNewLead({ ...newLead, vehicle_plate: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="service">Interested Service</Label>
                                    <Input
                                        id="service"
                                        placeholder="e.g. Detailing, Oil Change"
                                        value={newLead.interested_service}
                                        onChange={(e) => setNewLead({ ...newLead, interested_service: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="source">Source</Label>
                                    <Select
                                        value={newLead.source}
                                        onValueChange={(value) => setNewLead({ ...newLead, source: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select source" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Walk-in">Walk-in</SelectItem>
                                            <SelectItem value="Facebook">Facebook</SelectItem>
                                            <SelectItem value="Instagram">Instagram</SelectItem>
                                            <SelectItem value="Google">Google</SelectItem>
                                            <SelectItem value="Website">Website</SelectItem>
                                            <SelectItem value="Referral">Referral</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Input
                                    id="notes"
                                    placeholder="Additional notes..."
                                    value={newLead.notes}
                                    onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
                            <Button onClick={handleCreateLead}>Create Lead</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Leads Management</CardTitle>
                        <div className="flex space-x-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search leads..."
                                    className="pl-8 w-[250px]"
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
                                <TableHead>Name</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Vehicle</TableHead>
                                <TableHead>Service Interest</TableHead>
                                <TableHead>Source</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredLeads.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                                        No leads found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredLeads.map((lead) => (
                                    <TableRow key={lead.id}>
                                        <TableCell className="font-medium">{lead.name}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col space-y-1 text-sm">
                                                {lead.phone && (
                                                    <div className="flex items-center text-muted-foreground">
                                                        <Phone className="mr-1 h-3 w-3" /> {lead.phone}
                                                    </div>
                                                )}
                                                {lead.email && (
                                                    <div className="flex items-center text-muted-foreground">
                                                        <Mail className="mr-1 h-3 w-3" /> {lead.email}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {lead.vehicle_plate ? (
                                                <Badge variant="outline" className="font-mono">
                                                    {lead.vehicle_plate}
                                                </Badge>
                                            ) : (
                                                <span className="text-muted-foreground text-xs">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell>{lead.interested_service || "-"}</TableCell>
                                        <TableCell>{lead.source}</TableCell>
                                        <TableCell>{getStatusBadge(lead.status)}</TableCell>
                                        <TableCell className="text-muted-foreground text-xs">
                                            {lead.created_at}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">Details</Button>
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

export default LeadsList;
