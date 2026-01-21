export interface TimeEntry {
    id: number;
    matter_id: number;
    matter_title: string;
    user_id: number;
    user_name: string;
    work_date: string;
    description: string;
    hours: number;
    rate_applied: number;
    total_amount: number;
    is_billable: boolean;
    status: 'Unbilled' | 'Billed';
    created_at: string;
}

export interface Invoice {
    id: number;
    invoice_number: string;
    client_name: string;
    matter_title: string;
    issue_date: string;
    due_date: string;
    total_amount: number;
    balance_due: number;
    status: 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Partially Paid';
}
