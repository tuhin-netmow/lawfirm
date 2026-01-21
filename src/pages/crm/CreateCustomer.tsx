

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateCustomer = () => {
    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
                    <h1 className="text-3xl font-bold tracking-tight">Create Customer</h1>
                </div>
            </div>

            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle>Customer Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <Label>Phone</Label>
                            <Input placeholder="+1 234 567 890" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                        <Label>Address</Label>
                        <Input placeholder="Search Address" />
                    </div>
                    <div className="pt-4">
                        <Button className="w-full"><Save className="mr-2 h-4 w-4" /> Save Customer</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreateCustomer;
