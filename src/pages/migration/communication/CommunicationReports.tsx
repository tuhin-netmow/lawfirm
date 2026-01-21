import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function CommunicationReports() {
    const activityData = [
        { day: 'Mon', email: 120, sms: 40, whatsapp: 30 },
        { day: 'Tue', email: 150, sms: 55, whatsapp: 45 },
        { day: 'Wed', email: 180, sms: 30, whatsapp: 50 },
        { day: 'Thu', email: 140, sms: 60, whatsapp: 40 },
        { day: 'Fri', email: 200, sms: 70, whatsapp: 60 },
        { day: 'Sat', email: 80, sms: 20, whatsapp: 30 },
        { day: 'Sun', email: 60, sms: 15, whatsapp: 25 },
    ];

    const engagementData = [
        { name: 'Email Open Rate', value: 65 },
        { name: 'SMS Click Rate', value: 45 },
        { name: 'WhatsApp Read Rate', value: 85 },
    ];

    return (
        <div className="w-full space-y-6">
            <h2 className="text-3xl font-semibold">Communication Insights</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Volume</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={activityData}>
                                <defs>
                                    <linearGradient id="colorEmail" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorSms" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="day" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Area type="monotone" dataKey="email" stroke="#4f46e5" fillOpacity={1} fill="url(#colorEmail)" />
                                <Area type="monotone" dataKey="sms" stroke="#2563eb" fillOpacity={1} fill="url(#colorSms)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Engagement Rates (%)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={engagementData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" domain={[0, 100]} />
                                <YAxis dataKey="name" type="category" width={120} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#10b981" barSize={40} radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
