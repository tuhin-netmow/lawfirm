import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { Home, Construction } from "lucide-react";

interface ComingSoonPageProps {
    title: string;
    description: string;
    module: string;
    implementationPriority?: "high" | "medium" | "low";
}

export default function ComingSoonPage({
    title,
    description,
    module,
    implementationPriority = "medium"
}: ComingSoonPageProps) {
    const priorityColors = {
        high: "bg-red-100 text-red-800 border-red-200",
        medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
        low: "bg-green-100 text-green-800 border-green-200"
    };

    const priorityLabels = {
        high: "High Priority - Coming Soon",
        medium: "Medium Priority - Under Development",
        low: "Planned Feature"
    };

    return (
        <div className="w-full min-h-[calc(100vh-200px)] flex items-center justify-center p-6">
            <Card className="max-w-2xl w-full">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Construction className="w-20 h-20 text-blue-500" />
                    </div>
                    <CardTitle className="text-3xl mb-2">{title}</CardTitle>
                    <CardDescription className="text-lg">{description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="font-semibold text-blue-900 mb-2">Module Information</h3>
                        <p className="text-blue-800 text-sm">
                            <strong>Module:</strong> {module}
                        </p>
                        <p className="text-blue-800 text-sm mt-1">
                            <strong>Status:</strong> Under Development
                        </p>
                    </div>

                    <div className={`${priorityColors[implementationPriority]} border rounded-lg p-4`}>
                        <h3 className="font-semibold mb-1">Implementation Status</h3>
                        <p className="text-sm">{priorityLabels[implementationPriority]}</p>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">What's Next?</h3>
                        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                            <li>UI Design and component creation</li>
                            <li>API integration and data fetching</li>
                            <li>Form validations and error handling</li>
                            <li>Testing and quality assurance</li>
                        </ul>
                    </div>

                    <div className="flex justify-center gap-4 pt-4">
                        <Link to="/dashboard">
                            <Button variant="outline" className="flex items-center gap-2">
                                <Home className="w-4 h-4" />
                                Back to Dashboard
                            </Button>
                        </Link>
                        <Button variant="default">
                            View Documentation
                        </Button>
                    </div>

                    <div className="text-center text-sm text-gray-500 pt-4 border-t">
                        This page will be available soon. Check back for updates!
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
