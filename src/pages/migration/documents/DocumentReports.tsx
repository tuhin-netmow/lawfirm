import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FileCheck, AlertTriangle, FileText, TrendingUp, Clock, AlertCircle, Calendar } from "lucide-react";
import { useLocation } from "react-router";
import { DataTable } from "@/components/dashboard/components/DataTable";
import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";

export default function DocumentReports() {
    const location = useLocation();
    const isPendingReport = location.pathname.includes("pending");
    const isExpiredReport = location.pathname.includes("expired");

    const verifiedData = [
        { name: 'Verified', value: 350, color: '#16a34a' },
        { name: 'Pending', value: 120, color: '#ca8a04' },
        { name: 'Rejected', value: 45, color: '#dc2626' },
    ];

    const monthlyUploads = [
        { name: 'Aug', docs: 120 },
        { name: 'Sep', docs: 150 },
        { name: 'Oct', docs: 180 },
        { name: 'Nov', docs: 220 },
        { name: 'Dec', docs: 250 },
        { name: 'Jan', docs: 210 },
    ];

    // Mock Data for Pending Documents
    const pendingDocsData = [
        { id: 1, type: "Passport", client: "John Doe", submittedDate: "2026-01-05", status: "pending", priority: "high" },
        { id: 2, type: "Bank Statement", client: "Jane Smith", submittedDate: "2026-01-06", status: "pending", priority: "medium" },
        { id: 3, type: "Police Clearance", client: "Bob Wilson", submittedDate: "2026-01-04", status: "pending", priority: "high" },
        { id: 4, type: "Health Insurance", client: "Alice Brown", submittedDate: "2026-01-07", status: "pending", priority: "low" },
        { id: 5, type: "Employment Letter", client: "Charlie Davis", submittedDate: "2026-01-02", status: "overdue", priority: "medium" },
    ];


    // Mock Data for Expired Documents
    const expiredDocsData = [
        { id: 1, type: "Passport", client: "Michael Scott", expiryDate: "2026-02-15", status: "expiring_soon", daysLeft: 40 },
        { id: 2, type: "Medical Checkup", client: "Pam Beesly", expiryDate: "2026-01-01", status: "expired", daysLeft: -6 },
        { id: 3, type: "Offer Letter", client: "Jim Halpert", expiryDate: "2026-03-01", status: "expiring_soon", daysLeft: 54 },
        { id: 4, type: "Bank Statement", client: "Dwight Schrute", expiryDate: "2025-12-25", status: "expired", daysLeft: -13 },
        { id: 5, type: "Visa Grant", client: "Ryan Howard", expiryDate: "2026-02-01", status: "expiring_soon", daysLeft: 25 },
    ];

    const pendingColumns: ColumnDef<typeof pendingDocsData[0]>[] = [
        {
            accessorKey: "type",
            header: "Document Type",
            cell: ({ row }) => <span className="font-medium">{row.getValue("type")}</span>
        },
        {
            accessorKey: "client",
            header: "Client",
        },
        {
            accessorKey: "submittedDate",
            header: "Submitted On",
        },
        {
            accessorKey: "priority",
            header: "Priority",
            cell: ({ row }) => {
                const priority = row.getValue("priority") as string;
                if (priority === "high") return <Badge variant="destructive">High</Badge>;
                if (priority === "medium") return <Badge className="bg-orange-500 hover:bg-orange-600">Medium</Badge>;
                return <Badge variant="secondary">Low</Badge>;
            }
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                if (status === "overdue") return <Badge variant="destructive">Overdue</Badge>;
                return <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">Pending Review</Badge>;
            }
        }
    ];

    const expiredColumns: ColumnDef<typeof expiredDocsData[0]>[] = [
        {
            accessorKey: "type",
            header: "Document Type",
            cell: ({ row }) => <span className="font-medium">{row.getValue("type")}</span>
        },
        {
            accessorKey: "client",
            header: "Client",
        },
        {
            accessorKey: "expiryDate",
            header: "Expiry Date",
        },
        {
            accessorKey: "daysLeft",
            header: "Days Left",
            cell: ({ row }) => {
                const days = row.getValue<number>("daysLeft");
                return <span className={days < 0 ? "text-red-500 font-bold" : "text-orange-600"}>{days < 0 ? `${Math.abs(days)} days ago` : `${days} days`}</span>
            }
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                if (status === "expired") return <Badge variant="destructive">Expired</Badge>;
                return <Badge className="bg-orange-500 hover:bg-orange-600">Expiring Soon</Badge>;
            }
        }
    ];

    // Pending Breakdown by Type
    const pendingByType = [
        { name: 'Identity Docs', value: 45, color: '#3b82f6' },
        { name: 'Financial', value: 35, color: '#10b981' },
        { name: 'Employment', value: 25, color: '#f59e0b' },
        { name: 'Medical', value: 15, color: '#ec4899' },
    ];

    const expiryBreakdown = [
        { name: 'Expired', value: 50, color: '#dc2626' },
        { name: 'Expires < 30 Days', value: 30, color: '#f97316' },
        { name: 'Expires < 90 Days', value: 20, color: '#eab308' },
    ];


    if (isExpiredReport) {
        return (
            <div className="w-full space-y-6">
                <div>
                    <h2 className="text-3xl font-semibold">Expired Documents Report</h2>
                    <p className="text-gray-600">Tracking expired and expiring documents</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-red-50 border-red-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-red-800">Already Expired</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full shadow-sm">
                                    <AlertCircle className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-red-900">45</div>
                                    <p className="text-xs text-red-600">Action required immediately</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-orange-50 border-orange-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-orange-800">Expiring Soon (30 days)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full shadow-sm">
                                    <Clock className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-orange-900">28</div>
                                    <p className="text-xs text-orange-600">Notify clients now</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-blue-50 border-blue-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-blue-800">Upcoming Renewals</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full shadow-sm">
                                    <Calendar className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-blue-900">150</div>
                                    <p className="text-xs text-blue-600">Next 90 days</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Expiry Status Distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={expiryBreakdown}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={({ name, percent }: { name?: string, percent?: number }) => `${name ?? ''} ${((percent || 0) * 100).toFixed(0)}%`}
                                    >
                                        {expiryBreakdown.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Documents at Risk</CardTitle>
                            <CardDescription>Documents expired or expiring within 60 days</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DataTable
                                columns={expiredColumns}
                                data={expiredDocsData}
                                pageIndex={0}
                                pageSize={5}
                                totalCount={expiredDocsData.length}
                                onPageChange={() => { }}
                                onSearch={() => { }}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    if (isPendingReport) {
        return (
            <div className="w-full space-y-6">
                <div>
                    <h2 className="text-3xl font-semibold">Pending Verifications</h2>
                    <p className="text-gray-600">Documents awaiting review and approval</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-yellow-50 border-yellow-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-yellow-800">Total Pending</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full shadow-sm">
                                    <Clock className="w-5 h-5 text-yellow-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-yellow-900">120</div>
                                    <p className="text-xs text-yellow-600">Avg. 2 days wait</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-red-50 border-red-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-red-800">Overdue Review</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full shadow-sm">
                                    <AlertCircle className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-red-900">15</div>
                                    <p className="text-xs text-red-600">Late by 3+ days</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-blue-50 border-blue-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-blue-800">High Priority</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full shadow-sm">
                                    <AlertTriangle className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-blue-900">32</div>
                                    <p className="text-xs text-blue-600">Urgent attention needed</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Pending by Category</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pendingByType}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={({ name, percent }: { name?: string, percent?: number }) => `${name ?? ''} ${((percent || 0) * 100).toFixed(0)}%`}
                                    >
                                        {pendingByType.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Pending Documents List</CardTitle>
                            <CardDescription>Recent submissions waiting for action</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DataTable
                                columns={pendingColumns}
                                data={pendingDocsData}
                                pageIndex={0}
                                pageSize={5}
                                totalCount={pendingDocsData.length}
                                onPageChange={() => { }}
                                onSearch={() => { }}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full space-y-6">
            <h2 className="text-3xl font-semibold">Document Reports</h2>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Total Uploads</p>
                                <h3 className="text-2xl font-bold">1,452</h3>
                            </div>
                            <FileText className="w-8 h-8 text-blue-500 opacity-80" />
                        </div>
                        <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                            <TrendingUp size={12} /> +15% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Verification Rate</p>
                                <h3 className="text-2xl font-bold">85%</h3>
                            </div>
                            <FileCheck className="w-8 h-8 text-green-500 opacity-80" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Rejection Rate</p>
                                <h3 className="text-2xl font-bold">8%</h3>
                            </div>
                            <AlertTriangle className="w-8 h-8 text-red-500 opacity-80" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Upload Trends</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyUploads}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="docs" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Verification Status</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={verifiedData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {verifiedData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center gap-4 mt-4">
                            {verifiedData.map((item) => (
                                <div key={item.name} className="flex items-center gap-2 text-sm">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                    {item.name}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
