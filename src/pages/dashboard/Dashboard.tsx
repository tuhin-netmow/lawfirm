
import { Analytics } from "@/components/dashboard/components/Analytics";
import { Overview } from "@/components/dashboard/components/Overview";
import RecentCustomers from "@/components/dashboard/components/RecentCustomers"; // Can arguably rename to RecentClients if we want to be pedantic, but component name might be shared. keeping for now or renaming logic if possible. Let's assume the component is generic enough or I'll just change the title displayed.
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  useGetDashboardStatsQuery,
  type DashboardStats,
} from "@/store/features/admin/dashboardApiService";
import { useAppSelector } from "@/store/store";
import {
  Briefcase,
  Gavel,
  Scale,
  Users,
  Clock,
  TrendingUp,
  DollarSign,
  CalendarDays
} from "lucide-react";
import { Link } from "react-router";

export default function Dashboard() {
  const { data: dashboardStatsData } = useGetDashboardStatsQuery();

  const dashboardStats: DashboardStats | undefined = dashboardStatsData?.data;
  const currency = useAppSelector((state) => state.currency.value);

  // Mock data for Law Firm stats
  const lawFirmStats = {
    activeMatters: 42,
    pendingTasks: 18,
    billableHoursMonth: 145,
    trustBalance: 250000,
    urgentDeadlines: 3
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Law Firm Dashboard</h1>
      </div>
      <Tabs
        orientation="vertical"
        defaultValue="overview"
        className="space-y-4"
      >
        <TabsContent value="overview" className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">

            {/* Total Revenue */}
            <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Revenue
                </CardTitle>
                <div className="p-2 bg-blue-100 rounded-full">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">
                  {currency} {dashboardStats?.revenue?.toLocaleString() || "0"}
                </div>
                <p className="text-xs text-green-600 mt-1 font-medium">
                  +8% from last month
                </p>
              </CardContent>
            </Card>

            {/* Active Matters */}
            <Card className="border-l-4 border-l-indigo-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Active Matters
                </CardTitle>
                <div className="p-2 bg-indigo-100 rounded-full">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">
                  {lawFirmStats.activeMatters}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Cases in progress
                </p>
              </CardContent>
            </Card>

            {/* Billable Hours */}
            <Card className="border-l-4 border-l-emerald-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Billable Hours
                </CardTitle>
                <div className="p-2 bg-emerald-100 rounded-full">
                  <Clock className="w-4 h-4 text-emerald-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">
                  {lawFirmStats.billableHoursMonth}
                </div>
                <p className="text-xs text-emerald-600 mt-1 font-medium">
                  This Month
                </p>
              </CardContent>
            </Card>

            {/* Total Clients */}
            <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Total Clients
                </CardTitle>
                <div className="p-2 bg-purple-100 rounded-full">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">
                  {dashboardStats?.activeCustomers || 0}
                </div>
                <p className="text-xs text-purple-600 mt-1 font-medium">
                  Active clients
                </p>
              </CardContent>
            </Card>

            {/* Trust Balance */}
            <Card className="border-l-4 border-l-amber-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Trust Balance
                </CardTitle>
                <div className="p-2 bg-amber-100 rounded-full">
                  <DollarSign className="h-4 w-4 text-amber-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">
                  {currency} {lawFirmStats.trustBalance.toLocaleString()}
                </div>
                <p className="text-xs text-gray-500 mt-1 font-medium">
                  Client funds held
                </p>
              </CardContent>
            </Card>

            {/* Court Dates */}
            <Card className="border-l-4 border-l-rose-500 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  Court Dates
                </CardTitle>
                <div className="p-2 bg-rose-100 rounded-full">
                  <Gavel className="w-4 h-4 text-rose-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">
                  {lawFirmStats.urgentDeadlines}
                </div>
                <p className="text-xs text-rose-600 mt-1 font-medium">
                  Upcoming this week
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
            <Card className="col-span-1 lg:col-span-4 shadow-sm border-gray-100">
              <CardHeader>
                <CardTitle>Financial Performance</CardTitle>
                <CardDescription>Revenue overview for {new Date().getFullYear()}</CardDescription>
              </CardHeader>
              <CardContent className="ps-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-1 lg:col-span-3 shadow-sm border-gray-100">
              <CardHeader className="flex justify-between gap-4 items-center">
                <div>
                  <CardTitle>Recent Clients</CardTitle>
                  <CardDescription>New client registrations</CardDescription>
                </div>
                <Link to="/dashboard/clients/list">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </CardHeader>
              <CardContent>
                {/* Reusing RecentCustomers component but treating it as Clients */}
                <RecentCustomers />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

            {/* Recent Matters */}
            <Card className="shadow-sm border-gray-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-base font-semibold">Recent Matters</CardTitle>
                  <CardDescription>Latest opened cases and files</CardDescription>
                </div>
                <Link to="/dashboard/matters/list">
                  <Button variant="outline" size="sm">View All Matters</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center">
                          <Scale className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Smith vs. Jones {i}</p>
                          <p className="text-xs text-gray-500">Corporate Litigation</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Open
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Court Dates */}
            <Card className="shadow-sm border-gray-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-base font-semibold">Court Schedule</CardTitle>
                  <CardDescription>Upcoming hearings and deadlines</CardDescription>
                </div>
                <Link to="/dashboard/calendar/court-dates">
                  <Button variant="outline" size="sm">View Calendar</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-rose-100 flex items-center justify-center">
                          <CalendarDays className="h-5 w-5 text-rose-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Preliminary Hearing - Case #{1000 + i}</p>
                          <p className="text-xs text-gray-500">District Court - Room 30{i}</p>
                        </div>
                      </div>
                      <div className="text-right text-sm text-rose-600 font-medium">
                        Tomorrow at 9:00 AM
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Analytics />
        </TabsContent>
      </Tabs>
    </>
  );
}
