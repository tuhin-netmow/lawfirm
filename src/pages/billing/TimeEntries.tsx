
import { DataTable } from "@/components/dashboard/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import type { ColumnDef } from "@tanstack/react-table";
import type { TimeEntry } from "@/types/billing.types";
import {
    Search,
    Filter,
    Clock,
    DollarSign,
    Calendar as CalendarIcon,
    User
} from "lucide-react";
import { useState } from "react";

const MOCK_TIME_ENTRIES: TimeEntry[] = [
    {
        id: 1,
        matter_id: 101,
        matter_title: "Smith vs Jones",
        user_id: 1,
        user_name: "Sarah Conner",
        work_date: "2024-04-10",
        description: "Drafting writ of summons",
        hours: 2.5,
        rate_applied: 300,
        total_amount: 750,
        is_billable: true,
        status: "Unbilled",
        created_at: "2024-04-10T10:00:00Z"
    },
    {
        id: 2,
        matter_id: 102,
        matter_title: "Estate of Elder",
        user_id: 2,
        user_name: "Michael Ross",
        work_date: "2024-04-11",
        description: "Client meeting regarding assets",
        hours: 1.0,
        rate_applied: 250,
        total_amount: 250,
        is_billable: true,
        status: "Unbilled",
        created_at: "2024-04-11T14:00:00Z"
    },
    {
        id: 3,
        matter_id: 103,
        matter_title: "TechCorp Merger",
        user_id: 3,
        user_name: "Harvey Specter",
        work_date: "2024-04-09",
        description: "Reviewing merger agreement",
        hours: 4.0,
        rate_applied: 500,
        total_amount: 2000,
        is_billable: true,
        status: "Billed",
        created_at: "2024-04-09T09:00:00Z"
    },
    {
        id: 4,
        matter_id: 101,
        matter_title: "Smith vs Jones",
        user_id: 1,
        user_name: "Sarah Conner",
        work_date: "2024-04-12",
        description: "Internal team strategy meeting",
        hours: 0.5,
        rate_applied: 0,
        total_amount: 0,
        is_billable: false,
        status: "Unbilled",
        created_at: "2024-04-12T11:00:00Z"
    }
];

export default function TimeEntries() {
    const [pageIndex, setPageIndex] = useState(0);
    const [entries, setEntries] = useState<TimeEntry[]>(MOCK_TIME_ENTRIES);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        matter_id: "",
        description: "",
        hours: "",
        rate: "300",
        date: new Date().toISOString().split('T')[0],
        is_billable: true
    });

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock submission
        const newEntry: TimeEntry = {
            id: Math.floor(Math.random() * 1000),
            matter_id: parseInt(formData.matter_id) || 0,
            matter_title: formData.matter_id === "101" ? "Smith vs Jones" : "General Matter",
            user_id: 1, // Current user
            user_name: "Me (Current User)",
            work_date: formData.date,
            description: formData.description,
            hours: parseFloat(formData.hours),
            rate_applied: formData.is_billable ? parseFloat(formData.rate) : 0,
            total_amount: formData.is_billable ? parseFloat(formData.hours) * parseFloat(formData.rate) : 0,
            is_billable: formData.is_billable,
            status: "Unbilled",
            created_at: new Date().toISOString()
        };

        setEntries([newEntry, ...entries]);
        setIsCreateOpen(false);
        // Reset form
        setFormData({
            matter_id: "",
            description: "",
            hours: "",
            rate: "300",
            date: new Date().toISOString().split('T')[0],
            is_billable: true
        });
    };

    const columns: ColumnDef<TimeEntry>[] = [
        {
            accessorKey: "work_date",
            header: "Date",
            cell: ({ row }) => <div className="flex items-center gap-2"><CalendarIcon className="w-3 h-3 text-slate-500" /> {row.getValue("work_date")}</div>
        },
        {
            accessorKey: "user_name",
            header: "Staff",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <div className="bg-slate-100 p-1 rounded-full"><User className="w-3 h-3 text-slate-500" /></div>
                    <span className="text-sm">{row.getValue("user_name")}</span>
                </div>
            )
        },
        {
            accessorKey: "matter_title",
            header: "Matter",
            cell: ({ row }) => <span className="font-medium text-blue-600">{row.getValue("matter_title")}</span>
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => <span className="text-sm text-slate-600 truncate max-w-[300px] block" title={row.getValue("description")}>{row.getValue("description")}</span>
        },
        {
            accessorKey: "hours",
            header: "Hours",
            cell: ({ row }) => <Badge variant="secondary" className="font-mono">{Number(row.getValue("hours")).toFixed(1)}h</Badge>
        },
        {
            accessorKey: "rate_applied",
            header: "Rate",
            cell: ({ row }) => <span className="text-slate-500 text-sm">${row.getValue("rate_applied")}/hr</span>
        },
        {
            accessorKey: "total_amount",
            header: "Total",
            cell: ({ row }) => <span className="font-bold text-slate-700">${Number(row.getValue("total_amount")).toFixed(2)}</span>
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                return (
                    <Badge variant="outline" className={status === "Billed" ? "bg-green-50 text-green-700 border-green-200" : "bg-yellow-50 text-yellow-700 border-yellow-200"}>
                        {status}
                    </Badge>
                );
            }
        }
    ];

    return (
        <div className="w-full space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Time Entries</h1>
                    <p className="text-muted-foreground mt-1">Track billable and non-billable hours.</p>
                </div>

                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-500">
                            <Clock className="mr-2 h-4 w-4" /> Log Time
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Log New Time Entry</DialogTitle>
                            <DialogDescription>
                                Recording time for: John Doe (You)
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreateSubmit} className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="hours">Hours</Label>
                                    <Input
                                        id="hours"
                                        type="number"
                                        step="0.1"
                                        placeholder="0.0"
                                        value={formData.hours}
                                        onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="matter">Matter</Label>
                                <Select
                                    value={formData.matter_id}
                                    onValueChange={(val) => setFormData({ ...formData, matter_id: val })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a matter..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="101">Smith vs Jones</SelectItem>
                                        <SelectItem value="102">Estate of Elder</SelectItem>
                                        <SelectItem value="103">TechCorp Merger</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Input
                                    id="description"
                                    placeholder="What did you do?"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between border p-3 rounded-md">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-4 w-4 text-slate-500" />
                                    <Label htmlFor="billable" className="cursor-pointer">Billable?</Label>
                                </div>
                                <input
                                    type="checkbox"
                                    id="billable"
                                    checked={formData.is_billable}
                                    onChange={(e) => setFormData({ ...formData, is_billable: e.target.checked })}
                                    className="h-4 w-4 rounded border-gray-300"
                                />
                            </div>

                            {formData.is_billable && (
                                <div className="space-y-2">
                                    <Label htmlFor="rate">Hourly Rate ($)</Label>
                                    <Input
                                        id="rate"
                                        type="number"
                                        value={formData.rate}
                                        onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                                    />
                                </div>
                            )}

                            <DialogFooter>
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-500">Save Entry</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="py-4">
                        <CardTitle className="text-sm font-medium text-slate-500">Total Hours (This Month)</CardTitle>
                        <div className="text-2xl font-bold">142.5 h</div>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="py-4">
                        <CardTitle className="text-sm font-medium text-slate-500">Billable Amount</CardTitle>
                        <div className="text-2xl font-bold text-green-600">$42,750.00</div>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="py-4">
                        <CardTitle className="text-sm font-medium text-slate-500">Unbilled Amount</CardTitle>
                        <div className="text-2xl font-bold text-orange-600">$5,250.00</div>
                    </CardHeader>
                </Card>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <CardTitle>Recent Entries</CardTitle>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search entries..."
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
                        data={entries}
                        pageIndex={pageIndex}
                        pageSize={10}
                        onPageChange={setPageIndex}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
