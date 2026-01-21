// import React from 'react'; (Removed as unused)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const LawFirmPlaceholder = ({ title }: { title: string }) => {
    return (
        <div className="p-4 space-y-4">
            <h1 className="text-2xl font-bold">{title}</h1>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                        Under Construction
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>This module ({title}) is currently being implemented as part of the Law Firm ERP transition plan.</p>
                </CardContent>
            </Card>
        </div>
    );
};

export default LawFirmPlaceholder;
