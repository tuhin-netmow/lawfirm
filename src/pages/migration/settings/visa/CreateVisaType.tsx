
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft } from "lucide-react";

export default function CreateVisaType() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Add Visa Type</h2>
                    <p className="text-sm text-muted-foreground">Configure new visa subclass and requirements.</p>
                </div>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Visa Details</CardTitle>
                        <CardDescription>Basic information about the visa subclass.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Visa Name <span className="text-red-500">*</span></label>
                                    <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. Skilled Independent" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Subclass Code <span className="text-red-500">*</span></label>
                                    <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. 189" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Category</label>
                                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="">Select Category</option>
                                        <option value="skilled">Skilled Migration</option>
                                        <option value="family">Family & Partner</option>
                                        <option value="student">Student & Training</option>
                                        <option value="employer">Employer Sponsored</option>
                                        <option value="visitor">Visitor & Tourist</option>
                                        <option value="business">Business & Investor</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Status</label>
                                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="legacy">Legacy (No new applications)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="Brief description of the visa purpose and scope..." />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Processing & Fees</CardTitle>
                        <CardDescription>Estimated timelines and government fees.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Est. Processing Time</label>
                                <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. 5-9 Months" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Base Application Fee (AUD)</label>
                                <input type="number" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. 4045" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
                    <Button>
                        <Save className="mr-2 h-4 w-4" /> Save Visa Type
                    </Button>
                </div>
            </div>
        </div>
    );
}
