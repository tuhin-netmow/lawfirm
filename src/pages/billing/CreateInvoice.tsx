
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

// Mock Line Item Type
interface LineItem {
    id: number;
    description: string;
    quantity: number;
    rate: number;
    amount: number;
}

export default function CreateInvoice() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        client_id: "",
        matter_id: "",
        issue_date: new Date().toISOString().split('T')[0],
        due_date: "",
        notes: "",
    });

    const [lineItems, setLineItems] = useState<LineItem[]>([
        { id: 1, description: "Professional Legal Services", quantity: 1, rate: 0, amount: 0 }
    ]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLineItemChange = (id: number, field: keyof LineItem, value: string | number) => {
        setLineItems(prev => prev.map(item => {
            if (item.id === id) {
                const updatedItem = { ...item, [field]: value };
                // Recalculate amount if qty or rate changes
                if (field === 'quantity' || field === 'rate') {
                    updatedItem.amount = Number(updatedItem.quantity) * Number(updatedItem.rate);
                }
                return updatedItem;
            }
            return item;
        }));
    };

    const addLineItem = () => {
        const newId = Math.max(...lineItems.map(i => i.id)) + 1;
        setLineItems([...lineItems, { id: newId, description: "", quantity: 1, rate: 0, amount: 0 }]);
    };

    const removeLineItem = (id: number) => {
        if (lineItems.length > 1) {
            setLineItems(lineItems.filter(i => i.id !== id));
        }
    };

    const calculateTotal = () => {
        return lineItems.reduce((sum, item) => sum + item.amount, 0);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API
        setTimeout(() => {
            console.log("Creating Invoice:", { ...formData, lineItems, total: calculateTotal() });
            setIsLoading(false);
            navigate("/dashboard/billing/invoices");
        }, 1000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/dashboard/billing/invoices">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Create New Invoice</h1>
                    <p className="text-muted-foreground text-sm">Generate an invoice for a client matter.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Invoice Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="client_id">Client <span className="text-red-500">*</span></Label>
                                <Select
                                    value={formData.client_id}
                                    onValueChange={(val) => setFormData(prev => ({ ...prev, client_id: val }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a client..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">John Smith</SelectItem>
                                        <SelectItem value="2">Sarah Conner</SelectItem>
                                        <SelectItem value="3">TechCorp Inc.</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="matter_id">Matter <span className="text-red-500">*</span></Label>
                                <Select
                                    value={formData.matter_id}
                                    onValueChange={(val) => setFormData(prev => ({ ...prev, matter_id: val }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a matter..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="101">Smith vs Jones</SelectItem>
                                        <SelectItem value="102">Estate of Elder</SelectItem>
                                        <SelectItem value="103">TechCorp Merger</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="issue_date">Issue Date</Label>
                                <Input
                                    id="issue_date"
                                    name="issue_date"
                                    type="date"
                                    required
                                    value={formData.issue_date}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="due_date">Due Date</Label>
                                <Input
                                    id="due_date"
                                    name="due_date"
                                    type="date"
                                    required
                                    value={formData.due_date}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Line Items</CardTitle>
                        <Button type="button" variant="outline" size="sm" onClick={addLineItem}>
                            <Plus className="h-4 w-4 mr-2" /> Add Item
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Header Row (Hidden on mobile) */}
                            <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-medium text-slate-500 mb-2">
                                <div className="col-span-6">Description</div>
                                <div className="col-span-2 text-right">Qty/Hrs</div>
                                <div className="col-span-2 text-right">Rate ($)</div>
                                <div className="col-span-1 text-right">Amount</div>
                                <div className="col-span-1"></div>
                            </div>

                            {lineItems.map((item) => (
                                <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border-b pb-4 md:border-0 md:pb-0">
                                    <div className="md:col-span-6 space-y-1">
                                        <Label className="md:hidden">Description</Label>
                                        <Input
                                            placeholder="Item description"
                                            value={item.description}
                                            onChange={(e) => handleLineItemChange(item.id, 'description', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-1">
                                        <Label className="md:hidden">Quantity</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            step="0.1"
                                            placeholder="1"
                                            className="text-right"
                                            value={item.quantity}
                                            onChange={(e) => handleLineItemChange(item.id, 'quantity', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-1">
                                        <Label className="md:hidden">Rate</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            placeholder="0.00"
                                            className="text-right"
                                            value={item.rate}
                                            onChange={(e) => handleLineItemChange(item.id, 'rate', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-1 text-right font-medium pt-2.5">
                                        <span className="md:hidden mr-2 text-slate-500">Amount:</span>
                                        ${item.amount.toFixed(2)}
                                    </div>
                                    <div className="md:col-span-1 flex justify-end md:justify-center">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                            onClick={() => removeLineItem(item.id)}
                                            disabled={lineItems.length === 1}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end mt-6 pt-4 border-t">
                            <div className="text-right space-y-2">
                                <div className="flex justify-between w-64 text-sm text-slate-500">
                                    <span>Subtotal:</span>
                                    <span>${calculateTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between w-64 text-sm text-slate-500">
                                    <span>Tax (0%):</span>
                                    <span>$0.00</span>
                                </div>
                                <div className="flex justify-between w-64 text-lg font-bold pt-2 border-t">
                                    <span>Total:</span>
                                    <span>${calculateTotal().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Notes & Terms</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Textarea
                            name="notes"
                            placeholder="Add notes for the client, payment terms, or thank you message..."
                            className="min-h-[100px]"
                            value={formData.notes}
                            onChange={handleInputChange}
                        />
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-3 pt-4">
                    <Link to="/dashboard/billing/invoices">
                        <Button variant="ghost" type="button">Cancel</Button>
                    </Link>
                    <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-500">
                        {isLoading ? "Generating..." : <><Save className="mr-2 h-4 w-4" /> Generate Invoice</>}
                    </Button>
                </div>
            </form>
        </div>
    );
}
