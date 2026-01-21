import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useLocation } from "react-router";
import { DataTable } from "@/components/dashboard/components/DataTable";
import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";

export default function FinancialReports() {
    const location = useLocation();
    const isOutstandingReport = location.pathname.includes("outstanding");
    const isPnLReport = location.pathname.includes("pnl");
    const isTaxReport = location.pathname.includes("tax");
    const isVisaRevenueReport = location.pathname.includes("by-visa-type");
    const isCommissionsReport = location.pathname.includes("commissions");

    // Mock Data for Revenue Report
    const revenueData = [
        { name: 'Aug', revenue: 15000, expenses: 8000, profit: 7000 },
        { name: 'Sep', revenue: 18000, expenses: 9500, profit: 8500 },
        { name: 'Oct', revenue: 22000, expenses: 10000, profit: 12000 },
        { name: 'Nov', revenue: 20000, expenses: 9000, profit: 11000 },
        { name: 'Dec', revenue: 25000, expenses: 11000, profit: 14000 },
        { name: 'Jan', revenue: 28000, expenses: 12000, profit: 16000 },
    ];

    const expenseBreakdown = [
        { name: 'Salaries', value: 45000 },
        { name: 'Rent', value: 12000 },
        { name: 'Marketing', value: 8000 },
        { name: 'Utilities', value: 3000 },
        { name: 'Software', value: 2500 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    const revenueByVisaData = [
        { name: 'Student Visa', value: 450000 },
        { name: 'Skilled Migration', value: 350000 },
        { name: 'Business Visa', value: 250000 },
        { name: 'Partner Visa', value: 150000 },
        { name: 'Visitor Visa', value: 50000 },
    ];

    // Mock Data for Outstanding Report
    const outstandingData = [
        { id: 1, client: "Rashid Khan", agreement: "AGR-2026-001", total: 150000, paid: 100000, due: 50000, daysOverdue: 15, status: "overdue" },
        { id: 2, client: "Ayesha Begum", agreement: "AGR-2026-002", total: 80000, paid: 40000, due: 40000, daysOverdue: 0, status: "due_soon" },
        { id: 3, client: "Imran Hossain", agreement: "AGR-2026-003", total: 25000, paid: 0, due: 25000, daysOverdue: 30, status: "critical" },
        { id: 4, client: "Fatima Ali", agreement: "AGR-2025-089", total: 200000, paid: 150000, due: 50000, daysOverdue: 5, status: "overdue" },
        { id: 5, client: "Karim Uddin", agreement: "AGR-2025-090", total: 120000, paid: 120000, due: 0, daysOverdue: 0, status: "cleared" },
    ];

    // Mock Tax Data
    const taxData = [
        { id: 1, period: "Q3 2025", type: "VAT", taxableAmount: 1500000, taxRate: 15, taxAmount: 225000, status: "paid", dueDate: "2025-10-15" },
        { id: 2, period: "Q3 2025", type: "Income Tax", taxableAmount: 500000, taxRate: 20, taxAmount: 100000, status: "paid", dueDate: "2025-11-30" },
        { id: 3, period: "Q4 2025", type: "VAT", taxableAmount: 1800000, taxRate: 15, taxAmount: 270000, status: "pending", dueDate: "2026-01-15" },
        { id: 4, period: "Dec 2025", type: "Withholding", taxableAmount: 200000, taxRate: 10, taxAmount: 20000, status: "overdue", dueDate: "2026-01-05" },
    ];

    // Mock Commission Data
    const commissionData = [
        { id: 1, agent: "John Doe", totalCommission: 5000, paidCommission: 3000, pendingCommission: 2000, deals: 12 },
        { id: 2, agent: "Jane Smith", totalCommission: 7500, paidCommission: 7500, pendingCommission: 0, deals: 18 },
        { id: 3, agent: "Bob Wilson", totalCommission: 3000, paidCommission: 1000, pendingCommission: 2000, deals: 8 },
        { id: 4, agent: "Alice Brown", totalCommission: 6000, paidCommission: 4500, pendingCommission: 1500, deals: 15 },
        { id: 5, agent: "Charlie Davis", totalCommission: 4500, paidCommission: 2000, pendingCommission: 2500, deals: 10 },
    ];

    // Filter only those with due amount for the report
    const activeOutstanding = outstandingData.filter(d => d.due > 0);

    const totalOutstanding = activeOutstanding.reduce((sum, item) => sum + item.due, 0);
    const criticalOutstanding = activeOutstanding.filter(d => d.daysOverdue > 20).reduce((sum, item) => sum + item.due, 0);

    const columns: ColumnDef<typeof outstandingData[0]>[] = [
        {
            accessorKey: "client",
            header: "Client Name",
            cell: ({ row }) => <span className="font-medium">{row.getValue("client")}</span>
        },
        {
            accessorKey: "agreement",
            header: "Agreement #",
        },
        {
            accessorKey: "total",
            header: "Total Total",
            cell: ({ row }) => `৳${row.getValue<number>("total").toLocaleString()}`
        },
        {
            accessorKey: "paid",
            header: "Paid",
            cell: ({ row }) => <span className="text-green-600">৳{row.getValue<number>("paid").toLocaleString()}</span>
        },
        {
            accessorKey: "due",
            header: "Due Amount",
            cell: ({ row }) => <span className="text-red-600 font-bold">৳{row.getValue<number>("due").toLocaleString()}</span>
        },
        {
            accessorKey: "daysOverdue",
            header: "Days Overdue",
            cell: ({ row }) => {
                const days = row.getValue<number>("daysOverdue");
                return <span className={days > 0 ? "text-red-500" : "text-gray-500"}>{days > 0 ? `${days} Days` : "Current"}</span>
            }
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                if (status === "critical") return <Badge variant="destructive">Critical</Badge>;
                if (status === "overdue") return <Badge className="bg-orange-500 hover:bg-orange-600">Overdue</Badge>;
                return <Badge variant="secondary">Due Soon</Badge>;
            }
        }
    ];

    const taxColumns: ColumnDef<typeof taxData[0]>[] = [
        {
            accessorKey: "period",
            header: "Period",
            cell: ({ row }) => <span className="font-medium">{row.getValue("period")}</span>
        },
        {
            accessorKey: "type",
            header: "Tax Type",
        },
        {
            accessorKey: "taxableAmount",
            header: "Taxable Amount",
            cell: ({ row }) => `৳${row.getValue<number>("taxableAmount").toLocaleString()}`
        },
        {
            accessorKey: "taxAmount",
            header: "Tax Amount",
            cell: ({ row }) => <span className="font-bold">৳${row.getValue<number>("taxAmount").toLocaleString()}</span>
        },
        {
            accessorKey: "dueDate",
            header: "Due Date",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                if (status === "paid") return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
                if (status === "overdue") return <Badge variant="destructive">Overdue</Badge>;
                return <Badge variant="secondary">Pending</Badge>;
            }
        }
    ];

    const commissionColumns: ColumnDef<typeof commissionData[0]>[] = [
        {
            accessorKey: "agent",
            header: "Agent Name",
            cell: ({ row }) => <span className="font-medium">{row.getValue("agent")}</span>
        },
        {
            accessorKey: "deals",
            header: "Closed Deals",
        },
        {
            accessorKey: "totalCommission",
            header: "Total Earned",
            cell: ({ row }) => `৳${row.getValue<number>("totalCommission").toLocaleString()}`
        },
        {
            accessorKey: "paidCommission",
            header: "Paid",
            cell: ({ row }) => <span className="text-green-600">৳{row.getValue<number>("paidCommission").toLocaleString()}</span>
        },
        {
            accessorKey: "pendingCommission",
            header: "Pending",
            cell: ({ row }) => {
                const pending = row.getValue<number>("pendingCommission");
                return <span className={pending > 0 ? "text-orange-600 font-bold" : "text-gray-500"}>৳{pending.toLocaleString()}</span>
            }
        },
        {
            id: "status",
            header: "Status",
            cell: ({ row }) => {
                const pending = row.getValue<number>("pendingCommission");
                if (pending === 0) return <Badge className="bg-green-100 text-green-800">Fully Paid</Badge>;
                return <Badge variant="secondary">Outstanding</Badge>;
            }
        }
    ];

    if (isCommissionsReport) {
        return (
            <div className="w-full space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-semibold">Commission Summary</h2>
                        <p className="text-gray-600 mt-1">Agent performance and commission payouts</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-green-50 border-green-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-green-800">Total Commissions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-900">৳26,000</div>
                            <p className="text-xs text-green-600 mt-1">Fiscal Year 2025-2026</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-blue-50 border-blue-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-blue-800">Paid Commissions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-900">৳18,000</div>
                            <p className="text-xs text-blue-600 mt-1">Processed payouts</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-orange-50 border-orange-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-orange-800">Pending Payouts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-900">৳8,000</div>
                            <p className="text-xs text-orange-600 mt-1">Due for payment</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Commission vs Deals</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={commissionData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="agent" />
                                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                                    <Tooltip />
                                    <Bar yAxisId="left" dataKey="totalCommission" fill="#8884d8" name="Commission ($)" />
                                    <Bar yAxisId="right" dataKey="deals" fill="#82ca9d" name="Deals" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Payout Status</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                            <DataTable
                                columns={commissionColumns}
                                data={commissionData}
                                pageIndex={0}
                                pageSize={5}
                                totalCount={commissionData.length}
                                onPageChange={() => { }}
                                onSearch={() => { }}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    if (isVisaRevenueReport) {
        return (
            <div className="w-full space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-semibold">Revenue by Visa Type</h2>
                        <p className="text-gray-600 mt-1">Financial performance across different visa categories</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Revenue Distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={revenueByVisaData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }: { name?: string, percent?: number }) => `${name ?? ''} ${((percent || 0) * 100).toFixed(0)}%`}
                                        outerRadius={150}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {revenueByVisaData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Top Revenue Sources</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueByVisaData} layout="vertical" margin={{ left: 40 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                    <XAxis type="number" />
                                    <YAxis dataKey="name" type="category" width={100} />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#82ca9d" radius={[0, 4, 4, 0]}>
                                        {revenueByVisaData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    if (isTaxReport) {
        return (
            <div className="w-full space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-semibold">Tax Liability Reports</h2>
                        <p className="text-gray-600 mt-1">VAT, Income Tax, and Withholding Tax Summary</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-blue-50 border-blue-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-blue-800">Total Tax Paid</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-900">৳325,000</div>
                            <p className="text-xs text-blue-600 mt-1">Fiscal Year 2025-2026</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-yellow-50 border-yellow-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-yellow-800">Pending Liabilities</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-900">৳270,000</div>
                            <p className="text-xs text-yellow-600 mt-1">Due within 30 days</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-red-50 border-red-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-red-800">Overdue Tax</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-900">৳20,000</div>
                            <p className="text-xs text-red-600 mt-1">Late fees may apply</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Tax Filings & Payments</CardTitle>
                        <CardDescription>Recent tax obligations and payment records</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={taxColumns}
                            data={taxData}
                            pageIndex={0}
                            pageSize={10}
                            totalCount={taxData.length}
                            onPageChange={() => { }}
                            onSearch={() => { }}
                        />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (isOutstandingReport) {
        return (
            <div className="w-full space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-semibold">Outstanding Payments Report</h2>
                        <p className="text-gray-600 mt-1">Detailed breakdown of pending client collections</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-red-50 border-red-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-red-800">Total Outstanding</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-900">৳{totalOutstanding.toLocaleString()}</div>
                            <p className="text-xs text-red-600 mt-1">Across {activeOutstanding.length} clients</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-orange-50 border-orange-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-orange-800">Critical (20+ Days)</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-900">৳{criticalOutstanding.toLocaleString()}</div>
                            <p className="text-xs text-orange-600 mt-1">Needs immediate attention</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-blue-50 border-blue-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-blue-800">Collection Efficiency</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-900">65%</div>
                            <p className="text-xs text-blue-600 mt-1">Of total agreement value collected</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Receivables Aging</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            data={activeOutstanding}
                            pageIndex={0}
                            pageSize={10}
                            totalCount={activeOutstanding.length}
                            onPageChange={() => { }}
                            onSearch={() => { }}
                        />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (isPnLReport) {
        return (
            <div className="w-full space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-semibold">Profit & Loss Statement</h2>
                        <p className="text-gray-600 mt-1">Fiscal Year Analysis (2025-2026)</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="bg-green-50 border-green-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-green-800">Total Income</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-900">৳128,000</div>
                            <p className="text-xs text-green-600 mt-1">+12% from last quarter</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-red-50 border-red-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-red-800">Total Expenses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-900">৳70,500</div>
                            <p className="text-xs text-red-600 mt-1">+5% from last quarter</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-blue-50 border-blue-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-blue-800">Net Profit</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-900">৳57,500</div>
                            <p className="text-xs text-blue-600 mt-1">Healthy margin maintained</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-purple-50 border-purple-100">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-purple-800">Profit Margin</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-900">44.9%</div>
                            <p className="text-xs text-purple-600 mt-1">Target: 40%</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Income vs Expenses (Monthly)</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="revenue" fill="#16a34a" name="Income" />
                                    <Bar dataKey="expenses" fill="#dc2626" name="Expenses" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Expense Breakdown</CardTitle>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={expenseBreakdown}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }: { name?: string, percent?: number }) => `${name ?? ''} ${((percent || 0) * 100).toFixed(0)}%`}
                                        outerRadius={150}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {expenseBreakdown.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-6">
            <h2 className="text-3xl font-semibold">Financial Reports</h2>
            <p className="text-gray-600">Overview of financial performance and trends</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Revenue vs Expenses</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="revenue" fill="#16a34a" name="Revenue" />
                                <Bar dataKey="expenses" fill="#dc2626" name="Expenses" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Growth Trend</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
