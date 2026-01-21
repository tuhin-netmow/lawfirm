
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Phone, Mail, Building2, User } from "lucide-react";
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

// Mock Data for Customers
const initialCustomers = [
    {
        id: "1",
        name: "John Doeson",
        type: "individual",
        photo: null,
        company_name: "",
        phone: "+1 555-0101",
        email: "john.d@example.com",
        tax_id: "",
        status: "active",
        branch_id: "Main Branch",
        last_visit: "2024-05-15",
    },
    {
        id: "2",
        name: "Acme Logistics",
        type: "company",
        photo: null,
        company_name: "Acme Logistics Inc.",
        phone: "+1 555-0999",
        email: "fleet@acme.com",
        tax_id: "TAX-88221",
        status: "active",
        branch_id: "Main Branch",
        last_visit: "2024-05-10",
    },
    {
        id: "3",
        name: "Sarah Connors",
        type: "individual",
        photo: null,
        company_name: "",
        phone: "+1 555-0000",
        email: "s.connors@example.com",
        tax_id: "",
        status: "blocked",
        branch_id: "Downtown",
        last_visit: "2023-11-20",
    },
    {
        id: "4",
        name: "TechStart Hub",
        type: "company",
        company_name: "TechStart Solutions",
        phone: "+1 555-4433",
        email: "admin@techstart.io",
        tax_id: "TAX-11234",
        status: "active",
        branch_id: "Main Branch",
        last_visit: "2024-05-18",
    },
];

const CustomersList = () => {
    const navigate = useNavigate();
    const [customers] = useState(initialCustomers);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        (customer.company_name && customer.company_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active": return <Badge variant="success">Active</Badge>;
            case "blocked": return <Badge variant="destructive">Blocked</Badge>;
            default: return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
                    <p className="text-muted-foreground mt-1">Manage your customer database and viewing history.</p>
                </div>
                <Button onClick={() => navigate('/dashboard/crm/customers/create')}>
                    <Plus className="mr-2 h-4 w-4" /> Add Customer
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Customer List</CardTitle>
                        <div className="flex space-x-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search customers..."
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
                                <TableHead>Name / Company</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Contact Info</TableHead>
                                <TableHead>Tax ID</TableHead>
                                <TableHead>Branch</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Last Visit</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCustomers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                                        No customers found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredCustomers.map((customer) => (
                                    <TableRow key={customer.id}>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{customer.name}</span>
                                                {customer.company_name && (
                                                    <span className="text-xs text-muted-foreground">{customer.company_name}</span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                {customer.type === 'company' ? (
                                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                                ) : (
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                )}
                                                <span className="capitalize text-sm">{customer.type}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col space-y-1 text-sm">
                                                <div className="flex items-center text-muted-foreground">
                                                    <Phone className="mr-1 h-3 w-3" /> {customer.phone}
                                                </div>
                                                {customer.email && (
                                                    <div className="flex items-center text-muted-foreground">
                                                        <Mail className="mr-1 h-3 w-3" /> {customer.email}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {customer.tax_id ? (
                                                <span className="font-mono text-xs">{customer.tax_id}</span>
                                            ) : (
                                                <span className="text-muted-foreground text-xs">-</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-sm">{customer.branch_id}</TableCell>
                                        <TableCell>{getStatusBadge(customer.status)}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {customer.last_visit}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" onClick={() => navigate(`/dashboard/crm/customers/${customer.id}`)}>
                                                View
                                            </Button>
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

export default CustomersList;
