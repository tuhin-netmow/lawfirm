import { DataTable } from "@/components/dashboard/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Calendar,
    Clock,
    MapPin,
    User,
    Video,
    Phone,
    CheckCircle,
    XCircle,
    PlusCircle,
    Filter,
    Users
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import type { ColumnDef } from "@tanstack/react-table";

// Mock Data
interface Appointment {
    id: number;
    title: string;
    client: string;
    type: "consultation" | "follow_up" | "visa_signing" | "walk_in";
    status: "scheduled" | "completed" | "cancelled" | "no_show";
    dateTime: string;
    mode: "in_person" | "video" | "phone";
    consultant: string;
    location?: string;
}

const mockAppointments: Appointment[] = [
    {
        id: 1,
        title: "Initial Consultation",
        client: "Ahmed Hassan",
        type: "consultation",
        status: "scheduled",
        dateTime: "2026-01-08 10:00 AM",
        mode: "in_person",
        consultant: "Sarah Johnson",
        location: "Office Room 101"
    },
    {
        id: 2,
        title: "Visa Application Review",
        client: "Fatima Rahman",
        type: "follow_up",
        status: "scheduled",
        dateTime: "2026-01-08 14:30 PM",
        mode: "video",
        consultant: "Mike Chen"
    },
    {
        id: 3,
        title: "Walk-in Inquiry",
        client: "New Visitor",
        type: "walk_in",
        status: "completed",
        dateTime: "2026-01-07 09:15 AM",
        mode: "in_person",
        consultant: "Reception",
        location: "Front Desk"
    },
    {
        id: 4,
        title: "Contract Signing",
        client: "Kamal Uddin",
        type: "visa_signing",
        status: "completed",
        dateTime: "2026-01-06 11:00 AM",
        mode: "in_person",
        consultant: "Sarah Johnson",
        location: "Meeting Room A"
    },
    {
        id: 5,
        title: "Document Check",
        client: "Nusrat Jahan",
        type: "follow_up",
        status: "cancelled",
        dateTime: "2026-01-05 15:00 PM",
        mode: "phone",
        consultant: "Mike Chen"
    }
];

export default function AppointmentsList() {
    const [pageIndex, setPageIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();

    // Determine filter based on URL
    const getPageContext = () => {
        if (location.pathname.includes("today")) return { filter: "today", title: "Today's Appointments" };
        if (location.pathname.includes("walk-in")) return { filter: "walk_in", title: "Walk-in Management" };
        return { filter: "all", title: "All Appointments" };
    };

    const { filter, title } = getPageContext();

    const filteredAppointments = mockAppointments.filter((apt) => {
        const matchesSearch = Object.values(apt).some((value) =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );

        let matchesFilter = true;

        // Mock date logic

        if (filter === "today") {
            // Very rough check for mock purposes
            matchesFilter = apt.dateTime.includes("2026-01-08");
        } else if (filter === "walk_in") {
            matchesFilter = apt.type === "walk_in";
        }

        return matchesSearch && matchesFilter;
    });

    const pageSize = 10;

    // Stats
    const stats = [
        {
            label: "Total Today",
            value: mockAppointments.filter(a => a.dateTime.includes("2026-01-08")).length, // Mock today
            color: "bg-blue-600",
            icon: <Calendar className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Walk-ins",
            value: mockAppointments.filter(a => a.type === "walk_in").length,
            color: "bg-amber-600",
            icon: <Users className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Completed",
            value: mockAppointments.filter(a => a.status === "completed").length,
            color: "bg-green-600",
            icon: <CheckCircle className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Cancelled",
            value: mockAppointments.filter(a => a.status === "cancelled").length,
            color: "bg-red-600",
            icon: <XCircle className="w-10 h-10 opacity-80" />,
        },
    ];

    const getStatusBadge = (status: Appointment["status"]) => {
        const colors = {
            scheduled: "bg-blue-100 text-blue-800",
            completed: "bg-green-100 text-green-800",
            cancelled: "bg-red-100 text-red-800",
            no_show: "bg-gray-100 text-gray-800"
        };
        return <Badge className={colors[status]}>{status.replace('_', ' ').toUpperCase()}</Badge>;
    };

    const getTypeBadge = (type: Appointment["type"]) => {
        const colors = {
            consultation: "bg-purple-100 text-purple-800",
            follow_up: "bg-indigo-100 text-indigo-800",
            visa_signing: "bg-teal-100 text-teal-800",
            walk_in: "bg-amber-100 text-amber-800"
        };
        return <span className={`text-xs px-2 py-1 rounded-full font-medium ${colors[type]}`}>{type.replace('_', ' ')}</span>;
    };

    const getModeIcon = (mode: Appointment["mode"]) => {
        switch (mode) {
            case "in_person": return <MapPin size={16} className="text-gray-500" />;
            case "video": return <Video size={16} className="text-blue-500" />;
            case "phone": return <Phone size={16} className="text-green-500" />;
        }
    };

    const columns: ColumnDef<Appointment>[] = [
        {
            accessorKey: "title",
            header: "Details",
            cell: ({ row }) => (
                <div>
                    <div className="font-medium text-blue-600">{row.getValue("title")}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        {getModeIcon(row.original.mode)}
                        {row.original.mode === 'in_person' ? row.original.location : row.original.mode}
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "client",
            header: "Client",
            cell: ({ row }) => (
                <div className="font-medium flex items-center gap-2">
                    <User size={14} className="text-gray-400" />
                    {row.getValue("client")}
                </div>
            ),
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => getTypeBadge(row.getValue("type")),
        },
        {
            accessorKey: "dateTime",
            header: "Date & Time",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Clock size={14} />
                    {row.getValue("dateTime")}
                </div>
            ),
        },
        {
            accessorKey: "consultant",
            header: "Consultant",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => getStatusBadge(row.getValue("status")),
        },
        {
            id: "actions",
            header: "Actions",
            cell: () => (
                <Button variant="outline" size="sm">
                    View
                </Button>
            ),
        },
    ];

    return (
        <div className="w-full">
            <div className="flex flex-wrap justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">{title}</h2>
                    <p className="text-gray-600 mt-1">Schedule and manage consultations</p>
                </div>
                <div className="flex gap-3">
                    <Link to="/dashboard/migration/appointments/calendar">
                        <Button variant="outline" className="gap-2">
                            <Calendar size={16} /> Calendar
                        </Button>
                    </Link>
                    <Link to="/dashboard/migration/appointments/create">
                        <Button className="gap-2">
                            <PlusCircle size={16} /> New Appointment
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {stats.map((item, idx) => (
                    <div
                        key={idx}
                        className={`${item.color} text-white rounded-xl p-5 flex justify-between items-center shadow-lg`}
                    >
                        <div>
                            <h3 className="text-3xl font-bold">{item.value}</h3>
                            <p className="text-sm mt-1 opacity-90">{item.label}</p>
                        </div>
                        {item.icon}
                    </div>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Appointments</CardTitle>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Filter size={14} /> Filter
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={filteredAppointments}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        totalCount={filteredAppointments.length}
                        onPageChange={setPageIndex}
                        onSearch={(value) => setSearchTerm(value)}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
