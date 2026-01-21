import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    TrendingUp,
    TrendingDown,
    Users,
    Target,
    DollarSign,
    Calendar,
    BarChart3,
    PieChart,
} from "lucide-react";

export default function LeadReports() {
    // Mock data for charts - in production, this would come from API
    const monthlyData = [
        { month: "Jan", leads: 45, converted: 12 },
        { month: "Feb", leads: 52, converted: 15 },
        { month: "Mar", leads: 48, converted: 14 },
        { month: "Apr", leads: 61, converted: 18 },
        { month: "May", leads: 55, converted: 16 },
        { month: "Jun", leads: 68, converted: 22 },
    ];

    const sourceData = [
        { source: "Website", count: 62, percentage: 32 },
        { source: "Facebook", count: 45, percentage: 23 },
        { source: "Google Ads", count: 38, percentage: 20 },
        { source: "Referral", count: 28, percentage: 15 },
        { source: "Walk-in", count: 19, percentage: 10 },
    ];

    const conversionFunnel = [
        { stage: "Leads Generated", count: 192, percentage: 100 },
        { stage: "Contacted", count: 145, percentage: 75 },
        { stage: "Follow-up", count: 98, percentage: 51 },
        { stage: "Appointment", count: 67, percentage: 35 },
        { stage: "Converted", count: 52, percentage: 27 },
    ];

    const currentMonth = monthlyData[monthlyData.length - 1];
    const previousMonth = monthlyData[monthlyData.length - 2];
    const leadGrowth =
        ((currentMonth.leads - previousMonth.leads) / previousMonth.leads) * 100;
    const conversionGrowth =
        ((currentMonth.converted - previousMonth.converted) / previousMonth.converted) * 100;

    const totalLeads = monthlyData.reduce((sum, month) => sum + month.leads, 0);
    const totalConverted = monthlyData.reduce((sum, month) => sum + month.converted, 0);
    const overallConversion = (totalConverted / totalLeads) * 100;

    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-3xl font-semibold">Lead Reports & Analytics</h2>
                <p className="text-gray-600 mt-1">
                    Analyze lead performance and conversion trends
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Total Leads (6 months)</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-3xl font-bold">{totalLeads}</div>
                                <div className="flex items-center gap-1 text-sm mt-1">
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                    <span className="text-green-600 font-semibold">
                                        +{leadGrowth.toFixed(1)}%
                                    </span>
                                    <span className="text-gray-500">vs last month</span>
                                </div>
                            </div>
                            <Users className="w-10 h-10 text-blue-500 opacity-20" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Converted Leads</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-3xl font-bold">{totalConverted}</div>
                                <div className="flex items-center gap-1 text-sm mt-1">
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                    <span className="text-green-600 font-semibold">
                                        +{conversionGrowth.toFixed(1)}%
                                    </span>
                                    <span className="text-gray-500">vs last month</span>
                                </div>
                            </div>
                            <Target className="w-10 h-10 text-green-500 opacity-20" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Conversion Rate</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-3xl font-bold">{overallConversion.toFixed(1)}%</div>
                                <div className="text-sm text-gray-500 mt-1">Industry avg: 25%</div>
                            </div>
                            <BarChart3 className="w-10 h-10 text-purple-500 opacity-20" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Average Deal Value</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-3xl font-bold">৳45K</div>
                                <div className="text-sm text-gray-500 mt-1">Per converted lead</div>
                            </div>
                            <DollarSign className="w-10 h-10 text-yellow-500 opacity-20" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Monthly Trend */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            Monthly Lead Trend
                        </CardTitle>
                        <CardDescription>Leads generated and converted over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {monthlyData.map((data, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">{data.month}</span>
                                        <span className="text-gray-600">
                                            {data.leads} leads, {data.converted} converted
                                        </span>
                                    </div>
                                    <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="absolute h-full bg-blue-200 rounded-full"
                                            style={{ width: `${(data.leads / 70) * 100}%` }}
                                        />
                                        <div
                                            className="absolute h-full bg-green-500 rounded-full"
                                            style={{ width: `${(data.converted / 70) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className="flex gap-4 pt-4 border-t">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-blue-200 rounded-full" />
                                    <span className="text-sm">Total Leads</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                                    <span className="text-sm">Converted</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Lead Sources */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PieChart className="w-5 h-5" />
                            Lead Sources Distribution
                        </CardTitle>
                        <CardDescription>Where your leads are coming from</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {sourceData.map((source, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">{source.source}</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-600">{source.count} leads</span>
                                            <Badge variant="secondary">{source.percentage}%</Badge>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${idx === 0
                                                    ? "bg-blue-500"
                                                    : idx === 1
                                                        ? "bg-purple-500"
                                                        : idx === 2
                                                            ? "bg-green-500"
                                                            : idx === 3
                                                                ? "bg-yellow-500"
                                                                : "bg-red-500"
                                                }`}
                                            style={{ width: `${source.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Conversion Funnel */}
            <Card>
                <CardHeader>
                    <CardTitle>Conversion Funnel</CardTitle>
                    <CardDescription>Lead journey from first contact to conversion</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {conversionFunnel.map((stage, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">
                                            {idx + 1}
                                        </div>
                                        <span className="font-medium">{stage.stage}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-2xl font-bold">{stage.count}</span>
                                        <Badge>{stage.percentage}%</Badge>
                                    </div>
                                </div>
                                <div className="ml-11 h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                                        style={{ width: `${stage.percentage}%` }}
                                    />
                                </div>
                                {idx < conversionFunnel.length - 1 && (
                                    <div className="ml-11 flex items-center gap-2 text-sm text-gray-500">
                                        <TrendingDown className="w-4 h-4" />
                                        {(
                                            ((conversionFunnel[idx].count - conversionFunnel[idx + 1].count) /
                                                conversionFunnel[idx].count) *
                                            100
                                        ).toFixed(0)}
                                        % drop-off
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Insights */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-green-200 bg-green-50">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-green-900 text-sm">Best Performer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-semibold text-green-900">Website Leads</div>
                        <div className="text-sm text-green-700 mt-1">
                            32% of total, 29% conversion rate
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-yellow-200 bg-yellow-50">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-yellow-900 text-sm">Needs Attention</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-semibold text-yellow-900">Follow-up Stage</div>
                        <div className="text-sm text-yellow-700 mt-1">33% drop-off rate</div>
                    </CardContent>
                </Card>

                <Card className="border-blue-200 bg-blue-50">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-blue-900 text-sm">Recommendation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-semibold text-blue-900">Improve Follow-ups</div>
                        <div className="text-sm text-blue-700 mt-1">Reduce response time to 24hrs</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
