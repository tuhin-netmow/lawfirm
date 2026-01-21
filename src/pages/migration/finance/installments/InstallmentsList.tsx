import { DataTable } from "@/components/dashboard/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useLocation } from "react-router";
import type { ColumnDef } from "@tanstack/react-table";

interface Installment {
    id: number;
    client: string;
    description: string;
    amount: number;
    dueDate: string;
    status: "upcoming" | "paid" | "overdue";
}

const mockInstallments: Installment[] = [
    {
        id: 1,
        client: "Ahmed Hassan",
        description: "Visa Fee - Installment 2/3",
        amount: 800.00,
        dueDate: "2026-01-15",
        status: "upcoming"
    },
    {
        id: 2,
        client: "Fatima Rahman",
        description: "Service Fee - Installment 1/2",
        amount: 1200.00,
        dueDate: "2026-01-10",
        status: "overdue"
    },
    {
        id: 3,
        client: "Kamal Uddin",
        description: "Initial Deposit",
        amount: 500.00,
        dueDate: "2026-02-01",
        status: "upcoming"
    }
];

export default function InstallmentsList() {
    const location = useLocation();

    const getPageContext = () => {
        if (location.pathname.includes("overdue")) return { filter: "overdue", title: "Overdue Installments" };
        if (location.pathname.includes("due")) return { filter: "due_month", title: "Due This Month" };
        return { filter: "all", title: "All Installments" };
    };

    const { filter, title } = getPageContext();

    const filteredData = mockInstallments.filter(i => {
        if (filter === "overdue") return i.status === "overdue";
        // Mock logic for due_month: just show upcoming/overdue for now
        if (filter === "due_month") return i.status !== "paid";
        return true;
    });

    const columns: ColumnDef<Installment>[] = [
        {
            accessorKey: "client",
            header: "Client",
            cell: ({ row }) => <span className="font-medium">{row.getValue("client")}</span>
        },
        {
            accessorKey: "description",
            header: "Description",
        },
        {
            accessorKey: "amount",
            header: "Amount",
            cell: ({ row }) => <span className="font-semibold">${row.getValue<number>("amount").toFixed(2)}</span>
        },
        {
            accessorKey: "dueDate",
            header: "Due Date",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-500" />
                    <span>{row.getValue("dueDate")}</span>
                </div>
            )
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const s = row.getValue("status") as string;
                return <Badge className={s === "paid" ? "bg-green-100 text-green-800" : s === "overdue" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}>{s.toUpperCase()}</Badge>;
            }
        },
        {
            id: "actions",
            header: "Actions",
            cell: () => <Button size="sm" variant="outline">Remind</Button>
        }
    ];

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">{title}</h2>
                    <p className="text-gray-600">Track partial payments and schedules</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={filteredData}
                        pageIndex={0}
                        pageSize={10}
                        totalCount={filteredData.length}
                        onPageChange={() => { }}
                        onSearch={() => { }}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
