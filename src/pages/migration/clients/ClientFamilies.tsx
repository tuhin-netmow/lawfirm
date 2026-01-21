import { DataTable } from "@/components/dashboard/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ColumnDef } from "@tanstack/react-table";
import {
    Users,
    // UserPlus,
    Baby,
    Heart,
    User,
    Calendar,
    FileText,
    Plus,
    Edit,
} from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

interface FamilyMember {
    id: number;
    clientName: string;
    clientNumber: string;
    memberName: string;
    relationship: "spouse" | "child" | "parent" | "sibling";
    dateOfBirth: string;
    age: number;
    passportNumber: string;
    passportExpiry: string;
    isDependent: boolean;
    includeInApplication: boolean;
}

const mockFamilies: FamilyMember[] = [
    {
        id: 1,
        clientName: "Rashid Khan",
        clientNumber: "CLI-2026-001",
        memberName: "Ayesha Khan",
        relationship: "spouse",
        dateOfBirth: "1992-05-15",
        age: 33,
        passportNumber: "B98765432",
        passportExpiry: "2029-05-14",
        isDependent: true,
        includeInApplication: true,
    },
    {
        id: 2,
        clientName: "Rashid Khan",
        clientNumber: "CLI-2026-001",
        memberName: "Zara Khan",
        relationship: "child",
        dateOfBirth: "2018-08-20",
        age: 7,
        passportNumber: "C11223344",
        passportExpiry: "2028-08-19",
        isDependent: true,
        includeInApplication: true,
    },
    {
        id: 3,
        clientName: "Ayesha Begum",
        clientNumber: "CLI-2026-002",
        memberName: "Karim Begum",
        relationship: "spouse",
        dateOfBirth: "1990-03-10",
        age: 35,
        passportNumber: "D55667788",
        passportExpiry: "2027-03-09",
        isDependent: false,
        includeInApplication: false,
    },
    {
        id: 4,
        clientName: "Mohammad Ali",
        clientNumber: "CLI-2025-089",
        memberName: "Fatima Ali",
        relationship: "child",
        dateOfBirth: "2015-11-25",
        age: 10,
        passportNumber: "E99887766",
        passportExpiry: "2027-11-24",
        isDependent: true,
        includeInApplication: true,
    },
    {
        id: 5,
        clientName: "Mohammad Ali",
        clientNumber: "CLI-2025-089",
        memberName: "Hassan Ali",
        relationship: "child",
        dateOfBirth: "2020-02-14",
        age: 5,
        passportNumber: "F44556677",
        passportExpiry: "2030-02-13",
        isDependent: true,
        includeInApplication: true,
    },
];

export default function ClientFamilies() {
    const [pageIndex, setPageIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const pageSize = 10;

    const filteredFamilies = mockFamilies.filter((family) =>
        Object.values(family).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const totalFamilyMembers = mockFamilies.length;
    const dependents = mockFamilies.filter((f) => f.isDependent).length;
    const includedInApplications = mockFamilies.filter((f) => f.includeInApplication).length;
    const uniqueClients = new Set(mockFamilies.map((f) => f.clientNumber)).size;

    const stats = [
        {
            label: "Total Family Members",
            value: totalFamilyMembers,
            color: "bg-blue-600",
            icon: <Users className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Dependents",
            value: dependents,
            color: "bg-green-600",
            icon: <Baby className="w-10 h-10 opacity-80" />,
        },
        {
            label: "In Applications",
            value: includedInApplications,
            color: "bg-purple-600",
            icon: <FileText className="w-10 h-10 opacity-80" />,
        },
        {
            label: "Families",
            value: uniqueClients,
            color: "bg-yellow-600",
            icon: <Heart className="w-10 h-10 opacity-80" />,
        },
    ];

    const getRelationshipIcon = (relationship: FamilyMember["relationship"]) => {
        const icons = {
            spouse: <Heart className="w-4 h-4 text-pink-500" />,
            child: <Baby className="w-4 h-4 text-blue-500" />,
            parent: <User className="w-4 h-4 text-green-500" />,
            sibling: <Users className="w-4 h-4 text-purple-500" />,
        };
        return icons[relationship];
    };

    const getRelationshipBadge = (relationship: FamilyMember["relationship"]) => {
        const colors = {
            spouse: "bg-pink-100 text-pink-800",
            child: "bg-blue-100 text-blue-800",
            parent: "bg-green-100 text-green-800",
            sibling: "bg-purple-100 text-purple-800",
        };
        return colors[relationship];
    };

    const columns: ColumnDef<FamilyMember>[] = [
        {
            accessorKey: "clientName",
            header: "Primary Client",
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.original.clientName}</div>
                    <div className="text-sm text-gray-500">{row.original.clientNumber}</div>
                </div>
            ),
        },
        {
            accessorKey: "memberName",
            header: "Family Member",
            cell: ({ row }) => (
                <div className="font-medium">{row.getValue("memberName")}</div>
            ),
        },
        {
            accessorKey: "relationship",
            header: "Relationship",
            cell: ({ row }) => {
                const relationship = row.getValue("relationship") as FamilyMember["relationship"];
                return (
                    <Badge className={`${getRelationshipBadge(relationship)} gap-1`}>
                        {getRelationshipIcon(relationship)}
                        {relationship.charAt(0).toUpperCase() + relationship.slice(1)}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "age",
            header: "Age",
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.original.age} years</div>
                    <div className="text-xs text-gray-500">{row.original.dateOfBirth}</div>
                </div>
            ),
        },
        {
            accessorKey: "passportNumber",
            header: "Passport",
            cell: ({ row }) => (
                <div>
                    <div className="font-medium">{row.original.passportNumber}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Exp: {row.original.passportExpiry}
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "isDependent",
            header: "Dependent",
            cell: ({ row }) => {
                const isDependent = row.getValue("isDependent") as boolean;
                return (
                    <Badge variant={isDependent ? "default" : "secondary"}>
                        {isDependent ? "Yes" : "No"}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "includeInApplication",
            header: "In Application",
            cell: ({ row }) => {
                const included = row.getValue("includeInApplication") as boolean;
                return (
                    <Badge variant={included ? "success" : "outline"} className={included ? "text-white" : ""}>
                        {included ? "Included" : "Not Included"}
                    </Badge>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: () => (
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-semibold">Client Families</h2>
                    <p className="text-gray-600 mt-1">
                        Manage family members and dependents for visa applications
                    </p>
                </div>

                <Link to="/dashboard/migration/clients/families/create">
                    <Button className="flex items-center gap-2">
                        <Plus size={18} />
                        Add Family Member
                    </Button>
                </Link>
            </div>

            {/* Stats Cards */}
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

            {/* Info Banner */}
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                        <h3 className="font-semibold text-blue-900">Family Member Management</h3>
                        <p className="text-sm text-blue-800 mt-1">
                            Track all family members associated with clients. Mark dependents and
                            specify which members should be included in visa applications.
                        </p>
                    </div>
                </div>
            </div>

            {/* Data Table */}
            <Card>
                <CardHeader>
                    <CardTitle>All Family Members</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        data={filteredFamilies}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        totalCount={filteredFamilies.length}
                        onPageChange={setPageIndex}
                        onSearch={(value) => setSearchTerm(value)}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
