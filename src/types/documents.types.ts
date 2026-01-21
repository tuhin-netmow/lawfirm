export interface Document {
    id: number;
    title: string;
    category?: string;
    related_to?: string; // e.g., "Matter #101" or "Client Smith"
    related_id?: number;
    uploaded_by: string;
    upload_date: string;
    file_size: string;
    file_type: string;
    visibility: 'Private' | 'Team' | 'Client';
    security_level: 'Normal' | 'Restricted' | 'High';
    version: number;
}
