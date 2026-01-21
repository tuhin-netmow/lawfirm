
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Car, Fuel, Settings, User } from "lucide-react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Mock Data for Vehicles
const initialVehicles = [
    {
        id: "1",
        plate_no: "ABC-1234",
        make: "Toyota",
        model: "Camry",
        year: "2020",
        color: "Silver",
        vin: "ABC123456789",
        fuel_type: "Petrol",
        transmission: "Automatic",
        mileage: 45000,
        customer_name: "John Smith",
        status: "Active",
    },
    {
        id: "2",
        plate_no: "XYZ-9876",
        make: "Honda",
        model: "CR-V",
        year: "2019",
        color: "Black",
        vin: "XYZ987654321",
        fuel_type: "Hybrid",
        transmission: "Automatic",
        mileage: 62000,
        customer_name: "Sarah Johnson",
        status: "Active",
    },
    {
        id: "3",
        plate_no: "LMN-4567",
        make: "Ford",
        model: "Ranger",
        year: "2021",
        color: "Blue",
        vin: "LMN456123789",
        fuel_type: "Diesel",
        transmission: "Manual",
        mileage: 38000,
        customer_name: "Mike Brown",
        status: "Service Due",
    },
    {
        id: "4",
        plate_no: "EV-001",
        make: "Tesla",
        model: "Model 3",
        year: "2023",
        color: "White",
        vin: "TESLA1234EV",
        fuel_type: "EV",
        transmission: "Automatic",
        mileage: 12000,
        customer_name: "Emily Davis",
        status: "Active",
    },
];

const VehiclesList = () => {
    const [vehicles, setVehicles] = useState(initialVehicles);
    const [searchTerm, setSearchTerm] = useState("");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // New Vehicle Form State
    const [newVehicle, setNewVehicle] = useState({
        plate_no: "",
        make: "",
        model: "",
        year: "",
        color: "",
        customer_name: "", // In a real app, this would be a customer selection
        fuel_type: "Petrol",
        transmission: "Automatic",
        mileage: "",
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleCreateVehicle = () => {
        if (!newVehicle.plate_no || !newVehicle.make || !newVehicle.model || !newVehicle.customer_name) {
            alert("Plate No, Make, Model, and Customer Name are required.");
            return;
        }

        const vehicleToAdd = {
            ...newVehicle,
            id: (vehicles.length + 1).toString(),
            vin: "", // Optional in minimal form
            status: "Active",
            mileage: Number(newVehicle.mileage) || 0,
        };

        setVehicles([...vehicles, vehicleToAdd]);
        setIsCreateModalOpen(false);
        setNewVehicle({
            plate_no: "",
            make: "",
            model: "",
            year: "",
            color: "",
            customer_name: "",
            fuel_type: "Petrol",
            transmission: "Automatic",
            mileage: "",
        });
    };

    const filteredVehicles = vehicles.filter(v =>
        v.plate_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Active": return <Badge variant="success">Active</Badge>;
            case "Service Due": return <Badge variant="warning">Service Due</Badge>;
            case "Inactive": return <Badge variant="destructive">Inactive</Badge>;
            default: return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Vehicles</h1>
                    <p className="text-muted-foreground mt-1">Manage customer vehicles and history.</p>
                </div>
                <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Vehicle
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[700px]">
                        <DialogHeader>
                            <DialogTitle>Register New Vehicle</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="plate_no">Plate Number *</Label>
                                    <Input
                                        id="plate_no"
                                        placeholder="ABC-1234"
                                        value={newVehicle.plate_no}
                                        onChange={(e) => setNewVehicle({ ...newVehicle, plate_no: e.target.value })}
                                        className="uppercase"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="customer">Customer Owner *</Label>
                                    <Input
                                        id="customer"
                                        placeholder="Enter Customer Name"
                                        value={newVehicle.customer_name}
                                        onChange={(e) => setNewVehicle({ ...newVehicle, customer_name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="make">Make *</Label>
                                    <Input
                                        id="make"
                                        placeholder="Toyota"
                                        value={newVehicle.make}
                                        onChange={(e) => setNewVehicle({ ...newVehicle, make: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="model">Model *</Label>
                                    <Input
                                        id="model"
                                        placeholder="Camry"
                                        value={newVehicle.model}
                                        onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="year">Year</Label>
                                    <Input
                                        id="year"
                                        placeholder="2024"
                                        value={newVehicle.year}
                                        onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fuel">Fuel Type</Label>
                                    <Select
                                        value={newVehicle.fuel_type}
                                        onValueChange={(value) => setNewVehicle({ ...newVehicle, fuel_type: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Petrol">Petrol</SelectItem>
                                            <SelectItem value="Diesel">Diesel</SelectItem>
                                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                                            <SelectItem value="EV">Electric (EV)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="transmission">Transmission</Label>
                                    <Select
                                        value={newVehicle.transmission}
                                        onValueChange={(value) => setNewVehicle({ ...newVehicle, transmission: value })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select transmission" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Automatic">Automatic</SelectItem>
                                            <SelectItem value="Manual">Manual</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="color">Color</Label>
                                    <Input
                                        id="color"
                                        placeholder="e.g. Silver"
                                        value={newVehicle.color}
                                        onChange={(e) => setNewVehicle({ ...newVehicle, color: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mileage">Current Mileage (km)</Label>
                                    <Input
                                        id="mileage"
                                        type="number"
                                        placeholder="0"
                                        value={newVehicle.mileage}
                                        onChange={(e) => setNewVehicle({ ...newVehicle, mileage: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
                            <Button onClick={handleCreateVehicle}>Save Vehicle</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Vehicle Registry</CardTitle>
                        <div className="flex space-x-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search plate, make, owner..."
                                    className="pl-8 w-[300px]"
                                    value={searchTerm}
                                    onChange={handleSearch}
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
                                <TableHead>Plate No.</TableHead>
                                <TableHead>Vehicle Details</TableHead>
                                <TableHead>Owner</TableHead>
                                <TableHead>Specs</TableHead>
                                <TableHead>Mileage</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredVehicles.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                                        No vehicles found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredVehicles.map((vehicle) => (
                                    <TableRow key={vehicle.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Car className="h-4 w-4 text-muted-foreground" />
                                                <Badge variant="outline" className="font-mono text-base">
                                                    {vehicle.plate_no}
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{vehicle.make} {vehicle.model}</span>
                                                <span className="text-xs text-muted-foreground">{vehicle.year} • {vehicle.color}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-sm">
                                                <User className="h-3 w-3 text-muted-foreground" />
                                                {vehicle.customer_name}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Fuel className="h-3 w-3" /> {vehicle.fuel_type}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Settings className="h-3 w-3" /> {vehicle.transmission}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className="font-mono">{vehicle.mileage.toLocaleString()} km</span>
                                        </TableCell>
                                        <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">History</Button>
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

export default VehiclesList;
