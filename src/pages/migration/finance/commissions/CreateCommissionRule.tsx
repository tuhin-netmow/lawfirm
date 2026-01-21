
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router";

export default function CreateCommissionRule() {
    const navigate = useNavigate();

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <h2 className="text-3xl font-semibold">Create Commission Rule</h2>
                    <p className="text-gray-600">Define a new commission structure for consultants or agents</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Rule Details</CardTitle>
                    <CardDescription>Configure the triggers and calculation methods for this rule.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="ruleName">Rule Name</Label>
                            <Input id="ruleName" placeholder="e.g., Senior Consultant Visa Bonus" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select defaultValue="active">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="appliesTo">Applies To</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select beneficiary group" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Consultants</SelectItem>
                                    <SelectItem value="senior">Senior Consultants</SelectItem>
                                    <SelectItem value="junior">Junior Consultants</SelectItem>
                                    <SelectItem value="agents">External Agents</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="triggerEvent">Trigger Event</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="When is this commission paid?" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="payment_received">Payment Received from Client</SelectItem>
                                    <SelectItem value="case_completed">Case Completed (Success)</SelectItem>
                                    <SelectItem value="visa_granted">Visa Granted</SelectItem>
                                    <SelectItem value="agreement_signed">Agreement Signed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                        <h3 className="font-medium text-gray-900">Calculation Logic</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="type">Calculation Type</Label>
                                <Select defaultValue="percentage">
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="percentage">Percentage (%) of Transaction</SelectItem>
                                        <SelectItem value="fixed">Fixed Amount (Flat Fee)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="value">Value</Label>
                                <div className="relative">
                                    <Input id="value" type="number" placeholder="0.00" />
                                    <span className="absolute right-3 top-2.5 text-gray-400 text-sm">
                                        % / ৳
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <Textarea id="description" placeholder="Additional notes about this rule..." />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
                        <Button className="gap-2">
                            <Save size={16} /> Save Rule
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
