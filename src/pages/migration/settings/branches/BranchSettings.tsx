
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Database, Building } from "lucide-react";

export default function BranchSettings() {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Branch Settings</h2>
            <p className="text-muted-foreground">Configure global policies for branch operations and data privacy.</p>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Database className="h-5 w-5" /> Data Access Policies
                        </CardTitle>
                        <CardDescription>Control how data is shared between different branches.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-start space-x-4 border p-4 rounded-md">
                            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" defaultChecked />
                            <div>
                                <h4 className="font-medium">Global Client Search</h4>
                                <p className="text-sm text-muted-foreground">Allow staff to search for existing clients across all branches to prevent duplicates.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4 border p-4 rounded-md">
                            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                            <div>
                                <h4 className="font-medium">Shared Case Files</h4>
                                <p className="text-sm text-muted-foreground">Enable branches to access full case histories for clients transferred from other locations.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building className="h-5 w-5" /> Operational Standards
                        </CardTitle>
                        <CardDescription>Set defaults for new branches.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Default Currency</label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                <option value="AUD">Australian Dollar (AUD)</option>
                                <option value="USD">US Dollar (USD)</option>
                                <option value="GBP">British Pound (GBP)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Default Timezone</label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                <option value="sydney">Australia/Sydney</option>
                                <option value="perth">Australia/Perth</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Branch ID Prefix</label>
                            <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. BR-" />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button>
                        <Save className="mr-2 h-4 w-4" /> Save Global Settings
                    </Button>
                </div>
            </div>
        </div>
    );
}
