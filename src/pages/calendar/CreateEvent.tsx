
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Calendar as CalendarIcon, Clock } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function CreateEvent() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        type: "Meeting",
        date: "",
        start_time: "",
        end_time: "",
        location: "",
        matter_id: "",
        description: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API
        setTimeout(() => {
            console.log("Creating Event:", formData);
            setIsLoading(false);
            navigate("/dashboard/calendar");
        }, 1000);
    };

    return (
        <div className="w-full max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/dashboard/calendar">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Schedule New Event</h1>
                    <p className="text-muted-foreground text-sm">Add appointments, court dates, or deadlines to the firm calendar.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Event Title <span className="text-red-500">*</span></Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="e.g. Initial Consultation - John Smith"
                                required
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="type">Event Type</Label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(val) => setFormData(prev => ({ ...prev, type: val }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Meeting">Meeting</SelectItem>
                                        <SelectItem value="Court">Court Hearing</SelectItem>
                                        <SelectItem value="Deadline">Deadline</SelectItem>
                                        <SelectItem value="Personal">Personal</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="matter_id">Related Matter</Label>
                                <Select
                                    value={formData.matter_id}
                                    onValueChange={(val) => setFormData(prev => ({ ...prev, matter_id: val }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a matter..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="101">Smith vs Jones</SelectItem>
                                        <SelectItem value="102">Estate of Elder</SelectItem>
                                        <SelectItem value="general">General (None)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="date">Date <span className="text-red-500">*</span></Label>
                                <div className="relative">
                                    <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="date"
                                        name="date"
                                        type="date"
                                        className="pl-9"
                                        required
                                        value={formData.date}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="start_time">Start Time</Label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="start_time"
                                        name="start_time"
                                        type="time"
                                        className="pl-9"
                                        value={formData.start_time}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="end_time">End Time</Label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="end_time"
                                        name="end_time"
                                        type="time"
                                        className="pl-9"
                                        value={formData.end_time}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                name="location"
                                placeholder="e.g. Conference Room A or Zoom Link"
                                value={formData.location}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description / Notes</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Add agenda or details..."
                                className="min-h-[120px]"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Link to="/dashboard/calendar">
                                <Button variant="ghost" type="button">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-500">
                                {isLoading ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Event</>}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
