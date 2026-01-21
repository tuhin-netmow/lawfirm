import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

const WidgetSettings = () => {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Chat Widget Settings</h1>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Appearance & Behavior</CardTitle>
                        <CardDescription>Customize how the AI Assistant looks to your clients.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="botName">Assistant Name</Label>
                            <Input id="botName" placeholder="e.g. Auto Service Helper" defaultValue="Auto Service Assistant" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="welcomeMsg">Welcome Message</Label>
                            <Textarea
                                id="welcomeMsg"
                                placeholder="Hello! How can I help you with your vehicle service?"
                                defaultValue="Hi there! I can help you with Invoices, Payments, Inventory, or Purchase Orders."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="color">Brand Color</Label>
                            <div className="flex items-center gap-2">
                                <Input id="color" type="color" className="w-12 h-10 p-1" defaultValue="#2563eb" />
                                <span className="text-sm text-gray-500">Pick a color to match your brand.</span>
                            </div>
                        </div>

                        <Button>Save Changes</Button>
                    </CardContent>
                </Card>

                {/* Preview Section - We can enhance this later */}
                <Card className="bg-gray-50/50">
                    <CardHeader>
                        <CardTitle>Live Preview</CardTitle>
                        <CardDescription>See how it looks in real-time.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center min-h-[300px]">
                        <div className="p-4 bg-white border shadow-lg rounded-xl w-[300px]">
                            <div className="flex items-center p-3 mb-4 text-white bg-blue-600 rounded-t-lg">
                                <div className="font-semibold">Auto Service Assistant</div>
                            </div>
                            <div className="space-y-3">
                                <div className="p-2 text-sm bg-gray-100 rounded-lg rounded-tl-none w-fit">
                                    Hi there! I can help you with Invoices, Payments, Inventory, or Purchase Orders.
                                </div>
                            </div>
                            <div className="pt-4 mt-4 border-t">
                                <div className="h-8 bg-gray-100 rounded"></div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default WidgetSettings;
