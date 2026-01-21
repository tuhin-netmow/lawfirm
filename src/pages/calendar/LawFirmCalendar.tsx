
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
    Plus,
    Clock,
    MapPin,
    Briefcase
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

// Mock Event Type
interface CalendarEvent {
    id: number;
    title: string;
    type: 'Court' | 'Meeting' | 'Deadline' | 'Personal';
    start_time: string; // ISO string
    end_time: string; // ISO string
    date: string; // YYYY-MM-DD for simpler filtering mock
    location?: string;
    matter_title?: string;
    description?: string;
}

const MOCK_EVENTS: CalendarEvent[] = [
    {
        id: 1,
        title: "Hearing: Smith v Jones",
        type: "Court",
        date: "2026-01-09",
        start_time: "09:00",
        end_time: "11:00",
        location: "Supreme Court, Room 404",
        matter_title: "Smith vs Jones"
    },
    {
        id: 2,
        title: "Client Meeting: New Estate",
        type: "Meeting",
        date: "2026-01-09",
        start_time: "14:00",
        end_time: "15:00",
        location: "Meeting Room B",
        description: "Discuss estate planning requirements."
    },
    {
        id: 3,
        title: "Filing Deadline: Motion to Dismiss",
        type: "Deadline",
        date: "2026-01-12",
        start_time: "17:00",
        end_time: "17:00",
        matter_title: "Doe Family Trust"
    },
    {
        id: 4,
        title: "Partner Lunch",
        type: "Personal",
        date: "2026-01-10",
        start_time: "12:30",
        end_time: "13:30",
        location: "The Legal Cafe"
    }
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const getEventColor = (type: CalendarEvent['type']) => {
    switch (type) {
        case 'Court': return "border-red-500 bg-red-50 text-red-700 hover:bg-red-100";
        case 'Meeting': return "border-blue-500 bg-blue-50 text-blue-700 hover:bg-blue-100";
        case 'Deadline': return "border-orange-500 bg-orange-50 text-orange-700 hover:bg-orange-100";
        default: return "border-slate-500 bg-slate-50 text-slate-700 hover:bg-slate-100";
    }
};

export default function LawFirmCalendar() {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date("2026-01-09")); // Mocked "Today" for demo
    const [selectedDate, setSelectedDate] = useState<string>("2026-01-09");

    // Helper to get days in month
    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    // Generate Calendar Grid
    const calendarDays = [];
    // Padding for prev month
    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(<div key={`empty-${i}`} className="h-24 bg-slate-50 border-b border-r border-slate-100" />);
    }
    // Days of current month
    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
        const dayEvents = MOCK_EVENTS.filter(e => e.date === dateStr);
        const isSelected = selectedDate === dateStr;
        const isToday = dateStr === "2026-01-09"; // Mock today

        calendarDays.push(
            <div
                key={d}
                onClick={() => setSelectedDate(dateStr)}
                className={`h-24 border-b border-r border-slate-100 p-2 cursor-pointer transition-colors relative hover:bg-blue-50/50 ${isSelected ? "bg-blue-50" : "bg-white"}`}
            >
                <div className="flex justify-between items-center mb-1">
                    <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday ? "bg-blue-600 text-white" : "text-slate-700"}`}>
                        {d}
                    </span>
                    {dayEvents.length > 0 && <Badge variant="secondary" className="text-[10px] px-1 h-5">{dayEvents.length}</Badge>}
                </div>
                <div className="space-y-1">
                    {dayEvents.slice(0, 2).map(ev => (
                        <div key={ev.id} className={`text-[10px] truncate px-1 rounded border-l-2 ${getEventColor(ev.type)} bg-opacity-10 pl-1`}>
                            {ev.start_time} {ev.title}
                        </div>
                    ))}
                    {dayEvents.length > 2 && (
                        <div className="text-[10px] text-slate-400 pl-1">+ {dayEvents.length - 2} more</div>
                    )}
                </div>
            </div>
        );
    }

    const selectedDayEvents = MOCK_EVENTS.filter(e => e.date === selectedDate);

    return (
        <div className="w-full h-full flex flex-col space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
                    <p className="text-muted-foreground mt-1">Schedule appointments, court dates, and deadlines.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setCurrentDate(new Date())}>Today</Button>
                    <Button
                        className="bg-blue-600 hover:bg-blue-500"
                        onClick={() => navigate("/dashboard/calendar/create")}
                    >
                        <Plus className="mr-2 h-4 w-4" /> New Event
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
                {/* Main Calendar View */}
                <div className="lg:col-span-3 space-y-4">
                    <Card className="h-full flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between py-4">
                            <div className="flex items-center gap-4">
                                <h2 className="text-xl font-semibold">{monthNames[month]} {year}</h2>
                                <div className="flex items-center rounded-md border bg-white shadow-sm">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none rounded-l-md" onClick={prevMonth}>
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <div className="w-px h-4 bg-slate-200" />
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none rounded-r-md" onClick={nextMonth}>
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {/* View Toggles could go here */}
                                <Button variant="ghost" size="sm" className="hidden md:flex">Month</Button>
                                <Button variant="ghost" size="sm" className="text-slate-400 hidden md:flex">Week</Button>
                                <Button variant="ghost" size="sm" className="text-slate-400 hidden md:flex">Day</Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 flex-1">
                            {/* Days Header */}
                            <div className="grid grid-cols-7 border-b border-slate-200">
                                {DAYS.map(day => (
                                    <div key={day} className="py-2 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        {day}
                                    </div>
                                ))}
                            </div>
                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 auto-rows-fr">
                                {calendarDays}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar: Selected Day Details */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="h-full border-l-4 border-l-blue-600 shadow-md">
                        <CardHeader className="bg-slate-50/50 pb-4">
                            <div className="flex items-center gap-2 text-slate-500 text-sm mb-1">
                                <CalendarIcon className="w-4 h-4" />
                                <span>{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <CardTitle className="text-lg">Daily Agenda</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            {selectedDayEvents.length === 0 ? (
                                <div className="text-center py-10 text-slate-400">
                                    <p className="text-sm">No events scheduled for this day.</p>
                                    <Button
                                        variant="link"
                                        className="mt-2 text-blue-600"
                                        onClick={() => navigate("/dashboard/calendar/create")}
                                    >
                                        Add Event
                                    </Button>
                                </div>
                            ) : (
                                selectedDayEvents.map(ev => (
                                    <div key={ev.id} className={`p-3 rounded-lg border-l-4 ${getEventColor(ev.type).split(' ')[0]} bg-white shadow-sm space-y-2`}>
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-semibold text-sm">{ev.title}</h4>
                                            <Badge variant="outline" className="text-[10px] h-5">{ev.type}</Badge>
                                        </div>

                                        <div className="flex items-center gap-2 text-xs text-slate-600">
                                            <Clock className="w-3 h-3" />
                                            <span>{ev.start_time} - {ev.end_time}</span>
                                        </div>

                                        {ev.location && (
                                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                                <MapPin className="w-3 h-3" />
                                                <span>{ev.location}</span>
                                            </div>
                                        )}

                                        {ev.matter_title && (
                                            <div className="flex items-center gap-2 text-xs text-blue-600 mt-1">
                                                <Briefcase className="w-3 h-3" />
                                                <span>{ev.matter_title}</span>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
