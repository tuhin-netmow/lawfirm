
import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, ArrowLeft, Plus, GripVertical, Trash2 } from "lucide-react";

interface ChecklistItem {
    id: number;
    name: string;
    description: string;
    required: boolean;
}

export default function CreateChecklist() {
    const navigate = useNavigate();
    const [items, setItems] = useState<ChecklistItem[]>([
        { id: 1, name: "Valid Passport", description: "Must have at least 6 months validity remaining.", required: true },
        { id: 2, name: "Birth Certificate", description: "", required: true },
        { id: 3, name: "Resume / CV", description: "", required: false },
    ]);

    const addItem = () => {
        const newItem: ChecklistItem = {
            id: Date.now(),
            name: "",
            description: "",
            required: true,
        };
        setItems([...items, newItem]);
    };

    const removeItem = (id: number) => {
        setItems(items.filter((item) => item.id !== id));
    };

    const updateItem = (id: number, field: keyof ChecklistItem, value: any) => {
        setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Create Checklist</h2>
                    <p className="text-sm text-muted-foreground">Design a new document checklist.</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-2 space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Checklist Items</CardTitle>
                                <CardDescription>Define the required documents and tasks.</CardDescription>
                            </div>
                            <Button size="sm" onClick={addItem}>
                                <Plus className="mr-2 h-4 w-4" /> Add Item
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex items-start gap-4 p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors">
                                        <div className="mt-2 cursor-move text-muted-foreground">
                                            <GripVertical className="h-5 w-5" />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex gap-2">
                                                <input
                                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                                    placeholder="Item Name (e.g. Valid Passport)"
                                                    value={item.name}
                                                    onChange={(e) => updateItem(item.id, "name", e.target.value)}
                                                />
                                                <select
                                                    className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                                    value={item.required ? "Required" : "Optional"}
                                                    onChange={(e) => updateItem(item.id, "required", e.target.value === "Required")}
                                                >
                                                    <option value="Required">Required</option>
                                                    <option value="Optional">Optional</option>
                                                </select>
                                            </div>
                                            <textarea
                                                className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="Instructions for the client..."
                                                value={item.description}
                                                onChange={(e) => updateItem(item.id, "description", e.target.value)}
                                            />
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-500 hover:text-red-700 hover:bg-red-100"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <div
                                    className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground hover:bg-accent/50 transition-colors cursor-pointer"
                                    onClick={addItem}
                                >
                                    <Plus className="mx-auto h-8 w-8 mb-2 opacity-50" />
                                    <p>Click to add new item</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Configuration</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Checklist Name <span className="text-red-500">*</span></label>
                                <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. Student Visa Requirements" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Related Visa / Service</label>
                                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                    <option value="">Select Service</option>
                                    <option value="189">Skilled Independent (189)</option>
                                    <option value="500">Student Visa (500)</option>
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
                            <div className="pt-4">
                                <Button className="w-full">
                                    <Save className="mr-2 h-4 w-4" /> Save Checklist
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
