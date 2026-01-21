// Chat Types for AI Assistant
export type MessageRole = "user" | "assistant";

export interface Message {
    id: string;
    role: MessageRole;
    content: string;
    timestamp: string;
    type?: "text" | "card" | "form" | "action";
    data?: any;
}

export type FieldType = "text" | "email" | "date" | "select" | "radio" | "textarea";

export interface FormField {
    name: string;
    label: string;
    type: FieldType;
    options?: string[];
    required?: boolean;
    placeholder?: string;
}

export interface FormWidgetData {
    formId: string;          // unique per wizard (ex: "lead_create")
    stepId: string;          // ex: "visa_select" -> "destination_select" -> "lead_details"
    title: string;
    submitLabel: string;
    fields: FormField[];

    // Wizard context
    meta?: {
        intent: "create_lead" | "book_appointment" | "update_case" | "onboard_client" | "main_menu" | "case_menu";
        stepIndex: number;
        draft?: Record<string, any>;
    };
}

export interface CardData {
    title: string;
    status?: string;
    progress?: number;
    lastUpdate?: string;
    nextAction?: string;
    lines?: string[];
    badge?: string;
}
