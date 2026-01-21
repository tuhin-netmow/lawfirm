export interface Matter {
    id: number;
    matter_no: string;
    title: string;
    description?: string;
    client_id: number;
    client_name?: string; // Relation
    practice_area?: string;
    status: 'Open' | 'Closed' | 'On Hold' | 'Archived';
    stage?: string; // e.g., "Discovery", "Hearing"
    open_date: string;
    close_date?: string;
    assigned_lawyer?: string; // Relation
    created_at?: string;
    updated_at?: string;
}
