
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight, MinusCircle, PlusCircle, Filter, Search } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Mock Data
const initialMovements = [
    { id: 1, date: "2024-05-25 14:30", type: "Stock In", ref: "PO-0012", part: "Oil Filter (Toyota)", variant: "PT-001", qty: 20, by: "Store Admin" },
    { id: 2, date: "2024-05-25 10:15", type: "Consumption", ref: "JC-1001", part: "Brake Pads (Front)", variant: "PT-002", qty: -2, by: "Mechanic Bob" },
    { id: 3, date: "2024-05-24 16:00", type: "Adjustment", ref: "Audit", part: "Syntax Oil 5W-30", variant: "PT-003", qty: -5, by: "Manager" },
    { id: 4, date: "2024-05-24 09:00", type: "Stock In", ref: "Manual", part: "Spark Plug (NGK)", variant: "PT-004", qty: 50, by: "Store Admin" },
    { id: 5, date: "2024-05-23 11:45", type: "Transfer", ref: "TR-005", part: "Air Filter (Honda)", variant: "PT-005", qty: -10, by: "Store Admin" },
];

const StockMovements = () => {
    const [movements] = useState(initialMovements);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredMovements = movements.filter(m =>
        m.part.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.ref.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getBadgeVariant = (type: string, qty: number) => {
        if (type === "Stock In") return "success";
        if (type === "Consumption") return "secondary";
        if (type === "Adjustment" && qty < 0) return "destructive";
        if (type === "Adjustment" && qty > 0) return "success";
        return "outline";
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Stock Movements</h1>
                    <p className="text-muted-foreground mt-1">Audit trail of all inventory changes.</p>
                </div>
                <div className="flex gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800">
                                <MinusCircle className="mr-2 h-4 w-4" /> Stock Out
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Manual Stock Out</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label>Reason</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select reason" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="damage">Damaged / Expired</SelectItem>
                                            <SelectItem value="theft">Lost / Stolen</SelectItem>
                                            <SelectItem value="internal">Internal Use</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Part</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select part..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pt1">Oil Filter (PT-001)</SelectItem>
                                            <SelectItem value="pt2">Brake Pads (PT-002)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Quantity</Label>
                                        <Input type="number" placeholder="1" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Reference (Optional)</Label>
                                        <Input placeholder="e.g. Audit #123" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Notes</Label>
                                    <Textarea placeholder="Explain why..." />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="destructive">Confirm Stock Out</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800">
                                <PlusCircle className="mr-2 h-4 w-4" /> Stock In
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Manual Stock In</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label>Source</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select source" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="return">Customer Return</SelectItem>
                                            <SelectItem value="adjustment">Found / Adjustment</SelectItem>
                                            <SelectItem value="purchase">Direct Purchase (No PO)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Part</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select part..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pt1">Oil Filter (PT-001)</SelectItem>
                                            <SelectItem value="pt2">Brake Pads (PT-002)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Quantity</Label>
                                        <Input type="number" placeholder="1" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Cost per Unit (Optional)</Label>
                                        <Input type="number" placeholder="0.00" />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button className="bg-green-600 hover:bg-green-700">Confirm Stock In</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Button variant="outline"><ArrowLeftRight className="mr-2 h-4 w-4" /> Transfer</Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Movement History</CardTitle>
                        <div className="flex space-x-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by part or ref..."
                                    className="pl-8 w-[300px]"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
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
                                <TableHead>Date / Time</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Part Details</TableHead>
                                <TableHead>Reference</TableHead>
                                <TableHead className="text-right">Qty Change</TableHead>
                                <TableHead>Performed By</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredMovements.map((move) => (
                                <TableRow key={move.id}>
                                    <TableCell className="font-mono text-xs">{move.date}</TableCell>
                                    <TableCell>
                                        <Badge variant={getBadgeVariant(move.type, move.qty)}>{move.type}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-sm">{move.part}</span>
                                            <span className="text-xs text-muted-foreground">{move.variant}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm font-mono">{move.ref}</TableCell>
                                    <TableCell className="text-right font-bold">
                                        <span className={move.qty > 0 ? "text-green-600" : "text-red-600"}>
                                            {move.qty > 0 ? "+" : ""}{move.qty}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{move.by}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default StockMovements;
