import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Info } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";

export default function CreateTemplate() {
    const location = useLocation();
    const [type, setType] = useState<"email" | "whatsapp" | "sms">("email");

    // Automatically detect type from URL
    useEffect(() => {
        if (location.pathname.includes("whatsapp")) setType("whatsapp");
        else if (location.pathname.includes("sms")) setType("sms");
        else setType("email");
    }, [location.pathname]);

    const getBackUrl = () => {
        if (type === "whatsapp") return "/dashboard/migration/communication/whatsapp-templates";
        if (type === "sms") return "/dashboard/migration/communication/sms-templates";
        return "/dashboard/migration/communication/email-templates";
    };

    return (
        <div className="w-full max-w-4xl mx-auto pb-10">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Link to={getBackUrl()}>
                        <Button variant="ghost" size="icon">
                            <ArrowLeft size={20} />
                        </Button>
                    </Link>
                    <div>
                        <h2 className="text-3xl font-semibold">Create {type.charAt(0).toUpperCase() + type.slice(1)} Template</h2>
                        <p className="text-gray-500">Design a new message template</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Link to={getBackUrl()}>
                        <Button variant="outline">Cancel</Button>
                    </Link>
                    <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                        <Save size={16} /> Save Template
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Template Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Template Name</Label>
                                <Input placeholder="e.g. Visa Approval Notification" />
                            </div>

                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Select defaultValue="marketing">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="transactional">Transactional (Alerts, Reminders)</SelectItem>
                                        <SelectItem value="marketing">Marketing (Promotions)</SelectItem>
                                        <SelectItem value="support">Support</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {type === "email" && (
                                <div className="space-y-2">
                                    <Label>Email Subject</Label>
                                    <Input placeholder="Enter subject line..." />
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label>Message Content</Label>
                                <div className="bg-gray-50 border p-3 rounded-md mb-2 flex flex-wrap gap-2 text-xs">
                                    <span className="font-semibold text-gray-700">Available Variables:</span>
                                    <code className="bg-white border px-1 rounded">{"{{name}}"}</code>
                                    <code className="bg-white border px-1 rounded">{"{{visa_type}}"}</code>
                                    <code className="bg-white border px-1 rounded">{"{{appointment_date}}"}</code>
                                </div>
                                <Textarea
                                    className="min-h-[250px] font-mono text-sm"
                                    placeholder={type === "email" ? "Dear {{name}}, ..." : "Hi {{name}}, ..."}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm">Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="border rounded-md p-4 bg-gray-50 min-h-[200px]">
                                <div className="space-y-2">
                                    {type === "email" && (
                                        <div className="border-b pb-2 mb-2">
                                            <p className="text-xs text-gray-500">Subject</p>
                                            <p className="text-sm font-semibold">Welcome to our Service</p>
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">Body</p>
                                        <p className="text-sm text-gray-800 whitespace-pre-wrap">
                                            {type === "email" ? "Dear Client Name,\n\nWelcome to our services..." : "Hi Client Name, ..."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex gap-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-md">
                                <Info size={16} className="shrink-0 mt-0.5" />
                                <p>This is a rough preview. Actual rendering may vary depending on the client's device.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select defaultValue="active">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="draft">Draft</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
