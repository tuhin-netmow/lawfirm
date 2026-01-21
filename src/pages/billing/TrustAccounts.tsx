
import { DataTable } from "@/components/dashboard/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    PlusCircle,
    Search,
    Filter,
    Download,
    Landmark,
    ArrowUpRight,
    ArrowDownLeft
} from "lucide-react";
import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router";

// Mock Trust Account Transaction Type
interface TrustTransaction {
    id: number;
    transaction_number: string;
    client_name: string;
    matter_title: string;
    date: string;
    description: string;
    amount: number;
    type: 'Deposit' | 'Withdrawal';
    balance_after: number;
}

const MOCK_TRUST_TRANSACTIONS: TrustTransaction[] = [
    {
        id: 1,
        transaction_number: "TR-2024-001",
        client_name: "John Smith",
        matter_title: "Smith vs Jones",
        date: "2024-01-10",
        description: "Initial Retainer Deposit",
        amount: 5000.00,
        type: "Deposit",
        balance_after: 5000.00
    },
    {
        id: 2,
        transaction_number: "TR-2024-002",
        client_name: "John Smith",
        matter_title: "Smith vs Jones",
        date: "2024-02-15",
        description: "Payment for Inv #INV-2024-001",
        amount: 1500.00,
        type: "Withdrawal",
        balance_after: 3500.00
    },
    {
        id: 3,
        transaction_number: "TR-2024-003",
        client_name: "Sarah Conner",
        matter_title: "Estate of Elder",
        date: "2024-03-01",
        description: "Settlement Funds Received",
        amount: 100000.00,
        type: "Deposit",
        balance_after: 100000.00
    },
    {
        id: 4,
        transaction_number: "TR-2024-004",
        client_name: "TechCorp Inc.",
        matter_title: "TechCorp Merger",
        date: "2024-03-10",
        description: "Retainer Top-up",
        amount: 10000.00,
        type: "Deposit",
        balance_after: 10000.00
    }
];

export default function TrustAccounts() {
    const [pageIndex, setPageIndex] = useState(0);
    const navigate = useNavigate();
    const data = MOCK_TRUST_TRANSACTIONS;

    const columns: ColumnDef<TrustTransaction>[] = [
        {
            accessorKey: "date",
            header: "Date",
            cell: ({ row }) => <span className="text-slate-600 font-medium">{row.getValue("date")}</span>
        },
        {
            accessorKey: "transaction_number",
            header: "Ref #",
            cell: ({ row }) => <span className="text-xs text-slate-500">{row.getValue("transaction_number")}</span>
        },
        {
            accessorKey: "client_info",
            header: "Client & Matter",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-medium text-blue-600">{row.original.client_name}</span>
                    <span className="text-xs text-slate-500">{row.original.matter_title}</span>
                </div>
            )
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => <span className="text-slate-600 truncate max-w-[250px] block">{row.getValue("description")}</span>
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => {
                const type = row.original.type;
                if (type === 'Deposit') {
                    return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex w-fit items-center gap-1"><ArrowDownLeft className="w-3 h-3" /> Deposit</Badge>;
                } else {
                    return <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 flex w-fit items-center gap-1"><ArrowUpRight className="w-3 h-3" /> Withdrawal</Badge>;
                }
            }
        },
        {
            accessorKey: "amount",
            header: "Amount",
            cell: ({ row }) => (
                <span className={`font-bold ${row.original.type === 'Deposit' ? 'text-green-600' : 'text-slate-700'}`}>
                    {row.original.type === 'Withdrawal' ? '-' : '+'}${row.original.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
            )
        },
        {
            accessorKey: "balance_after",
            header: "Balance",
            cell: ({ row }) => <span className="font-mono text-xs text-slate-500">${row.original.balance_after.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        },
    ];

    return (
        <div className="w-full space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Trust Accounts</h1>
                    <p className="text-muted-foreground mt-1">Manage client retainers and trust funds.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Export Ledger
                    </Button>
                    <Button
                        className="bg-blue-600 hover:bg-blue-500"
                        onClick={() => navigate("/dashboard/billing/trust/deposit")}
                    >
                        <PlusCircle className="mr-2 h-4 w-4" /> Deposit Funds
                    </Button>
                </div>
            </div>

            {/* METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-slate-900 text-white border-slate-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-300">Total Trust Liability</CardTitle>
                        <Landmark className="h-4 w-4 text-slate-300" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">$113,500.00</div>
                        <p className="text-xs text-slate-400 mt-1">Total client funds held</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">New Deposits (Method)</CardTitle>
                        <ArrowDownLeft className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">+$15,000.00</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-500">Withdrawals (Month)</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-slate-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">-$1,500.00</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <CardTitle>Transaction Ledger</CardTitle>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search client or ref #..."
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
