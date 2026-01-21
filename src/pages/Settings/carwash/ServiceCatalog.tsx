
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, MoreHorizontal, Edit, Trash2, Tag, Clock } from "lucide-react";
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
const initialServices = [
    { id: 1, code: "SVC-001", name: "Oil Change", category: "Maintenance", hours: 0.5, rate: 45.00, price: 22.50, status: "Active" },
    { id: 2, code: "SVC-002", name: "Brake Inspection", category: "Inspection", hours: 1.0, rate: 45.00, price: 45.00, status: "Active" },
    { id: 3, code: "SVC-003", name: "Tire Rotation", category: "Maintenance", hours: 0.75, rate: 45.00, price: 33.75, status: "Active" },
    { id: 4, code: "SVC-004", name: "Engine Diagnostic", category: "Diagnostic", hours: 2.0, rate: 65.00, price: 130.00, status: "Active" },
    { id: 5, code: "SVC-005", name: "Transmission Service", category: "Repair", hours: 3.0, rate: 55.00, price: 165.00, status: "Active" },
    { id: 6, code: "SVC-006", name: "Air Filter Replacement", category: "Maintenance", hours: 0.25, rate: 45.00, price: 11.25, status: "Inactive" },
];

const ServiceCatalog = () => {
    const [services] = useState(initialServices);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [isAddOpen, setIsAddOpen] = useState(false);

    const filteredServices = services.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === "all" || service.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const getCategoryBadge = (category: string) => {
        const colors: Record<string, string> = {
            "Maintenance": "bg-blue-50 text-blue-700 border-blue-200",
            "Inspection": "bg-purple-50 text-purple-700 border-purple-200",
            "Diagnostic": "bg-orange-50 text-orange-700 border-orange-200",
            "Repair": "bg-red-50 text-red-700 border-red-200",
        };
        return <Badge variant="secondary" className={`gap-1 ${colors[category] || ""}`}><Tag className="h-3 w-3" /> {category}</Badge>;
    };

    const stats = {
        total: services.length,
        active: services.filter(s => s.status === "Active").length,
        avgRate: services.reduce((sum, s) => sum + s.rate, 0) / services.length,
        categories: [...new Set(services.map(s => s.category))].length,
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Service Catalog</h1>
                    <p className="text-muted-foreground mt-1">Manage services, labor rates, and pricing.</p>
                </div>
                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Service
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Add New Service</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Service Code</Label>
                                    <Input placeholder="e.g. SVC-007" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Category</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="maintenance">Maintenance</SelectItem>
                                            <SelectItem value="inspection">Inspection</SelectItem>
                                            <SelectItem value="diagnostic">Diagnostic</SelectItem>
                                            <SelectItem value="repair">Repair</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Service Name</Label>
                                <Input placeholder="e.g. Full Vehicle Inspection" />
                            </div>

                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea placeholder="Detailed service description..." rows={3} />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label>Standard Hours</Label>
                                    <Input type="number" step="0.25" placeholder="0.00" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Labor Rate ($/hr)</Label>
                                    <Input type="number" placeholder="0.00" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Total Price ($)</Label>
                                    <Input type="number" placeholder="0.00" disabled className="bg-muted" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select defaultValue="active">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                            <Button onClick={() => setIsAddOpen(false)}>Add Service</Button>
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
                                <p className="text-sm font-medium text-muted-foreground">Total Services</p>
                                <p className="text-2xl font-bold">{stats.total}</p>
                            </div>
                            <Tag className="h-8 w-8 text-muted-foreground" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Active Services</p>
                                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                            </div>
                            <Tag className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Avg Labor Rate</p>
                                <p className="text-2xl font-bold">${stats.avgRate.toFixed(2)}/hr</p>
                            </div>
                            <Clock className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                                <p className="text-2xl font-bold">{stats.categories}</p>
                            </div>
                            <Tag className="h-8 w-8 text-purple-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Services & Labour Rates</CardTitle>
                        <div className="relative w-[300px]">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search services..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="all" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="all" onClick={() => setCategoryFilter("all")}>All</TabsTrigger>
                            <TabsTrigger value="maintenance" onClick={() => setCategoryFilter("Maintenance")}>Maintenance</TabsTrigger>
                            <TabsTrigger value="inspection" onClick={() => setCategoryFilter("Inspection")}>Inspection</TabsTrigger>
                            <TabsTrigger value="diagnostic" onClick={() => setCategoryFilter("Diagnostic")}>Diagnostic</TabsTrigger>
                            <TabsTrigger value="repair" onClick={() => setCategoryFilter("Repair")}>Repair</TabsTrigger>
                        </TabsList>
                        <TabsContent value={categoryFilter} className="space-y-4">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Code</TableHead>
                                        <TableHead>Service Name</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead className="text-center">Std Hours</TableHead>
                                        <TableHead className="text-right">Labor Rate</TableHead>
                                        <TableHead className="text-right">Price</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="w-[50px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredServices.map((service) => (
                                        <TableRow key={service.id}>
                                            <TableCell className="font-mono text-sm">{service.code}</TableCell>
                                            <TableCell className="font-medium">{service.name}</TableCell>
                                            <TableCell>{getCategoryBadge(service.category)}</TableCell>
                                            <TableCell className="text-center">{service.hours}h</TableCell>
                                            <TableCell className="text-right">${service.rate.toFixed(2)}/hr</TableCell>
                                            <TableCell className="text-right font-bold">${service.price.toFixed(2)}</TableCell>
                                            <TableCell>
                                                <Badge variant={service.status === "Active" ? "success" : "secondary"}>
                                                    {service.status}
                                                </Badge>
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
                                                            <Edit className="mr-2 h-4 w-4" /> Edit Service
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-600">
                                                            <Trash2 className="mr-2 h-4 w-4" /> Delete Service
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

export default ServiceCatalog;
