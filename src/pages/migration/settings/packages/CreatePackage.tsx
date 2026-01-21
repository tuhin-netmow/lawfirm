
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft, DollarSign } from "lucide-react";

export default function CreatePackage() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Create Service Package</h2>
                    <p className="text-sm text-muted-foreground">Define a new service offering and pricing.</p>
                </div>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Package Information</CardTitle>
                        <CardDescription>Basic details about the service package.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Package Name <span className="text-red-500">*</span></label>
                                    <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. Premium Partner Visa Service" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Service Type</label>
                                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="full">Full Service</option>
                                        <option value="consultation">Consultation Only</option>
                                        <option value="review">Document Review</option>
                                        <option value="assessment">Eligibility Assessment</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Target Visa Subclass</label>
                                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="">Any / General</option>
                                        <option value="500">Student Visa (500)</option>
                                        <option value="189">Skilled Independent (189)</option>
                                        <option value="820">Partner Visa (820)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Status</label>
                                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="active">Active</option>
                                        <option value="draft">Draft</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="Describe the inclusions and scope of this package..." />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Pricing & Payment</CardTitle>
                        <CardDescription>Set the pricing model for this package.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Payment Type</label>
                                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                    <option value="fixed">Fixed Price</option>
                                    <option value="hourly">Hourly Rate</option>
                                    <option value="quote">Quote Based</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Amount (AUD)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <input type="number" className="flex h-10 w-full rounded-md border border-input bg-background pl-9 px-3 py-2 text-sm" placeholder="0.00" />
                                </div>
                            </div>
                            <div className="col-span-2 space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium">
                                    <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                                    Allow Installment Plans
                                </label>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
                    <Button>
                        <Save className="mr-2 h-4 w-4" /> Save Package
                    </Button>
                </div>
            </div>
        </div>
    );
}
