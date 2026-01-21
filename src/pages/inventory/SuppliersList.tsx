
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, MapPin, Phone, Mail, FileText, Edit, Trash, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Mock Data
const initialSuppliers = [
    { id: 1, name: "AutoParts City", contact: "Mike Smith", phone: "555-0123", email: "sales@autoparts.com", address: "123 Ind. Estate", terms: "Net 30" },
    { id: 2, name: "Global Oils Ltd", contact: "Sarah Jones", phone: "555-0199", email: "orders@globaloils.com", address: "45 Refinery Rd", terms: "Net 15" },
    { id: 3, name: "Brake Specialists Inc", contact: "David Brown", phone: "555-0456", email: "david@brakes.com", address: "88 Stopping Ln", terms: "COD" },
    { id: 4, name: "Tire Wholesale Depot", contact: "Jim Green", phone: "555-0789", email: "jim@tirewholesale.com", address: "99 Rubber St", terms: "Net 30" },
];

const SuppliersList = () => {
    const [suppliers] = useState(initialSuppliers);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredSuppliers = suppliers.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.contact.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Suppliers</h1>
                    <p className="text-muted-foreground mt-1">Manage vendor profiles and contact information.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Supplier
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Add New Supplier</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Company Name</Label>
                                <Input id="name" placeholder="e.g. AutoParts City" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="contact">Contact Person</Label>
                                    <Input id="contact" placeholder="e.g. Mike Smith" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" placeholder="e.g. 555-0123" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" placeholder="sales@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Textarea id="address" placeholder="Street address, city, zip..." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="terms">Payment Terms</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select terms" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cod">Cash on Delivery (COD)</SelectItem>
                                            <SelectItem value="net7">Net 7 Days</SelectItem>
                                            <SelectItem value="net15">Net 15 Days</SelectItem>
                                            <SelectItem value="net30">Net 30 Days</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tax_id">Tax ID / VAT No</Label>
                                    <Input id="tax_id" placeholder="Optional" />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Supplier</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Supplier Directory</CardTitle>
                        <div className="relative w-[300px]">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search suppliers..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Company</TableHead>
                                <TableHead>Contact Info</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Terms</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredSuppliers.map((supplier) => (
                                <TableRow key={supplier.id}>
                                    <TableCell className="font-medium">
                                        <div>{supplier.name}</div>
                                        <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                            <FileText className="h-3 w-3" /> {supplier.contact}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-3 w-3 text-muted-foreground" /> {supplier.phone}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-3 w-3 text-muted-foreground" /> {supplier.email}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate">
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-3 w-3" /> {supplier.address}
                                        </span>
                                    </TableCell>
                                    <TableCell>{supplier.terms}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>
                                                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <FileText className="mr-2 h-4 w-4" /> View Purchase Orders
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600">
                                                    <Trash className="mr-2 h-4 w-4" /> Delete Supplier
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default SuppliersList;
