
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function UpdateProcessingTime() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-3xl font-bold tracking-tight">Update Processing Times</h2>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Processing Time Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Visa Subclass</label>
                                <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. Student Visa (500)" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Status</label>
                                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                    <option>Stable</option>
                                    <option>Delays</option>
                                    <option>Fast Tracked</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Standard Processing</label>
                                <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. 14 Days" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Complex Case</label>
                                <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. 45 Days" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button>
                                <Save className="mr-2 h-4 w-4" /> Save Updates
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
