
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Archive, Layers, Tag, Edit, Trash2 } from "lucide-react";
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

export default function AddOnServices() {
    const navigate = useNavigate();

    // Mock data for Add-on Services
    const addons = [
        { id: 1, name: "Priority Processing", description: "Expedited application handling", price: "$500", type: "Service", status: "Active" },
        { id: 2, name: "Resume Writing", description: "Professional CV creation", price: "$250", type: "Document", status: "Active" },
        { id: 3, name: "Translation Services", description: "Certified document translation (per page)", price: "$80", type: "Third-party", status: "Active" },
        { id: 4, name: "Interpreter Booking", description: "On-site or phone interpreter", price: "$150", type: "Third-party", status: "Inactive" },
        { id: 5, name: "Airport Pickup", description: "Arrival assistance service", price: "$120", type: "Service", status: "Active" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Add-on Services</h2>
                    <p className="text-muted-foreground mt-2">Manage optional extras and billable items for cases.</p>
                </div>
                <Button onClick={() => navigate("/dashboard/migration/settings/addons/create")}>
                    <Plus className="mr-2 h-4 w-4" /> Create Add-on
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Add-ons</CardTitle>
                        <Layers className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{addons.length}</div>
                        <p className="text-xs text-muted-foreground">Available extras</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Most Popular</CardTitle>
                        <Tag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Priority Processing</div>
                        <p className="text-xs text-muted-foreground">Attached to 35% of cases</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Archived</CardTitle>
                        <Archive className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1</div>
                        <p className="text-xs text-muted-foreground">Inactive services</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Services List</CardTitle>
                    <CardDescription>Catalog of add-on services available to clients.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Service Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Price (AUD)</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {addons.map((addon) => (
                                <TableRow key={addon.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Tag className="h-4 w-4 text-orange-500" />
                                            {addon.name}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{addon.description}</TableCell>
                                    <TableCell>{addon.type}</TableCell>
                                    <TableCell>{addon.price}</TableCell>
                                    <TableCell>
                                        <Badge variant={addon.status === 'Active' ? 'default' : 'secondary'} className={addon.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-100 border-none' : ''}>
                                            {addon.status}
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
