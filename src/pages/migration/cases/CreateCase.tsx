import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Save, X } from "lucide-react";
import { Link } from "react-router";

export default function CreateCase() {
    return (
        <div className="w-full max-w-5xl mx-auto pb-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">Create New Case</h2>
                    <p className="text-gray-500">Start a new migration case for a client</p>
                </div>
                <div className="flex gap-3">
                    <Link to="/dashboard/migration/cases">
                        <Button variant="outline" className="gap-2">
                            <X size={16} /> Cancel
                        </Button>
                    </Link>
                    <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                        <Save size={16} /> Save Case
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="md:col-span-2 space-y-6">
                    {/* Client Selection */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Client Information</CardTitle>
                            <CardDescription>Select the client for this case</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Select Client</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Search for a client..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="c1">Ahmed Hassan (LEAD-001)</SelectItem>
                                        <SelectItem value="c2">Fatima Rahman (LEAD-002)</SelectItem>
                                        <SelectItem value="new">+ Create New Client</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Case Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Case Details</CardTitle>
                            <CardDescription>Configure the visa type and case specifics</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Visa Type</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Visa Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="student">Student Visa (500)</SelectItem>
                                            <SelectItem value="skilled">Skilled Migration (189/190)</SelectItem>
                                            <SelectItem value="partner">Partner Visa (820/801)</SelectItem>
                                            <SelectItem value="visitor">Visitor Visa (600)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Destination Country</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Country" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="au">Australia</SelectItem>
                                            <SelectItem value="ca">Canada</SelectItem>
                                            <SelectItem value="uk">United Kingdom</SelectItem>
                                            <SelectItem value="us">USA</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Case Priority</Label>
                                <Select defaultValue="medium">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="high">High Priority</SelectItem>
                                        <SelectItem value="medium">Medium Priority</SelectItem>
                                        <SelectItem value="low">Low Priority</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Description / Notes</Label>
                                <Textarea placeholder="Enter initial case notes..." className="h-24" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Assignment</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Assign To Agent</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Agent" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sara">Sarah Johnson</SelectItem>
                                        <SelectItem value="mike">Mike Chen</SelectItem>
                                        <SelectItem value="me">Assign to Me</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Due Date</Label>
                                <Input type="date" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Workflow Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm">
                                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">1</Badge>
                                    <span>Document Collection</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm opacity-60">
                                    <Badge variant="outline">2</Badge>
                                    <span>Application Review</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm opacity-60">
                                    <Badge variant="outline">3</Badge>
                                    <span>Submission</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
