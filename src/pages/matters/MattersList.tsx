import { DataTable } from "@/components/dashboard/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Matter } from "@/types/matters.types";
import type { ColumnDef } from "@tanstack/react-table";
import {
    Briefcase,
    PlusCircle,
    Search,
    Filter,
    Eye,
    Pencil,
    FileText,
    Gavel
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

// MOCK DATA (Replace with API call later)
const MOCK_MATTERS: Matter[] = [
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
        id: 2,
        matter_no: "MAT-2024-002",
        title: "Estate of Elder",
        client_id: 102,
        client_name: "Emily Elder",
        practice_area: "Wills & Estates",
        status: "Open",
        stage: "Probate",
        open_date: "2024-02-10",
        assigned_lawyer: "Michael Ross"
    },
    {
        id: 3,
        matter_no: "MAT-2023-089",
        title: "TechCorp Merger",
        client_id: 103,
        client_name: "TechCorp Inc.",
        practice_area: "Corporate",
        status: "On Hold",
        stage: "Negotiation",
        open_date: "2023-11-05",
        assigned_lawyer: "Harvey Specter"
    },
    {
        id: 4,
        matter_no: "MAT-2023-045",
        title: "Doe Family Trust",
        client_id: 104,
        client_name: "Jane Doe",
        practice_area: "Family Law",
        status: "Closed",
        stage: "Finalized",
        open_date: "2023-06-20",
        close_date: "2024-01-05",
        assigned_lawyer: "Jessica Pearson"
    }
];

export default function MattersList() {
    const [pageIndex, setPageIndex] = useState(0);
    // In real app, fetch data here: const { data } = useGetAllMattersQuery();
    const matters = MOCK_MATTERS;

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
            cell: ({ row }) => <div className="max-w-[200px] truncate" title={row.getValue("title")}>{row.getValue("title")}</div>
        },
        {
            accessorKey: "client_name",
            header: "Client"
        },
        {
            accessorKey: "practice_area",
            header: "Practice Area",
            cell: ({ row }) => (
                <Badge variant="outline" className="bg-slate-50">
                    {row.getValue("practice_area")}
                </Badge>
            )
        },
        {
            accessorKey: "assigned_lawyer",
            header: "Lawyer"
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
            accessorKey: "stage",
            header: "Stage"
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
        { label: "Total Matters", value: matters.length, icon: <Briefcase className="h-6 w-6" />, color: "bg-blue-600" },
        { label: "Open Matters", value: matters.filter(m => m.status === 'Open').length, icon: <FileText className="h-6 w-6" />, color: "bg-green-600" },
        { label: "Upcoming Court Dates", value: 2, icon: <Gavel className="h-6 w-6" />, color: "bg-purple-600" },
    ];

    return (
        <div className="w-full space-y-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Matters & Cases</h1>
                    <p className="text-muted-foreground mt-1">Manage all your legal cases and proceedings.</p>
                </div>
                <Link to="/dashboard/matters/create">
                    <Button className="bg-blue-600 hover:bg-blue-500">
                        <PlusCircle className="mr-2 h-4 w-4" /> Create New Matter
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
                        <CardTitle>Matter List</CardTitle>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search matters..."
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
