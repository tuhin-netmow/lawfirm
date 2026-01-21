import { DataTable } from "@/components/dashboard/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    FileText,
    CheckCircle,
    Clock,
    AlertTriangle,
    Download,
    Eye,
    Filter
} from "lucide-react";
import { useState } from "react";
import { UploadDocumentModal } from "./components/UploadDocumentModal";
import { useLocation } from "react-router";
import type { ColumnDef } from "@tanstack/react-table";

// Mock Data
interface Document {
    id: number;
    name: string;
    type: string;
    client: string;
    uploadedBy: string;
    uploadDate: string;
    status: "pending" | "verified" | "rejected" | "expired" | "expiring_soon";
    expiryDate: string | null;
    size: string;
}

const mockDocuments: Document[] = [
    {
        id: 1,
        name: "Passport_Bio_Page.pdf",
        type: "Identity Proof",
        client: "Ahmed Hassan",
        uploadedBy: "Ahmed Hassan",
        uploadDate: "2026-01-07",
        status: "pending",
        expiryDate: "2030-05-15",
        size: "2.4 MB"
    },
    {
        id: 2,
        name: "Bank_Statement_Dec2025.pdf",
        type: "Financial",
        client: "Fatima Rahman",
        uploadedBy: "Sarah Johnson",
        uploadDate: "2026-01-06",
        status: "verified",
        expiryDate: null,
        size: "1.8 MB"
    },
    {
        id: 3,
        name: "Police_Clearance_Cert.jpg",
        type: "Character Ref",
        client: "Kamal Uddin",
        uploadedBy: "Kamal Uddin",
        uploadDate: "2026-01-05",
        status: "rejected",
        expiryDate: "2026-06-01",
        size: "3.2 MB"
    },
    {
        id: 4,
        name: "IELTS_Result_Sheet.pdf",
        type: "Education",
        client: "Nusrat Jahan",
        uploadedBy: "Mike Chen",
        uploadDate: "2026-01-04",
        status: "expiring_soon",
        expiryDate: "2026-02-15",
        size: "0.5 MB"
    },
    {
        id: 5,
        name: "Employment_Contract.pdf",
        type: "Employment",
        client: "Rashid Khan",
        uploadedBy: "Rashid Khan",
        uploadDate: "2026-01-03",
        status: "verified",
        expiryDate: null,
        size: "1.1 MB"
    }
];

export default function DocumentsList() {
    const [pageIndex, setPageIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();

    // Determine filter based on URL
    const getFilterFromUrl = () => {
        if (location.pathname.includes("pending")) return "pending";
        if (location.pathname.includes("verified")) return "verified";
        if (location.pathname.includes("rejected")) return "rejected";
        if (location.pathname.includes("expiring")) return "expiring_soon";
        return null;
    };

    const activeFilter = getFilterFromUrl();

    // Filter documents
    const filteredDocs = mockDocuments.filter((doc) => {
        const matchesSearch = Object.values(doc).some((value) =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
        const matchesFilter = activeFilter ? doc.status === activeFilter : true;
        return matchesSearch && matchesFilter;
    });

    const pageSize = 10;

    // Stats
    const stats = [
        {
            label: "Total Documents",
            value: mockDocuments.length,
            color: "bg-blue-600",
            icon: <FileText className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Pending Review",
            value: mockDocuments.filter(d => d.status === "pending").length,
            color: "bg-yellow-600",
            icon: <Clock className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Verified",
            value: mockDocuments.filter(d => d.status === "verified").length,
            color: "bg-green-600",
            icon: <CheckCircle className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Action Required",
            value: mockDocuments.filter(d => d.status === "rejected" || d.status === "expiring_soon").length,
            color: "bg-red-600",
            icon: <AlertTriangle className="w-10 h-10 opacity-80" />,
        },
    ];

    const getStatusBadge = (status: Document["status"]) => {
        const styles = {
            pending: "bg-yellow-100 text-yellow-800",
            verified: "bg-green-100 text-green-800",
            rejected: "bg-red-100 text-red-800",
            expired: "bg-gray-100 text-gray-800",
            expiring_soon: "bg-orange-100 text-orange-800"
        };

        const labels = {
            pending: "Pending Review",
            verified: "Verified",
            rejected: "Rejected",
            expired: "Expired",
            expiring_soon: "Expiring Soon"
        };

        return (
            <Badge className={styles[status]}>
                {labels[status]}
            </Badge>
        );
    };

    const columns: ColumnDef<Document>[] = [
        {
            accessorKey: "name",
            header: "File Name",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span className="font-medium text-gray-700">{row.getValue("name")}</span>
                </div>
            ),
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => (
                <Badge variant="outline" className="font-normal">
                    {row.getValue("type")}
                </Badge>
            ),
        },
        {
            accessorKey: "client",
            header: "Client",
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => getStatusBadge(row.getValue("status")),
        },
        {
            accessorKey: "uploadDate",
            header: "Uploaded",
            cell: ({ row }) => (
                <span className="text-sm text-gray-500">{row.getValue("uploadDate")}</span>
            ),
        },
        {
            accessorKey: "size",
            header: "Size",
            cell: ({ row }) => (
                <span className="text-sm text-gray-500">{row.getValue("size")}</span>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: () => (
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                        <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600">
                        <Download className="w-4 h-4" />
                    </Button>
                </div>
            ),
        },
    ];

    const getPageTitle = () => {
        if (activeFilter === "pending") return "Pending Verification";
        if (activeFilter === "verified") return "Verified Documents";
        if (activeFilter === "rejected") return "Rejected Documents";
        if (activeFilter === "expiring_soon") return "Expiring Documents";
        return "All Documents";
    }

    return (
        <div className="w-full">
            <div className="flex flex-wrap justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">{getPageTitle()}</h2>
                    <p className="text-gray-600 mt-1">Manage client documentation and verification</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Filter size={16} /> Filter
                    </Button>
                    <UploadDocumentModal />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {stats.map((item, idx) => (
                    <div
                        key={idx}
                        className={`${item.color} text-white rounded-xl p-5 flex justify-between items-center shadow-lg`}
                    >
                        <div>
                            <h3 className="text-3xl font-bold">{item.value}</h3>
                            <p className="text-sm mt-1 opacity-90">{item.label}</p>
                        </div>
                        {item.icon}
                    </div>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Document Repository</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={filteredDocs}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        totalCount={filteredDocs.length}
                        onPageChange={setPageIndex}
                        onSearch={(value) => setSearchTerm(value)}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
