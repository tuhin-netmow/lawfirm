import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, AlertCircle, Calendar } from "lucide-react";

export default function CaseTimeline() {
    const events = [
        {
            id: 1,
            title: "Visa Granted",
            date: "Today, 10:30 AM",
            type: "success",
            description: "Visitor Visa (600) granted for Maria Garcia.",
            agent: "Mike Chen"
        },
        {
            id: 2,
            title: "Document Verified",
            date: "Yesterday, 2:15 PM",
            type: "info",
            description: "Financial documents verified for Ahmed Hassan.",
            agent: "Sarah Johnson"
        },
        {
            id: 3,
            title: "Application Submitted",
            date: "Jan 5, 2026",
            type: "warning",
            description: "Skilled Migration application submitted for Fatima Rahman.",
            agent: "System"
        },
        {
            id: 4,
            title: "Case Overdue",
            date: "Jan 4, 2026",
            type: "error",
            description: "Partner Visa initial assessment overdue for John Smith.",
            agent: "Sarah Johnson"
        }
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case "success": return <CheckCircle className="text-green-500" />;
            case "error": return <AlertCircle className="text-red-500" />;
            case "warning": return <Clock className="text-yellow-500" />;
            default: return <Calendar className="text-blue-500" />;
        }
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">Case Timeline</h2>
                    <p className="text-gray-600">Recent activities across all cases</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        {events.map((event) => (
                            <div key={event.id} className="flex gap-4">
                                <div className="mt-1">
                                    {getIcon(event.type)}
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-semibold text-lg">{event.title}</h4>
                                        <span className="text-sm text-gray-500">{event.date}</span>
                                    </div>
                                    <p className="text-gray-700">{event.description}</p>
                                    <p className="text-sm text-gray-500">By {event.agent}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
