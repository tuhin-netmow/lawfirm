import { DataTable } from "@/components/dashboard/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import {
    PlusCircle,
    Search,
    Filter,
    Download,
    Copy,
    Edit,
    FileCode,
    Trash2
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

// Mock Template Type (Local interface since it's specific to this view)
interface DocumentTemplate {
    id: number;
    name: string;
    category: string;
    description: string;
    last_updated: string;
    usage_count: number;
    file_type: 'docx' | 'pdf';
}

const MOCK_TEMPLATES: DocumentTemplate[] = [
    {
        id: 1,
        name: "Standard Client Agreement",
        category: "Contracts",
        description: "General retainer agreement for new individual clients.",
        last_updated: "2024-03-01",
        usage_count: 145,
        file_type: "docx"
    },
    {
        id: 2,
        name: "Letter of Demand",
        category: "Correspondence",
        description: "Formal demand for payment or action.",
        last_updated: "2023-11-15",
        usage_count: 89,
        file_type: "docx"
    },
    {
        id: 3,
        name: "Non-Disclosure Agreement (NDA)",
        category: "Contracts",
        description: "Mutual NDA for corporate clients.",
        last_updated: "2024-01-20",
        usage_count: 62,
        file_type: "docx"
    },
    {
        id: 4,
        name: "Court Appearance Memo",
        category: "Internal",
        description: "Template for recording notes during court sessions.",
        last_updated: "2023-09-05",
        usage_count: 210,
        file_type: "docx"
    },
    {
        id: 5,
        name: "Fee Estimate",
        category: "Financial",
        description: "Standard layout for providing cost estimates.",
        last_updated: "2024-02-12",
        usage_count: 34,
        file_type: "pdf"
    }
];

export default function DocumentTemplates() {
    const [pageIndex, setPageIndex] = useState(0);
    const navigate = useNavigate();
    const templates = MOCK_TEMPLATES;

    // -------------------- COLUMNS --------------------
    const columns: ColumnDef<DocumentTemplate>[] = [
        {
            accessorKey: "name",
            header: "Template Name",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <FileCode className="h-5 w-5 text-blue-600" />
                    <div className="flex flex-col">
                        <span className="font-medium text-slate-900 cursor-pointer hover:underline">{row.getValue("name")}</span>
                        <span className="text-xs text-muted-foreground truncate max-w-[250px]">{row.original.description}</span>
                    </div>
                </div>
            )
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => <Badge variant="outline">{row.getValue("category")}</Badge>
        },
        {
            accessorKey: "file_type",
            header: "Type",
            cell: ({ row }) => <span className="uppercase text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">{row.getValue("file_type")}</span>
        },
        {
            accessorKey: "last_updated",
            header: "Last Updated",
            cell: ({ row }) => <span className="text-sm text-slate-600">{row.getValue("last_updated")}</span>
        },
        {
            accessorKey: "usage_count",
            header: "Usage",
            cell: ({ row }) => <span className="text-sm font-medium text-slate-700">{row.getValue("usage_count")}x</span>
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600" title="Generate Document from Template" onClick={() => console.log("Generate", row.original.id)}>
                        <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600" title="Download Source File" onClick={() => console.log("Download", row.original.id)}>
                        <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600" title="Edit Template" onClick={() => console.log("Edit", row.original.id)}>
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50" title="Delete Template" onClick={() => console.log("Delete", row.original.id)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="w-full space-y-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Document Templates</h1>
                    <p className="text-muted-foreground mt-1">Standardize your legal documents with reusable templates.</p>
                </div>
                <Button
                    className="bg-blue-600 hover:bg-blue-500"
                    onClick={() => navigate("/dashboard/documents/upload")}
                >
                    <PlusCircle className="mr-2 h-4 w-4" /> New Template
                </Button>
            </div>

            {/* FILTERS & TABLE */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <CardTitle>Template Library</CardTitle>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search templates..."
                                    className="pl-8 h-10 w-full md:w-[250px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={templates}
                        pageIndex={pageIndex}
                        pageSize={10}
                        onPageChange={setPageIndex}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
