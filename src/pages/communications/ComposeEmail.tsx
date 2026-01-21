
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
import { ArrowLeft, Send, Paperclip, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function ComposeEmail() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        to: "",
        subject: "",
        matter_id: "",
        message: "",
    });

    const [attachments, setAttachments] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            // Mock file upload
            const fileName = e.target.files[0].name;
            setAttachments(prev => [...prev, fileName]);
        }
    };

    const removeAttachment = (fileName: string) => {
        setAttachments(prev => prev.filter(f => f !== fileName));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API
        setTimeout(() => {
            console.log("Sending Email:", { ...formData, attachments });
            setIsLoading(false);
            navigate("/dashboard/communications/email");
        }, 1000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/dashboard/communications/email">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Compose Email</h1>
                    <p className="text-muted-foreground text-sm">Send a new message to a client or colleague.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>New Message</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="to">To <span className="text-red-500">*</span></Label>
                            <Input
                                id="to"
                                name="to"
                                placeholder="recipient@example.com"
                                required
                                value={formData.to}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
                                <Input
                                    id="subject"
                                    name="subject"
                                    placeholder="Message subject..."
                                    required
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="matter_id">Related Matter (Optional)</Label>
                                <Select
                                    value={formData.matter_id}
                                    onValueChange={(val) => setFormData(prev => ({ ...prev, matter_id: val }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a matter..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="101">Smith vs Jones</SelectItem>
                                        <SelectItem value="102">Estate of Elder</SelectItem>
                                        <SelectItem value="103">TechCorp Merger</SelectItem>
                                        <SelectItem value="general">General Inquiry</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="Write your message here..."
                                className="min-h-[300px]"
                                required
                                value={formData.message}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Attachments</Label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {attachments.map((file, idx) => (
                                    <div key={idx} className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full text-sm">
                                        <Paperclip className="w-3 h-3 text-slate-500" />
                                        <span>{file}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeAttachment(file)}
                                            className="text-slate-400 hover:text-red-500 ml-1"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('file-upload')?.click()}>
                                    <Paperclip className="mr-2 h-4 w-4" /> Attach Files
                                </Button>
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={() => navigate("/dashboard/communications/email")}
                            >
                                Discard
                            </Button>
                            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-500">
                                {isLoading ? "Sending..." : <><Send className="mr-2 h-4 w-4" /> Send Message</>}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
