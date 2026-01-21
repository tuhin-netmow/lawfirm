import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, UserPlus, FileText, Briefcase } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function CreateClient() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        // Personal Information
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        nationality: "",
        // Passport Information
        passportNumber: "",
        passportIssueDate: "",
        passportExpiryDate: "",
        // Address
        currentAddress: "",
        city: "",
        postalCode: "",
        country: "",
        // Visa Information
        visaType: "",
        destination: "",
        // Additional
        maritalStatus: "",
        notes: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            toast.success("Client created successfully!");
            setIsSubmitting(false);
            navigate("/dashboard/migration/clients");
        }, 1000);
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Link to="/dashboard/migration/clients">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-3xl font-semibold">Add New Client</h2>
                    <p className="text-gray-600 mt-1">Register a new client in the system</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserPlus className="w-5 h-5" />
                            Personal Information
                        </CardTitle>
                        <CardDescription>Basic personal details of the client</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">
                                    First Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="firstName"
                                    placeholder="Enter first name"
                                    value={formData.firstName}
                                    onChange={(e) => handleChange("firstName", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">
                                    Last Name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="lastName"
                                    placeholder="Enter last name"
                                    value={formData.lastName}
                                    onChange={(e) => handleChange("lastName", e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">
                                    Email <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="email@example.com"
                                    value={formData.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">
                                    Phone <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+880 1XXX-XXXXXX"
                                    value={formData.phone}
                                    onChange={(e) => handleChange("phone", e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="dateOfBirth">
                                    Date of Birth <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="dateOfBirth"
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={(e) => handleChange("dateOfBirth", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gender">
                                    Gender <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData.gender}
                                    onValueChange={(value) => handleChange("gender", value)}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="nationality">
                                    Nationality <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="nationality"
                                    placeholder="e.g., Bangladesh"
                                    value={formData.nationality}
                                    onChange={(e) => handleChange("nationality", e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="maritalStatus">Marital Status</Label>
                            <Select
                                value={formData.maritalStatus}
                                onValueChange={(value) => handleChange("maritalStatus", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select marital status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="single">Single</SelectItem>
                                    <SelectItem value="married">Married</SelectItem>
                                    <SelectItem value="divorced">Divorced</SelectItem>
                                    <SelectItem value="widowed">Widowed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Passport Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Passport Information
                        </CardTitle>
                        <CardDescription>Passport details for visa processing</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="passportNumber">
                                    Passport Number <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="passportNumber"
                                    placeholder="e.g., A12345678"
                                    value={formData.passportNumber}
                                    onChange={(e) => handleChange("passportNumber", e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="passportIssueDate">Issue Date</Label>
                                <Input
                                    id="passportIssueDate"
                                    type="date"
                                    value={formData.passportIssueDate}
                                    onChange={(e) => handleChange("passportIssueDate", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="passportExpiryDate">
                                    Expiry Date <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="passportExpiryDate"
                                    type="date"
                                    value={formData.passportExpiryDate}
                                    onChange={(e) => handleChange("passportExpiryDate", e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Address Information */}
                <Card>
                    <CardHeader>
                        <CardTitle>Address Information</CardTitle>
                        <CardDescription>Current residential address</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentAddress">Street Address</Label>
                            <Input
                                id="currentAddress"
                                placeholder="House/Flat number, Street name"
                                value={formData.currentAddress}
                                onChange={(e) => handleChange("currentAddress", e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    placeholder="City name"
                                    value={formData.city}
                                    onChange={(e) => handleChange("city", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="postalCode">Postal Code</Label>
                                <Input
                                    id="postalCode"
                                    placeholder="Postal code"
                                    value={formData.postalCode}
                                    onChange={(e) => handleChange("postalCode", e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="country">Country</Label>
                                <Input
                                    id="country"
                                    placeholder="Country"
                                    value={formData.country}
                                    onChange={(e) => handleChange("country", e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Visa Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Briefcase className="w-5 h-5" />
                            Visa Information
                        </CardTitle>
                        <CardDescription>Intended visa type and destination</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="visaType">
                                    Visa Type <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData.visaType}
                                    onValueChange={(value) => handleChange("visaType", value)}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select visa type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="student">Student Visa</SelectItem>
                                        <SelectItem value="tourist">Tourist Visa</SelectItem>
                                        <SelectItem value="work">Work Visa</SelectItem>
                                        <SelectItem value="skilled">Skilled Migration</SelectItem>
                                        <SelectItem value="partner">Partner Visa</SelectItem>
                                        <SelectItem value="business">Business Visa</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="destination">
                                    Destination Country <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    value={formData.destination}
                                    onValueChange={(value) => handleChange("destination", value)}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select destination" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="australia">Australia</SelectItem>
                                        <SelectItem value="canada">Canada</SelectItem>
                                        <SelectItem value="usa">United States</SelectItem>
                                        <SelectItem value="uk">United Kingdom</SelectItem>
                                        <SelectItem value="germany">Germany</SelectItem>
                                        <SelectItem value="newzealand">New Zealand</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Additional Notes</Label>
                            <Textarea
                                id="notes"
                                placeholder="Any additional information about the client..."
                                value={formData.notes}
                                onChange={(e) => handleChange("notes", e.target.value)}
                                rows={4}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                    <Link to="/dashboard/migration/clients">
                        <Button variant="outline" type="button">
                            Cancel
                        </Button>
                    </Link>
                    <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
                        {isSubmitting ? (
                            "Saving..."
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Save Client
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
