import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Clock } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Mock Booking Data
const initialEvents = [
    {
        id: '1',
        title: 'John Smith - Full Detailing',
        start: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
        end: new Date(new Date().setHours(12, 0, 0, 0)).toISOString(),
        backgroundColor: '#2563eb', // Blue for scheduled
        borderColor: '#2563eb',
        extendedProps: {
            status: 'Scheduled',
            customer: 'John Smith',
            vehicle: 'Toyota Camry',
        }
    },
    {
        id: '2',
        title: 'Sarah Johnson - Oil Change',
        start: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0] + 'T14:00:00',
        end: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0] + 'T15:00:00',
        backgroundColor: '#16a34a', // Green for confirmed
        borderColor: '#16a34a',
        extendedProps: {
            status: 'Confirmed',
            customer: 'Sarah Johnson',
            vehicle: 'Honda CR-V',
        }
    },
    {
        id: '3',
        title: 'Mike Brown - Brake Inspection',
        start: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0] + 'T09:00:00',
        end: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0] + 'T10:00:00',
        backgroundColor: '#f59e0b', // Amber for tentative
        borderColor: '#f59e0b',
        extendedProps: {
            status: 'Tentative',
            customer: 'Mike Brown',
            vehicle: 'Ford Ranger',
        }
    }
];

const BookingCalendar = () => {
    const [events, setEvents] = useState(initialEvents);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newBooking, setNewBooking] = useState({
        customer: '',
        vehicle: '',
        service: '',
        date: '',
        time: '',
        duration: '60',
    });

    const handleDateClick = (arg: any) => {
        setNewBooking({ ...newBooking, date: arg.dateStr, time: '09:00' });
        setIsCreateModalOpen(true);
    };

    const handleCreateBooking = () => {
        if (!newBooking.customer || !newBooking.vehicle || !newBooking.date || !newBooking.time) {
            alert("Customer, Vehicle, Date, and Time are required.");
            return;
        }

        const startDateTime = `${newBooking.date}T${newBooking.time}:00`;
        // Calculate end time simply by adding hours (very basic for mock)
        const startDate = new Date(startDateTime);
        const endDate = new Date(startDate.getTime() + parseInt(newBooking.duration) * 60000);

        const eventToAdd = {
            id: (events.length + 1).toString(),
            title: `${newBooking.customer} - ${newBooking.service || 'Service'}`,
            start: startDateTime,
            end: endDate.toISOString(),
            backgroundColor: '#2563eb',
            borderColor: '#2563eb',
            extendedProps: {
                status: 'Scheduled',
                customer: newBooking.customer,
                vehicle: newBooking.vehicle,
            }
        };

        setEvents([...events, eventToAdd]);
        setIsCreateModalOpen(false);
        setNewBooking({
            customer: '',
            vehicle: '',
            service: '',
            date: '',
            time: '',
            duration: '60',
        });
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Booking Calendar</h1>
                    <p className="text-muted-foreground mt-1">Schedule and manage service appointments.</p>
                </div>
                <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> New Booking
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Schedule New Service</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="customer">Customer</Label>
                                <Input
                                    id="customer"
                                    placeholder="Select Customer"
                                    value={newBooking.customer}
                                    onChange={(e) => setNewBooking({ ...newBooking, customer: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="vehicle">Vehicle</Label>
                                <Input
                                    id="vehicle"
                                    placeholder="Select Vehicle"
                                    value={newBooking.vehicle}
                                    onChange={(e) => setNewBooking({ ...newBooking, vehicle: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="service">Service Type</Label>
                                <Input
                                    id="service"
                                    placeholder="e.g. Detailing, Repair"
                                    value={newBooking.service}
                                    onChange={(e) => setNewBooking({ ...newBooking, service: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="date">Date</Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        value={newBooking.date}
                                        onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="time">Time</Label>
                                    <Input
                                        id="time"
                                        type="time"
                                        value={newBooking.time}
                                        onChange={(e) => setNewBooking({ ...newBooking, time: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="duration">Estimated Duration (mins)</Label>
                                <Select
                                    value={newBooking.duration}
                                    onValueChange={(val) => setNewBooking({ ...newBooking, duration: val })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select duration" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="30">30 Minutes</SelectItem>
                                        <SelectItem value="60">1 Hour</SelectItem>
                                        <SelectItem value="90">1.5 Hours</SelectItem>
                                        <SelectItem value="120">2 Hours</SelectItem>
                                        <SelectItem value="180">3 Hours</SelectItem>
                                        <SelectItem value="240">4 Hours</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
                            <Button onClick={handleCreateBooking}>Confirm Booking</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="h-[800px]">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" /> Schedule Management
                    </CardTitle>
                </CardHeader>
                <CardContent className="h-[720px] p-0 overflow-hidden">
                    <div className="h-full w-full p-4">
                        <style>{`
                            .fc { height: 100%; }
                            .fc-toolbar-title { font-size: 1.25rem !important; font-weight: 600; }
                            .fc-button-primary { background-color: hsl(var(--primary)) !important; border-color: hsl(var(--primary)) !important; }
                            .fc-button-primary:hover { background-color: hsl(var(--primary)/0.9) !important; border-color: hsl(var(--primary)/0.9) !important; }
                        `}</style>
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                            initialView="timeGridWeek"
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                            }}
                            events={events}
                            dateClick={handleDateClick}
                            editable={true}
                            selectable={true}
                            selectMirror={true}
                            dayMaxEvents={true}
                            weekends={true}
                            slotMinTime="08:00:00"
                            slotMaxTime="19:00:00"
                            allDaySlot={false}
                            height="100%"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default BookingCalendar;
