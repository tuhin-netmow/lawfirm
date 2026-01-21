
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Package, Edit, Trash2, CheckCircle, CreditCard } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function PackagesList() {
    const navigate = useNavigate();

    // Mock data for Service Packages
    const packages = [
        { id: 1, name: "Consultation Only", type: "One-off", price: "$150", visaType: "All", salesCount: 145, status: "Active" },
        { id: 2, name: "Student Visa Standard", type: "Full Service", price: "$1,500", visaType: "Student (500)", salesCount: 89, status: "Active" },
        { id: 3, name: "Partner Visa Premium", type: "Full Service", price: "$4,500", visaType: "Partner (820)", salesCount: 42, status: "Active" },
        { id: 4, name: "Skill Assessment Basic", type: "Assessment", price: "$800", visaType: "Skilled (189/190)", salesCount: 67, status: "Active" },
        { id: 5, name: "Business Visa VIP", type: "Full Service", price: "$8,000", visaType: "Business (188)", salesCount: 12, status: "Active" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Service Packages</h2>
                    <p className="text-muted-foreground mt-2">Manage consultation fees and full service migration packages.</p>
                </div>
                <Button onClick={() => navigate("/dashboard/migration/settings/packages/create")}>
                    <Plus className="mr-2 h-4 w-4" /> Create Package
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{packages.length}</div>
                        <p className="text-xs text-muted-foreground">Active offerings</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Consultation</div>
                        <p className="text-xs text-muted-foreground">Highest volume sales</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$124k</div>
                        <p className="text-xs text-muted-foreground">YTD from packages</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Package Directory</CardTitle>
                    <CardDescription>List of all available service products.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Package Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Target Visa</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Sales</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {packages.map((pkg) => (
                                <TableRow key={pkg.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Package className="h-4 w-4 text-blue-500" />
                                            {pkg.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{pkg.type}</TableCell>
                                    <TableCell>{pkg.visaType}</TableCell>
                                    <TableCell>{pkg.price}</TableCell>
                                    <TableCell>{pkg.salesCount}</TableCell>
                                    <TableCell>
                                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                                            {pkg.status}
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
