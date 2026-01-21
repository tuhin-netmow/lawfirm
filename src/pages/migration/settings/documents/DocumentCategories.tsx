
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Folder, FileText, Edit, Trash2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router";

export default function DocumentCategories() {
    const navigate = useNavigate();

    // Mock data for document categories
    const categories = [
        { id: 1, name: "Identity Documents", description: "Passports, ID cards, Birth Certificates", count: 145, status: "Active" },
        { id: 2, name: "Financial Records", description: "Bank statements, Tax returns, Payslips", count: 320, status: "Active" },
        { id: 3, name: "Employment Evidence", description: "Reference letters, Contracts, Resume", count: 210, status: "Active" },
        { id: 4, name: "Educational Qualifications", description: "Degrees, Transcripts, English Tests", count: 180, status: "Active" },
        { id: 5, name: "Character Documents", description: "Police checks, Statutory declarations", count: 95, status: "Active" },
        { id: 6, name: "Health Assessments", description: "Medical exam reports, Health insurance", count: 88, status: "Active" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Document Categories</h2>
                    <p className="text-muted-foreground mt-2">Organize documents into logical groups for easier management.</p>
                </div>
                <Button onClick={() => navigate("/dashboard/migration/settings/document-categories/create")}>
                    <Plus className="mr-2 h-4 w-4" /> Add Category
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
                        <Folder className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{categories.length}</div>
                        <p className="text-xs text-muted-foreground">Active categories</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,038</div>
                        <p className="text-xs text-muted-foreground">Across all categories</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Category List</CardTitle>
                    <CardDescription>Manage document categories and their visibility.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Category Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Documents</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Folder className="h-4 w-4 text-blue-500" />
                                            {category.name}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{category.description}</TableCell>
                                    <TableCell>{category.count}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                                            {category.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
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
