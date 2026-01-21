
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Box, Search, MoreHorizontal, FileText, CheckCircle, AlertCircle, Package } from "lucide-react";
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

// Mock Data
const initialGRNs = [
    { id: 1, grn_no: "GRN-2024-001", po_no: "PO-2024-001", supplier: "AutoParts City", date: "2024-05-20", items: 5, status: "Received" },
    { id: 2, grn_no: "GRN-2024-002", po_no: "PO-2024-002", supplier: "Global Oils Ltd", date: "2024-05-22", items: 3, status: "Partial" },
    { id: 3, grn_no: "GRN-2024-003", po_no: "PO-2024-004", supplier: "Tire Wholesale Depot", date: "2024-05-24", items: 8, status: "Received" },
];

const mockPOItems = [
    { id: 1, part: "Oil Filter (PT-001)", ordered: 20, received: 0, cost: 12.50 },
    { id: 2, part: "Brake Pads (PT-002)", ordered: 10, received: 0, cost: 45.00 },
    { id: 3, part: "Spark Plug (PT-004)", ordered: 50, received: 0, cost: 8.00 },
];

const GoodsReceipt = () => {
    const [grns] = useState(initialGRNs);
    const [searchTerm, setSearchTerm] = useState("");
    const [isReceiveOpen, setIsReceiveOpen] = useState(false);
    const [poItems, setPOItems] = useState(mockPOItems);

    const filteredGRNs = grns.filter(grn =>
        grn.grn_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grn.po_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        grn.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Received": return <Badge variant="success" className="gap-1"><CheckCircle className="h-3 w-3" /> Received</Badge>;
            case "Partial": return <Badge variant="secondary" className="gap-1 bg-orange-50 text-orange-700 border-orange-200"><AlertCircle className="h-3 w-3" /> Partial</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    const handleReceiveQtyChange = (itemId: number, qty: number) => {
        setPOItems(poItems.map(item =>
            item.id === itemId ? { ...item, received: Math.min(qty, item.ordered) } : item
        ));
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Goods Receipt Note (GRN)</h1>
                    <p className="text-muted-foreground mt-1">Record and track received inventory from suppliers.</p>
                </div>
                <Dialog open={isReceiveOpen} onOpenChange={setIsReceiveOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Box className="mr-2 h-4 w-4" /> Receive Goods
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px]">
                        <DialogHeader>
                            <DialogTitle>Receive Goods from Purchase Order</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Purchase Order</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select PO..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="po1">PO-2024-001 - AutoParts City</SelectItem>
                                            <SelectItem value="po2">PO-2024-002 - Global Oils Ltd</SelectItem>
                                            <SelectItem value="po3">PO-2024-004 - Tire Wholesale</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Received Date</Label>
                                    <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                                </div>
                            </div>

                            <div className="border rounded-md p-4 bg-muted/20">
                                <Label className="font-semibold mb-3 block">Items to Receive</Label>
                                <div className="bg-background rounded-sm border overflow-hidden">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="h-8 hover:bg-transparent">
                                                <TableHead className="text-xs">Part</TableHead>
                                                <TableHead className="text-xs text-center">Ordered</TableHead>
                                                <TableHead className="text-xs text-center">Receive Qty</TableHead>
                                                <TableHead className="text-xs text-right">Unit Cost</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {poItems.map((item) => (
                                                <TableRow key={item.id} className="h-10 hover:bg-transparent">
                                                    <TableCell className="text-xs">{item.part}</TableCell>
                                                    <TableCell className="text-xs text-center">{item.ordered}</TableCell>
                                                    <TableCell className="text-center">
                                                        <Input
                                                            type="number"
                                                            className="h-8 w-20 text-xs text-center mx-auto"
                                                            value={item.received}
                                                            onChange={(e) => handleReceiveQtyChange(item.id, parseInt(e.target.value) || 0)}
                                                            max={item.ordered}
                                                            min={0}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="text-xs text-right">${item.cost.toFixed(2)}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">
                                    <Package className="h-3 w-3 inline mr-1" />
                                    Partial receiving is allowed. Enter the quantity actually received.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label>Supplier Invoice No. (Optional)</Label>
                                <Input placeholder="e.g. INV-12345" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsReceiveOpen(false)}>Cancel</Button>
                            <Button onClick={() => setIsReceiveOpen(false)}>Create GRN</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Received Logs</CardTitle>
                        <div className="relative w-[300px]">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search GRN, PO, or supplier..."
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
                                <TableHead>GRN Number</TableHead>
                                <TableHead>PO Number</TableHead>
                                <TableHead>Supplier</TableHead>
                                <TableHead>Date Received</TableHead>
                                <TableHead className="text-center">Items</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredGRNs.map((grn) => (
                                <TableRow key={grn.id}>
                                    <TableCell className="font-medium font-mono">{grn.grn_no}</TableCell>
                                    <TableCell className="font-mono text-sm">{grn.po_no}</TableCell>
                                    <TableCell>{grn.supplier}</TableCell>
                                    <TableCell>{grn.date}</TableCell>
                                    <TableCell className="text-center">{grn.items}</TableCell>
                                    <TableCell>{getStatusBadge(grn.status)}</TableCell>
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
                                                    <FileText className="mr-2 h-4 w-4" /> View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <FileText className="mr-2 h-4 w-4" /> Print GRN
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

export default GoodsReceipt;
