import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Save, X, Calendar as CalendarIcon, Clock } from "lucide-react";
import { Link } from "react-router";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function CreateAppointment() {
    const [date, setDate] = useState<Date>();

    return (
        <div className="w-full max-w-4xl mx-auto pb-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">Book Appointment</h2>
                    <p className="text-gray-500">Schedule a new consultation or meeting</p>
                </div>
                <div className="flex gap-3">
                    <Link to="/dashboard/migration/appointments">
                        <Button variant="outline" className="gap-2">
                            <X size={16} /> Cancel
                        </Button>
                    </Link>
                    <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                        <Save size={16} /> Book Now
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Form */}
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Client & Service</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Select Client</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Search Client..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ahmed">Ahmed Hassan</SelectItem>
                                        <SelectItem value="fatima">Fatima Rahman</SelectItem>
                                        <SelectItem value="new">-- Register New Walk-in --</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Service Type</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Service" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="consultation">Initial Consultation</SelectItem>
                                            <SelectItem value="doc_review">Document Review</SelectItem>
                                            <SelectItem value="visa_lodge">Visa Lodgement</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Meeting Mode</Label>
                                    <Select defaultValue="in_person">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="in_person">In Person</SelectItem>
                                            <SelectItem value="video"> Video Call (Zoom)</SelectItem>
                                            <SelectItem value="phone">Phone Call</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Notes / Agenda</Label>
                                <Textarea placeholder="Briefly describe the purpose of the meeting..." className="h-24" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Date & Time</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="space-y-2">
                                    <Label>Time Slot</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Time" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0900">09:00 AM</SelectItem>
                                            <SelectItem value="1000">10:00 AM</SelectItem>
                                            <SelectItem value="1100">11:00 AM</SelectItem>
                                            <SelectItem value="1400">02:00 PM</SelectItem>
                                            <SelectItem value="1500">03:00 PM</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-md">
                                <Clock size={16} />
                                <span>Duration: 45 minutes (Default)</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Consultant</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Assign To</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Consultant" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sarah">Sarah Johnson</SelectItem>
                                        <SelectItem value="mike">Mike Chen</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Location</Label>
                                <Input defaultValue="Office Room 101" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-blue-50 border-blue-100">
                        <CardHeader>
                            <CardTitle className="text-blue-800 text-sm">Availability Check</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-blue-700">
                            Select a date and consultant to check available slots dynamically from the calendar system.
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
