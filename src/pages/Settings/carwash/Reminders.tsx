
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, MoreHorizontal, Edit, Trash2, Bell, Calendar, Gauge } from "lucide-react";
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

// Mock Data
const initialReminders = [
    { id: 1, name: "Oil Change Reminder", service: "Oil Change", triggerType: "Time", interval: "6 months", mileage: null, template: "Standard Service", status: "Active" },
    { id: 2, name: "Tire Rotation", service: "Tire Rotation", triggerType: "Mileage", interval: null, mileage: "10,000 km", template: "Maintenance Alert", status: "Active" },
    { id: 3, name: "Brake Inspection", service: "Brake Inspection", triggerType: "Time", interval: "12 months", mileage: null, template: "Safety Check", status: "Active" },
    { id: 4, name: "Engine Service", service: "Engine Diagnostic", triggerType: "Both", interval: "12 months", mileage: "20,000 km", template: "Premium Service", status: "Active" },
    { id: 5, name: "Battery Check", service: "Battery Inspection", triggerType: "Time", interval: "24 months", mileage: null, template: "Standard Service", status: "Inactive" },
];

const Reminders = () => {
    const [reminders] = useState(initialReminders);
    const [searchTerm, setSearchTerm] = useState("");
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const filteredReminders = reminders.filter(reminder =>
        reminder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reminder.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reminder.template.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getTriggerBadge = (type: string) => {
        switch (type) {
            case "Time": return <Badge variant="secondary" className="gap-1 bg-blue-50 text-blue-700 border-blue-200"><Calendar className="h-3 w-3" /> Time-Based</Badge>;
            case "Mileage": return <Badge variant="secondary" className="gap-1 bg-orange-50 text-orange-700 border-orange-200"><Gauge className="h-3 w-3" /> Mileage-Based</Badge>;
            case "Both": return <Badge variant="secondary" className="gap-1 bg-purple-50 text-purple-700 border-purple-200"><Bell className="h-3 w-3" /> Time & Mileage</Badge>;
            default: return <Badge variant="outline">{type}</Badge>;
        }
    };

    const stats = {
        total: reminders.length,
        active: reminders.filter(r => r.status === "Active").length,
        timeBased: reminders.filter(r => r.triggerType === "Time" || r.triggerType === "Both").length,
        mileageBased: reminders.filter(r => r.triggerType === "Mileage" || r.triggerType === "Both").length,
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Service Reminders</h1>
                    <p className="text-muted-foreground mt-1">Automate customer service reminders and notifications.</p>
                </div>
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Create Rule
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                            <DialogTitle>Create Reminder Rule</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label>Rule Name</Label>
                                <Input placeholder="e.g. Oil Change Reminder" />
                            </div>

                            <div className="space-y-2">
                                <Label>Service Type</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select service..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="oil">Oil Change</SelectItem>
                                        <SelectItem value="tire">Tire Rotation</SelectItem>
                                        <SelectItem value="brake">Brake Inspection</SelectItem>
                                        <SelectItem value="engine">Engine Diagnostic</SelectItem>
                                        <SelectItem value="battery">Battery Check</SelectItem>
                                        <SelectItem value="filter">Air Filter Replacement</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Trigger Type</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select trigger..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="time">Time-Based (Months)</SelectItem>
                                        <SelectItem value="mileage">Mileage-Based (Kilometers)</SelectItem>
                                        <SelectItem value="both">Both (Time & Mileage)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Time Interval (Months)</Label>
                                    <Input type="number" placeholder="e.g. 6" />
                                    <p className="text-xs text-muted-foreground">Leave empty if not time-based</p>
                                </div>
                                <div className="space-y-2">
                                    <Label>Mileage Interval (km)</Label>
                                    <Input type="number" placeholder="e.g. 10000" />
                                    <p className="text-xs text-muted-foreground">Leave empty if not mileage-based</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Notification Template</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select template..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="standard">Standard Service Reminder</SelectItem>
                                        <SelectItem value="maintenance">Maintenance Alert</SelectItem>
                                        <SelectItem value="safety">Safety Check Reminder</SelectItem>
                                        <SelectItem value="premium">Premium Service Notification</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Reminder Message</Label>
                                <Textarea
                                    placeholder="Customize the reminder message sent to customers..."
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-4 border-t pt-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Send Email Notification</Label>
                                        <p className="text-xs text-muted-foreground">Email customers when reminder is due</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Send SMS Notification</Label>
                                        <p className="text-xs text-muted-foreground">Text customers when reminder is due</p>
                                    </div>
                                    <Switch />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Active</Label>
                                        <p className="text-xs text-muted-foreground">Enable this reminder rule</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                            <Button onClick={() => setIsCreateOpen(false)}>Create Rule</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Rules</p>
                                <p className="text-2xl font-bold">{stats.total}</p>
                            </div>
                            <Bell className="h-8 w-8 text-muted-foreground" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Active Rules</p>
                                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                            </div>
                            <Bell className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Time-Based</p>
                                <p className="text-2xl font-bold text-blue-600">{stats.timeBased}</p>
                            </div>
                            <Calendar className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Mileage-Based</p>
                                <p className="text-2xl font-bold text-orange-600">{stats.mileageBased}</p>
                            </div>
                            <Gauge className="h-8 w-8 text-orange-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Automated Reminder Rules</CardTitle>
                        <div className="relative w-[300px]">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search rules..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Rule Name</TableHead>
                                <TableHead>Service Type</TableHead>
                                <TableHead>Trigger Type</TableHead>
                                <TableHead>Time Interval</TableHead>
                                <TableHead>Mileage Interval</TableHead>
                                <TableHead>Template</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredReminders.map((reminder) => (
                                <TableRow key={reminder.id}>
                                    <TableCell className="font-medium">{reminder.name}</TableCell>
                                    <TableCell>{reminder.service}</TableCell>
                                    <TableCell>{getTriggerBadge(reminder.triggerType)}</TableCell>
                                    <TableCell className="text-sm">
                                        {reminder.interval || <span className="text-muted-foreground">-</span>}
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {reminder.mileage || <span className="text-muted-foreground">-</span>}
                                    </TableCell>
                                    <TableCell className="text-sm">{reminder.template}</TableCell>
                                    <TableCell>
                                        <Badge variant={reminder.status === "Active" ? "success" : "secondary"}>
                                            {reminder.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>
                                                    <Edit className="mr-2 h-4 w-4" /> Edit Rule
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600">
                                                    <Trash2 className="mr-2 h-4 w-4" /> Delete Rule
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default Reminders;
