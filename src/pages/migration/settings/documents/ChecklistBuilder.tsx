
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, CheckSquare, ListChecks, Calendar, Edit, Trash2 } from "lucide-react";
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

export default function ChecklistBuilder() {
    const navigate = useNavigate();

    // Mock data for checklists
    const checklists = [
        { id: 1, name: "Student Visa (500) - Application", items: 12, relatedVisa: "Student Visa (500)", lastUpdated: "2024-03-01", status: "Active" },
        { id: 2, name: "Partner Visa - Stage 1 Evidence", items: 24, relatedVisa: "Partner Visa (820/801)", lastUpdated: "2024-02-15", status: "Active" },
        { id: 3, name: "Citizenship Application", items: 8, relatedVisa: "Citizenship", lastUpdated: "2024-03-20", status: "Active" },
        { id: 4, name: "Employee Onboarding Checks", items: 15, relatedVisa: "Employer Nomination (186)", lastUpdated: "2024-01-10", status: "Draft" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Checklist Builder</h2>
                    <p className="text-muted-foreground mt-2">Create and manage document checklists for visa applications.</p>
                </div>
                <Button onClick={() => navigate("/dashboard/migration/settings/checklist-builder/create")}>
                    <Plus className="mr-2 h-4 w-4" /> Create Checklist
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Checklists</CardTitle>
                        <ListChecks className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{checklists.length}</div>
                        <p className="text-xs text-muted-foreground">Active and drafts</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Items</CardTitle>
                        <CheckSquare className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">14.7</div>
                        <p className="text-xs text-muted-foreground">Items per checklist</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Last Modified</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Mar 20</div>
                        <p className="text-xs text-muted-foreground">Recent updates</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Checklist Library</CardTitle>
                    <CardDescription>All configured checklists available for cases.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Checklist Name</TableHead>
                                <TableHead>Related Visa/Service</TableHead>
                                <TableHead>Total Items</TableHead>
                                <TableHead>Last Updated</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {checklists.map((list) => (
                                <TableRow key={list.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <ListChecks className="h-4 w-4 text-purple-500" />
                                            {list.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{list.relatedVisa}</TableCell>
                                    <TableCell>{list.items}</TableCell>
                                    <TableCell>{list.lastUpdated}</TableCell>
                                    <TableCell>
                                        <Badge variant={list.status === 'Active' ? 'default' : 'secondary'} className={list.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-100 border-none' : ''}>
                                            {list.status}
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
