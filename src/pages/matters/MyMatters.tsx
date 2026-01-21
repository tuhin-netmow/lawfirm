import { DataTable } from "@/components/dashboard/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Matter } from "@/types/matters.types";
import type { ColumnDef } from "@tanstack/react-table";
import {
    Briefcase,
    MapPin,
    Search,
    Filter,
    Eye,
    Pencil,
    Clock,
    CalendarDays
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

// MOCK DATA - Filtered for "My Matters" (Simulating user Sarah Conner)
const MY_MATTERS_MOCK: Matter[] = [
    {
        id: 1,
        matter_no: "MAT-2024-001",
        title: "Smith vs. Jones - Property Dispute",
        client_id: 101,
        client_name: "John Smith",
        practice_area: "Civil Litigation",
        status: "Open",
        stage: "Discovery",
        open_date: "2024-01-15",
        assigned_lawyer: "Sarah Conner"
    },
    {
        id: 5,
        matter_no: "MAT-2024-012",
        title: "Green Energy Compliance",
        client_id: 105,
        client_name: "EcoPower Ltd",
        practice_area: "Environmental",
        status: "Open",
        stage: "Review",
        open_date: "2024-03-01",
        assigned_lawyer: "Sarah Conner"
    }
];

export default function MyMatters() {
    const [pageIndex, setPageIndex] = useState(0);
    const matters = MY_MATTERS_MOCK;

    // -------------------- COLUMNS --------------------
    const columns: ColumnDef<Matter>[] = [
        {
            accessorKey: "matter_no",
            header: "Matter No",
            cell: ({ row }) => <span className="font-semibold text-blue-600">{row.getValue("matter_no")}</span>
        },
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => <div className="max-w-[250px] truncate font-medium" title={row.getValue("title")}>{row.getValue("title")}</div>
        },
        {
            accessorKey: "client_name",
            header: "Client"
        },
        {
            accessorKey: "practice_area",
            header: "Practice Area",
            cell: ({ row }) => <Badge variant="secondary">{row.getValue("practice_area")}</Badge>
        },
        {
            accessorKey: "open_date",
            header: "Open Date",
            cell: ({ row }) => <div className="text-muted-foreground flex items-center gap-1"><CalendarDays className="w-3 h-3" /> {row.getValue("open_date")}</div>
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                let colorClass = "bg-gray-500";
                if (status === "Open") colorClass = "bg-green-500";
                if (status === "Closed") colorClass = "bg-slate-500";
                if (status === "On Hold") colorClass = "bg-amber-500";

                return <Badge className={`${colorClass} hover:${colorClass}`}>{status}</Badge>;
            }
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Link to={`/dashboard/matters/${row.original.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                            <Eye className="h-4 w-4" />
                        </Button>
                    </Link>
                    <Link to={`/dashboard/matters/${row.original.id}/edit`}>
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
        { label: "My Active Matters", value: matters.filter(m => m.status === 'Open').length, icon: <Briefcase className="h-6 w-6" />, color: "bg-indigo-600" },
        { label: "Pending Tasks", value: 5, icon: <Clock className="h-6 w-6" />, color: "bg-orange-600" },
        { label: "Upcoming Court Dates", value: 1, icon: <MapPin className="h-6 w-6" />, color: "bg-teal-600" },
    ];

    return (
        <div className="w-full space-y-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Matters</h1>
                    <p className="text-muted-foreground mt-1">Cases assigned to you (Sarah Conner).</p>
                </div>
                <Link to="/dashboard/matters/create">
                    <Button className="bg-blue-600 hover:bg-blue-500">
                        <Briefcase className="mr-2 h-4 w-4" /> New Matter
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
                        <CardTitle>Assigned Cases</CardTitle>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search my matters..."
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
                        data={matters}
                        pageIndex={pageIndex}
                        pageSize={10}
                        onPageChange={setPageIndex}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
