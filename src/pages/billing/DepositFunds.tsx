
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

export default function DepositFunds() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        client_id: "",
        matter_id: "",
        deposit_date: new Date().toISOString().split('T')[0],
        amount: "",
        method: "Bank Transfer",
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
            console.log("Depositing Funds:", formData);
            setIsLoading(false);
            navigate("/dashboard/billing/trust");
        }, 1000);
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/dashboard/billing/trust">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Deposit Trust Funds</h1>
                    <p className="text-muted-foreground text-sm">Add funds to a client's trust account or retainer.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Deposit Details</CardTitle>
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
                            <Label htmlFor="matter_id">Related Matter (Optional)</Label>
                            <Select
                                value={formData.matter_id}
                                onValueChange={(val) => setFormData(prev => ({ ...prev, matter_id: val }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="General Retainer (No specific matter)" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="101">Smith vs Jones</SelectItem>
                                    <SelectItem value="102">Estate of Elder</SelectItem>
                                    <SelectItem value="103">TechCorp Merger</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="amount">Deposit Amount <span className="text-red-500">*</span></Label>
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
                                <Label htmlFor="deposit_date">Date Received <span className="text-red-500">*</span></Label>
                                <Input
                                    id="deposit_date"
                                    name="deposit_date"
                                    type="date"
                                    required
                                    value={formData.deposit_date}
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
                                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                                        <SelectItem value="Check">Check</SelectItem>
                                        <SelectItem value="Wire">Wire Transfer</SelectItem>
                                        <SelectItem value="Cash">Cash</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="reference_number">Reference / Check #</Label>
                                <Input
                                    id="reference_number"
                                    name="reference_number"
                                    placeholder="e.g. CHK-998877"
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
                                placeholder="Source of funds or other details..."
                                value={formData.notes}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Link to="/dashboard/billing/trust">
                                <Button variant="ghost" type="button">Cancel</Button>
                            </Link>
                            <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-500">
                                {isLoading ? "Recording..." : <><Save className="mr-2 h-4 w-4" /> Deposit Funds</>}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
