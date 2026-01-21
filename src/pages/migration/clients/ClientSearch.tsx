import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, User, Globe, Calendar, FileText, Mail, Phone } from "lucide-react";
import { useState } from "react";

interface SearchResult {
    id: number;
    clientNumber: string;
    name: string;
    email: string;
    phone: string;
    nationality: string;
    visaType: string;
    destination: string;
    status: string;
    caseCount: number;
    registeredDate: string;
}

const allClients: SearchResult[] = [
    {
        id: 1,
        clientNumber: "CLI-2026-001",
        name: "Rashid Khan",
        email: "rashid.k@email.com",
        phone: "+880 1512-333444",
        nationality: "Bangladesh",
        visaType: "Partner Visa",
        destination: "Australia",
        status: "active",
        caseCount: 1,
        registeredDate: "2026-01-02",
    },
    {
        id: 2,
        clientNumber: "CLI-2026-002",
        name: "Ayesha Begum",
        email: "ayesha.b@email.com",
        phone: "+880 1712-555666",
        nationality: "Bangladesh",
        visaType: "Student Visa",
        destination: "Canada",
        status: "active",
        caseCount: 2,
        registeredDate: "2025-12-15",
    },
    {
        id: 3,
        clientNumber: "CLI-2025-089",
        name: "Mohammad Ali",
        email: "m.ali@email.com",
        phone: "+880 1812-777888",
        nationality: "Bangladesh",
        visaType: "Skilled Migration",
        destination: "Canada",
        status: "active",
        caseCount: 1,
        registeredDate: "2025-11-20",
    },
    {
        id: 4,
        clientNumber: "CLI-2025-076",
        name: "Sultana Parveen",
        email: "sultana.p@email.com",
        phone: "+880 1912-999000",
        nationality: "Bangladesh",
        visaType: "Work Visa",
        destination: "UK",
        status: "completed",
        caseCount: 1,
        registeredDate: "2025-10-05",
    },
    {
        id: 5,
        clientNumber: "CLI-2026-003",
        name: "Imran Hossain",
        email: "imran.h@email.com",
        phone: "+880 1612-111222",
        nationality: "Bangladesh",
        visaType: "Tourist Visa",
        destination: "USA",
        status: "pending",
        caseCount: 1,
        registeredDate: "2026-01-05",
    },
];

export default function ClientSearch() {
    const [searchFilters, setSearchFilters] = useState({
        name: "",
        email: "",
        phone: "",
        clientNumber: "",
        visaType: "",
        destination: "",
        status: "",
        dateFrom: "",
        dateTo: "",
    });

    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = () => {
        let filtered = allClients;

        if (searchFilters.name) {
            filtered = filtered.filter((c) =>
                c.name.toLowerCase().includes(searchFilters.name.toLowerCase())
            );
        }
        if (searchFilters.email) {
            filtered = filtered.filter((c) =>
                c.email.toLowerCase().includes(searchFilters.email.toLowerCase())
            );
        }
        if (searchFilters.phone) {
            filtered = filtered.filter((c) => c.phone.includes(searchFilters.phone));
        }
        if (searchFilters.clientNumber) {
            filtered = filtered.filter((c) =>
                c.clientNumber.toLowerCase().includes(searchFilters.clientNumber.toLowerCase())
            );
        }
        if (searchFilters.visaType) {
            filtered = filtered.filter((c) => c.visaType === searchFilters.visaType);
        }
        if (searchFilters.destination) {
            filtered = filtered.filter((c) => c.destination === searchFilters.destination);
        }
        if (searchFilters.status) {
            filtered = filtered.filter((c) => c.status === searchFilters.status);
        }

        setSearchResults(filtered);
        setHasSearched(true);
    };

    const handleReset = () => {
        setSearchFilters({
            name: "",
            email: "",
            phone: "",
            clientNumber: "",
            visaType: "",
            destination: "",
            status: "",
            dateFrom: "",
            dateTo: "",
        });
        setSearchResults([]);
        setHasSearched(false);
    };

    const handleFilterChange = (field: string, value: string) => {
        // Handle "all" value from Select components
        const finalValue = value === "all" ? "" : value;
        setSearchFilters((prev) => ({ ...prev, [field]: finalValue }));
    };

    const getStatusBadge = (status: string) => {
        const styles: Record<string, string> = {
            active: "bg-green-100 text-green-800",
            inactive: "bg-gray-100 text-gray-800",
            pending: "bg-yellow-100 text-yellow-800",
            completed: "bg-blue-100 text-blue-800",
        };
        return styles[status] || "bg-gray-100 text-gray-800";
    };

    return (
        <div className="w-full max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-3xl font-semibold">Advanced Client Search</h2>
                <p className="text-gray-600 mt-1">
                    Search and filter clients using multiple criteria
                </p>
            </div>

            {/* Search Form */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Search Filters
                    </CardTitle>
                    <CardDescription>
                        Enter one or more criteria to find clients
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Client Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter name"
                                value={searchFilters.name}
                                onChange={(e) => handleFilterChange("name", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter email"
                                value={searchFilters.email}
                                onChange={(e) => handleFilterChange("email", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                placeholder="Enter phone"
                                value={searchFilters.phone}
                                onChange={(e) => handleFilterChange("phone", e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="clientNumber">Client Number</Label>
                            <Input
                                id="clientNumber"
                                placeholder="e.g., CLI-2026-001"
                                value={searchFilters.clientNumber}
                                onChange={(e) => handleFilterChange("clientNumber", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="visaType">Visa Type</Label>
                            <Select
                                value={searchFilters.visaType}
                                onValueChange={(value) => handleFilterChange("visaType", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select visa type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="Student Visa">Student Visa</SelectItem>
                                    <SelectItem value="Tourist Visa">Tourist Visa</SelectItem>
                                    <SelectItem value="Work Visa">Work Visa</SelectItem>
                                    <SelectItem value="Skilled Migration">Skilled Migration</SelectItem>
                                    <SelectItem value="Partner Visa">Partner Visa</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="destination">Destination</Label>
                            <Select
                                value={searchFilters.destination}
                                onValueChange={(value) => handleFilterChange("destination", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select destination" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Countries</SelectItem>
                                    <SelectItem value="Australia">Australia</SelectItem>
                                    <SelectItem value="Canada">Canada</SelectItem>
                                    <SelectItem value="USA">United States</SelectItem>
                                    <SelectItem value="UK">United Kingdom</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={searchFilters.status}
                                onValueChange={(value) => handleFilterChange("status", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dateFrom">Registered From</Label>
                            <Input
                                id="dateFrom"
                                type="date"
                                value={searchFilters.dateFrom}
                                onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dateTo">Registered To</Label>
                            <Input
                                id="dateTo"
                                type="date"
                                value={searchFilters.dateTo}
                                onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <Button variant="outline" onClick={handleReset}>
                            Reset Filters
                        </Button>
                        <Button onClick={handleSearch} className="flex items-center gap-2">
                            <Search className="w-4 h-4" />
                            Search Clients
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Search Results */}
            {hasSearched && (
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Search Results ({searchResults.length} client{searchResults.length !== 1 ? "s" : ""} found)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {searchResults.length === 0 ? (
                            <div className="text-center py-12">
                                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-gray-600">No clients found</h3>
                                <p className="text-gray-500 mt-1">
                                    Try adjusting your search filters
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {searchResults.map((client) => (
                                    <Card key={client.id} className="hover:shadow-md transition-shadow">
                                        <CardContent className="pt-6">
                                            <div className="flex flex-wrap items-start justify-between gap-4">
                                                <div className="flex-1 min-w-[200px]">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h3 className="text-lg font-semibold">{client.name}</h3>
                                                        <Badge className={getStatusBadge(client.status)}>
                                                            {client.status}
                                                        </Badge>
                                                    </div>
                                                    <div className="text-sm text-gray-500 mb-1">
                                                        {client.clientNumber}
                                                    </div>
                                                    <div className="flex flex-wrap gap-4 mt-3">
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <Mail className="w-4 h-4 text-gray-500" />
                                                            {client.email}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <Phone className="w-4 h-4 text-gray-500" />
                                                            {client.phone}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col gap-2 min-w-[200px]">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Globe className="w-4 h-4 text-blue-500" />
                                                        <span className="font-medium">{client.visaType}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        Destination: {client.destination}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <FileText className="w-4 h-4" />
                                                        {client.caseCount} case(s)
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Calendar className="w-4 h-4" />
                                                        Registered: {client.registeredDate}
                                                    </div>
                                                </div>

                                                <div>
                                                    <Button>View Profile</Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Info when no search performed */}
            {!hasSearched && (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed">
                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600">Ready to Search</h3>
                    <p className="text-gray-500 mt-1">
                        Enter your search criteria above and click "Search Clients"
                    </p>
                </div>
            )}
        </div>
    );
}
