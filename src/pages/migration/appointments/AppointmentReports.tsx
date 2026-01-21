import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CalendarCheck, Users, CheckCircle, Clock } from "lucide-react";

export default function AppointmentReports() {
    const weeklyData = [
        { name: 'Mon', scheduled: 12, completed: 10 },
        { name: 'Tue', scheduled: 15, completed: 14 },
        { name: 'Wed', scheduled: 18, completed: 15 },
        { name: 'Thu', scheduled: 10, completed: 9 },
        { name: 'Fri', scheduled: 14, completed: 12 },
    ];

    return (
        <div className="w-full space-y-6">
            <h2 className="text-3xl font-semibold">Appointment Analytics</h2>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Total Bookings (Jan)</p>
                                <h3 className="text-2xl font-bold">145</h3>
                            </div>
                            <CalendarCheck className="w-8 h-8 text-blue-500 opacity-80" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Avg. Consult Time</p>
                                <h3 className="text-2xl font-bold">45m</h3>
                            </div>
                            <Clock className="w-8 h-8 text-amber-500 opacity-80" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Show Rate</p>
                                <h3 className="text-2xl font-bold">92%</h3>
                            </div>
                            <CheckCircle className="w-8 h-8 text-green-500 opacity-80" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">Walk-ins</p>
                                <h3 className="text-2xl font-bold">24</h3>
                            </div>
                            <Users className="w-8 h-8 text-purple-500 opacity-80" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Weekly Appointments Overview</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={weeklyData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="scheduled" name="Scheduled" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="completed" name="Completed" fill="#22c55e" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
