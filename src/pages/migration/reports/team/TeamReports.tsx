import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Users, CheckCircle, Briefcase, TrendingUp, Star, Award } from "lucide-react";
import { useLocation } from "react-router";
import { DataTable } from "@/components/dashboard/components/DataTable";
import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";

export default function TeamReports() {
    const location = useLocation();
    const isCasesReport = location.pathname.includes("cases");
    const isConsultantsReport = location.pathname.includes("consultants");

    // Generic Task Data
    const taskData = [
        { name: 'Week 1', tasks: 40 },
        { name: 'Week 2', tasks: 30 },
        { name: 'Week 3', tasks: 50 },
        { name: 'Week 4', tasks: 70 },
    ];

    // Mock Data for Team Cases Report
    const teamCasesData = [
        { id: 1, name: "Alice Johnson", casesHandled: 45, won: 30, lost: 5, active: 10 },
        { id: 2, name: "Bob Smith", casesHandled: 38, won: 25, lost: 3, active: 10 },
        { id: 3, name: "Charlie Davis", casesHandled: 52, won: 40, lost: 2, active: 10 },
        { id: 4, name: "Diana Evans", casesHandled: 28, won: 15, lost: 8, active: 5 },
        { id: 5, name: "Evan Wright", casesHandled: 35, won: 20, lost: 5, active: 10 },
    ];

    const teamCasesColumns: ColumnDef<typeof teamCasesData[0]>[] = [
        {
            accessorKey: "name",
            header: "Team Member",
            cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>
        },
        {
            accessorKey: "casesHandled",
            header: "Total Cases",
        },
        {
            accessorKey: "won",
            header: "Won",
            cell: ({ row }) => <span className="text-green-600 font-bold">{row.getValue("won")}</span>
        },
        {
            accessorKey: "lost",
            header: "Lost",
            cell: ({ row }) => <span className="text-red-600 font-bold">{row.getValue("lost")}</span>
        },
        {
            accessorKey: "active",
            header: "Active",
            cell: ({ row }) => <span className="text-blue-600 font-bold">{row.getValue("active")}</span>
        },
        {
            id: "successRate",
            header: "Success Rate",
            cell: ({ row }) => {
                const won = row.getValue<number>("won");
                const total = row.getValue<number>("casesHandled");
                // Avoid division by zero
                const rate = total > 0 ? (won / total) * 100 : 0;
                return <Badge variant={rate > 80 ? "default" : "secondary"}>{rate.toFixed(1)}%</Badge>;
            }
        }
    ];

    // Mock Data for Consultant Performance
    const consultantPerformanceData = [
        { id: 1, name: "Alice Johnson", rating: 4.8, revenue: 15000, responseTime: 2.5, feedback: "Excellent" },
        { id: 2, name: "Bob Smith", rating: 4.5, revenue: 12000, responseTime: 3.0, feedback: "Good" },
        { id: 3, name: "Charlie Davis", rating: 4.9, revenue: 20000, responseTime: 1.5, feedback: "Outstanding" },
        { id: 4, name: "Diana Evans", rating: 4.2, revenue: 8000, responseTime: 4.0, feedback: "Average" },
        { id: 5, name: "Evan Wright", rating: 4.6, revenue: 13500, responseTime: 2.8, feedback: "Very Good" },
    ];

    const consultantColumns: ColumnDef<typeof consultantPerformanceData[0]>[] = [
        {
            accessorKey: "name",
            header: "Consultant",
            cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>
        },
        {
            accessorKey: "rating",
            header: "Avg Rating",
            cell: ({ row }) => {
                const rating = row.getValue<number>("rating");
                return <div className="flex items-center gap-1"><Star size={14} className="fill-yellow-400 text-yellow-400" /> {rating}</div>
            }
        },
        {
            accessorKey: "revenue",
            header: "Revenue Generated",
            cell: ({ row }) => `৳${row.getValue<number>("revenue").toLocaleString()}`
        },
        {
            accessorKey: "responseTime",
            header: "Avg Response (hrs)",
            cell: ({ row }) => `${row.getValue<number>("responseTime")} hrs`
        },
        {
            accessorKey: "feedback",
            header: "Feedback",
            cell: ({ row }) => <Badge variant="outline">{row.getValue("feedback")}</Badge>
        }
    ];

    // Radar chart data comparing top performers
    const radarData = [
        { subject: 'Rating', A: 100, B: 90, fullMark: 100 },
        { subject: 'Revenue', A: 98, B: 85, fullMark: 100 },
        { subject: 'Cases', A: 86, B: 100, fullMark: 100 },
        { subject: 'Response', A: 99, B: 80, fullMark: 100 },
        { subject: 'Retention', A: 85, B: 90, fullMark: 100 },
    ];

    // Transform data for stacked bar chart
    const chartData = teamCasesData.map(member => ({
        name: member.name.split(" ")[0], // First name for x-axis
        Won: member.won,
        Lost: member.lost,
        Active: member.active
    }));


    if (isConsultantsReport) {
        return (
            <div className="w-full space-y-6">
                <div>
                    <h2 className="text-3xl font-semibold">Consultant Performance</h2>
                    <p className="text-gray-600">Metric-based evaluation of individual consultant effectiveness</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-yellow-50 border-yellow-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-yellow-800">Top Rated</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full shadow-sm">
                                    <Star className="w-5 h-5 text-yellow-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-yellow-900">4.9/5.0</div>
                                    <p className="text-xs text-yellow-600">Charlie Davis</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-green-50 border-green-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-green-800">Highest Revenue</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full shadow-sm">
                                    <TrendingUp className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-green-900">৳20,000</div>
                                    <p className="text-xs text-green-600">Charlie Davis</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-purple-50 border-purple-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-purple-800">Best Response Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full shadow-sm">
                                    <Award className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-purple-900">1.5 hrs</div>
                                    <p className="text-xs text-purple-600">Avg across team: 2.8 hrs</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Performance Comparison</CardTitle>
                            <CardDescription>Metrics comparison between top 2 consultants (A vs B)</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="subject" />
                                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                                    <Radar name="Charlie" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                    <Radar name="Alice" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                                    <Legend />
                                    <Tooltip />
                                </RadarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Consultant Rankings</CardTitle>
                            <CardDescription>Based on revenue, rating, and efficiency</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DataTable
                                columns={consultantColumns}
                                data={consultantPerformanceData}
                                pageIndex={0}
                                pageSize={5}
                                totalCount={consultantPerformanceData.length}
                                onPageChange={() => { }}
                                onSearch={() => { }}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    if (isCasesReport) {
        return (
            <div className="w-full space-y-6">
                <div>
                    <h2 className="text-3xl font-semibold">Cases Handled by Team</h2>
                    <p className="text-gray-600">Breakdown of case distribution and outcomes per team member</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-purple-50 border-purple-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-purple-800">Total Cases Assigned</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full shadow-sm">
                                    <Briefcase className="w-5 h-5 text-purple-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-purple-900">198</div>
                                    <p className="text-xs text-purple-600">Current Quarter</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-green-50 border-green-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-green-800">Cases Won</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full shadow-sm">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-green-900">130</div>
                                    <p className="text-xs text-green-600">65.6% Overall Success</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-blue-50 border-blue-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-blue-800">Top Performer</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <div className="bg-white p-2 rounded-full shadow-sm">
                                    <TrendingUp className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-blue-900">Charlie</div>
                                    <p className="text-xs text-blue-600">40 Cases Won</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Team Performance (Won vs Lost)</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="Won" stackId="a" fill="#16a34a" />
                                    <Bar dataKey="Active" stackId="a" fill="#3b82f6" />
                                    <Bar dataKey="Lost" stackId="a" fill="#dc2626" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Detailed Breakdown</CardTitle>
                            <CardDescription>Individual case statistics</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DataTable
                                columns={teamCasesColumns}
                                data={teamCasesData}
                                pageIndex={0}
                                pageSize={5}
                                totalCount={teamCasesData.length}
                                onPageChange={() => { }}
                                onSearch={() => { }}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        )

    }

    // Default to Task Performance
    return (
        <div className="w-full space-y-6">
            <h2 className="text-3xl font-semibold">Team Performance - Tasks</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">145</div>
                        <p className="text-xs text-muted-foreground">+12% from last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Members</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Weekly Task Completion</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={taskData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="tasks" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
