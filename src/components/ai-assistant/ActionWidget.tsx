import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    CheckCircle2,
    Clock,
    AlertCircle,
    TrendingUp,
    FileText,
    Calendar,
    User,
    MapPin
} from "lucide-react";
import type { CardData } from "@/types/chat";

interface ActionWidgetProps {
    data: CardData;
}

const ActionWidget = ({ data }: ActionWidgetProps) => {
    // Determine card style based on status/badge
    const getCardStyle = () => {
        const badge = data.badge?.toLowerCase() || "";
        const status = data.status?.toLowerCase() || "";

        if (badge.includes("success") || badge.includes("created") || badge.includes("completed") || status.includes("completed")) {
            return {
                gradient: "from-green-50 to-emerald-50",
                border: "border-green-200",
                badgeColor: "bg-green-100 text-green-800 border-green-300",
                icon: <CheckCircle2 className="w-5 h-5 text-green-600" />
            };
        }

        if (badge.includes("pending") || badge.includes("progress") || status.includes("progress")) {
            return {
                gradient: "from-blue-50 to-indigo-50",
                border: "border-blue-200",
                badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
                icon: <Clock className="w-5 h-5 text-blue-600" />
            };
        }

        if (badge.includes("overdue") || badge.includes("urgent") || badge.includes("high")) {
            return {
                gradient: "from-red-50 to-rose-50",
                border: "border-red-200",
                badgeColor: "bg-red-100 text-red-800 border-red-300",
                icon: <AlertCircle className="w-5 h-5 text-red-600" />
            };
        }

        if (badge.includes("overview") || badge.includes("summary") || badge.includes("report")) {
            return {
                gradient: "from-purple-50 to-pink-50",
                border: "border-purple-200",
                badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
                icon: <TrendingUp className="w-5 h-5 text-purple-600" />
            };
        }

        return {
            gradient: "from-gray-50 to-slate-50",
            border: "border-gray-200",
            badgeColor: "bg-gray-100 text-gray-800 border-gray-300",
            icon: <FileText className="w-5 h-5 text-gray-600" />
        };
    };

    const cardStyle = getCardStyle();

    return (
        <Card className={`w-full max-w-md mt-3 mb-3 border-2 ${cardStyle.border} shadow-lg overflow-hidden bg-gradient-to-br ${cardStyle.gradient}`}>
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 rounded-lg bg-white shadow-sm">
                            {cardStyle.icon}
                        </div>
                        <div className="flex-1">
                            <CardTitle className="text-base font-bold text-gray-900 leading-tight">
                                {data.title}
                            </CardTitle>
                            {data.status && (
                                <p className="text-xs text-gray-600 mt-1 font-medium">
                                    Status: {data.status}
                                </p>
                            )}
                        </div>
                    </div>
                    {data.badge && (
                        <Badge
                            variant="outline"
                            className={`${cardStyle.badgeColor} font-semibold text-xs px-2.5 py-1 border`}
                        >
                            {data.badge}
                        </Badge>
                    )}
                </div>
            </CardHeader>

            <CardContent className="space-y-3">
                {/* Progress Bar */}
                {data.progress !== undefined && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-gray-700">Progress</span>
                            <span className="font-bold text-gray-900">{data.progress}%</span>
                        </div>
                        <Progress
                            value={data.progress}
                            className="h-2.5 bg-white shadow-inner"
                        />
                    </div>
                )}

                {/* Information Lines */}
                {data.lines && data.lines.length > 0 && (
                    <div className="space-y-2 bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-white/80 shadow-sm">
                        {data.lines.map((line, index) => {
                            // Detect line type and add appropriate icon
                            const getLineIcon = (text: string) => {
                                if (text.toLowerCase().includes("date") || text.toLowerCase().includes("time")) {
                                    return <Calendar className="w-3.5 h-3.5 text-blue-500" />;
                                }
                                if (text.toLowerCase().includes("client") || text.toLowerCase().includes("name") || text.toLowerCase().includes("assign")) {
                                    return <User className="w-3.5 h-3.5 text-purple-500" />;
                                }
                                if (text.toLowerCase().includes("location") || text.toLowerCase().includes("destination")) {
                                    return <MapPin className="w-3.5 h-3.5 text-green-500" />;
                                }
                                return <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />;
                            };

                            return (
                                <div
                                    key={index}
                                    className="flex items-start gap-2 text-sm group hover:bg-white/80 p-1.5 rounded transition-colors"
                                >
                                    <div className="mt-0.5">
                                        {getLineIcon(line)}
                                    </div>
                                    <span className="text-gray-700 leading-relaxed flex-1">
                                        {line}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Last Update */}
                {data.lastUpdate && (
                    <div className="flex items-start gap-2 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-white/80 shadow-sm">
                        <Clock className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                            <p className="text-xs font-semibold text-gray-600 mb-0.5">Last Update</p>
                            <p className="text-sm text-gray-800">{data.lastUpdate}</p>
                        </div>
                    </div>
                )}

                {/* Next Action */}
                {data.nextAction && (
                    <div className="flex items-start gap-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200 shadow-sm">
                        <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                            <p className="text-xs font-semibold text-blue-700 mb-0.5">Next Action</p>
                            <p className="text-sm font-medium text-blue-900">{data.nextAction}</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ActionWidget;
