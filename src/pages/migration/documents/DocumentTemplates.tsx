import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Search, Plus } from "lucide-react";

export default function DocumentTemplates() {
    const templates = [
        {
            id: 1,
            name: "Visa App Checklist (Student)",
            description: "Standard checklist for Subclass 500 visa applications",
            category: "Checklists",
            uses: 128
        },
        {
            id: 2,
            name: "Client Agreement Form",
            description: "Standard service agreement for new migration clients",
            category: "Legal",
            uses: 450
        },
        {
            id: 3,
            name: "Employment Reference Letter",
            description: "Template for employer reference letters",
            category: "Employment",
            uses: 89
        },
        {
            id: 4,
            name: "Sponsorship Declaration",
            description: "Form 888 stat dec template for partners",
            category: "Legal",
            uses: 210
        },
        {
            id: 5,
            name: "Financial Capability Form",
            description: "Declaration of financial capacity for students",
            category: "Financial",
            uses: 76
        },
        {
            id: 6,
            name: "Character Assessment Form",
            description: "Guidance on character requirements",
            category: "Legal",
            uses: 45
        }
    ];

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-semibold">Document Templates</h2>
                    <p className="text-gray-500">Standardized forms and templates for migration processes</p>
                </div>
                <Link to="/dashboard/migration/documents/templates/create">
                    <Button className="gap-2">
                        <Plus size={16} /> Create Template
                    </Button>
                </Link>
            </div>

            <div className="relative mb-6">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input className="pl-10 max-w-sm" placeholder="Search templates..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <Card key={template.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="flex justify-between items-start">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <FileText className="h-6 w-6 text-blue-600" />
                                </div>
                                <Badge variant="secondary">{template.category}</Badge>
                            </div>
                            <CardTitle className="mt-4 text-xl">{template.name}</CardTitle>
                            <CardDescription className="line-clamp-2">{template.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500">{template.uses} downloads/uses</p>
                        </CardContent>
                        <CardFooter className="pt-0">
                            <Button variant="outline" className="w-full gap-2">
                                <Download size={16} /> Download
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
