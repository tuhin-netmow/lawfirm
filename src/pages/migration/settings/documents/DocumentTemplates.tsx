
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, FileText, FileCheck, FileClock, Download } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function DocumentTemplates() {
    const navigate = useNavigate();

    // Mock data for templates
    const templates = [
        { id: 1, name: "Migration Service Agreement", category: "Contracts", type: "PDF/DOCX", lastUpdated: "2024-03-10", status: "Active" },
        { id: 2, name: "Visa Application Checklist (189)", category: "Checklists", type: "PDF", lastUpdated: "2024-02-28", status: "Active" },
        { id: 3, name: "Employer Support Letter", category: "Letters", type: "DOCX", lastUpdated: "2024-03-15", status: "Active" },
        { id: 4, name: "Health Declaration Form", category: "Forms", type: "PDF", lastUpdated: "2023-11-05", status: "Archived" },
        { id: 5, name: "Client Onboarding Form", category: "Forms", type: "Web Form", lastUpdated: "2024-01-20", status: "Active" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Document Templates</h2>
                    <p className="text-muted-foreground mt-2">Manage standard templates for contracts, forms, and letters.</p>
                </div>
                <Button onClick={() => navigate("/dashboard/migration/settings/document-templates/create")}>
                    <Plus className="mr-2 h-4 w-4" /> Add Template
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{templates.length}</div>
                        <p className="text-xs text-muted-foreground">Active and archived</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Draft Templates</CardTitle>
                        <FileClock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2</div>
                        <p className="text-xs text-muted-foreground">Work in progress</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Most Used</CardTitle>
                        <FileCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Service Agreement</div>
                        <p className="text-xs text-muted-foreground">152 generations this month</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Templates</CardTitle>
                    <CardDescription>Library of approved document templates.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Template Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Format</TableHead>
                                <TableHead>Last Updated</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {templates.map((template) => (
                                <TableRow key={template.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-blue-500" />
                                            {template.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{template.category}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{template.type}</Badge>
                                    </TableCell>
                                    <TableCell>{template.lastUpdated}</TableCell>
                                    <TableCell>
                                        <Badge variant={template.status === 'Active' ? 'default' : 'secondary'} className={template.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-100 border-none' : ''}>
                                            {template.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500" title="Download">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
