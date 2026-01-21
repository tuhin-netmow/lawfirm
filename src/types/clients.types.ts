export interface Client {
    id: number;
    type: 'Individual' | 'Organisation';
    display_name: string;
    first_name?: string;
    last_name?: string;
    company_name?: string;
    email: string;
    phone: string;
    status: 'Active' | 'Inactive' | 'Prospect';
    identifier_no?: string;
    address_line1?: string;
    city?: string;
    state?: string;
    postcode?: string;
    open_matters_count?: number; // Derived field for list view
    last_activity_date?: string;
}
