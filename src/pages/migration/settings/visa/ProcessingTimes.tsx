import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Clock, AlertCircle } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function ProcessingTimes() {
    const navigate = useNavigate();

    // Mock data for processing times
    const processingTimes = [
        { id: 1, visaType: "Skilled Independent (189)", standard: "50 Days", complex: "90 Days", lastUpdated: "2024-03-15", status: "Stable" },
        { id: 2, visaType: "Student Visa (500)", standard: "14 Days", complex: "45 Days", lastUpdated: "2024-03-20", status: "Delays" },
        { id: 3, visaType: "Partner Visa (820)", standard: "12 Months", complex: "24 Months", lastUpdated: "2024-02-10", status: "Stable" },
        { id: 4, visaType: "Employer Nomination (186)", standard: "6 Months", complex: "10 Months", lastUpdated: "2024-03-01", status: "Stable" },
        { id: 5, visaType: "Visitor Visa (600)", standard: "20 Days", complex: "35 Days", lastUpdated: "2024-03-28", status: "Delays" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Processing Times</h2>
                    <p className="text-muted-foreground mt-2">Manage estimated processing times per visa subclass.</p>
                </div>
                <Button onClick={() => navigate("/dashboard/migration/settings/processing-times/update")}>
                    <Plus className="mr-2 h-4 w-4" /> Update Times
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Wait Time</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.2 Months</div>
                        <p className="text-xs text-muted-foreground">Across all visa types</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Delayed Categories</CardTitle>
                        <AlertCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">2 Categories</div>
                        <p className="text-xs text-muted-foreground">Student (500), Visitor (600)</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Last Global Update</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Mar 28, 2024</div>
                        <p className="text-xs text-muted-foreground">Auto-synced from DHA</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Visa Processing Standards</CardTitle>
                    <CardDescription>Estimated turn-around times based on recent case data.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Visa Subclass</TableHead>
                                <TableHead>Standard Processing</TableHead>
                                <TableHead>Complex Case</TableHead>
                                <TableHead>Last Updated</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {processingTimes.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.visaType}</TableCell>
                                    <TableCell>{item.standard}</TableCell>
                                    <TableCell>{item.complex}</TableCell>
                                    <TableCell>{item.lastUpdated}</TableCell>
                                    <TableCell>
                                        <Badge variant={item.status === 'Delays' ? 'destructive' : 'outline'} className={item.status === 'Stable' ? 'bg-green-50 text-green-700 border-green-200' : ''}>
                                            {item.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">Edit</Button>
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
