
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
import { ArrowLeft, CloudUpload, File, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function UploadDocument() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        category: "General",
        related_to: "Matter",
        related_id: "",
        visibility: "Team",
        security_level: "Normal",
        notes: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleManualFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
        }
    };

    const handleFileSelect = (file: File) => {
        setSelectedFile(file);
        // Auto-fill title if empty
        if (!formData.title) {
            setFormData(prev => ({ ...prev, title: file.name }));
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }

        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            console.log("Uploading Document:", { ...formData, file: selectedFile.name });
            setIsLoading(false);
            navigate("/dashboard/documents");
        }, 1200);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link to="/dashboard/documents">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Upload Document</h1>
                    <p className="text-muted-foreground text-sm">Add a new file to the secure document library.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Left Column: File Drop Zone */}
                    <div className="md:col-span-1 space-y-6">
                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle>File Selection</CardTitle>
                            </CardHeader>
                            <CardContent className="h-full flex flex-col justify-between">
                                {!selectedFile ? (
                                    <div
                                        className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 text-center transition-colors ${dragActive ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:border-blue-400"}`}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                    >
                                        <div className="p-4 bg-slate-100 rounded-full mb-4">
                                            <CloudUpload className="h-8 w-8 text-slate-500" />
                                        </div>
                                        <p className="text-sm font-medium">Drag & Drop file here</p>
                                        <p className="text-xs text-muted-foreground mt-2 mb-4">or click to browse</p>
                                        <input
                                            type="file"
                                            className="hidden"
                                            id="file-upload"
                                            onChange={handleManualFileSelect}
                                        />
                                        <Label htmlFor="file-upload">
                                            <div className="bg-white border hover:bg-slate-50 text-slate-900 px-4 py-2 rounded-md text-sm font-medium shadow-sm border-input cursor-pointer">
                                                Select File
                                            </div>
                                        </Label>
                                    </div>
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center p-6 border rounded-xl bg-slate-50">
                                        <File className="h-12 w-12 text-blue-600 mb-4" />
                                        <p className="font-medium text-center break-all">{selectedFile.name}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="mt-4 text-red-500 hover:text-red-700 hover:bg-red-50"
                                            onClick={removeFile}
                                        >
                                            <X className="w-4 h-4 mr-1" /> Remove
                                        </Button>
                                    </div>
                                )}
                                <div className="mt-4 text-xs text-muted-foreground text-center">
                                    Supported formats: PDF, DOCX, XLSX, JPG, PNG. <br /> Max size: 25MB.
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Metadata Form */}
                    <div className="md:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Document Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">

                                <div className="space-y-2">
                                    <Label htmlFor="title">Document Name <span className="text-red-500">*</span></Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="e.g. Signed Contract - Smith v Jones"
                                        required
                                        value={formData.title}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(val) => setFormData(prev => ({ ...prev, category: val }))}
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="General">General</SelectItem>
                                                <SelectItem value="Correspondence">Correspondence</SelectItem>
                                                <SelectItem value="Pleadings">Pleadings</SelectItem>
                                                <SelectItem value="Evidence">Evidence</SelectItem>
                                                <SelectItem value="Agreements">Agreements</SelectItem>
                                                <SelectItem value="Financial">Financial</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="related_to">Related To</Label>
                                        <Select
                                            value={formData.related_to}
                                            onValueChange={(val) => setFormData(prev => ({ ...prev, related_to: val }))}
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Matter">Matter / Case</SelectItem>
                                                <SelectItem value="Client">Client</SelectItem>
                                                <SelectItem value="None">None (General Firm Doc)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Conditional Linked ID Input */}
                                {formData.related_to !== 'None' && (
                                    <div className="space-y-2">
                                        <Label htmlFor="related_id">
                                            Select {formData.related_to} <span className="text-red-500">*</span>
                                        </Label>
                                        <Select
                                            value={formData.related_id}
                                            onValueChange={(val) => setFormData(prev => ({ ...prev, related_id: val }))}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={`Select ${formData.related_to}...`} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {/* Mock Data */}
                                                <SelectItem value="101">MAT-2024-001 (Smith vs Jones)</SelectItem>
                                                <SelectItem value="102">MAT-2024-002 (Estate of Elder)</SelectItem>
                                                <SelectItem value="103">Client: TechCorp Inc.</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="visibility">Visibility / Access</Label>
                                        <Select
                                            value={formData.visibility}
                                            onValueChange={(val) => setFormData(prev => ({ ...prev, visibility: val }))}
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Private">Private (Me Only)</SelectItem>
                                                <SelectItem value="Team">Team (Internal)</SelectItem>
                                                <SelectItem value="Client">Client (Shared to Portal)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="security_level">Security Level</Label>
                                        <Select
                                            value={formData.security_level}
                                            onValueChange={(val) => setFormData(prev => ({ ...prev, security_level: val }))}
                                        >
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Normal">Normal</SelectItem>
                                                <SelectItem value="Restricted">Restricted (Partners Only)</SelectItem>
                                                <SelectItem value="High">High (Ethical Wall)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="notes">Description / Notes</Label>
                                    <Textarea
                                        id="notes"
                                        name="notes"
                                        placeholder="Optional notes about this document..."
                                        value={formData.notes}
                                        onChange={handleInputChange}
                                        className="resize-none"
                                    />
                                </div>

                                {/* Submit Actions */}
                                <div className="flex justify-end gap-4 pt-4">
                                    <Link to="/dashboard/documents">
                                        <Button variant="outline" type="button">Cancel</Button>
                                    </Link>
                                    <Button type="submit" disabled={isLoading || !selectedFile} className="bg-blue-600 hover:bg-blue-500">
                                        {isLoading ? "Uploading..." : <><CloudUpload className="mr-2 h-4 w-4" /> Upload Document</>}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </form>
        </div>
    );
}
