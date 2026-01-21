import { DataTable } from "@/components/dashboard/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ColumnDef } from "@tanstack/react-table";
import {
    Users,
    UserCheck,
    UserPlus,
    Globe,
    Mail,
    Phone,
    MapPin,
    Calendar,
    FileText,
    Edit,
    Eye,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

interface Client {
    id: number;
    clientNumber: string;
    name: string;
    email: string;
    phone: string;
    nationality: string;
    visaType: string;
    destination: string;
    status: "active" | "inactive" | "pending" | "completed";
    caseCount: number;
    registeredDate: string;
    assignedConsultant: string;
}

const mockClients: Client[] = [
    {
        id: 1,
        clientNumber: "CLI-2026-001",
        name: "Rashid Khan",
        email: "rashid.k@email.com",
        phone: "+880 1512-333444",
        nationality: "Bangladesh",
        visaType: "Partner Visa",
        destination: "Australia",
        status: "active",
        caseCount: 1,
        registeredDate: "2026-01-02",
        assignedConsultant: "Sarah Johnson",
    },
    {
        id: 2,
        clientNumber: "CLI-2026-002",
        name: "Ayesha Begum",
        email: "ayesha.b@email.com",
        phone: "+880 1712-555666",
        nationality: "Bangladesh",
        visaType: "Student Visa",
        destination: "Canada",
        status: "active",
        caseCount: 2,
        registeredDate: "2025-12-15",
        assignedConsultant: "Mike Chen",
    },
    {
        id: 3,
        clientNumber: "CLI-2025-089",
        name: "Mohammad Ali",
        email: "m.ali@email.com",
        phone: "+880 1812-777888",
        nationality: "Bangladesh",
        visaType: "Skilled Migration",
        destination: "Canada",
        status: "active",
        caseCount: 1,
        registeredDate: "2025-11-20",
        assignedConsultant: "Sarah Johnson",
    },
    {
        id: 4,
        clientNumber: "CLI-2025-076",
        name: "Sultana Parveen",
        email: "sultana.p@email.com",
        phone: "+880 1912-999000",
        nationality: "Bangladesh",
        visaType: "Work Visa",
        destination: "UK",
        status: "completed",
        caseCount: 1,
        registeredDate: "2025-10-05",
        assignedConsultant: "Mike Chen",
    },
    {
        id: 5,
        clientNumber: "CLI-2026-003",
        name: "Imran Hossain",
        email: "imran.h@email.com",
        phone: "+880 1612-111222",
        nationality: "Bangladesh",
        visaType: "Tourist Visa",
        destination: "USA",
        status: "pending",
        caseCount: 1,
        registeredDate: "2026-01-05",
        assignedConsultant: "Sarah Johnson",
    },
];

export default function ClientsList() {
    const [pageIndex, setPageIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const pageSize = 10;

    const filteredClients = mockClients.filter((client) =>
        Object.values(client).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const activeClients = mockClients.filter((c) => c.status === "active").length;

    const totalCases = mockClients.reduce((sum, c) => sum + c.caseCount, 0);

    const stats = [
        {
            label: "Total Clients",
            value: mockClients.length,
            color: "bg-blue-600",
            icon: <Users className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Active Clients",
            value: activeClients,
            color: "bg-green-600",
            icon: <UserCheck className="w-10 h-10 opacity-80" />,
        },
        {
            label: "New This Month",
            value: 2,
            color: "bg-purple-600",
            icon: <UserPlus className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Total Cases",
            value: totalCases,
            color: "bg-yellow-600",
            icon: <FileText className="w-10 h-10 opacity-80" />,
        },
    ];

    const getStatusBadge = (status: Client["status"]) => {
        const styles = {
            active: "bg-green-100 text-green-800",
            inactive: "bg-gray-100 text-gray-800",
            pending: "bg-yellow-100 text-yellow-800",
            completed: "bg-blue-100 text-blue-800",
        };
        return styles[status];
    };

    const columns: ColumnDef<Client>[] = [
        {
            accessorKey: "clientNumber",
            header: "Client #",
            cell: ({ row }) => (
                <Link
                    to={`/dashboard/migration/clients/${row.original.id}`}
                    className="font-medium text-blue-600 hover:underline"
                >
                    {row.getValue("clientNumber")}
                </Link>
            ),
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.original.name}</div>
                    <div className="text-sm text-gray-500">{row.original.nationality}</div>
                </div>
            ),
        },
        {
            accessorKey: "email",
            header: "Contact",
            cell: ({ row }) => (
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-3 h-3 text-gray-500" />
                        {row.original.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-3 h-3 text-gray-500" />
                        {row.original.phone}
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "visaType",
            header: "Visa Details",
            cell: ({ row }) => (
                <div>
                    <div className="font-medium flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {row.original.visaType}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {row.original.destination}
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "caseCount",
            header: "Cases",
            cell: ({ row }) => (
                <Badge variant="outline">{row.getValue("caseCount")} case(s)</Badge>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as Client["status"];
                return (
                    <Badge className={getStatusBadge(status)}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "assignedConsultant",
            header: "Consultant",
        },
        {
            accessorKey: "registeredDate",
            header: "Registered",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-3 h-3 text-gray-500" />
                    {row.getValue("registeredDate")}
                </div>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Link to={`/dashboard/migration/clients/${row.original.id}`}>
                        <Button variant="outline" size="sm">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                        </Button>
                    </Link>
                    <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">All Clients</h2>
                    <p className="text-gray-600 mt-1">
                        Manage registered clients and their visa applications
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <Link to="/dashboard/migration/clients/search">
                        <Button variant="outline" className="flex items-center gap-2">
                            Advanced Search
                        </Button>
                    </Link>
                    <Link to="/dashboard/migration/clients/create">
                        <Button className="flex items-center gap-2">
                            <UserPlus size={18} />
                            Add Client
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

            {/* Data Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Client List</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={filteredClients}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        totalCount={filteredClients.length}
                        onPageChange={setPageIndex}
                        onSearch={(value) => setSearchTerm(value)}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
