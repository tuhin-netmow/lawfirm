import { DataTable } from "@/components/dashboard/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ColumnDef } from "@tanstack/react-table";
import {
    Target,
    TrendingUp,
    Users,
    DollarSign,
    Plus,
    Edit,
    BarChart3,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

interface LeadSource {
    id: number;
    name: string;
    category: string;
    totalLeads: number;
    convertedLeads: number;
    conversionRate: number;
    cost: number;
    costPerLead: number;
    roi: number;
    isActive: boolean;
}

const mockSources: LeadSource[] = [
    {
        id: 1,
        name: "Facebook Ads",
        category: "Paid Social",
        totalLeads: 45,
        convertedLeads: 12,
        conversionRate: 26.7,
        cost: 15000,
        costPerLead: 333,
        roi: 180,
        isActive: true,
    },
    {
        id: 2,
        name: "Google Ads",
        category: "Paid Search",
        totalLeads: 38,
        convertedLeads: 10,
        conversionRate: 26.3,
        cost: 12000,
        costPerLead: 316,
        roi: 175,
        isActive: true,
    },
    {
        id: 3,
        name: "Website",
        category: "Organic",
        totalLeads: 62,
        convertedLeads: 18,
        conversionRate: 29.0,
        cost: 0,
        costPerLead: 0,
        roi: 999,
        isActive: true,
    },
    {
        id: 4,
        name: "Referral",
        category: "Word of Mouth",
        totalLeads: 28,
        convertedLeads: 15,
        conversionRate: 53.6,
        cost: 5000,
        costPerLead: 179,
        roi: 420,
        isActive: true,
    },
    {
        id: 5,
        name: "Walk-in",
        category: "Direct",
        totalLeads: 19,
        convertedLeads: 8,
        conversionRate: 42.1,
        cost: 0,
        costPerLead: 0,
        roi: 999,
        isActive: true,
    },
];

export default function LeadSources() {
    const [pageIndex, setPageIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const pageSize = 10;

    const filteredSources = mockSources.filter((source) =>
        Object.values(source).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const totalLeads = mockSources.reduce((acc, s) => acc + s.totalLeads, 0);
    const totalConverted = mockSources.reduce((acc, s) => acc + s.convertedLeads, 0);
    const avgConversion = (totalConverted / totalLeads) * 100;
    const totalCost = mockSources.reduce((acc, s) => acc + s.cost, 0);

    const stats = [
        {
            label: "Total Sources",
            value: mockSources.length,
            color: "bg-blue-600",
            icon: <Target className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Total Leads",
            value: totalLeads,
            color: "bg-purple-600",
            icon: <Users className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Avg Conversion",
            value: `${avgConversion.toFixed(1)}%`,
            color: "bg-green-600",
            icon: <TrendingUp className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Total Investment",
            value: `৳${(totalCost / 1000).toFixed(0)}K`,
            color: "bg-yellow-600",
            icon: <DollarSign className="w-10 h-10 opacity-80" />,
        },
    ];

    const columns: ColumnDef<LeadSource>[] = [
        {
            accessorKey: "name",
            header: "Source Name",
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.original.name}</div>
                    <Badge variant="outline" className="text-xs mt-1">
                        {row.original.category}
                    </Badge>
                </div>
            ),
        },
        {
            accessorKey: "totalLeads",
            header: "Total Leads",
            cell: ({ row }) => (
                <span className="font-semibold">{row.getValue("totalLeads")}</span>
            ),
        },
        {
            accessorKey: "convertedLeads",
            header: "Converted",
            cell: ({ row }) => (
                <span className="text-green-600 font-semibold">
                    {row.getValue("convertedLeads")}
                </span>
            ),
        },
        {
            accessorKey: "conversionRate",
            header: "Conversion Rate",
            cell: ({ row }) => {
                const rate = row.getValue("conversionRate") as number;
                const color =
                    rate >= 40 ? "text-green-600" : rate >= 25 ? "text-yellow-600" : "text-red-600";
                return <span className={`font-semibold ${color}`}>{rate.toFixed(1)}%</span>;
            },
        },
        {
            accessorKey: "cost",
            header: "Cost (৳)",
            cell: ({ row }) => {
                const cost = row.getValue("cost") as number;
                return <span>{cost === 0 ? "Free" : `৳${cost.toLocaleString()}`}</span>;
            },
        },
        {
            accessorKey: "costPerLead",
            header: "Cost/Lead (৳)",
            cell: ({ row }) => {
                const cpl = row.getValue("costPerLead") as number;
                return <span>{cpl === 0 ? "Free" : `৳${cpl.toLocaleString()}`}</span>;
            },
        },
        {
            accessorKey: "roi",
            header: "ROI",
            cell: ({ row }) => {
                const roi = row.getValue("roi") as number;
                const displayRoi = roi === 999 ? "∞" : `${roi}%`;
                const color = roi >= 300 ? "text-green-600" : roi >= 150 ? "text-yellow-600" : "text-orange-600";
                return (
                    <span className={`font-semibold ${color}`}>{displayRoi}</span>
                );
            },
        },
        {
            accessorKey: "isActive",
            header: "Status",
            cell: ({ row }) => {
                const isActive = row.getValue("isActive") as boolean;
                return (
                    <Badge variant={isActive ? "success" : "secondary"} className="text-white">
                        {isActive ? "Active" : "Inactive"}
                    </Badge>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: () => (
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                    </Button>
                    <Button variant="ghost" size="sm">
                        <BarChart3 className="w-4 h-4" />
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
                    <h2 className="text-3xl font-semibold">Lead Sources</h2>
                    <p className="text-gray-600 mt-1">
                        Track and manage where your leads are coming from
                    </p>
                </div>

                <Link to="/dashboard/migration/leads/sources/create">
                    <Button className="flex items-center gap-2">
                        <Plus size={18} />
                        Add Source
                    </Button>
                </Link>
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
                    <CardTitle>All Lead Sources</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={filteredSources}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        totalCount={filteredSources.length}
                        onPageChange={setPageIndex}
                        onSearch={(value) => setSearchTerm(value)}
                    />
                </CardContent>
            </Card>

            {/* Best Performing Source */}
            <div className="mt-6">
                <Card className="border-green-200 bg-green-50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-900">
                            <Target className="w-5 h-5" />
                            Best Performing Source
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <div className="text-sm text-green-700">Source</div>
                                <div className="text-xl font-bold text-green-900">Referral</div>
                            </div>
                            <div>
                                <div className="text-sm text-green-700">Conversion Rate</div>
                                <div className="text-xl font-bold text-green-900">53.6%</div>
                            </div>
                            <div>
                                <div className="text-sm text-green-700">ROI</div>
                                <div className="text-xl font-bold text-green-900">420%</div>
                            </div>
                            <div>
                                <div className="text-sm text-green-700">Recommendation</div>
                                <div className="text-sm text-green-900 mt-1">
                                    Invest more in referral program
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
