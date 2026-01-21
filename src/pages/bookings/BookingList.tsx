
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Filter, Calendar, Clock, Car, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router';

// Mock Data for Bookings
const initialBookings = [
    {
        id: "1",
        booking_no: "BK-2024-001",
        customer: "John Smith",
        vehicle: "Toyota Camry (ABC-1234)",
        service_type: "Full Detailing",
        booking_datetime: "2024-05-20T10:00:00",
        duration: "120 mins",
        status: "Scheduled",
        advisor: "Mike A.",
    },
    {
        id: "2",
        booking_no: "BK-2024-002",
        customer: "Sarah Johnson",
        vehicle: "Honda CR-V (XYZ-9876)",
        service_type: "Oil Change",
        booking_datetime: "2024-05-21T14:30:00",
        duration: "60 mins",
        status: "Confirmed",
        advisor: "Sarah L.",
    },
    {
        id: "3",
        booking_no: "BK-2024-003",
        customer: "Mike Brown",
        vehicle: "Ford Ranger (LMN-4567)",
        service_type: "Brake Inspection",
        booking_datetime: "2024-05-22T09:00:00",
        duration: "90 mins",
        status: "Completed",
        advisor: "Mike A.",
    },
    {
        id: "4",
        booking_no: "BK-2024-004",
        customer: "Emily Davis",
        vehicle: "Tesla Model 3 (EV-001)",
        service_type: "Car Wash",
        booking_datetime: "2024-05-22T11:00:00",
        duration: "45 mins",
        status: "Cancelled",
        advisor: "N/A",
    },
];

const BookingList = () => {
    const navigate = useNavigate();
    const [bookings] = useState(initialBookings);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredBookings = bookings.filter(b =>
        b.booking_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Confirm":
            case "Confirmed": return <Badge variant="success">Confirmed</Badge>;
            case "Scheduled": return <Badge variant="info">Scheduled</Badge>;
            case "In Progress": return <Badge variant="warning">In Progress</Badge>; // Changed to warning as it implies activity
            case "Completed": return <Badge variant="primary">Completed</Badge>;
            case "Cancelled": return <Badge variant="destructive">Cancelled</Badge>;
            case "No Show": return <Badge variant="destructive">No Show</Badge>;
            default: return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const formatDateTime = (dateStr: string) => {
        const date = new Date(dateStr);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">All Bookings</h1>
                    <p className="text-muted-foreground mt-1">View and manage all service appointments.</p>
                </div>
                <Button onClick={() => navigate('/dashboard/bookings/calendar')}>
                    <Plus className="mr-2 h-4 w-4" /> New Booking
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Bookings List</CardTitle>
                        <div className="flex space-x-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search booking #, customer..."
                                    className="pl-8 w-[300px]"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />
                            </div>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Booking No</TableHead>
                                <TableHead>Customer & Vehicle</TableHead>
                                <TableHead>Service Info</TableHead>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Advisor</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredBookings.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                                        No bookings found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredBookings.map((booking) => {
                                    const { date, time } = formatDateTime(booking.booking_datetime);
                                    return (
                                        <TableRow key={booking.id}>
                                            <TableCell className="font-mono font-medium">
                                                {booking.booking_no}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col space-y-1">
                                                    <div className="flex items-center gap-2 font-medium text-sm">
                                                        <User className="h-3 w-3 text-muted-foreground" /> {booking.customer}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        <Car className="h-3 w-3" /> {booking.vehicle}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium">{booking.service_type}</span>
                                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                        <Clock className="h-3 w-3" /> {booking.duration}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3 text-muted-foreground" /> {date}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-muted-foreground">
                                                        <Clock className="h-3 w-3" /> {time}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm">{booking.advisor}</TableCell>
                                            <TableCell>{getStatusBadge(booking.status)}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm">Details</Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default BookingList;
