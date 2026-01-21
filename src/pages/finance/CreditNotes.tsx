
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, MoreHorizontal, FileText, Eye, CheckCircle, Clock, RotateCcw } from "lucide-react";
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

// Mock Data
const initialCreditNotes = [
    { id: 1, cn_no: "CN-2024-001", date: "2024-05-26", invoice_no: "INV-2024-002", customer: "Sarah Smith", amount: 250.00, reason: "Defective parts returned", status: "Issued" },
    { id: 2, cn_no: "CN-2024-002", date: "2024-05-25", invoice_no: "INV-2024-004", customer: "Emily Davis", amount: 500.00, reason: "Service not completed", status: "Pending" },
    { id: 3, cn_no: "CN-2024-003", date: "2024-05-24", invoice_no: "INV-2024-003", customer: "Mike Johnson", amount: 150.00, reason: "Overcharge correction", status: "Applied" },
];

const CreditNotes = () => {
    const [creditNotes] = useState(initialCreditNotes);
    const [searchTerm, setSearchTerm] = useState("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const filteredCreditNotes = creditNotes.filter(cn =>
        cn.cn_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cn.invoice_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cn.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cn.reason.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Issued": return <Badge variant="success" className="gap-1"><CheckCircle className="h-3 w-3" /> Issued</Badge>;
            case "Pending": return <Badge variant="secondary" className="gap-1 bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="h-3 w-3" /> Pending</Badge>;
            case "Applied": return <Badge variant="default" className="gap-1 bg-blue-600 hover:bg-blue-700"><RotateCcw className="h-3 w-3" /> Applied</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    const stats = {
        total: creditNotes.reduce((sum, cn) => sum + cn.amount, 0),
        issued: creditNotes.filter(cn => cn.status === "Issued").reduce((sum, cn) => sum + cn.amount, 0),
        pending: creditNotes.filter(cn => cn.status === "Pending").reduce((sum, cn) => sum + cn.amount, 0),
        count: creditNotes.length,
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Credit Notes</h1>
                    <p className="text-muted-foreground mt-1">Manage refunds and customer credits.</p>
                </div>
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> New Credit Note
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Create Credit Note</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label>Original Invoice</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select invoice..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="inv1">INV-2024-001 - John Doe ($450.00)</SelectItem>
                                        <SelectItem value="inv2">INV-2024-002 - Sarah Smith ($1,250.00)</SelectItem>
                                        <SelectItem value="inv3">INV-2024-003 - Mike Johnson ($890.00)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Credit Note Date</Label>
                                    <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Credit Amount ($)</Label>
                                    <Input type="number" placeholder="0.00" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Reason for Credit</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select reason..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="defective">Defective Parts/Service</SelectItem>
                                        <SelectItem value="overcharge">Billing Error/Overcharge</SelectItem>
                                        <SelectItem value="return">Product Return</SelectItem>
                                        <SelectItem value="incomplete">Service Not Completed</SelectItem>
                                        <SelectItem value="goodwill">Goodwill Gesture</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Detailed Description</Label>
                                <Textarea
                                    placeholder="Provide detailed explanation for the credit note..."
                                    rows={4}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Action</Label>
                                <Select defaultValue="refund">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="refund">Issue Refund</SelectItem>
                                        <SelectItem value="credit">Apply as Account Credit</SelectItem>
                                        <SelectItem value="offset">Offset Against Future Invoice</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                            <Button onClick={() => setIsCreateOpen(false)}>Create Credit Note</Button>
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
                                <p className="text-sm font-medium text-muted-foreground">Total Credits</p>
                                <p className="text-2xl font-bold text-red-600">${stats.total.toFixed(2)}</p>
                            </div>
                            <FileText className="h-8 w-8 text-red-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Issued</p>
                                <p className="text-2xl font-bold text-green-600">${stats.issued.toFixed(2)}</p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                                <p className="text-2xl font-bold text-yellow-600">${stats.pending.toFixed(2)}</p>
                            </div>
                            <Clock className="h-8 w-8 text-yellow-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Count</p>
                                <p className="text-2xl font-bold">{stats.count}</p>
                            </div>
                            <RotateCcw className="h-8 w-8 text-muted-foreground" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Refunds & Credits</CardTitle>
                        <div className="relative w-[300px]">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search credit notes..."
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
                                <TableHead>CN Number</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Invoice #</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCreditNotes.map((cn) => (
                                <TableRow key={cn.id}>
                                    <TableCell className="font-medium font-mono">{cn.cn_no}</TableCell>
                                    <TableCell>{cn.date}</TableCell>
                                    <TableCell className="font-mono text-sm">{cn.invoice_no}</TableCell>
                                    <TableCell className="font-medium">{cn.customer}</TableCell>
                                    <TableCell className="text-right font-bold text-red-600">${cn.amount.toFixed(2)}</TableCell>
                                    <TableCell className="text-sm max-w-[200px] truncate">{cn.reason}</TableCell>
                                    <TableCell>{getStatusBadge(cn.status)}</TableCell>
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
                                                    <FileText className="mr-2 h-4 w-4" /> Print Credit Note
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem disabled className="text-muted-foreground">
                                                    Cannot Delete (Audit Trail)
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

export default CreditNotes;
