
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, MoreHorizontal, FileText, Printer, DollarSign, XCircle, Eye, CheckCircle, Clock, AlertTriangle } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock Data
const initialInvoices = [
    { id: 1, invoice_no: "INV-2024-001", date: "2024-05-25", customer: "John Doe", vehicle: "Toyota Camry (ABC-1234)", amount: 450.00, paid: 450.00, balance: 0, status: "Paid", due_date: "2024-06-10" },
    { id: 2, invoice_no: "INV-2024-002", date: "2024-05-24", customer: "Sarah Smith", vehicle: "Honda Civic (XYZ-5678)", amount: 1250.00, paid: 500.00, balance: 750.00, status: "Partial", due_date: "2024-06-08" },
    { id: 3, invoice_no: "INV-2024-003", date: "2024-05-23", customer: "Mike Johnson", vehicle: "Ford F-150 (DEF-9012)", amount: 890.00, paid: 0, balance: 890.00, status: "Unpaid", due_date: "2024-06-07" },
    { id: 4, invoice_no: "INV-2024-004", date: "2024-05-15", customer: "Emily Davis", vehicle: "BMW X5 (GHI-3456)", amount: 2100.00, paid: 0, balance: 2100.00, status: "Overdue", due_date: "2024-05-30" },
    { id: 5, invoice_no: "INV-2024-005", date: "2024-05-22", customer: "Robert Brown", vehicle: "Tesla Model 3 (JKL-7890)", amount: 675.00, paid: 675.00, balance: 0, status: "Paid", due_date: "2024-06-06" },
];

const InvoicesList = () => {
    const [invoices] = useState(initialInvoices);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredInvoices = invoices.filter(inv => {
        const matchesSearch = inv.invoice_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inv.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inv.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || inv.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Paid": return <Badge variant="success" className="gap-1"><CheckCircle className="h-3 w-3" /> Paid</Badge>;
            case "Partial": return <Badge variant="secondary" className="gap-1 bg-blue-50 text-blue-700 border-blue-200"><Clock className="h-3 w-3" /> Partial</Badge>;
            case "Unpaid": return <Badge variant="outline" className="gap-1"><Clock className="h-3 w-3" /> Unpaid</Badge>;
            case "Overdue": return <Badge variant="destructive" className="gap-1"><AlertTriangle className="h-3 w-3" /> Overdue</Badge>;
            case "Void": return <Badge variant="secondary" className="gap-1 bg-gray-100 text-gray-600"><XCircle className="h-3 w-3" /> Void</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    const stats = {
        total: invoices.reduce((sum, inv) => sum + inv.amount, 0),
        paid: invoices.filter(inv => inv.status === "Paid").reduce((sum, inv) => sum + inv.amount, 0),
        outstanding: invoices.filter(inv => inv.status !== "Paid" && inv.status !== "Void").reduce((sum, inv) => sum + inv.balance, 0),
        overdue: invoices.filter(inv => inv.status === "Overdue").reduce((sum, inv) => sum + inv.balance, 0),
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
                    <p className="text-muted-foreground mt-1">Manage customer invoices and track payments.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Create Invoice
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Create New Invoice</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Customer</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select customer..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="c1">John Doe</SelectItem>
                                            <SelectItem value="c2">Sarah Smith</SelectItem>
                                            <SelectItem value="c3">Mike Johnson</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Vehicle</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select vehicle..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="v1">Toyota Camry (ABC-1234)</SelectItem>
                                            <SelectItem value="v2">Honda Civic (XYZ-5678)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Issue Date</Label>
                                    <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Due Date</Label>
                                    <Input type="date" />
                                </div>
                            </div>

                            <div className="border rounded-md p-4 bg-muted/20">
                                <div className="mb-2 flex justify-between items-center">
                                    <Label className="font-semibold">Invoice Items</Label>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-8 text-xs border bg-background hover:bg-accent">
                                                <Plus className="mr-1 h-3 w-3" /> Add Item
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[400px]">
                                            <DialogHeader>
                                                <DialogTitle>Add Invoice Item</DialogTitle>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="space-y-2">
                                                    <Label>Item Type</Label>
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select type..." />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="service">Service</SelectItem>
                                                            <SelectItem value="part">Part</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Description</Label>
                                                    <Input placeholder="e.g. Oil Change Service" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label>Quantity</Label>
                                                        <Input type="number" defaultValue="1" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Unit Price ($)</Label>
                                                        <Input type="number" placeholder="0.00" />
                                                    </div>
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button size="sm">Add Item</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <div className="text-sm text-muted-foreground text-center py-8 bg-background/50 rounded-sm border border-dashed">
                                    No items added yet. Click "Add Item" to add services or parts.
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Notes</Label>
                                <Textarea placeholder="Additional notes or terms..." rows={3} />
                            </div>

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal:</span>
                                    <span className="font-medium">$0.00</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Tax (10%):</span>
                                    <span className="font-medium">$0.00</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold border-t pt-2">
                                    <span>Total:</span>
                                    <span>$0.00</span>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline">Save as Draft</Button>
                            <Button>Create Invoice</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Invoiced</p>
                                <p className="text-2xl font-bold">${stats.total.toFixed(2)}</p>
                            </div>
                            <FileText className="h-8 w-8 text-muted-foreground" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Paid</p>
                                <p className="text-2xl font-bold text-green-600">${stats.paid.toFixed(2)}</p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Outstanding</p>
                                <p className="text-2xl font-bold text-blue-600">${stats.outstanding.toFixed(2)}</p>
                            </div>
                            <Clock className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Overdue</p>
                                <p className="text-2xl font-bold text-red-600">${stats.overdue.toFixed(2)}</p>
                            </div>
                            <AlertTriangle className="h-8 w-8 text-red-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Sales Invoices</CardTitle>
                        <div className="flex gap-2">
                            <div className="relative w-[300px]">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search invoices..."
                                    className="pl-8"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="all" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="all" onClick={() => setStatusFilter("all")}>All</TabsTrigger>
                            <TabsTrigger value="unpaid" onClick={() => setStatusFilter("Unpaid")}>Unpaid</TabsTrigger>
                            <TabsTrigger value="partial" onClick={() => setStatusFilter("Partial")}>Partial</TabsTrigger>
                            <TabsTrigger value="paid" onClick={() => setStatusFilter("Paid")}>Paid</TabsTrigger>
                            <TabsTrigger value="overdue" onClick={() => setStatusFilter("Overdue")}>Overdue</TabsTrigger>
                        </TabsList>
                        <TabsContent value={statusFilter} className="space-y-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Invoice #</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Vehicle</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Paid</TableHead>
                                        <TableHead className="text-right">Balance</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Due Date</TableHead>
                                        <TableHead className="w-[50px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredInvoices.map((invoice) => (
                                        <TableRow key={invoice.id}>
                                            <TableCell className="font-medium font-mono">{invoice.invoice_no}</TableCell>
                                            <TableCell>{invoice.date}</TableCell>
                                            <TableCell className="font-medium">{invoice.customer}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">{invoice.vehicle}</TableCell>
                                            <TableCell className="text-right font-medium">${invoice.amount.toFixed(2)}</TableCell>
                                            <TableCell className="text-right text-green-600">${invoice.paid.toFixed(2)}</TableCell>
                                            <TableCell className="text-right font-bold">${invoice.balance.toFixed(2)}</TableCell>
                                            <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                                            <TableCell className="text-sm">{invoice.due_date}</TableCell>
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
                                                            <Eye className="mr-2 h-4 w-4" /> View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Printer className="mr-2 h-4 w-4" /> Print Invoice
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        {invoice.status !== "Paid" && invoice.status !== "Void" && (
                                                            <DropdownMenuItem>
                                                                <DollarSign className="mr-2 h-4 w-4" /> Record Payment
                                                            </DropdownMenuItem>
                                                        )}
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-600">
                                                            <XCircle className="mr-2 h-4 w-4" /> Void Invoice
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};

export default InvoicesList;
