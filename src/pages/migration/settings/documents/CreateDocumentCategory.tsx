
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export default function CreateDocumentCategory() {
    const navigate = useNavigate();

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-3xl font-bold tracking-tight">Add Document Category</h2>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Category Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category Name</label>
                            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. Identity Documents" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" placeholder="Describe the documents in this category..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Parent Category (Optional)</label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                <option value="">None</option>
                                <option value="1">Financial</option>
                                <option value="2">Personal</option>
                                <option value="3">Employment</option>
                            </select>
                        </div>
                        <div className="flex justify-end">
                            <Button>
                                <Save className="mr-2 h-4 w-4" /> Save Category
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
