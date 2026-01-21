import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, Users, TrendingUp, Filter } from "lucide-react";
import { useLocation } from "react-router";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function SalesReports() {
    const location = useLocation();
    const isSourcesReport = location.pathname.includes("sources");
    const isConversionReport = location.pathname.includes("conversion");
    const isConsultantReport = location.pathname.includes("by-consultant");

    // Mock Data
    const revenueData = [
        { name: 'Mon', sales: 4000 },
        { name: 'Tue', sales: 3000 },
        { name: 'Wed', sales: 2000 },
        { name: 'Thu', sales: 2780 },
        { name: 'Fri', sales: 1890 },
        { name: 'Sat', sales: 2390 },
        { name: 'Sun', sales: 3490 },
    ];

    const sourceData = [
        { name: 'Facebook Ads', value: 450, color: '#1877F2' },
        { name: 'Google Search', value: 300, color: '#4285F4' },
        { name: 'Referrals', value: 200, color: '#34A853' },
        { name: 'LinkedIn', value: 150, color: '#0A66C2' },
        { name: 'Walk-in', value: 100, color: '#EA4335' },
        { name: 'TikTok', value: 80, color: '#000000' },
    ];

    const conversionData = [
        { stage: 'Leads', count: 1280 },
        { stage: 'Qualified', count: 850 },
        { stage: 'Consultation', count: 420 },
        { stage: 'Agreement', count: 180 },
        { stage: 'Visa Granted', count: 150 },
    ];

    const consultantData = [
        { name: 'Mike Chen', sales: 125000, deals: 15 },
        { name: 'Sarah Johnson', sales: 98000, deals: 12 },
        { name: 'David Smith', sales: 85000, deals: 10 },
        { name: 'Emily Davis', sales: 65000, deals: 8 },
        { name: 'James Wilson', sales: 45000, deals: 6 },
    ];

    if (isSourcesReport) {
        return (
            <div className="w-full space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-semibold">Lead Sources Report</h2>
                        <p className="text-gray-600">Analyze where your most valuable clients are coming from</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Select defaultValue="this_month">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="this_week">This Week</SelectItem>
                                <SelectItem value="this_month">This Month</SelectItem>
                                <SelectItem value="last_month">Last Month</SelectItem>
                                <SelectItem value="this_year">This Year</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline" size="icon">
                            <Filter className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-blue-50 border-blue-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-blue-800">Top Source</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-900">Facebook Ads</div>
                            <p className="text-xs text-blue-600 mt-1">35% of total leads</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-green-50 border-green-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-green-800">Best Conversion</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-900">Referrals</div>
                            <p className="text-xs text-green-600 mt-1">65% conversion rate</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-purple-50 border-purple-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-purple-800">Total Leads</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-900">1,280</div>
                            <p className="text-xs text-purple-600 mt-1">Across all channels</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Leads by Source Distribution</CardTitle>
                            <CardDescription>Visual breakdown of lead acquisition channels</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[400px] flex justify-center items-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={sourceData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={120}
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={({ name, percent }: { name?: string, percent?: number }) => `${name ?? ''} ${((percent || 0) * 100).toFixed(0)}%`}
                                    >
                                        {sourceData.map((entry, index) => (
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
                            <CardTitle>Source Performance (Volume)</CardTitle>
                            <CardDescription>Number of leads generated per channel</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={sourceData} layout="vertical" margin={{ left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                    <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" width={100} />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#8884d8" radius={[0, 4, 4, 0]}>
                                        {sourceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    if (isConversionReport) {
        return (
            <div className="w-full space-y-6">
                <h2 className="text-3xl font-semibold">Lead Conversion Report</h2>
                <Card>
                    <CardHeader><CardTitle>Funnel Analysis</CardTitle></CardHeader>
                    <CardContent className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={conversionData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="stage" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (isConsultantReport) {
        return (
            <div className="w-full space-y-6">
                <h2 className="text-3xl font-semibold">Sales by Consultant</h2>
                <Card>
                    <CardHeader><CardTitle>Top Performers</CardTitle></CardHeader>
                    <CardContent className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={consultantData} layout="vertical" margin={{ left: 40 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" />
                                <Tooltip />
                                <Bar dataKey="sales" fill="#10b981" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="w-full space-y-6">
            <h2 className="text-3xl font-semibold">Sales Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">$45,231.89</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Leads</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+2350</div>
                        <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12.5%</div>
                        <p className="text-xs text-muted-foreground">+2.4% from last month</p>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="sales" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
