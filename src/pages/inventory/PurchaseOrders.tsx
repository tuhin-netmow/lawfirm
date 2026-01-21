
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, MoreHorizontal, FileText, CheckCircle, Truck, RefreshCw, XCircle } from "lucide-react";
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
const initialPOs = [
    { id: 1, po_no: "PO-2024-001", supplier: "AutoParts City", date: "2024-05-20", total: "$1,250.00", status: "Received", items: 5 },
    { id: 2, po_no: "PO-2024-002", supplier: "Global Oils Ltd", date: "2024-05-22", total: "$450.00", status: "Ordered", items: 3 },
    { id: 3, po_no: "PO-2024-003", supplier: "Brake Specialists Inc", date: "2024-05-25", total: "$890.00", status: "Draft", items: 0 },
    { id: 4, po_no: "PO-2024-004", supplier: "Tire Wholesale Depot", date: "2024-05-24", total: "$2,100.00", status: "Approved", items: 12 },
];

const PurchaseOrders = () => {
    const [pos] = useState(initialPOs);
    const [searchTerm, setSearchTerm] = useState("");
    const [newPOItems, setNewPOItems] = useState<any[]>([]);
    const [newItem, setNewItem] = useState({ partId: "", qty: 1, cost: "" });
    const [isAddItemOpen, setIsAddItemOpen] = useState(false);

    const filteredPOs = pos.filter(po =>
        po.po_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        po.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddItem = () => {
        if (!newItem.partId) return; // Simple validation
        const partName = newItem.partId === "p1" ? "Oil Filter (PT-001)" : newItem.partId === "p2" ? "Brake Pads (PT-002)" : "Spark Plug (PT-004)";
        setNewPOItems([...newPOItems, { ...newItem, partName, cost: parseFloat(newItem.cost) || 0 }]);
        setNewItem({ partId: "", qty: 1, cost: "" });
        setIsAddItemOpen(false);
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Received": return <Badge variant="success" className="gap-1"><CheckCircle className="h-3 w-3" /> Received</Badge>;
            case "Ordered": return <Badge variant="default" className="gap-1 bg-blue-600 hover:bg-blue-700"><Truck className="h-3 w-3" /> Ordered</Badge>;
            case "Approved": return <Badge variant="secondary" className="gap-1 text-blue-700 bg-blue-50 border-blue-200">Approved</Badge>;
            case "Draft": return <Badge variant="outline" className="gap-1">Draft</Badge>;
            case "Cancelled": return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" /> Cancelled</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Purchase Orders</h1>
                    <p className="text-muted-foreground mt-1">Manage stock replenishment and supplier orders.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Create PO
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px]">
                        <DialogHeader>
                            <DialogTitle>New Purchase Order</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Supplier</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select supplier" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="s1">AutoParts City</SelectItem>
                                            <SelectItem value="s2">Global Oils Ltd</SelectItem>
                                            <SelectItem value="s3">Brake Specialists Inc</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Expected Date</Label>
                                    <Input type="date" />
                                </div>
                            </div>

                            <div className="border rounded-md p-4 bg-muted/20">
                                <div className="mb-2 flex justify-between items-center">
                                    <Label className="font-semibold">Order Items</Label>
                                    <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" size="sm" className="h-8 text-xs border bg-background hover:bg-accent"><Plus className="mr-1 h-3 w-3" /> Add Item</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[400px]">
                                            <DialogHeader>
                                                <DialogTitle>Add Item to PO</DialogTitle>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="space-y-2">
                                                    <Label>Part</Label>
                                                    <Select value={newItem.partId} onValueChange={(val) => setNewItem({ ...newItem, partId: val })}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select part..." />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="p1">Oil Filter (PT-001)</SelectItem>
                                                            <SelectItem value="p2">Brake Pads (PT-002)</SelectItem>
                                                            <SelectItem value="p3">Spark Plug (PT-004)</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label>Quantity</Label>
                                                        <Input
                                                            type="number"
                                                            value={newItem.qty}
                                                            onChange={(e) => setNewItem({ ...newItem, qty: parseInt(e.target.value) || 1 })}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Unit Cost ($)</Label>
                                                        <Input
                                                            type="number"
                                                            value={newItem.cost}
                                                            onChange={(e) => setNewItem({ ...newItem, cost: e.target.value })}
                                                            placeholder="0.00"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button size="sm" onClick={handleAddItem}>Add to Order</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                {newPOItems.length > 0 ? (
                                    <div className="bg-background rounded-sm border overflow-hidden">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="h-8 border-b-0 hover:bg-transparent">
                                                    <TableHead className="h-8 text-xs">Part</TableHead>
                                                    <TableHead className="h-8 text-xs text-right">Qty</TableHead>
                                                    <TableHead className="h-8 text-xs text-right">Cost</TableHead>
                                                    <TableHead className="h-8 text-xs text-right">Total</TableHead>
                                                    <TableHead className="h-8 w-[40px]"></TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {newPOItems.map((item, idx) => (
                                                    <TableRow key={idx} className="h-8 hover:bg-transparent">
                                                        <TableCell className="py-1 text-xs">{item.partName}</TableCell>
                                                        <TableCell className="py-1 text-xs text-right">{item.qty}</TableCell>
                                                        <TableCell className="py-1 text-xs text-right">${item.cost.toFixed(2)}</TableCell>
                                                        <TableCell className="py-1 text-xs text-right font-medium">${(item.qty * item.cost).toFixed(2)}</TableCell>
                                                        <TableCell className="py-1">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="h-6 w-6 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                                onClick={() => setNewPOItems(newPOItems.filter((_, i) => i !== idx))}
                                                            >
                                                                <XCircle className="h-3 w-3" />
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                <TableRow className="border-t-2 hover:bg-transparent">
                                                    <TableCell colSpan={3} className="py-2 text-xs font-semibold text-right">Total Amount:</TableCell>
                                                    <TableCell className="py-2 text-sm font-bold text-right">
                                                        ${newPOItems.reduce((sum, item) => sum + (item.qty * item.cost), 0).toFixed(2)}
                                                    </TableCell>
                                                    <TableCell></TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                ) : (
                                    <div className="text-sm text-muted-foreground text-center py-8 bg-background/50 rounded-sm border border-dashed">
                                        No items added yet. Click "Add Item" to populate the order.
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Notes / Instructions</Label>
                                <Textarea placeholder="Delivery instructions..." />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline">Save as Draft</Button>
                            <Button>Submit for Approval</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>PO History</CardTitle>
                        <div className="relative w-[300px]">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search POs or suppliers..."
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
                                <TableHead>PO Number</TableHead>
                                <TableHead>Supplier</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-center">Items</TableHead>
                                <TableHead className="text-right">Total Cost</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredPOs.map((po) => (
                                <TableRow key={po.id}>
                                    <TableCell className="font-medium font-mono">{po.po_no}</TableCell>
                                    <TableCell>{po.supplier}</TableCell>
                                    <TableCell>{po.date}</TableCell>
                                    <TableCell className="text-center">{po.items}</TableCell>
                                    <TableCell className="text-right font-bold">{po.total}</TableCell>
                                    <TableCell>{getStatusBadge(po.status)}</TableCell>
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
                                                    <RefreshCw className="mr-2 h-4 w-4" /> Re-Order
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600">
                                                    <XCircle className="mr-2 h-4 w-4" /> Cancel Order
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

export default PurchaseOrders;
