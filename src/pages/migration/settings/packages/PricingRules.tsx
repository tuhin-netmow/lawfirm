
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Percent, Calculator, CalendarClock, Edit, Trash2 } from "lucide-react";
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

export default function PricingRules() {
    const navigate = useNavigate();

    // Mock data for Pricing Rules
    const rules = [
        { id: 1, name: "Family Discount", type: "Discount", value: "10%", condition: "Multiple Applicants", status: "Active" },
        { id: 2, name: "Returning Client", type: "Discount", value: "$200", condition: "Previous Case Closed", status: "Active" },
        { id: 3, name: "Complex Case Loading", type: "Surcharge", value: "+15%", condition: "Previous Refusal", status: "Active" },
        { id: 4, name: "Student Renewal", type: "Fixed Price", value: "$900", condition: "Existing Student Visa", status: "Active" },
        { id: 5, name: "Seasonal Promo", type: "Discount", value: "5%", condition: "Apply in Dec", status: "Expired" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Pricing Rules</h2>
                    <p className="text-muted-foreground mt-2">Configure automated discounts, surcharges, and dynamic pricing logic.</p>
                </div>
                <Button onClick={() => navigate("/dashboard/migration/settings/pricing/create")}>
                    <Plus className="mr-2 h-4 w-4" /> Create Rule
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Rules</CardTitle>
                        <Calculator className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-muted-foreground">Currently applied</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Discount</CardTitle>
                        <Percent className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8.5%</div>
                        <p className="text-xs text-muted-foreground">Across sales</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
                        <CalendarClock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Oct 12</div>
                        <p className="text-xs text-muted-foreground">Rules modified</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Rules Configuration</CardTitle>
                    <CardDescription>Logic for automated price adjustments.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Rule Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Adjustment</TableHead>
                                <TableHead>Condition</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rules.map((rule) => (
                                <TableRow key={rule.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Calculator className="h-4 w-4 text-blue-500" />
                                            {rule.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{rule.type}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{rule.value}</Badge>
                                    </TableCell>
                                    <TableCell>{rule.condition}</TableCell>
                                    <TableCell>
                                        <Badge variant={rule.status === 'Active' ? 'default' : 'secondary'} className={rule.status === 'Active' ? 'bg-green-100 text-green-800 hover:bg-green-100 border-none' : ''}>
                                            {rule.status}
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
