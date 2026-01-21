
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MapPin, Users, Edit, Trash2, Building2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function BranchesList() {
    const navigate = useNavigate();

    // Mock data for Branches
    const branches = [
        { id: 1, name: "Sydney HQ", location: "Sydney, NSW", manager: "Sarah Jenkins", staff: 12, contact: "(02) 9999 1111", status: "Active" },
        { id: 2, name: "Melbourne CBD", location: "Melbourne, VIC", manager: "David Lo", staff: 8, contact: "(03) 8888 2222", status: "Active" },
        { id: 3, name: "Brisbane Office", location: "Brisbane, QLD", manager: "Amanda Smith", staff: 5, contact: "(07) 7777 3333", status: "Active" },
        { id: 4, name: "Perth Outreach", location: "Perth, WA", manager: "-", staff: 0, contact: "-", status: "Opening Soon" },
        { id: 5, name: "Remote Team", location: "Online", manager: "James Wilson", staff: 15, contact: "-", status: "Active" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Branches</h2>
                    <p className="text-muted-foreground mt-2">Manage office locations and regional teams.</p>
                </div>
                <Button onClick={() => navigate("/dashboard/migration/settings/branches/create")}>
                    <Plus className="mr-2 h-4 w-4" /> Add Branch
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Branches</CardTitle>
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{branches.length}</div>
                        <p className="text-xs text-muted-foreground">Across 4 states</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">40</div>
                        <p className="text-xs text-muted-foreground">Assigned to branches</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">HQ Location</CardTitle>
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Sydney</div>
                        <p className="text-xs text-muted-foreground">Primary office</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Branch Directory</CardTitle>
                    <CardDescription>List of all registered office locations.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Branch Name</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Manager</TableHead>
                                <TableHead>Staff Count</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {branches.map((branch) => (
                                <TableRow key={branch.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Building2 className="h-4 w-4 text-blue-500" />
                                            {branch.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 text-muted-foreground">
                                            <MapPin className="h-3 w-3" />
                                            {branch.location}
                                        </div>
                                    </TableCell>
                                    <TableCell>{branch.manager}</TableCell>
                                    <TableCell>{branch.staff}</TableCell>
                                    <TableCell>{branch.contact}</TableCell>
                                    <TableCell>
                                        <Badge variant={branch.status === 'Active' ? 'default' : 'secondary'} className={branch.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-100 border-none' : ''}>
                                            {branch.status}
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
