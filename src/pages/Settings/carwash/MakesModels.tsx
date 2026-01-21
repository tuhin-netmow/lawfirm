
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, MoreHorizontal, Edit, Trash2, Car } from "lucide-react";
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
const initialMakes = [
    { id: 1, name: "Toyota", country: "Japan", models: 12, status: "Active" },
    { id: 2, name: "Honda", country: "Japan", models: 8, status: "Active" },
    { id: 3, name: "Ford", country: "USA", models: 10, status: "Active" },
    { id: 4, name: "BMW", country: "Germany", models: 15, status: "Active" },
    { id: 5, name: "Tesla", country: "USA", models: 5, status: "Active" },
];

const initialModels = [
    { id: 1, make: "Toyota", name: "Camry", year: "2020-2024", type: "Sedan", status: "Active" },
    { id: 2, make: "Toyota", name: "Corolla", year: "2019-2024", type: "Sedan", status: "Active" },
    { id: 3, make: "Honda", name: "Civic", year: "2020-2024", type: "Sedan", status: "Active" },
    { id: 4, make: "Honda", name: "CR-V", year: "2021-2024", type: "SUV", status: "Active" },
    { id: 5, make: "Ford", name: "F-150", year: "2018-2024", type: "Truck", status: "Active" },
    { id: 6, make: "BMW", name: "X5", year: "2020-2024", type: "SUV", status: "Active" },
    { id: 7, make: "Tesla", name: "Model 3", year: "2019-2024", type: "Sedan", status: "Active" },
];

const MakesModels = () => {
    const [makes] = useState(initialMakes);
    const [models] = useState(initialModels);
    const [searchMakes, setSearchMakes] = useState("");
    const [searchModels, setSearchModels] = useState("");
    const [isAddMakeOpen, setIsAddMakeOpen] = useState(false);
    const [isAddModelOpen, setIsAddModelOpen] = useState(false);

    const filteredMakes = makes.filter(make =>
        make.name.toLowerCase().includes(searchMakes.toLowerCase()) ||
        make.country.toLowerCase().includes(searchMakes.toLowerCase())
    );

    const filteredModels = models.filter(model =>
        model.make.toLowerCase().includes(searchModels.toLowerCase()) ||
        model.name.toLowerCase().includes(searchModels.toLowerCase()) ||
        model.type.toLowerCase().includes(searchModels.toLowerCase())
    );

    const getTypeBadge = (type: string) => {
        const colors: Record<string, string> = {
            "Sedan": "bg-blue-50 text-blue-700 border-blue-200",
            "SUV": "bg-green-50 text-green-700 border-green-200",
            "Truck": "bg-orange-50 text-orange-700 border-orange-200",
            "Coupe": "bg-purple-50 text-purple-700 border-purple-200",
        };
        return <Badge variant="secondary" className={colors[type] || ""}>{type}</Badge>;
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Makes & Models</h1>
                    <p className="text-muted-foreground mt-1">Manage vehicle manufacturers and models.</p>
                </div>
                <div className="flex gap-2">
                    <Dialog open={isAddMakeOpen} onOpenChange={setIsAddMakeOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <Plus className="mr-2 h-4 w-4" /> Add Make
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Add Vehicle Make</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label>Make Name</Label>
                                    <Input placeholder="e.g. Toyota, Honda, Ford" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Country of Origin</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select country..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="japan">Japan</SelectItem>
                                            <SelectItem value="usa">USA</SelectItem>
                                            <SelectItem value="germany">Germany</SelectItem>
                                            <SelectItem value="korea">South Korea</SelectItem>
                                            <SelectItem value="uk">United Kingdom</SelectItem>
                                            <SelectItem value="italy">Italy</SelectItem>
                                            <SelectItem value="france">France</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                <Button variant="outline" onClick={() => setIsAddMakeOpen(false)}>Cancel</Button>
                                <Button onClick={() => setIsAddMakeOpen(false)}>Add Make</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isAddModelOpen} onOpenChange={setIsAddModelOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" /> Add Model
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Add Vehicle Model</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label>Make</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select make..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {makes.map(make => (
                                                <SelectItem key={make.id} value={make.name.toLowerCase()}>
                                                    {make.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Model Name</Label>
                                    <Input placeholder="e.g. Camry, Civic, F-150" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Year Range</Label>
                                        <Input placeholder="e.g. 2020-2024" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Vehicle Type</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="sedan">Sedan</SelectItem>
                                                <SelectItem value="suv">SUV</SelectItem>
                                                <SelectItem value="truck">Truck</SelectItem>
                                                <SelectItem value="coupe">Coupe</SelectItem>
                                                <SelectItem value="hatchback">Hatchback</SelectItem>
                                                <SelectItem value="van">Van</SelectItem>
                                            </SelectContent>
                                        </Select>
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
                                <Button variant="outline" onClick={() => setIsAddModelOpen(false)}>Cancel</Button>
                                <Button onClick={() => setIsAddModelOpen(false)}>Add Model</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Makes</p>
                                <p className="text-2xl font-bold">{makes.length}</p>
                            </div>
                            <Car className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Models</p>
                                <p className="text-2xl font-bold">{models.length}</p>
                            </div>
                            <Car className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Active Makes</p>
                                <p className="text-2xl font-bold text-green-600">{makes.filter(m => m.status === "Active").length}</p>
                            </div>
                            <Car className="h-8 w-8 text-muted-foreground" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Avg Models/Make</p>
                                <p className="text-2xl font-bold">{(models.length / makes.length).toFixed(1)}</p>
                            </div>
                            <Car className="h-8 w-8 text-purple-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Vehicle Makes */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Vehicle Makes</CardTitle>
                        <div className="relative w-[300px]">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search makes..."
                                className="pl-8"
                                value={searchMakes}
                                onChange={(e) => setSearchMakes(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Make Name</TableHead>
                                <TableHead>Country</TableHead>
                                <TableHead className="text-center">Models</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredMakes.map((make) => (
                                <TableRow key={make.id}>
                                    <TableCell className="font-medium">{make.name}</TableCell>
                                    <TableCell>{make.country}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant="outline">{make.models}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={make.status === "Active" ? "success" : "secondary"}>
                                            {make.status}
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
                                                    <Edit className="mr-2 h-4 w-4" /> Edit Make
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600">
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete Make
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

            {/* Vehicle Models */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Vehicle Models</CardTitle>
                        <div className="relative w-[300px]">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search models..."
                                className="pl-8"
                                value={searchModels}
                                onChange={(e) => setSearchModels(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Make</TableHead>
                                <TableHead>Model Name</TableHead>
                                <TableHead>Year Range</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredModels.map((model) => (
                                <TableRow key={model.id}>
                                    <TableCell className="font-medium">{model.make}</TableCell>
                                    <TableCell className="font-medium">{model.name}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{model.year}</TableCell>
                                    <TableCell>{getTypeBadge(model.type)}</TableCell>
                                    <TableCell>
                                        <Badge variant={model.status === "Active" ? "success" : "secondary"}>
                                            {model.status}
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
                                                    <Edit className="mr-2 h-4 w-4" /> Edit Model
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600">
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete Model
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

export default MakesModels;
