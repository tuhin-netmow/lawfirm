import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save, X, Upload, FileText } from "lucide-react";
import { Link } from "react-router";

export default function CreateTemplate() {
    return (
        <div className="w-full max-w-4xl mx-auto pb-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">Create Template</h2>
                    <p className="text-gray-500">Add a new document template to the repository</p>
                </div>
                <div className="flex gap-3">
                    <Link to="/dashboard/migration/documents/templates">
                        <Button variant="outline" className="gap-2">
                            <X size={16} /> Cancel
                        </Button>
                    </Link>
                    <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                        <Save size={16} /> Save Template
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Template Details</CardTitle>
                            <CardDescription>Basic information about the template</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Template Name</Label>
                                <Input placeholder="e.g. Student Visa Checklist 2026" />
                            </div>

                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="checklists">Checklists</SelectItem>
                                        <SelectItem value="legal">Legal/Contracts</SelectItem>
                                        <SelectItem value="employment">Employment</SelectItem>
                                        <SelectItem value="financial">Financial</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea placeholder="Describe the purpose of this template..." className="h-24" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Template Content</CardTitle>
                            <CardDescription>Upload a file or enter text content</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                                <div className="flex flex-col items-center gap-2 text-gray-500">
                                    <div className="p-3 bg-blue-50 rounded-full">
                                        <Upload className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <p className="font-medium">Click to upload file</p>
                                    <p className="text-xs">PDF, DOCX, or TXT (Max 5MB)</p>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Text Content</Label>
                                <Textarea placeholder="Enter template text content here..." className="h-64 font-mono text-sm" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Version</Label>
                                <Input defaultValue="1.0" />
                            </div>
                            <div className="space-y-2">
                                <Label>Language</Label>
                                <Select defaultValue="en">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en">English (US)</SelectItem>
                                        <SelectItem value="uk">English (UK)</SelectItem>
                                        <SelectItem value="es">Spanish</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-blue-50 border-blue-100">
                        <CardHeader>
                            <CardTitle className="text-blue-800 text-sm flex items-center gap-2">
                                <FileText size={16} /> Quick Tips
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-xs text-blue-700 space-y-2">
                            <p>• Use placeholders like {'{{client_name}}'} for dynamic content.</p>
                            <p>• Upload PDF for fixed-layout forms.</p>
                            <p>• Categorize correctly for easier searching.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
