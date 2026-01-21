
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft, MapPin, Check } from "lucide-react";

export default function CreateBranch() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Add New Branch</h2>
                    <p className="text-sm text-muted-foreground">Register a new office location or team.</p>
                </div>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Branch Details</CardTitle>
                        <CardDescription>Basic information about the office.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Branch Name <span className="text-red-500">*</span></label>
                                    <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. Melbourne Southbank" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Branch Manager</label>
                                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="">Select Manager</option>
                                        <option value="1">Sarah Jenkins</option>
                                        <option value="2">David Lo</option>
                                        <option value="3">Amanda Smith</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email Address</label>
                                    <input type="email" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="melbourne@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Phone Number</label>
                                    <input type="tel" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="+61 3 0000 0000" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Status</label>
                                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="opening_soon">Opening Soon</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Location</CardTitle>
                        <CardDescription>Physical address and timezone.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Street Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input className="flex h-10 w-full rounded-md border border-input bg-background pl-9 px-3 py-2 text-sm" placeholder="123 Example St" />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">City</label>
                                    <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="City" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">State / Province</label>
                                    <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="State" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Postcode</label>
                                    <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Postcode" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Timezone</label>
                                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                    <option value="australia/sydney">Australia/Sydney (AEST)</option>
                                    <option value="australia/perth">Australia/Perth (AWST)</option>
                                    <option value="australia/adelaide">Australia/Adelaide (ACST)</option>
                                </select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Permissions</CardTitle>
                        <CardDescription>Control visibility and access for this branch.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2 border p-4 rounded-md">
                                <div className="flex-1">
                                    <p className="font-medium">Shared Database Access</p>
                                    <p className="text-sm text-muted-foreground">Allow this branch to view clients from other branches.</p>
                                </div>
                                <div className="h-6 w-6 rounded border flex items-center justify-center bg-primary text-primary-foreground">
                                    <Check className="h-4 w-4" />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 border p-4 rounded-md">
                                <div className="flex-1">
                                    <p className="font-medium">Centralized Billing</p>
                                    <p className="text-sm text-muted-foreground">Invoices are managed by the HQ team.</p>
                                </div>
                                <div className="h-6 w-6 rounded border flex items-center justify-center bg-primary text-primary-foreground">
                                    <Check className="h-4 w-4" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
                    <Button>
                        <Save className="mr-2 h-4 w-4" /> Save Branch
                    </Button>
                </div>
            </div>
        </div>
    );
}
