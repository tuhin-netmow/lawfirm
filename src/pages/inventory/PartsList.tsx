
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Layers, AlertTriangle, MoreHorizontal, Edit, Trash } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";

// Mock Data
const initialParts = [
    { id: 1, sku: "PT-001", name: "Oil Filter (Toyota)", category: "Filters", stock: 25, min_stock: 10, cost: 15.00, price: 35.00, location: "A1-02" },
    { id: 2, sku: "PT-002", name: "Brake Pads (Front)", category: "Brakes", stock: 8, min_stock: 15, cost: 45.00, price: 120.00, location: "B2-01" },
    { id: 3, sku: "PT-003", name: "Synthetic Oil 5W-30", category: "Fluids", stock: 50, min_stock: 20, cost: 12.00, price: 28.00, location: "C1-05" },
    { id: 4, sku: "PT-004", name: "Spark Plug (NGK)", category: "Ignition", stock: 4, min_stock: 12, cost: 8.50, price: 18.00, location: "A2-03" },
    { id: 5, sku: "PT-005", name: "Air Filter (Honda)", category: "Filters", stock: 18, min_stock: 5, cost: 12.50, price: 30.00, location: "A1-03" },
];

const PartsList = () => {
    const [parts] = useState(initialParts);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredParts = parts.filter(part =>
        part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        part.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        part.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStockStatus = (stock: number, min: number) => {
        if (stock === 0) return <Badge variant="destructive">Out of Stock</Badge>;
        if (stock <= min) return <Badge variant="warning" className="gap-1"><AlertTriangle className="h-3 w-3" /> Low Stock</Badge>;
        return <Badge variant="success">In Stock</Badge>;
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Parts Catalog</h1>
                    <p className="text-muted-foreground mt-1">Manage inventory items, stock levels, and pricing.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Part
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px]">
                        <DialogHeader>
                            <DialogTitle>Add New Part</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="sku">SKU / Part Number</Label>
                                    <Input id="sku" placeholder="e.g. PT-1001" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="barcode">Barcode (Optional)</Label>
                                    <Input id="barcode" placeholder="Scan barcode..." />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">Part Name</Label>
                                <Input id="name" placeholder="e.g. Oil Filter" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="filters">Filters</SelectItem>
                                            <SelectItem value="brakes">Brakes</SelectItem>
                                            <SelectItem value="fluids">Fluids</SelectItem>
                                            <SelectItem value="electrical">Electrical</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="brand">Brand / Manufacturer</Label>
                                    <Input id="brand" placeholder="e.g. Toyota" />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cost">Cost Price</Label>
                                    <Input id="cost" type="number" placeholder="0.00" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="price">Selling Price</Label>
                                    <Input id="price" type="number" placeholder="0.00" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tax">Tax Rule</Label>
                                    <Select defaultValue="standard">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="standard">Standard (20%)</SelectItem>
                                            <SelectItem value="zero">Zero Rated (0%)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 border-t pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="stock">Opening Stock</Label>
                                    <Input id="stock" type="number" placeholder="0" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="min">Min Stock Alert</Label>
                                    <Input id="min" type="number" placeholder="5" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Bin Location</Label>
                                    <Input id="location" placeholder="e.g. A1-05" />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 pt-2">
                                <Checkbox id="service" />
                                <Label htmlFor="service">This is a service item (no stock tracking)</Label>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Part</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Inventory Items</CardTitle>
                        <div className="flex space-x-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search by name, SKU, category..."
                                    className="pl-8 w-[350px]"
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
                                <TableHead className="w-[100px]">SKU</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead className="text-right">Stock</TableHead>
                                <TableHead className="text-right">Cost</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredParts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                                        No parts found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredParts.map((part) => (
                                    <TableRow key={part.id}>
                                        <TableCell className="font-mono font-medium">{part.sku}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{part.name}</span>
                                                {getStockStatus(part.stock, part.min_stock)}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{part.category}</Badge>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{part.location}</TableCell>
                                        <TableCell className="text-right font-medium">
                                            {part.stock}
                                        </TableCell>
                                        <TableCell className="text-right text-muted-foreground">
                                            ${part.cost.toFixed(2)}
                                        </TableCell>
                                        <TableCell className="text-right font-bold">
                                            ${part.price.toFixed(2)}
                                        </TableCell>
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
                                                        <Edit className="mr-2 h-4 w-4" /> Edit Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Layers className="mr-2 h-4 w-4" /> View Movements
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600">
                                                        <Trash className="mr-2 h-4 w-4" /> Delete Part
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

export default PartsList;
