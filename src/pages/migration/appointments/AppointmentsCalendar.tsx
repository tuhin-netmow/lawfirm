import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Link } from "react-router";

export default function AppointmentsCalendar() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // Mock simple calendar grid for current week or month view visualization
    // In a real app we'd use FullCalendar or React-Big-Calendar

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">Calendar</h2>
                    <p className="text-gray-600">Overview of scheduled appointments</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center px-4 font-medium border rounded-md bg-white">
                        January 2026
                    </div>
                    <Button variant="outline" size="icon">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Link to="/dashboard/migration/appointments/create" className="ml-2">
                        <Button className="gap-2">
                            <Plus size={16} /> New Event
                        </Button>
                    </Link>
                </div>
            </div>

            <Card className="flex-1 min-h-[600px]">
                <CardContent className="p-0 h-full flex flex-col">
                    {/* Header Row */}
                    <div className="grid grid-cols-7 border-b">
                        {days.map(day => (
                            <div key={day} className="p-4 text-center font-semibold text-gray-500 border-r last:border-r-0">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid - simplified mock */}
                    <div className="flex-1 grid grid-cols-7 grid-rows-5">
                        {/* Mock empty cells and some event cells */}
                        {Array.from({ length: 35 }).map((_, i) => (
                            <div key={i} className="border-b border-r p-2 min-h-[100px] relative hover:bg-gray-50 transition-colors">
                                <span className="text-xs text-gray-400 font-medium p-1 block">{i + 1 <= 31 ? i + 1 : ""}</span>

                                {/* Mock Events */}
                                {i === 7 && (
                                    <div className="bg-blue-100 text-blue-700 text-xs p-1 rounded mb-1 truncate cursor-pointer">
                                        10:00 AM - Ahmed H.
                                    </div>
                                )}
                                {i === 7 && (
                                    <div className="bg-purple-100 text-purple-700 text-xs p-1 rounded truncate cursor-pointer">
                                        02:30 PM - Fatima R.
                                    </div>
                                )}
                                {i === 9 && (
                                    <div className="bg-green-100 text-green-700 text-xs p-1 rounded truncate cursor-pointer">
                                        09:00 AM - Walk-in
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
