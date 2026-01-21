
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
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function CreateMatter() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // Form State (Simplified for Mock)
    const [formData, setFormData] = useState({
        client_id: "",
        practice_area: "",
        title: "",
        description: "",
        status: "Open",
        stage: "Discovery",
        assigned_lawyer: "",
        open_date: new Date().toISOString().split('T')[0],
        confidential: false
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
            console.log("Submitting Matter:", formData);
            setIsLoading(false);
            navigate("/dashboard/matters");
        }, 1000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link to="/dashboard/matters">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Create New Matter</h1>
                    <p className="text-muted-foreground text-sm">Start a new legal case file.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Case Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">

                        {/* Client Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="client_id">Client <span className="text-red-500">*</span></Label>
                                <Select onValueChange={(val) => handleSelectChange("client_id", val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Client" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="101">John Smith</SelectItem>
                                        <SelectItem value="102">Emily Elder</SelectItem>
                                        <SelectItem value="103">TechCorp Inc.</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="practice_area">Practice Area <span className="text-red-500">*</span></Label>
                                <Select onValueChange={(val) => handleSelectChange("practice_area", val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Area" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Civil Litigation">Civil Litigation</SelectItem>
                                        <SelectItem value="Wills & Estates">Wills & Estates</SelectItem>
                                        <SelectItem value="Corporate">Corporate</SelectItem>
                                        <SelectItem value="Family Law">Family Law</SelectItem>
                                        <SelectItem value="Criminal Defense">Criminal Defense</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-2">
                            <Label htmlFor="title">Matter Title <span className="text-red-500">*</span></Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="e.g. Smith vs. Jones - Property Dispute"
                                required
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description / Notes</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Brief overview of the case..."
                                className="min-h-[100px]"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Assignment & Dates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="assigned_lawyer">Assigned Lawyer</Label>
                                <Select onValueChange={(val) => handleSelectChange("assigned_lawyer", val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Assign Lawyer" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Sarah Conner">Sarah Conner</SelectItem>
                                        <SelectItem value="Michael Ross">Michael Ross</SelectItem>
                                        <SelectItem value="Harvey Specter">Harvey Specter</SelectItem>
                                        <SelectItem value="Jessica Pearson">Jessica Pearson</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="open_date">Open Date</Label>
                                <Input
                                    id="open_date"
                                    name="open_date"
                                    type="date"
                                    value={formData.open_date}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        {/* Status & Options */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="status">Initial Status</Label>
                                <Select defaultValue="Open" onValueChange={(val) => handleSelectChange("status", val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Open">Open</SelectItem>
                                        <SelectItem value="On Hold">On Hold</SelectItem>
                                        <SelectItem value="Closed">Closed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center space-x-2 pt-8">
                                <input
                                    type="checkbox"
                                    id="confidential"
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    checked={formData.confidential}
                                    onChange={(e) => setFormData(prev => ({ ...prev, confidential: e.target.checked }))}
                                />
                                <Label htmlFor="confidential" className="font-medium">Mark as Confidential / Restricted Access</Label>
                            </div>
                        </div>

                        {/* Submit Actions */}
                        <div className="flex justify-end gap-4 pt-4">
                            <Link to="/dashboard/matters">
                                <Button variant="outline" type="button">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-500">
                                {isLoading ? "Creating..." : <><Save className="mr-2 h-4 w-4" /> Create Matter</>}
                            </Button>
                        </div>

                    </CardContent>
                </Card>
            </form>
        </div>
    );
}
