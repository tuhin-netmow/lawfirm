
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
import { ArrowLeft, Save, DollarSign } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function ReceivePayment() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        client_id: "",
        invoice_id: "",
        payment_date: new Date().toISOString().split('T')[0],
        amount: "",
        method: "Credit Card",
        reference_number: "",
        notes: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API
        setTimeout(() => {
            console.log("Recording Payment:", formData);
            setIsLoading(false);
            navigate("/dashboard/billing/payments");
        }, 1000);
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/dashboard/billing/payments">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Receive Payment</h1>
                    <p className="text-muted-foreground text-sm">Record a payment from a client.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                            <Label htmlFor="invoice_id">Invoice (Optional)</Label>
                            <Select
                                value={formData.invoice_id}
                                onValueChange={(val) => setFormData(prev => ({ ...prev, invoice_id: val }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Apply to specific invoice..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="101">INV-2024-001 ($1,500.00)</SelectItem>
                                    <SelectItem value="102">INV-2024-002 ($2,350.50)</SelectItem>
                                    <SelectItem value="103">INV-2024-003 ($5,000.00)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount Received <span className="text-red-500">*</span></Label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="amount"
                                        name="amount"
                                        type="number"
                                        step="0.01"
                                        className="pl-9"
                                        placeholder="0.00"
                                        required
                                        value={formData.amount}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="payment_date">Payment Date <span className="text-red-500">*</span></Label>
                                <Input
                                    id="payment_date"
                                    name="payment_date"
                                    type="date"
                                    required
                                    value={formData.payment_date}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="method">Payment Method</Label>
                                <Select
                                    value={formData.method}
                                    onValueChange={(val) => setFormData(prev => ({ ...prev, method: val }))}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                                        <SelectItem value="Check">Check</SelectItem>
                                        <SelectItem value="Cash">Cash</SelectItem>
                                        <SelectItem value="Trust Transfer">Trust Account Transfer</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="reference_number">Reference / Check #</Label>
                                <Input
                                    id="reference_number"
                                    name="reference_number"
                                    placeholder="e.g. TXN-123456"
                                    value={formData.reference_number}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Notes</Label>
                            <Textarea
                                id="notes"
                                name="notes"
                                placeholder="Additional details about this payment..."
                                value={formData.notes}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Link to="/dashboard/billing/payments">
                                <Button variant="ghost" type="button">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-500">
                                {isLoading ? "Recording..." : <><Save className="mr-2 h-4 w-4" /> Record Payment</>}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
