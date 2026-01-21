import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, FileText, Check } from "lucide-react";

export default function BulkSend() {
    return (
        <div className="w-full max-w-4xl mx-auto pb-10">
            <div className="flex flex-col mb-6">
                <h2 className="text-3xl font-semibold">Bulk Messaging</h2>
                <p className="text-gray-500">Send campaigns or announcements to multiple clients</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Campaign Details</CardTitle>
                            <CardDescription>Configure your message settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Channel</Label>
                                <div className="flex gap-4">
                                    <Button variant="default" className="flex-1 gap-2 bg-indigo-600 hover:bg-indigo-700">
                                        Email
                                    </Button>
                                    <Button variant="outline" className="flex-1 gap-2">
                                        SMS
                                    </Button>
                                    <Button variant="outline" className="flex-1 gap-2">
                                        WhatsApp
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Recipients List</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Audience" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all_clients">All Active Clients (450)</SelectItem>
                                        <SelectItem value="leads">New Leads (120)</SelectItem>
                                        <SelectItem value="visa_pending">Visa Pending Clients (85)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Subject Line</Label>
                                <Input placeholder="Enter email subject..." />
                            </div>

                            <div className="space-y-2">
                                <Label>Message Content</Label>
                                <Textarea className="min-h-[200px]" placeholder="Write your message here... You can use {{name}} variables." />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between text-sm border-b pb-2">
                                <span className="text-gray-500">Estimated Audience</span>
                                <span className="font-semibold">450</span>
                            </div>
                            <div className="flex justify-between text-sm border-b pb-2">
                                <span className="text-gray-500">Cost Estimate</span>
                                <span className="font-semibold text-green-600">Free (Email)</span>
                            </div>

                            <div className="bg-yellow-50 p-3 rounded-md text-xs text-yellow-800 flex gap-2">
                                <FileText size={16} />
                                <p>This campaign will be queued and sent over approx. 15 minutes to avoid spam filters.</p>
                            </div>

                            <Button className="w-full gap-2 text-lg py-6 mt-2">
                                <Send size={18} /> Send Campaign
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Template Check</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-sm text-green-600">
                                    <Check size={16} /> <span>Variable valid</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-green-600">
                                    <Check size={16} /> <span>Links verified</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-green-600">
                                    <Check size={16} /> <span>Unsubscribe link included</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
