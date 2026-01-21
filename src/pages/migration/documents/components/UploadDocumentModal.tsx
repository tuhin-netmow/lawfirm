
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Upload, X, FileText, Image as ImageIcon } from "lucide-react";
import { useState, useRef } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function UploadDocumentModal({
    trigger,
    onUpload,
}: {
    trigger?: React.ReactNode;
    onUpload?: (data: any) => void;
}) {
    const [file, setFile] = useState<File | null>(null);
    const [docType, setDocType] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleSubmit = () => {
        if (file && docType) {
            // Mock upload logic
            console.log("Uploading", file, docType);
            if (onUpload) {
                onUpload({ file, docType });
            }
            setIsOpen(false);
            setFile(null);
            setDocType("");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button className="gap-2">
                        <Upload size={16} /> Upload New
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Upload Document</DialogTitle>
                    <DialogDescription>
                        Upload a new document to the repository. Supported formats: PDF, JPG, PNG.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">

                    <div className="grid gap-2">
                        <Label htmlFor="doc-type">Document Type</Label>
                        <Select value={docType} onValueChange={setDocType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="identity">Identity Proof</SelectItem>
                                <SelectItem value="financial">Financial Record</SelectItem>
                                <SelectItem value="education">Education Certificate</SelectItem>
                                <SelectItem value="employment">Employment Record</SelectItem>
                                <SelectItem value="legal">Legal Document</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div
                        className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,.jpg,.jpeg,.png"
                        />

                        {file ? (
                            <div className="flex flex-col items-center text-blue-600">
                                {file.type.includes('image') ? <ImageIcon className="w-10 h-10 mb-2" /> : <FileText className="w-10 h-10 mb-2" />}
                                <p className="font-medium text-sm">{file.name}</p>
                                <p className="text-xs text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="mt-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setFile(null);
                                    }}
                                >
                                    <X className="w-3 h-3 mr-1" /> Remove
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-gray-400">
                                <Upload className="w-10 h-10 mb-2" />
                                <p className="font-medium text-sm text-gray-600">Click to upload or drag and drop</p>
                                <p className="text-xs mt-1">PDF, PNG, JPG up to 10MB</p>
                            </div>
                        )}
                    </div>

                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={!file || !docType}>Upload</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
