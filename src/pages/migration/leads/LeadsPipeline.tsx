import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    // Users,
    Mail,
    Phone,
    Calendar,
    MapPin,
    TrendingUp,
    ArrowLeft,
    Plus
} from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

interface Lead {
    id: number;
    name: string;
    email: string;
    phone: string;
    visaType: string;
    destination: string;
    source: string;
    score: number;
    createdAt: string;
}

interface Column {
    id: string;
    title: string;
    color: string;
    leads: Lead[];
}

export default function LeadsPipeline() {
    const [columns] = useState<Column[]>([
        {
            id: "new",
            title: "New",
            color: "bg-blue-100 border-blue-300",
            leads: [
                {
                    id: 3,
                    name: "Kamal Uddin",
                    email: "kamal.u@email.com",
                    phone: "+880 1612-456789",
                    visaType: "Tourist Visa",
                    destination: "UK",
                    source: "Referral",
                    score: 67,
                    createdAt: "2026-01-06",
                },
            ],
        },
        {
            id: "contacted",
            title: "Contacted",
            color: "bg-cyan-100 border-cyan-300",
            leads: [
                {
                    id: 1,
                    name: "Ahmed Hassan",
                    email: "ahmed.hassan@email.com",
                    phone: "+880 1712-345678",
                    visaType: "Student Visa",
                    destination: "Australia",
                    source: "Website",
                    score: 85,
                    createdAt: "2026-01-05",
                },
            ],
        },
        {
            id: "follow_up",
            title: "Follow-up",
            color: "bg-yellow-100 border-yellow-300",
            leads: [
                {
                    id: 2,
                    name: "Fatima Rahman",
                    email: "fatima.r@email.com",
                    phone: "+880 1812-987654",
                    visaType: "Skilled Migration",
                    destination: "Canada",
                    source: "Facebook Ads",
                    score: 92,
                    createdAt: "2026-01-04",
                },
            ],
        },
        {
            id: "appointment",
            title: "Appointment",
            color: "bg-purple-100 border-purple-300",
            leads: [
                {
                    id: 4,
                    name: "Nusrat Jahan",
                    email: "nusrat.j@email.com",
                    phone: "+880 1912-111222",
                    visaType: "Work Visa",
                    destination: "USA",
                    source: "Google Ads",
                    score: 78,
                    createdAt: "2026-01-03",
                },
            ],
        },
        {
            id: "converted",
            title: "Converted",
            color: "bg-green-100 border-green-300",
            leads: [
                {
                    id: 5,
                    name: "Rashid Khan",
                    email: "rashid.k@email.com",
                    phone: "+880 1512-333444",
                    visaType: "Partner Visa",
                    destination: "Australia",
                    source: "Walk-in",
                    score: 95,
                    createdAt: "2026-01-02",
                },
            ],
        },
        {
            id: "lost",
            title: "Lost",
            color: "bg-red-100 border-red-300",
            leads: [],
        },
    ]);

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    const totalLeads = columns.reduce((acc, col) => acc + col.leads.length, 0);

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <Link to="/dashboard/migration/leads">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                    <div>
                        <h2 className="text-3xl font-semibold">Pipeline View</h2>
                        <p className="text-gray-600 mt-1">
                            Drag and drop leads across stages
                        </p>
                    </div>
                </div>

                <Link to="/dashboard/migration/leads/create">
                    <Button className="flex items-center gap-2">
                        <Plus size={18} />
                        Add Lead
                    </Button>
                </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
                {columns.map((column) => (
                    <div
                        key={column.id}
                        className={`${column.color} border-2 rounded-lg p-4 text-center`}
                    >
                        <div className="text-2xl font-bold">{column.leads.length}</div>
                        <div className="text-sm font-medium mt-1">{column.title}</div>
                    </div>
                ))}
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {columns.map((column) => (
                    <div key={column.id} className="flex flex-col">
                        <div
                            className={`${column.color} border-2 rounded-t-lg px-4 py-3 font-semibold flex items-center justify-between`}
                        >
                            <span>{column.title}</span>
                            <Badge variant="secondary">{column.leads.length}</Badge>
                        </div>

                        <div className="bg-gray-50 border-2 border-t-0 rounded-b-lg p-2 min-h-[400px] space-y-3">
                            {column.leads.length === 0 ? (
                                <div className="text-center text-gray-400 py-8 text-sm">
                                    No leads
                                </div>
                            ) : (
                                column.leads.map((lead) => (
                                    <Card
                                        key={lead.id}
                                        className="cursor-pointer hover:shadow-lg transition-shadow"
                                    >
                                        <CardHeader className="pb-3">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="w-10 h-10">
                                                        <AvatarFallback className="bg-blue-500 text-white text-sm">
                                                            {getInitials(lead.name)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <CardTitle className="text-sm font-semibold">
                                                            {lead.name}
                                                        </CardTitle>
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            Score: {lead.score}/100
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`w-2 h-2 rounded-full ${lead.score >= 80
                                                        ? "bg-green-500"
                                                        : lead.score >= 60
                                                            ? "bg-yellow-500"
                                                            : "bg-red-500"
                                                        }`}
                                                />
                                            </div>
                                        </CardHeader>
                                        <CardContent className="space-y-2 text-xs">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Mail className="w-3 h-3" />
                                                <span className="truncate">{lead.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Phone className="w-3 h-3" />
                                                <span>{lead.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <MapPin className="w-3 h-3" />
                                                <span>
                                                    {lead.visaType} → {lead.destination}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Calendar className="w-3 h-3" />
                                                <span>{lead.createdAt}</span>
                                            </div>
                                            <Badge variant="outline" className="text-xs mt-2">
                                                {lead.source}
                                            </Badge>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Info Banner */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                        <h3 className="font-semibold text-blue-900">Pipeline Overview</h3>
                        <p className="text-sm text-blue-800 mt-1">
                            {totalLeads} total leads across 6 stages. Drag and drop functionality
                            coming soon - currently showing visual representation of your sales
                            pipeline.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
