import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Mail,
    MessageSquare,
    Smartphone,
    Plus,
    Search,
    MoreHorizontal,
    FileText
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { useState } from "react";

interface Template {
    id: number;
    name: string;
    subject?: string; // Only for email
    content: string;
    type: "email" | "whatsapp" | "sms";
    lastUpdated: string;
    status: "active" | "draft";
}

const mockTemplates: Template[] = [
    {
        id: 1,
        name: "Welcome Email",
        subject: "Welcome to Migration Consultancy",
        content: "Dear {{name}}, Welcome to our services...",
        type: "email",
        lastUpdated: "2026-01-02",
        status: "active"
    },
    {
        id: 2,
        name: "Visa Approval SMS",
        content: "Hi {{name}}, your visa {{visa_type}} has been approved!",
        type: "sms",
        lastUpdated: "2025-12-28",
        status: "active"
    },
    {
        id: 3,
        name: "Appointment Reminder WhatsApp",
        content: "Hello {{name}}, reminder for your appointment on {{date}}.",
        type: "whatsapp",
        lastUpdated: "2026-01-05",
        status: "active"
    },
    {
        id: 4,
        name: "Document Request",
        subject: "Action Required: Missing Documents",
        content: "Dear {{name}}, please upload the following...",
        type: "email",
        lastUpdated: "2026-01-06",
        status: "draft"
    }
];

export default function CommunicationTemplates() {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState("");

    const getContext = () => {
        if (location.pathname.includes("whatsapp")) return { type: "whatsapp", title: "WhatsApp Templates", icon: <MessageSquare className="w-6 h-6 text-green-600" /> };
        if (location.pathname.includes("sms")) return { type: "sms", title: "SMS Templates", icon: <Smartphone className="w-6 h-6 text-blue-600" /> };
        return { type: "email", title: "Email Templates", icon: <Mail className="w-6 h-6 text-indigo-600" /> };
    };

    const { type, title, icon } = getContext();

    const filteredTemplates = mockTemplates.filter(t =>
        t.type === type &&
        t.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                        {icon}
                    </div>
                    <div>
                        <h2 className="text-3xl font-semibold">{title}</h2>
                        <p className="text-gray-500">Manage your {type} communication templates</p>
                    </div>
                </div>
                <Link to={`/dashboard/migration/communication/create-${type === 'email' ? 'email' : type}-template`}>
                    <Button className="gap-2">
                        <Plus size={16} /> Create Template
                    </Button>
                </Link>
            </div>

            <div className="relative mb-6">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                    className="pl-10 max-w-sm"
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                    <Card key={template.id} className="hover:shadow-md transition-shadow group cursor-pointer">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-gray-400" />
                                    <Badge variant={template.status === "active" ? "secondary" : "outline"} className={template.status === "active" ? "bg-green-100 text-green-700 hover:bg-green-100" : "text-gray-500"}>
                                        {template.status}
                                    </Badge>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreHorizontal size={16} />
                                </Button>
                            </div>
                            <CardTitle className="text-lg mt-2">{template.name}</CardTitle>
                            {template.subject && (
                                <CardDescription className="line-clamp-1 mt-1 font-medium text-gray-700">
                                    Subject: {template.subject}
                                </CardDescription>
                            )}
                        </CardHeader>
                        <CardContent>
                            <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-600 min-h-[80px] line-clamp-3 font-mono">
                                {template.content}
                            </div>
                            <div className="mt-4 pt-3 border-t text-xs text-gray-400 flex justify-between items-center">
                                <span>Updated: {template.lastUpdated}</span>
                                <Button variant="link" size="sm" className="h-auto p-0 text-blue-600">Edit</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
