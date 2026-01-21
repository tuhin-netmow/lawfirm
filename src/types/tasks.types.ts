export interface Task {
    id: number;
    title: string;
    description?: string;
    status: 'To Do' | 'In Progress' | 'Review' | 'Done';
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    due_date?: string;
    assignee_id?: number;
    assignee_name?: string;
    matter_id?: number;
    matter_title?: string; // e.g. "Smith vs Jones"
    created_by?: string;
    created_at?: string;
}
