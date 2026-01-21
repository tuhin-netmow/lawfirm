import { DataTable } from "@/components/dashboard/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Mail,
    MessageSquare,
    Smartphone,
    CheckCircle,
    XCircle,
    Clock,
    Filter,
    RefreshCw
} from "lucide-react";
import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

interface Log {
    id: number;
    recipient: string;
    type: "email" | "whatsapp" | "sms";
    subject?: string;
    status: "sent" | "delivered" | "failed" | "pending";
    timestamp: string;
    agent: string;
}

const mockLogs: Log[] = [
    {
        id: 1,
        recipient: "Ahmed Hassan (Client)",
        type: "email",
        subject: "Visa Application Update",
        status: "sent",
        timestamp: "2026-01-07 10:30 AM",
        agent: "Sarah Johnson"
    },
    {
        id: 2,
        recipient: "+61 400 123 456",
        type: "sms",
        subject: "Appointment Reminder",
        status: "delivered",
        timestamp: "2026-01-07 09:15 AM",
        agent: "System"
    },
    {
        id: 3,
        recipient: "+61 400 987 654",
        type: "whatsapp",
        subject: "Welcome Message",
        status: "failed",
        timestamp: "2026-01-06 14:20 PM",
        agent: "Mike Chen"
    },
    {
        id: 4,
        recipient: "Fatima Rahman",
        type: "email",
        subject: "Invoice #INV-2026-002",
        status: "delivered",
        timestamp: "2026-01-06 11:00 AM",
        agent: "Finance Bot"
    }
];

export default function CommunicationLogs() {
    const [pageIndex, setPageIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredLogs = mockLogs.filter((log) =>
        log.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.subject?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getTypeIcon = (type: Log["type"]) => {
        switch (type) {
            case "email": return <Mail className="w-4 h-4 text-indigo-600" />;
            case "whatsapp": return <MessageSquare className="w-4 h-4 text-green-600" />;
            case "sms": return <Smartphone className="w-4 h-4 text-blue-600" />;
        }
    };

    const getStatusBadge = (status: Log["status"]) => {
        const styles = {
            sent: "bg-blue-100 text-blue-800",
            delivered: "bg-green-100 text-green-800",
            failed: "bg-red-100 text-red-800",
            pending: "bg-yellow-100 text-yellow-800"
        };
        return <Badge className={styles[status]}>{status.toUpperCase()}</Badge>;
    };

    const columns: ColumnDef<Log>[] = [
        {
            accessorKey: "type",
            header: "Channel",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    {getTypeIcon(row.getValue("type"))}
                    <span className="capitalize">{row.getValue("type")}</span>
                </div>
            ),
        },
        {
            accessorKey: "recipient",
            header: "Recipient",
            cell: ({ row }) => <span className="font-medium">{row.getValue("recipient")}</span>,
        },
        {
            accessorKey: "subject",
            header: "Content / Subject",
            cell: ({ row }) => <span className="text-gray-600 truncate max-w-[200px] block">{row.getValue("subject") || "(No Subject)"}</span>,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => getStatusBadge(row.getValue("status")),
        },
        {
            accessorKey: "timestamp",
            header: "Time",
            cell: ({ row }) => (
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock size={12} />
                    {row.getValue("timestamp")}
                </div>
            ),
        },
        {
            accessorKey: "agent",
            header: "Sent By",
        }
    ];

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">Communication Logs</h2>
                    <p className="text-gray-500">History of all messages sent to clients</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <RefreshCw size={16} /> Refresh
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Today's Volume</p>
                            <h3 className="text-2xl font-bold mt-1">128</h3>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-full">
                            <Mail className="w-5 h-5 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Delivery Rate</p>
                            <h3 className="text-2xl font-bold mt-1 text-green-600">98.5%</h3>
                        </div>
                        <div className="p-3 bg-green-50 rounded-full">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Failed</p>
                            <h3 className="text-2xl font-bold mt-1 text-red-600">3</h3>
                        </div>
                        <div className="p-3 bg-red-50 rounded-full">
                            <XCircle className="w-5 h-5 text-red-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Message History</CardTitle>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Filter size={14} /> Filter
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={filteredLogs}
                        pageIndex={pageIndex}
                        pageSize={10}
                        totalCount={filteredLogs.length}
                        onPageChange={setPageIndex}
                        onSearch={(term) => setSearchTerm(term)}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
