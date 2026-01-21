
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save, User, Wrench, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const CreateJobCard = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        customerName: '',
        vehiclePlate: '',
        vehicleModel: '',
        serviceType: '',
        priority: 'Normal',
        odometer: '',
        mechanic: '',
        description: '',
        promisedDate: '',
    });

    const handleSave = () => {
        if (!formData.customerName || !formData.vehiclePlate || !formData.serviceType) {
            alert("Please fill in the required fields (Customer, Vehicle, Service Type)");
            return;
        }

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            console.log("Job Card Created:", formData);
            setIsLoading(false);
            navigate('/dashboard/jobs/board'); // Navigate back to board
        }, 1000);
    };

    return (
        <div className="p-6 space-y-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Create Job Card</h1>
                        <p className="text-muted-foreground">Open a new service job for a customer vehicle.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
                    <Button onClick={handleSave} disabled={isLoading}>
                        {isLoading ? "Creating..." : (
                            <>
                                <Save className="mr-2 h-4 w-4" /> Create Job Card
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column: Customer & Vehicle Info */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-blue-500" /> Customer & Vehicle Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="customer">Customer Name <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="customer"
                                        placeholder="Enter customer name"
                                        value={formData.customerName}
                                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="advisor">Service Advisor</Label>
                                    <Input id="advisor" value="Current Advisor" disabled className="bg-muted" />
                                </div>
                            </div>

                            <Separator />

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="plate">License Plate <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="plate"
                                        placeholder="e.g. ABC-1234"
                                        className="uppercase"
                                        value={formData.vehiclePlate}
                                        onChange={(e) => setFormData({ ...formData, vehiclePlate: e.target.value.toUpperCase() })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="model">Vehicle Model</Label>
                                    <Input
                                        id="model"
                                        placeholder="e.g. Toyota Camry 2020"
                                        value={formData.vehicleModel}
                                        onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="odometer">Odometer (km)</Label>
                                    <Input
                                        id="odometer"
                                        type="number"
                                        placeholder="0"
                                        value={formData.odometer}
                                        onChange={(e) => setFormData({ ...formData, odometer: e.target.value })}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Wrench className="h-5 w-5 text-orange-500" /> Service Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="serviceType">Service Type <span className="text-red-500">*</span></Label>
                                    <Select
                                        value={formData.serviceType}
                                        onValueChange={(val) => setFormData({ ...formData, serviceType: val })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Service" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Maintenance">Routine Maintenance</SelectItem>
                                            <SelectItem value="Repair">Mechanical Repair</SelectItem>
                                            <SelectItem value="Inspection">Safety Inspection</SelectItem>
                                            <SelectItem value="Wash">Car Wash / Detailing</SelectItem>
                                            <SelectItem value="Tire">Tire Service</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mechanic">Assign Mechanic</Label>
                                    <Select
                                        value={formData.mechanic}
                                        onValueChange={(val) => setFormData({ ...formData, mechanic: val })}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Unassigned" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="mike">Mike (Master Tech)</SelectItem>
                                            <SelectItem value="sarah">Sarah (Electrical)</SelectItem>
                                            <SelectItem value="john">John (General)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Customer Complaint / Instructions</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe the issue or requested services..."
                                    className="min-h-[100px]"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Settings */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Job Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Priority</Label>
                                <Select
                                    value={formData.priority}
                                    onValueChange={(val) => setFormData({ ...formData, priority: val })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Low">Low - Whenever</SelectItem>
                                        <SelectItem value="Normal">Normal - Standard</SelectItem>
                                        <SelectItem value="High">High - Same Day</SelectItem>
                                        <SelectItem value="Urgent">Urgent - Breakdown</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Promised Date</Label>
                                <Input
                                    type="date"
                                    value={formData.promisedDate}
                                    onChange={(e) => setFormData({ ...formData, promisedDate: e.target.value })}
                                />
                            </div>

                            <Separator />

                            <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                                <h4 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
                                    <CheckCircle className="h-4 w-4" /> Checklist
                                </h4>
                                <div className="space-y-2 text-sm text-blue-700">
                                    <p>• Verify fuel level</p>
                                    <p>• Check for existing damage</p>
                                    <p>• Remove valuables</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreateJobCard;
