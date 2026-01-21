
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft } from "lucide-react";

export default function CreatePricingRule() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Create Pricing Rule</h2>
                    <p className="text-sm text-muted-foreground">Define logic for automated price adjustments.</p>
                </div>
            </div>

            <div className="grid gap-6 max-w-3xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Rule Definition</CardTitle>
                        <CardDescription>Configure when and how pricing should change.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Rule Name <span className="text-red-500">*</span></label>
                                <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. Family Group Discount" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Rule Type</label>
                                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        <option value="discount">Discount (Reduction)</option>
                                        <option value="surcharge">Surcharge (Increase)</option>
                                        <option value="fixed">Fixed Price Override</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Value</label>
                                    <div className="flex gap-2">
                                        <select className="w-[100px] flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                                            <option value="percent">%</option>
                                            <option value="amount">$</option>
                                        </select>
                                        <input type="number" className="flex-1 flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="10" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Condition Logic</label>
                                <div className="p-4 border rounded-md bg-muted/20 space-y-4">
                                    <div className="grid grid-cols-3 gap-2">
                                        <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm">
                                            <option>Visa Subclass</option>
                                            <option>Applicant Count</option>
                                            <option>Previous Application Status</option>
                                            <option>Date Range</option>
                                        </select>
                                        <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm">
                                            <option>Equals</option>
                                            <option>Does Not Equal</option>
                                            <option>Greater Than</option>
                                        </select>
                                        <input className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm" placeholder="Value..." />
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-blue-600">
                                        + Add Condition
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Status</label>
                                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
                                <Button>
                                    <Save className="mr-2 h-4 w-4" /> Save Rule
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
