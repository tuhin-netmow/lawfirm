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
import { ArrowLeft, Save, UserPlus } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function CreateLead() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        visaType: "",
        destination: "",
        source: "",
        notes: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            toast.success("Lead created successfully!");
            setIsSubmitting(false);
            navigate("/dashboard/migration/leads");
        }, 1000);
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Link to="/dashboard/migration/leads">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-3xl font-semibold">Add New Lead</h2>
                    <p className="text-gray-600 mt-1">Capture new consultation inquiry</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Personal Information */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <UserPlus className="w-5 h-5" />
                            Personal Information
                        </CardTitle>
                        <CardDescription>Basic contact details of the lead</CardDescription>
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
                    </CardContent>
                </Card>

                {/* Visa Information */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Visa Information</CardTitle>
                        <CardDescription>Visa type and destination preferences</CardDescription>
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
                    </CardContent>
                </Card>

                {/* Lead Source */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Lead Source</CardTitle>
                        <CardDescription>How did this lead find us?</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="source">
                                Source <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={formData.source}
                                onValueChange={(value) => handleChange("source", value)}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select lead source" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="website">Website</SelectItem>
                                    <SelectItem value="facebook">Facebook Ads</SelectItem>
                                    <SelectItem value="google">Google Ads</SelectItem>
                                    <SelectItem value="referral">Referral</SelectItem>
                                    <SelectItem value="walkin">Walk-in</SelectItem>
                                    <SelectItem value="email">Email Campaign</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Additional Notes</Label>
                            <Textarea
                                id="notes"
                                placeholder="Any additional information about this lead..."
                                value={formData.notes}
                                onChange={(e) => handleChange("notes", e.target.value)}
                                rows={4}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                    <Link to="/dashboard/migration/leads">
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
                                Save Lead
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
