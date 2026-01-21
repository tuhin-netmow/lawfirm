import { DataTable } from "@/components/dashboard/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Client } from "@/types/clients.types";
import type { ColumnDef } from "@tanstack/react-table";
import {
    Users,
    UserPlus,
    Search,
    Filter,
    Eye,
    Pencil,
    Building2,
    User,
    Phone,
    Mail
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

// Metric Card Component
const MetricCard = ({ label, value, icon, color }: { label: string, value: string | number, icon: React.ReactNode, color: string }) => (
    <div className={`p-5 rounded-xl text-white shadow-md flex justify-between items-center ${color}`}>
        <div>
            <h3 className="text-3xl font-bold">{value}</h3>
            <p className="opacity-90 text-sm mt-1">{label}</p>
        </div>
        <div className="p-2 bg-white/20 rounded-lg">
            {icon}
        </div>
    </div>
);

// MOCK DATA
const MOCK_CLIENTS: Client[] = [
    {
        id: 101,
        type: 'Individual',
        display_name: "John Smith",
        first_name: "John",
        last_name: "Smith",
        email: "john.smith@example.com",
        phone: "+61 400 123 456",
        status: 'Active',
        open_matters_count: 2,
        last_activity_date: "2024-03-10"
    },
    {
        id: 102,
        type: 'Individual',
        display_name: "Emily Elder",
        first_name: "Emily",
        last_name: "Elder",
        email: "emily.elder@example.com",
        phone: "+61 400 987 654",
        status: 'Active',
        open_matters_count: 1,
        last_activity_date: "2024-02-28"
    },
    {
        id: 103,
        type: 'Organisation',
        display_name: "TechCorp Inc.",
        company_name: "TechCorp Inc.",
        email: "legal@techcorp.com",
        phone: "+61 2 9999 0000",
        status: 'Active',
        open_matters_count: 5,
        last_activity_date: "2024-03-12"
    },
    {
        id: 104,
        type: 'Individual',
        display_name: "Jane Doe",
        first_name: "Jane",
        last_name: "Doe",
        email: "jane.doe@example.com",
        phone: "+61 411 222 333",
        status: 'Inactive',
        open_matters_count: 0,
        last_activity_date: "2023-12-15"
    },
    {
        id: 105,
        type: 'Organisation',
        display_name: "EcoPower Ltd",
        company_name: "EcoPower Ltd",
        email: "admin@ecopower.com",
        phone: "+61 3 8888 7777",
        status: 'Prospect',
        open_matters_count: 0,
        last_activity_date: "2024-03-01"
    }
];

export default function ClientsList() {
    const [pageIndex, setPageIndex] = useState(0);
    const clients = MOCK_CLIENTS;

    // -------------------- COLUMNS --------------------
    const columns: ColumnDef<Client>[] = [
        {
            accessorKey: "display_name",
            header: "Client Name",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-semibold text-blue-600 cursor-pointer">{row.getValue("display_name")}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                        {row.original.type === 'Organisation' ? <Building2 className="w-3 h-3" /> : <User className="w-3 h-3" />}
                        {row.original.type}
                    </span>
                </div>
            )
        },
        {
            accessorKey: "contact",
            header: "Contact",
            cell: ({ row }) => (
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-3 h-3 text-muted-foreground" /> {row.original.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-3 h-3 text-muted-foreground" /> {row.original.phone}
                    </div>
                </div>
            )
        },
        {
            accessorKey: "open_matters_count",
            header: "Open Matters",
            cell: ({ row }) => (
                <div className="text-center font-medium">
                    {Number(row.getValue("open_matters_count")) > 0 ? (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800">
                            {row.getValue("open_matters_count")}
                        </Badge>
                    ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                    )}
                </div>
            )
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                let colorClass = "bg-gray-500";
                if (status === "Active") colorClass = "bg-green-500";
                if (status === "Inactive") colorClass = "bg-slate-400";
                if (status === "Prospect") colorClass = "bg-purple-500";

                return <Badge className={`${colorClass} hover:${colorClass}`}>{status}</Badge>;
            }
        },
        {
            accessorKey: "last_activity_date",
            header: "Last Activity",
            cell: ({ row }) => <span className="text-muted-foreground text-sm">{row.getValue("last_activity_date")}</span>
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Link to={`/dashboard/clients/${row.original.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link to={`/dashboard/clients/${row.original.id}/edit`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600">
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            )
        }
    ];

    // -------------------- STATS --------------------
    const stats = [
        { label: "Total Clients", value: clients.length, icon: <Users className="h-6 w-6" />, color: "bg-blue-600" },
        { label: "Active Clients", value: clients.filter(c => c.status === 'Active').length, icon: <UserPlus className="h-6 w-6" />, color: "bg-green-600" },
        { label: "Organisations", value: clients.filter(c => c.type === 'Organisation').length, icon: <Building2 className="h-6 w-6" />, color: "bg-orange-500" },
    ];

    return (
        <div className="w-full space-y-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
                    <p className="text-muted-foreground mt-1">Manage individuals and organisations.</p>
                </div>
                <Link to="/dashboard/clients/create">
                    <Button className="bg-blue-600 hover:bg-blue-500">
                        <UserPlus className="mr-2 h-4 w-4" /> Add New Client
                    </Button>
                </Link>
            </div>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <MetricCard key={i} {...stat} />
                ))}
            </div>

            {/* FILTERS & TABLE */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <CardTitle>Client List</CardTitle>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search clients..."
                                    className="pl-8 h-10 w-full md:w-[250px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={clients}
                        pageIndex={pageIndex}
                        pageSize={10}
                        onPageChange={setPageIndex}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
