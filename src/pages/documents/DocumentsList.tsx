import { DataTable } from "@/components/dashboard/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Document } from "@/types/documents.types";
import type { ColumnDef } from "@tanstack/react-table";
import {
    FileText,
    UploadCloud,
    Search,
    Filter,
    Eye,
    Download,
    File,
    Image as ImageIcon,
    FileSpreadsheet,
    Lock,
    Users,
    Globe
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

// Metric Card Component
const MetricCard = ({ label, value, icon, color }: { label: string, value: string | number, icon: React.ReactNode, color: string }) => (
    <div className={`p-5 rounded-xl text-white shadow-md flex justify-between items-center ${color}`}>
        <div>
            <h3 className="text-3xl font-bold">{value}</h3>
            <p className="opacity-90 text-sm mt-1">{label}</p>
        </div>
        <div className="p-2 bg-white/20 rounded-lg">
            {icon}
        </div>
    </div>
);

// MOCK DATA
const MOCK_DOCUMENTS: Document[] = [
    {
        id: 1,
        title: "Statement of Claim - Smith v Jones",
        category: "Pleadings",
        related_to: "Matter: MAT-2024-001",
        uploaded_by: "Sarah Conner",
        upload_date: "2024-03-15",
        file_size: "2.5 MB",
        file_type: "pdf",
        visibility: "Team",
        security_level: "Normal",
        version: 1
    },
    {
        id: 2,
        title: "Client Agreement - Smith",
        category: "Agreements",
        related_to: "Client: John Smith",
        uploaded_by: "Michael Ross",
        upload_date: "2024-01-10",
        file_size: "1.2 MB",
        file_type: "docx",
        visibility: "Private",
        security_level: "Restricted",
        version: 1
    },
    {
        id: 3,
        title: "Evidence Photo #004",
        category: "Evidence",
        related_to: "Matter: MAT-2024-001",
        uploaded_by: "Sarah Conner",
        upload_date: "2024-03-20",
        file_size: "4.8 MB",
        file_type: "jpg",
        visibility: "Team",
        security_level: "Normal",
        version: 1
    },
    {
        id: 4,
        title: "Settlement Offer Draft",
        category: "Correspondence",
        related_to: "Matter: MAT-2023-089",
        uploaded_by: "Harvey Specter",
        upload_date: "2024-04-01",
        file_size: "45 KB",
        file_type: "docx",
        visibility: "Team",
        security_level: "High",
        version: 3
    },
    {
        id: 5,
        title: "Financial Report Q1",
        category: "Financial",
        related_to: "Client: TechCorp",
        uploaded_by: "Jessica Pearson",
        upload_date: "2024-04-05",
        file_size: "500 KB",
        file_type: "xlsx",
        visibility: "Client",
        security_level: "Normal",
        version: 1
    }
];

const getFileIcon = (type: string) => {
    switch (type) {
        case 'pdf': return <FileText className="h-4 w-4 text-red-500" />;
        case 'docx':
        case 'doc': return <FileText className="h-4 w-4 text-blue-500" />;
        case 'xlsx':
        case 'xls': return <FileSpreadsheet className="h-4 w-4 text-green-500" />;
        case 'jpg':
        case 'png': return <ImageIcon className="h-4 w-4 text-purple-500" />;
        default: return <File className="h-4 w-4 text-gray-500" />;
    }
};

const getVisibilityIcon = (visibility: string) => {
    switch (visibility) {
        case 'Private': return <Lock className="h-3 w-3" />;
        case 'Team': return <Users className="h-3 w-3" />;
        case 'Client': return <Globe className="h-3 w-3" />;
        default: return null;
    }
};

export default function DocumentsList() {
    const [pageIndex, setPageIndex] = useState(0);
    const documents = MOCK_DOCUMENTS;

    // -------------------- COLUMNS --------------------
    const columns: ColumnDef<Document>[] = [
        {
            accessorKey: "title",
            header: "Document Name",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    {getFileIcon(row.original.file_type)}
                    <div className="flex flex-col">
                        <span className="font-medium text-blue-600 hover:underline cursor-pointer">{row.getValue("title")}</span>
                        <span className="text-xs text-muted-foreground uppercase">{row.original.file_type} • {row.original.file_size}</span>
                    </div>
                </div>
            )
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => <Badge variant="secondary">{row.getValue("category")}</Badge>
        },
        {
            accessorKey: "related_to",
            header: "Related To",
            cell: ({ row }) => <span className="text-sm text-slate-600">{row.getValue("related_to")}</span>
        },
        {
            accessorKey: "uploaded_by",
            header: "Uploaded By",
            cell: ({ row }) => (
                <div className="flex flex-col text-sm">
                    <span>{row.getValue("uploaded_by")}</span>
                    <span className="text-xs text-muted-foreground">{row.original.upload_date}</span>
                </div>
            )
        },
        {
            accessorKey: "visibility",
            header: "Access",
            cell: ({ row }) => (
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100 px-2.5 py-1 rounded-full w-fit">
                    {getVisibilityIcon(row.getValue("visibility"))}
                    {row.getValue("visibility")}
                </div>
            )
        },
        {
            id: "actions",
            header: "Actions",
            cell: () => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500">
                        <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600">
                        <Eye className="h-4 w-4" />
                    </Button>
                </div>
            )
        }
    ];

    // -------------------- STATS --------------------
    const stats = [
        { label: "Total Documents", value: documents.length, icon: <FileText className="h-6 w-6" />, color: "bg-blue-600" },
        { label: "Client Shared", value: documents.filter(d => d.visibility === 'Client').length, icon: <Globe className="h-6 w-6" />, color: "bg-green-600" },
        { label: "Restricted", value: documents.filter(d => d.security_level !== 'Normal').length, icon: <Lock className="h-6 w-6" />, color: "bg-red-500" },
    ];

    return (
        <div className="w-full space-y-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Document Library</h1>
                    <p className="text-muted-foreground mt-1">Manage, secure, and share firm documents.</p>
                </div>
                <Link to="/dashboard/documents/upload">
                    <Button className="bg-blue-600 hover:bg-blue-500">
                        <UploadCloud className="mr-2 h-4 w-4" /> Upload Document
                    </Button>
                </Link>
            </div>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <MetricCard key={i} {...stat} />
                ))}
            </div>

            {/* FILTERS & TABLE */}
            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <CardTitle>All Files</CardTitle>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search documents..."
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
                        data={documents}
                        pageIndex={pageIndex}
                        pageSize={10}
                        onPageChange={setPageIndex}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
