import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Briefcase, TrendingUp, CheckCircle, Clock, Plane, BookOpen, Building2, Users, AlertCircle } from "lucide-react";
import { useLocation } from "react-router";

export default function CaseReports() {
    const location = useLocation();
    const isVisaTypeReport = location.pathname.includes("by-visa-type");
    const isStatusReport = location.pathname.includes("by-status");
    const isSuccessRateReport = location.pathname.includes("success-rate");

    // General Data
    const statusData = [
        { name: 'Active', value: 45, color: '#2563eb' },
        { name: 'Completed', value: 30, color: '#16a34a' },
        { name: 'Pending', value: 15, color: '#ca8a04' },
        { name: 'Overdue', value: 10, color: '#dc2626' },
    ];

    const monthlyData = [
        { name: 'Aug', cases: 12 },
        { name: 'Sep', cases: 19 },
        { name: 'Oct', cases: 15 },
        { name: 'Nov', cases: 25 },
        { name: 'Dec', cases: 32 },
        { name: 'Jan', cases: 28 },
    ];

    // Visa Type Specific Data
    const visaTypeData = [
        { name: 'Student Visa (Subclass 500)', value: 120, color: '#3b82f6', icon: BookOpen },
        { name: 'Skilled Independent (189)', value: 85, color: '#10b981', icon: Briefcase },
        { name: 'Business Innovation (188)', value: 45, color: '#8b5cf6', icon: Building2 },
        { name: 'Visitor Visa (600)', value: 60, color: '#f59e0b', icon: Plane },
        { name: 'Partner Visa (820/801)', value: 30, color: '#ec4899', icon: Users },
    ];

    const visaTrendData = [
        { month: 'Aug', student: 20, skilled: 15, business: 5 },
        { month: 'Sep', student: 25, skilled: 18, business: 8 },
        { month: 'Oct', student: 30, skilled: 22, business: 12 },
        { month: 'Nov', student: 35, skilled: 20, business: 10 },
        { month: 'Dec', student: 45, skilled: 25, business: 15 },
        { month: 'Jan', student: 50, skilled: 28, business: 18 },
    ];

    // Success Rate Data
    const successRateData = [
        { name: 'Approved', value: 92, color: '#16a34a' },
        { name: 'Rejected', value: 8, color: '#dc2626' },
    ];

    const successByVisaType = [
        { name: 'Student', successRate: 98 },
        { name: 'Skilled', successRate: 92 },
        { name: 'Business', successRate: 88 },
        { name: 'Visitor', successRate: 99 },
        { name: 'Partner', successRate: 95 },
    ];

    if (isSuccessRateReport) {
        return (
            <div className="w-full space-y-6">
                <div>
                    <h2 className="text-3xl font-semibold">Success Rate Analysis</h2>
                    <p className="text-gray-600">Performance metrics and approval ratings</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-green-50 border-green-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-green-800">Overall Approval Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full shadow-sm">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-green-900">92%</div>
                                    <p className="text-xs text-green-600">Last 12 months</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-red-50 border-red-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-red-800">Rejection Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full shadow-sm">
                                    <AlertCircle className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-red-900">8%</div>
                                    <p className="text-xs text-red-600">Common reason: Docs</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-blue-50 border-blue-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-blue-800">Total Decisions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full shadow-sm">
                                    <Briefcase className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-blue-900">450</div>
                                    <p className="text-xs text-blue-600">YTD processed</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Approval vs Rejection</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={successRateData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={({ name, percent }: { name?: string, percent?: number }) => `${name ?? ''} ${((percent || 0) * 100).toFixed(0)}%`}
                                    >
                                        {successRateData.map((entry, index) => (
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
                            <CardTitle>Success Rate by Visa Type</CardTitle>
                            <CardDescription>Approval percentage across different categories</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={successByVisaType} layout="vertical" margin={{ left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                    <XAxis type="number" domain={[0, 100]} />
                                    <YAxis dataKey="name" type="category" width={100} />
                                    <Tooltip />
                                    <Bar dataKey="successRate" fill="#16a34a" radius={[0, 4, 4, 0]}>
                                        {successByVisaType.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill="#16a34a" />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    if (isVisaTypeReport) {
        return (
            <div className="w-full space-y-6">
                <div>
                    <h2 className="text-3xl font-semibold">Cases by Visa Type</h2>
                    <p className="text-gray-600">Distribution and performance analysis of different visa categories</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-blue-50 border-blue-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-blue-800">Top Category</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full shadow-sm">
                                    <BookOpen className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-blue-900">Student Visa</div>
                                    <p className="text-xs text-blue-600">35% of total cases</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-purple-50 border-purple-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-purple-800">Highest Revenue</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full shadow-sm">
                                    <Building2 className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-purple-900">Business Visa</div>
                                    <p className="text-xs text-purple-600">Avg. $15k per case</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-green-50 border-green-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-green-800">Fastest Processing</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full shadow-sm">
                                    <Plane className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-green-900">Visitor Visa</div>
                                    <p className="text-xs text-green-600">Avg. 15 days</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Visa Category Distribution</CardTitle>
                            <CardDescription>Breakdown of active cases by visa subclass</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={visaTypeData} layout="vertical" margin={{ left: 40, right: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                    <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12 }} />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]}>
                                        {visaTypeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Category Growth Trends</CardTitle>
                            <CardDescription>Monthly applications by major categories</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={visaTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="student" name="Student" stroke="#3b82f6" strokeWidth={2} />
                                    <Line type="monotone" dataKey="skilled" name="Skilled" stroke="#10b981" strokeWidth={2} />
                                    <Line type="monotone" dataKey="business" name="Business" stroke="#8b5cf6" strokeWidth={2} />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    if (isStatusReport) {
        return (
            <div className="w-full space-y-6">
                <div>
                    <h2 className="text-3xl font-semibold">Cases by Status</h2>
                    <p className="text-gray-600">Detailed breakdown of case pipeline stages</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Status Distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={140}
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={({ name, percent }: { name?: string, percent?: number }) => `${name ?? ''} ${((percent || 0) * 100).toFixed(0)}%`}
                                    >
                                        {statusData.map((entry, index) => (
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
                            <CardTitle>Stages Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                            {/* Placeholder for more detailed status funnel or list */}
                            <div className="flex items-center justify-center h-full text-gray-500">
                                Detailed stage analysis coming soon...
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full space-y-6">
            <h2 className="text-3xl font-semibold">Case Reports & Analytics</h2>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Total Cases</p>
                                <h3 className="text-2xl font-bold">128</h3>
                            </div>
                            <Briefcase className="w-8 h-8 text-blue-500 opacity-80" />
                        </div>
                        <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                            <TrendingUp size={12} /> +12% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Success Rate</p>
                                <h3 className="text-2xl font-bold">94%</h3>
                            </div>
                            <CheckCircle className="w-8 h-8 text-green-500 opacity-80" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Avg. Processing Time</p>
                                <h3 className="text-2xl font-bold">45 Days</h3>
                            </div>
                            <Clock className="w-8 h-8 text-yellow-500 opacity-80" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Cases Growth Trend</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="cases" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Case Status Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex justify-center gap-4 mt-4">
                            {statusData.map((item) => (
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
