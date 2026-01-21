
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { ArrowLeft, Save, Building2, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function CreateClient() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [clientType, setClientType] = useState<"Individual" | "Organisation">("Individual");

    // Form State
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        company_name: "",
        email: "",
        phone: "",
        identifier_no: "",
        address_line1: "",
        city: "",
        state: "",
        postcode: "",
        notes: "",
        status: "Active"
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            console.log("Submitting Client:", { ...formData, type: clientType });
            setIsLoading(false);
            navigate("/dashboard/clients");
        }, 1000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link to="/dashboard/clients">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Add New Client</h1>
                    <p className="text-muted-foreground text-sm">Register a new individual or organisation.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Client Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        {/* Client Type Toggle */}
                        <div className="flex gap-4 p-1 bg-slate-100 rounded-lg w-fit">
                            <button
                                type="button"
                                onClick={() => setClientType("Individual")}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${clientType === "Individual"
                                        ? "bg-white shadow text-blue-600"
                                        : "text-slate-500 hover:text-slate-700"
                                    }`}
                            >
                                <User className="w-4 h-4" /> Individual
                            </button>
                            <button
                                type="button"
                                onClick={() => setClientType("Organisation")}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${clientType === "Organisation"
                                        ? "bg-white shadow text-blue-600"
                                        : "text-slate-500 hover:text-slate-700"
                                    }`}
                            >
                                <Building2 className="w-4 h-4" /> Organisation
                            </button>
                        </div>

                        {/* Name Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {clientType === "Individual" ? (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="first_name">First Name <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="first_name"
                                            name="first_name"
                                            placeholder="John"
                                            required
                                            value={formData.first_name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="last_name">Last Name <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="last_name"
                                            name="last_name"
                                            placeholder="Smith"
                                            required
                                            value={formData.last_name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </>
                            ) : (
                                <div className="space-y-2 col-span-2">
                                    <Label htmlFor="company_name">Company Name <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="company_name"
                                        name="company_name"
                                        placeholder="Acme Corp Pty Ltd"
                                        required
                                        value={formData.company_name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Contact Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="client@example.com"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number <span className="text-red-500">*</span></Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="+61 400 000 000"
                                    required
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {/* Identifiers */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="identifier_no">{clientType === "Individual" ? "Passport / ID Number" : "ABN / ACN"}</Label>
                                <Input
                                    id="identifier_no"
                                    name="identifier_no"
                                    placeholder="Optional"
                                    value={formData.identifier_no}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select defaultValue="Active" onValueChange={(val) => handleSelectChange("status", val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Prospect">Prospect</SelectItem>
                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <h3 className="text-lg font-medium mb-4">Address Details</h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="address_line1">Street Address</Label>
                                    <Input
                                        id="address_line1"
                                        name="address_line1"
                                        placeholder="123 Legal Avenue"
                                        value={formData.address_line1}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City / Suburb</Label>
                                        <Input
                                            id="city"
                                            name="city"
                                            placeholder="Sydney"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="state">State</Label>
                                        <Input
                                            id="state"
                                            name="state"
                                            placeholder="NSW"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="postcode">Postcode</Label>
                                        <Input
                                            id="postcode"
                                            name="postcode"
                                            placeholder="2000"
                                            value={formData.postcode}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Internal Notes</Label>
                            <Textarea
                                id="notes"
                                name="notes"
                                placeholder="Any additional information..."
                                className="min-h-[80px]"
                                value={formData.notes}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Submit Actions */}
                        <div className="flex justify-end gap-4 pt-4">
                            <Link to="/dashboard/clients">
                                <Button variant="outline" type="button">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-500">
                                {isLoading ? "Creating..." : <><Save className="mr-2 h-4 w-4" /> Create Client</>}
                            </Button>
                        </div>

                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
