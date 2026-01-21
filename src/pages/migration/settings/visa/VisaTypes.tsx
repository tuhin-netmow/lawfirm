
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Globe, GraduationCap, Briefcase, Heart, Users } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function VisaTypes() {
    const navigate = useNavigate();

    // Mock data for Visa Types
    const visaTypes = [
        { id: 1, name: "Skilled Independent", subclass: "189", category: "Skilled", processingTime: "5-9 Months", status: "Active" },
        { id: 2, name: "Skilled Nominated", subclass: "190", category: "Skilled", processingTime: "6-10 Months", status: "Active" },
        { id: 3, name: "Student Visa", subclass: "500", category: "Study", processingTime: "1-3 Months", status: "Active" },
        { id: 4, name: "Partner Visa (Onshore)", subclass: "820/801", category: "Family", processingTime: "12-24 Months", status: "Active" },
        { id: 5, name: "Employer Nomination Scheme", subclass: "186", category: "Employer Sponsored", processingTime: "6-11 Months", status: "Active" },
        { id: 6, name: "Temporary Skill Shortage", subclass: "482", category: "Employer Sponsored", processingTime: "2-4 Months", status: "Active" },
        { id: 7, name: "Visitor Visa", subclass: "600", category: "Visitor", processingTime: "2-4 Weeks", status: "Active" },
    ];

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "Skilled": return <Briefcase className="h-4 w-4 text-blue-500" />;
            case "Study": return <GraduationCap className="h-4 w-4 text-purple-500" />;
            case "Family": return <Heart className="h-4 w-4 text-pink-500" />;
            case "Employer Sponsored": return <Users className="h-4 w-4 text-orange-500" />;
            case "Visitor": return <Globe className="h-4 w-4 text-green-500" />;
            default: return <Briefcase className="h-4 w-4 text-gray-500" />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Visa Types</h2>
                    <p className="text-muted-foreground mt-2">Manage available visa subclasses and their configurations.</p>
                </div>
                <Button onClick={() => navigate("/dashboard/migration/settings/visa-types/create")}>
                    <Plus className="mr-2 h-4 w-4" /> Add Visa Type
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Visa Subclasses</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{visaTypes.length}</div>
                        <p className="text-xs text-muted-foreground">Active subclasses</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Categories</CardTitle>
                        <Globe className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">Skilled, Study, Family, etc.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Updates</CardTitle>
                        <Plus className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Today</div>
                        <p className="text-xs text-muted-foreground">Last updated</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Visa List</CardTitle>
                    <CardDescription>Comprehensive list of supported visa types.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Visa Name</TableHead>
                                <TableHead>Subclass</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Est. Processing</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {visaTypes.map((visa) => (
                                <TableRow key={visa.id}>
                                    <TableCell className="font-medium">{visa.name}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{visa.subclass}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {getCategoryIcon(visa.category)}
                                            {visa.category}
                                        </div>
                                    </TableCell>
                                    <TableCell>{visa.processingTime}</TableCell>
                                    <TableCell>
                                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-none">
                                            {visa.status}
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
