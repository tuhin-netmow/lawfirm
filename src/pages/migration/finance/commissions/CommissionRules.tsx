import { DataTable } from "@/components/dashboard/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Calculator,
    CheckCircle,
    XCircle,
    Plus,
    Edit,
    Trash2,
} from "lucide-react";
import { useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";

interface CommissionRule {
    id: number;
    ruleName: string;
    type: "percentage" | "fixed";
    value: number;
    appliesTo: string;
    triggerEvent: "payment_received" | "case_completed" | "visa_granted";
    status: "active" | "inactive";
}

const mockRules: CommissionRule[] = [
    {
        id: 1,
        ruleName: "Standard Student Visa Commission",
        type: "percentage",
        value: 10,
        appliesTo: "All Consultants",
        triggerEvent: "payment_received",
        status: "active",
    },
    {
        id: 2,
        ruleName: "Senior Consultant Bonus",
        type: "percentage",
        value: 15,
        appliesTo: "Senior Consultants",
        triggerEvent: "case_completed",
        status: "active",
    },
    {
        id: 3,
        ruleName: "Referral Flat Fee",
        type: "fixed",
        value: 5000,
        appliesTo: "External Agents",
        triggerEvent: "visa_granted",
        status: "active",
    },
    {
        id: 4,
        ruleName: "Junior Onboarding Rate",
        type: "percentage",
        value: 5,
        appliesTo: "Junior Consultants",
        triggerEvent: "payment_received",
        status: "inactive",
    },
];

export default function CommissionRules() {
    const [pageIndex, setPageIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const pageSize = 10;

    const filteredRules = mockRules.filter((rule) =>
        Object.values(rule).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const getStatusBadge = (status: CommissionRule["status"]) => {
        return status === "active" ? (
            <Badge className="bg-green-100 text-green-800 gap-1">
                <CheckCircle className="w-3 h-3" /> Active
            </Badge>
        ) : (
            <Badge className="bg-gray-100 text-gray-800 gap-1">
                <XCircle className="w-3 h-3" /> Inactive
            </Badge>
        );
    };

    const columns: ColumnDef<CommissionRule>[] = [
        {
            accessorKey: "ruleName",
            header: "Rule Name",
            cell: ({ row }) => <span className="font-medium">{row.getValue("ruleName")}</span>,
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => <Badge variant="outline" className="capitalize">{row.getValue("type")}</Badge>,
        },
        {
            accessorKey: "value",
            header: "Value",
            cell: ({ row }) => {
                const type = row.getValue("type");
                const value = row.getValue("value") as number;
                return (
                    <span className="font-bold">
                        {type === "percentage" ? `${value}%` : `৳${value.toLocaleString()}`}
                    </span>
                );
            },
        },
        {
            accessorKey: "appliesTo",
            header: "Applied To",
        },
        {
            accessorKey: "triggerEvent",
            header: "Trigger",
            cell: ({ row }) => (
                <span className="text-sm text-gray-600 capitalize">
                    {(row.getValue("triggerEvent") as string).replace(/_/g, " ")}
                </span>
            ),
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
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4 text-gray-600" />
                    </Button>
                    <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="w-full">
            <div className="flex flex-wrap justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">Commission Rules</h2>
                    <p className="text-gray-600 mt-1">Configure commission structures and payout triggers</p>
                </div>

                <Link to="/dashboard/migration/finance/commissions/rules/create">
                    <Button className="gap-2">
                        <Plus size={18} /> Create Rule
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="bg-white p-3 rounded-full shadow-sm">
                            <Calculator className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-blue-800 font-medium">Active Rules</p>
                            <h3 className="text-2xl font-bold text-blue-900">
                                {mockRules.filter(r => r.status === "active").length}
                            </h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Commission Configurations</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={filteredRules}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        totalCount={filteredRules.length}
                        onPageChange={setPageIndex}
                        onSearch={(value) => setSearchTerm(value)}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
