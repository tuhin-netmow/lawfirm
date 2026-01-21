
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function CreateMilestone() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-3xl font-bold tracking-tight">Add Milestone</h2>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Milestone Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Milestone Name</label>
                                <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. Initial Assessment" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Stage Number</label>
                                <input type="number" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. 1" />
                            </div>
                            <div className="col-span-2 space-y-2">
                                <label className="text-sm font-medium">Description</label>
                                <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Describe the milestone..." />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button>
                                <Save className="mr-2 h-4 w-4" /> Save Milestone
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
