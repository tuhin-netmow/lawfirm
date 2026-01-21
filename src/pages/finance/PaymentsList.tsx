
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, MoreHorizontal, FileText, CreditCard, Banknote, Building2, Smartphone, Eye } from "lucide-react";
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
const initialPayments = [
    { id: 1, payment_no: "PAY-2024-001", date: "2024-05-25", invoice_no: "INV-2024-001", customer: "John Doe", amount: 450.00, method: "Cash", reference: "-", received_by: "Admin" },
    { id: 2, payment_no: "PAY-2024-002", date: "2024-05-24", invoice_no: "INV-2024-002", customer: "Sarah Smith", amount: 500.00, method: "Card", reference: "TXN-789456", received_by: "Admin" },
    { id: 3, payment_no: "PAY-2024-003", date: "2024-05-23", invoice_no: "INV-2024-005", customer: "Robert Brown", amount: 675.00, method: "Bank", reference: "REF-123456", received_by: "Admin" },
    { id: 4, payment_no: "PAY-2024-004", date: "2024-05-22", invoice_no: "INV-2024-003", customer: "Mike Johnson", amount: 300.00, method: "Online", reference: "PAY-ONLINE-456", received_by: "Cashier" },
];

const PaymentsList = () => {
    const [payments] = useState(initialPayments);
    const [searchTerm, setSearchTerm] = useState("");
    const [isRecordOpen, setIsRecordOpen] = useState(false);

    const filteredPayments = payments.filter(payment =>
        payment.payment_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.invoice_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.reference.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getMethodBadge = (method: string) => {
        switch (method) {
            case "Cash": return <Badge variant="success" className="gap-1"><Banknote className="h-3 w-3" /> Cash</Badge>;
            case "Card": return <Badge variant="default" className="gap-1 bg-purple-600 hover:bg-purple-700"><CreditCard className="h-3 w-3" /> Card</Badge>;
            case "Bank": return <Badge variant="secondary" className="gap-1 text-blue-700 bg-blue-50 border-blue-200"><Building2 className="h-3 w-3" /> Bank Transfer</Badge>;
            case "Online": return <Badge variant="secondary" className="gap-1 text-orange-700 bg-orange-50 border-orange-200"><Smartphone className="h-3 w-3" /> Online</Badge>;
            default: return <Badge variant="outline">{method}</Badge>;
        }
    };

    const stats = {
        total: payments.reduce((sum, p) => sum + p.amount, 0),
        cash: payments.filter(p => p.method === "Cash").reduce((sum, p) => sum + p.amount, 0),
        card: payments.filter(p => p.method === "Card").reduce((sum, p) => sum + p.amount, 0),
        bank: payments.filter(p => p.method === "Bank").reduce((sum, p) => sum + p.amount, 0),
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
                    <p className="text-muted-foreground mt-1">Track and manage customer payments.</p>
                </div>
                <Dialog open={isRecordOpen} onOpenChange={setIsRecordOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Record Payment
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Record New Payment</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label>Invoice</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select invoice..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="inv1">INV-2024-002 - Sarah Smith ($750.00 due)</SelectItem>
                                        <SelectItem value="inv2">INV-2024-003 - Mike Johnson ($890.00 due)</SelectItem>
                                        <SelectItem value="inv3">INV-2024-004 - Emily Davis ($2,100.00 due)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Payment Date</Label>
                                    <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                                </div>
                                <div className="space-y-2">
                                    <Label>Amount ($)</Label>
                                    <Input type="number" placeholder="0.00" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Payment Method</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select method..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cash">
                                            <div className="flex items-center gap-2">
                                                <Banknote className="h-4 w-4" /> Cash
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="card">
                                            <div className="flex items-center gap-2">
                                                <CreditCard className="h-4 w-4" /> Credit/Debit Card
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="bank">
                                            <div className="flex items-center gap-2">
                                                <Building2 className="h-4 w-4" /> Bank Transfer
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="online">
                                            <div className="flex items-center gap-2">
                                                <Smartphone className="h-4 w-4" /> Online Payment
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Reference / Transaction ID</Label>
                                <Input placeholder="e.g. TXN-123456 (optional)" />
                            </div>

                            <div className="space-y-2">
                                <Label>Notes</Label>
                                <Textarea placeholder="Additional notes..." rows={2} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsRecordOpen(false)}>Cancel</Button>
                            <Button onClick={() => setIsRecordOpen(false)}>Record Payment</Button>
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
                                <p className="text-sm font-medium text-muted-foreground">Total Received</p>
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
                                <p className="text-sm font-medium text-muted-foreground">Cash</p>
                                <p className="text-2xl font-bold text-green-600">${stats.cash.toFixed(2)}</p>
                            </div>
                            <Banknote className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Card</p>
                                <p className="text-2xl font-bold text-purple-600">${stats.card.toFixed(2)}</p>
                            </div>
                            <CreditCard className="h-8 w-8 text-purple-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Bank Transfer</p>
                                <p className="text-2xl font-bold text-blue-600">${stats.bank.toFixed(2)}</p>
                            </div>
                            <Building2 className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Payment History</CardTitle>
                        <div className="relative w-[300px]">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search payments..."
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
                                <TableHead>Payment #</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Invoice #</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Reference</TableHead>
                                <TableHead>Received By</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPayments.map((payment) => (
                                <TableRow key={payment.id}>
                                    <TableCell className="font-medium font-mono">{payment.payment_no}</TableCell>
                                    <TableCell>{payment.date}</TableCell>
                                    <TableCell className="font-mono text-sm">{payment.invoice_no}</TableCell>
                                    <TableCell className="font-medium">{payment.customer}</TableCell>
                                    <TableCell className="text-right font-bold text-green-600">${payment.amount.toFixed(2)}</TableCell>
                                    <TableCell>{getMethodBadge(payment.method)}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{payment.reference}</TableCell>
                                    <TableCell className="text-sm">{payment.received_by}</TableCell>
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
                                                    <FileText className="mr-2 h-4 w-4" /> Print Receipt
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

export default PaymentsList;
