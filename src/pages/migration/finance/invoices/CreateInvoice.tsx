import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Save, X, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

export default function CreateInvoice() {
    const [items, setItems] = useState([{ id: 1, desc: "", amount: "" }]);

    const addItem = () => {
        setItems([...items, { id: items.length + 1, desc: "", amount: "" }]);
    };

    const removeItem = (id: number) => {
        if (items.length > 1) {
            setItems(items.filter(i => i.id !== id));
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto pb-10">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">Create Invoice</h2>
                    <p className="text-gray-500">Generate a new invoice for a client</p>
                </div>
                <div className="flex gap-3">
                    <Link to="/dashboard/migration/finance/invoices">
                        <Button variant="outline" className="gap-2">
                            <X size={16} /> Cancel
                        </Button>
                    </Link>
                    <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                        <Save size={16} /> Save Invoice
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Client Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Select Client</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Search Client..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ahmed">Ahmed Hassan</SelectItem>
                                        <SelectItem value="fatima">Fatima Rahman</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Invoice Date</Label>
                                    <Input type="date" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Due Date</Label>
                                    <Input type="date" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Invoice Items</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {items.map((item, index) => (
                                <div key={item.id} className="flex gap-4 items-end">
                                    <div className="flex-1 space-y-2">
                                        <Label>{index === 0 ? "Description" : ""}</Label>
                                        <Input placeholder="Service description..." />
                                    </div>
                                    <div className="w-32 space-y-2">
                                        <Label>{index === 0 ? "Amount" : ""}</Label>
                                        <Input placeholder="0.00" type="number" />
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-red-500 mb-0.5"
                                        onClick={() => removeItem(item.id)}
                                        disabled={items.length === 1}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            ))}

                            <Button variant="outline" onClick={addItem} className="w-full gap-2 border-dashed">
                                <Plus size={16} /> Add Item
                            </Button>

                            <Separator className="my-4" />

                            <div className="flex justify-end pr-12">
                                <div className="w-48 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Subtotal:</span>
                                        <span>$0.00</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Tax (10%):</span>
                                        <span>$0.00</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                                        <span>Total:</span>
                                        <span>$0.00</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Currency</Label>
                                <Select defaultValue="aud">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="aud">AUD (A$)</SelectItem>
                                        <SelectItem value="usd">USD ($)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select defaultValue="draft">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="sent">Sent</SelectItem>
                                        <SelectItem value="paid">Paid</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Notes</Label>
                                <Input placeholder="Internal notes..." />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
