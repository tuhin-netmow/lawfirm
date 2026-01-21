
import { DataTable } from "@/components/dashboard/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Calendar as CalendarIcon,
    Gavel,
    Clock,
    Search,
    Filter,
    Download
} from "lucide-react";
import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router";

// Mock Court Type
interface CourtDate {
    id: number;
    case_number: string;
    matter_title: string;
    court_name: string;
    type: string; // e.g., Hearing, Trial, Motion
    date: string;
    time: string;
    judge?: string;
    status: 'Scheduled' | 'Completed' | 'Adjourned' | 'Cancelled';
}

const MOCK_COURT_DATES: CourtDate[] = [
    {
        id: 1,
        case_number: "CV-2024-00123",
        matter_title: "Smith vs Jones",
        court_name: "Supreme Court",
        type: "Hearing",
        date: "2024-04-10",
        time: "09:00 AM",
        judge: "Hon. Jane Doe",
        status: "Scheduled"
    },
    {
        id: 2,
        case_number: "FAM-2023-559",
        matter_title: "Estate of Elder",
        court_name: "Family Court",
        type: "Case Management Conference",
        date: "2024-04-15",
        time: "02:00 PM",
        judge: "Hon. John Smith",
        status: "Scheduled"
    },
    {
        id: 3,
        case_number: "CR-2024-110",
        matter_title: "State v. Anderson",
        court_name: "District Court",
        type: "Arraignment",
        date: "2024-03-25",
        time: "10:30 AM",
        judge: "Magistrate Lewis",
        status: "Completed"
    },
    {
        id: 4,
        case_number: "CV-2023-9988",
        matter_title: "TechCorp Merger Dispute",
        court_name: "High Court",
        type: "Motion to Dismiss",
        date: "2024-04-20",
        time: "11:00 AM",
        judge: "Hon. Sarah Connor",
        status: "Adjourned"
    }
];

export default function CourtDates() {
    const [pageIndex, setPageIndex] = useState(0);
    const navigate = useNavigate();
    const data = MOCK_COURT_DATES;

    const getStatusBadge = (status: CourtDate['status']) => {
        switch (status) {
            case 'Scheduled': return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Scheduled</Badge>;
            case 'Completed': return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
            case 'Adjourned': return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Adjourned</Badge>;
            case 'Cancelled': return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    const columns: ColumnDef<CourtDate>[] = [
        {
            accessorKey: "date",
            header: "Date & Time",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 font-medium">
                        <CalendarIcon className="w-4 h-4 text-slate-500" />
                        {row.original.date}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground ml-6">
                        <Clock className="w-3 h-3" />
                        {row.original.time}
                    </div>
                </div>
            )
        },
        {
            accessorKey: "case_info",
            header: "Case Details",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-medium text-blue-600">{row.original.matter_title}</span>
                    <span className="text-xs text-slate-500">Case #: {row.original.case_number}</span>
                </div>
            )
        },
        {
            accessorKey: "court_info",
            header: "Court & Judge",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        <Gavel className="w-3 h-3 text-slate-400" />
                        <span className="text-sm font-medium">{row.original.court_name}</span>
                    </div>
                    {row.original.judge && (
                        <span className="text-xs text-slate-500 ml-4">Judge: {row.original.judge}</span>
                    )}
                </div>
            )
        },
        {
            accessorKey: "type",
            header: "Hearing Type",
            cell: ({ row }) => <Badge variant="secondary" className="font-normal">{row.original.type}</Badge>
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => getStatusBadge(row.original.status)
        },
        {
            id: "actions",
            header: "",
            cell: () => (
                <Button variant="ghost" size="sm" className="text-xs">View Details</Button>
            )
        }
    ];

    return (
        <div className="w-full space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Court Dates</h1>
                    <p className="text-muted-foreground mt-1">Upcoming hearings, trials, and court appearances.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Export
                    </Button>
                    <Button
                        className="bg-blue-600 hover:bg-blue-500"
                        onClick={() => navigate("/dashboard/calendar/create")}
                    >
                        <Gavel className="mr-2 h-4 w-4" /> Schedule Hearing
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <CardTitle>Upcoming Appearances</CardTitle>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search case # or court..."
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
                        data={data}
                        pageIndex={pageIndex}
                        pageSize={10}
                        onPageChange={setPageIndex}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
