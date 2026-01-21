import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function Milestones() {
    const navigate = useNavigate();

    // Mock data for demonstration
    const milestones = [
        { id: 1, name: "Initial Assessment", description: "Review of client details and eligibility check", stage: 1, status: "Active" },
        { id: 2, name: "Documents Collection", description: "Gathering necessary documents from client", stage: 2, status: "Active" },
        { id: 3, name: "Application Lodgement", description: "Submitting application to authorities", stage: 3, status: "Active" },
        { id: 4, name: "Medical Request", description: "Client to undergo medical examination", stage: 4, status: "Active" },
        { id: 5, name: "Visa Grant", description: "Final approval received", stage: 5, status: "Active" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Milestones Configuration</h2>
                    <p className="text-muted-foreground mt-2">Manage standard case milestones and workflow stages.</p>
                </div>
                <Button onClick={() => navigate("/dashboard/migration/settings/milestones/create")}>
                    <Plus className="mr-2 h-4 w-4" /> Add Milestone
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Standard Milestones</CardTitle>
                    <CardDescription>Default milestones applied to new migration cases.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Stage</TableHead>
                                <TableHead>Milestone Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {milestones.map((milestone) => (
                                <TableRow key={milestone.id}>
                                    <TableCell className="font-medium">
                                        <Badge variant="outline">Stage {milestone.stage}</Badge>
                                    </TableCell>
                                    <TableCell className="font-semibold">{milestone.name}</TableCell>
                                    <TableCell className="text-muted-foreground">{milestone.description}</TableCell>
                                    <TableCell>
                                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                                            {milestone.status}
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
