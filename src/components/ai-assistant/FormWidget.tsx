import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAppDispatch } from "@/store/store";
import { addMessage } from "@/store/features/ai-assistant/aiSlice";
import type { FormWidgetData } from "@/types/chat";
import { ChevronRight, Sparkles, CheckCircle2, Calendar } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface FormWidgetProps {
    data: FormWidgetData;
}

const FormWidget = ({ data }: FormWidgetProps) => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        data.fields.forEach((field) => {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = `${field.label} is required`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }

        setSubmitted(true);

        // Merge with existing draft data
        const mergedData = { ...(data.meta?.draft || {}), ...formData };

        // Format for display
        const formattedResponse = Object.entries(mergedData)
            .map(([key, val]) => `${key}: ${val}`)
            .join(", ");

        // Dispatch user message with form data
        dispatch(
            addMessage({
                id: Date.now().toString(),
                role: "user",
                content: `Submitted Form: ${formattedResponse}`,
                timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            })
        );

        // Trigger AI to process and return next step
        import("@/store/features/ai-assistant/aiSlice").then(({ sendMessage }) => {
            dispatch(sendMessage(`Submitted Form: ${formattedResponse}`) as any);
        });
    };

    if (submitted) {
        return (
            <div className="p-4 my-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 shadow-sm">
                <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm font-medium">Form submitted successfully! Processing...</span>
                </div>
            </div>
        );
    }

    // Calculate step info
    const stepInfo = data.meta
        ? {
            current: data.meta.stepIndex + 1,
            total: 3, // You can make this dynamic based on intent
            percentage: ((data.meta.stepIndex + 1) / 3) * 100
        }
        : null;

    return (
        <Card className="w-full max-w-md mt-3 mb-3 border-0 shadow-lg bg-white overflow-hidden">
            {/* Progress Bar */}
            {stepInfo && (
                <div className="h-1 bg-gray-100">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                        style={{ width: `${stepInfo.percentage}%` }}
                    />
                </div>
            )}

            <CardHeader className="pb-3 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-blue-600" />
                            {data.title}
                        </CardTitle>
                        {stepInfo && (
                            <CardDescription className="mt-1 text-xs font-medium text-gray-600">
                                Step {stepInfo.current} of {stepInfo.total}
                            </CardDescription>
                        )}
                    </div>
                    {stepInfo && (
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-blue-100">
                            <span className="text-sm font-bold text-blue-600">{stepInfo.current}</span>
                        </div>
                    )}
                </div>
            </CardHeader>

            <CardContent className="p-4 space-y-4">
                {data.fields.map((field, index) => (
                    <div
                        key={field.name}
                        className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <Label
                            htmlFor={field.name}
                            className="text-sm font-semibold text-gray-800 flex items-center gap-1"
                        >
                            {field.label}
                            {field.required && <span className="text-red-500">*</span>}
                        </Label>

                        {/* TEXT / EMAIL / DATE */}
                        {(field.type === "text" || field.type === "email" || field.type === "date") && (
                            <div className="relative">
                                {field.type === "date" && (
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                )}
                                <Input
                                    id={field.name}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    className={`h-11 text-sm bg-white border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all ${field.type === "date" ? "pl-10" : ""
                                        } ${errors[field.name] ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
                                    value={formData[field.name] || ""}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                />
                                {errors[field.name] && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                        <span className="w-1 h-1 bg-red-500 rounded-full" />
                                        {errors[field.name]}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* TEXTAREA */}
                        {field.type === "textarea" && (
                            <div className="relative">
                                <Textarea
                                    id={field.name}
                                    placeholder={field.placeholder}
                                    className={`min-h-[80px] text-sm bg-white border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none ${errors[field.name] ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""
                                        }`}
                                    value={formData[field.name] || ""}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                />
                                {errors[field.name] && (
                                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                        <span className="w-1 h-1 bg-red-500 rounded-full" />
                                        {errors[field.name]}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* RADIO */}
                        {field.type === "radio" && (
                            <RadioGroup
                                value={formData[field.name] || ""}
                                onValueChange={(val) => handleChange(field.name, val)}
                                className="flex flex-col gap-2 mt-2"
                            >
                                {field.options?.map((opt) => (
                                    <div
                                        key={opt}
                                        className={`group relative flex items-center space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer hover:border-blue-300 hover:bg-blue-50 ${formData[field.name] === opt
                                                ? "border-blue-500 bg-blue-50 shadow-sm"
                                                : "border-gray-200 bg-white"
                                            } ${errors[field.name] ? "border-red-200" : ""}`}
                                    >
                                        <RadioGroupItem
                                            value={opt}
                                            id={`${field.name}-${opt}`}
                                            className="border-2 border-gray-300 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
                                        />
                                        <Label
                                            htmlFor={`${field.name}-${opt}`}
                                            className="flex-1 text-sm font-medium cursor-pointer text-gray-700 group-hover:text-gray-900"
                                        >
                                            {opt}
                                        </Label>
                                        {formData[field.name] === opt && (
                                            <CheckCircle2 className="w-4 h-4 text-blue-600" />
                                        )}
                                    </div>
                                ))}
                            </RadioGroup>
                        )}

                        {errors[field.name] && field.type === "radio" && (
                            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                <span className="w-1 h-1 bg-red-500 rounded-full" />
                                {errors[field.name]}
                            </p>
                        )}
                    </div>
                ))}

                {/* Submit Button */}
                <Button
                    size="lg"
                    className="w-full mt-4 h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
                    onClick={handleSubmit}
                >
                    <span>{data.submitLabel || "Submit"}</span>
                    <ChevronRight className="ml-2 h-5 w-5" />
                </Button>

                {/* Previous Selections Preview */}
                {data.meta?.draft && Object.keys(data.meta.draft).length > 0 && (
                    <div className="mt-4 p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-200">
                        <div className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Previous Selections
                        </div>
                        <div className="space-y-1">
                            {Object.entries(data.meta.draft).map(([key, val]) => (
                                <div key={key} className="flex items-center gap-2 text-xs">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                    <span className="font-medium text-gray-600">{key}:</span>
                                    <span className="text-gray-800 font-semibold">{val}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default FormWidget;
