import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save, X } from "lucide-react";
import { Link } from "react-router";

export default function RecordPayment() {
    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">Record Payment</h2>
                    <p className="text-gray-500">Manually record an incoming payment</p>
                </div>
                <Link to="/dashboard/migration/finance/payments">
                    <Button variant="ghost"><X size={16} /></Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Client</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Client" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="ahmed">Ahmed Hassan</SelectItem>
                                <SelectItem value="fatima">Fatima Rahman</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Related Invoice</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Invoice" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="inv1">INV-2026-001 ($2,500.00)</SelectItem>
                                <SelectItem value="inv2">INV-2026-002 ($1,500.00)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Amount</Label>
                            <Input placeholder="0.00" type="number" />
                        </div>
                        <div className="space-y-2">
                            <Label>Payment Date</Label>
                            <Input type="date" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Payment Method</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Method" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="bank">Bank Transfer</SelectItem>
                                <SelectItem value="cash">Cash</SelectItem>
                                <SelectItem value="card">Credit Card</SelectItem>
                                <SelectItem value="cheque">Cheque</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Reference Number / Transaction ID</Label>
                        <Input placeholder="e.g. TXN-12345678" />
                    </div>

                    <div className="space-y-2">
                        <Label>Notes</Label>
                        <Textarea placeholder="Additional notes..." />
                    </div>

                    <Button className="w-full gap-2 bg-green-600 hover:bg-green-700">
                        <Save size={16} /> Record Transaction
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
