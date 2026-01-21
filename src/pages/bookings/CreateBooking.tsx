

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateBooking = () => {
    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
                    <h1 className="text-3xl font-bold tracking-tight">Create Booking</h1>
                </div>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Booking Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Customer</Label>
                            <Input placeholder="Select Customer" />
                        </div>
                        <div className="space-y-2">
                            <Label>Vehicle</Label>
                            <Input placeholder="Select Vehicle" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Date & Time</Label>
                            <Input type="datetime-local" />
                        </div>
                        <div className="space-y-2">
                            <Label>Service Type</Label>
                            <Input placeholder="e.g. Oil Change" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Notes/Symptoms</Label>
                        <Input placeholder="Describe the issue..." />
                    </div>
                    <div className="pt-4">
                        <Button className="w-full"><Save className="mr-2 h-4 w-4" /> Save Booking</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateBooking;
