import { DataTable } from "@/components/dashboard/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HandCoins, Settings } from "lucide-react";
import { useLocation } from "react-router";
import type { ColumnDef } from "@tanstack/react-table";

interface Commission {
    id: number;
    agent: string;
    caseId: string;
    amount: number;
    status: "paid" | "pending";
    date: string;
}

const mockCommissions: Commission[] = [
    {
        id: 1,
        agent: "Mike Chen",
        caseId: "CASE-2026-001",
        amount: 350.00,
        status: "paid",
        date: "2026-01-05"
    },
    {
        id: 2,
        agent: "Sarah Johnson",
        caseId: "CASE-2026-002",
        amount: 200.00,
        status: "pending",
        date: "2026-01-08"
    }
];

export default function CommissionsList() {
    const location = useLocation();

    const getPageContext = () => {
        if (location.pathname.includes("pending")) return { filter: "pending", title: "Pending Commissions" };
        if (location.pathname.includes("paid")) return { filter: "paid", title: "Paid Commissions" };
        if (location.pathname.includes("rules")) return { filter: "rules", title: "Commission Rules" };
        return { filter: "all", title: "Commission Overview" };
    };

    const { filter, title } = getPageContext();

    if (filter === "rules") {
        return (
            <div className="w-full">
                <h2 className="text-3xl font-semibold mb-6">{title}</h2>
                <Card>
                    <CardHeader><CardTitle>Configuration</CardTitle></CardHeader>
                    <CardContent>
                        <p className="text-gray-500">Commission rules configuration coming soon...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const filteredData = mockCommissions.filter(c => {
        if (filter === "pending") return c.status === "pending";
        if (filter === "paid") return c.status === "paid";
        return true;
    });

    const columns: ColumnDef<Commission>[] = [
        {
            accessorKey: "agent",
            header: "Agent",
            cell: ({ row }) => <span className="font-medium">{row.getValue("agent")}</span>
        },
        {
            accessorKey: "caseId",
            header: "Case Ref",
        },
        {
            accessorKey: "amount",
            header: "Commission",
            cell: ({ row }) => <span className="font-semibold text-green-700">${row.getValue<number>("amount")}</span>
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const s = row.getValue("status") as string;
                return <Badge className={s === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>{s.toUpperCase()}</Badge>;
            }
        }
    ];

    return (
        <div className="w-full">
            <h2 className="text-3xl font-semibold mb-6">{title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="bg-green-100 p-3 rounded-full">
                            <HandCoins className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Paid this Month</p>
                            <h3 className="text-2xl font-bold">$1,250</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="bg-yellow-100 p-3 rounded-full">
                            <Settings className="w-8 h-8 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Pending Approval</p>
                            <h3 className="text-2xl font-bold">$450</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader><CardTitle>Commissions Log</CardTitle></CardHeader>
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
