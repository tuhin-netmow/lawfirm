
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft, FileCode } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CreateDocumentTemplate() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Add Document Template</h2>
                    <p className="text-sm text-muted-foreground">Create a new dynamic template for automated document generation.</p>
                </div>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Template Details</CardTitle>
                        <CardDescription>Basic configuration for the document template.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Template Name <span className="text-red-500">*</span></label>
                                    <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. Migration Service Agreement" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Category</label>
                                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="">Select Category</option>
                                        <option value="contracts">Contracts & Agreements</option>
                                        <option value="forms">Official Forms</option>
                                        <option value="letters">Letters & Correspondence</option>
                                        <option value="checklists">Checklists</option>
                                        <option value="invoices">Invoices & Receipts</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Output Format</label>
                                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="pdf">PDF Document</option>
                                        <option value="docx">Word Document (DOCX)</option>
                                        <option value="html">HTML / Web Page</option>
                                        <option value="txt">Plain Text</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Status</label>
                                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="active">Active</option>
                                        <option value="draft">Draft</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <textarea className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="Brief description of what this template is used for..." />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Template Editor</CardTitle>
                        <CardDescription>Design your template using dynamic placeholders.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Alert>
                                <FileCode className="h-4 w-4" />
                                <AlertTitle>Dynamic Variables</AlertTitle>
                                <AlertDescription>
                                    Use variables like <code className="bg-muted px-1 py-0.5 rounded text-xs">{'{{client_name}}'}</code>, <code className="bg-muted px-1 py-0.5 rounded text-xs">{'{{visa_type}}'}</code>, and <code className="bg-muted px-1 py-0.5 rounded text-xs">{'{{application_date}}'}</code> to automatically populate data.
                                </AlertDescription>
                            </Alert>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Content Body</label>
                                <textarea className="flex min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="Start typing your template content here..." />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
                    <Button>
                        <Save className="mr-2 h-4 w-4" /> Save Template
                    </Button>
                </div>
            </div>
        </div>
    );
}
