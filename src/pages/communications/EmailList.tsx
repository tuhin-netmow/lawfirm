
import { DataTable } from "@/components/dashboard/components/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ColumnDef } from "@tanstack/react-table";
import {
    PlusCircle,
    Search,
    Filter,
    Inbox,
    Send,
    File,
    Trash2,
    Paperclip,
    MoreVertical
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

interface EmailMessage {
    id: number;
    subject: string;
    sender: string;
    recipient: string;
    preview: string;
    date: string;
    has_attachment: boolean;
    folder: 'inbox' | 'sent' | 'drafts' | 'trash';
    is_read: boolean;
    matter?: string;
}

const MOCK_EMAILS: EmailMessage[] = [
    {
        id: 1,
        subject: "Re: Settlement Proposal - Smith vs Jones",
        sender: "opposing.counsel@law.com",
        recipient: "me@firm.com",
        preview: "We have reviewed your client's proposal and have a counter-offer attached...",
        date: "2024-04-12 10:30 AM",
        has_attachment: true,
        folder: "inbox",
        is_read: false,
        matter: "Smith vs Jones"
    },
    {
        id: 2,
        subject: "Meeting Confirmation",
        sender: "client@gmail.com",
        recipient: "me@firm.com",
        preview: "Confirming our meeting for next Tuesday at 2 PM.",
        date: "2024-04-11 04:15 PM",
        has_attachment: false,
        folder: "inbox",
        is_read: true,
        matter: "Estate of Elder"
    },
    {
        id: 3,
        subject: "Draft Contract Review",
        sender: "me@firm.com",
        recipient: "associate@firm.com",
        preview: "Please review the attached draft specifically section 5.",
        date: "2024-04-10 09:00 AM",
        has_attachment: true,
        folder: "sent",
        is_read: true,
        matter: "TechCorp Merger"
    },
    {
        id: 4,
        subject: "Invoice #INV-2024-004",
        sender: "billing@firm.com",
        recipient: "jane.doe@yahoo.com",
        preview: "Please find attached the invoice for recent services.",
        date: "2024-04-10 11:20 AM",
        has_attachment: true,
        folder: "sent",
        is_read: true,
        matter: "General Consultation"
    }
];

export default function EmailList() {
    const [pageIndex, setPageIndex] = useState(0);
    const [currentFolder, setCurrentFolder] = useState<'inbox' | 'sent' | 'drafts' | 'trash'>('inbox');
    const navigate = useNavigate();

    // Filter emails by current folder
    const data = MOCK_EMAILS.filter(email => email.folder === currentFolder);

    const columns: ColumnDef<EmailMessage>[] = [
        {
            accessorKey: "sender",
            header: currentFolder === 'sent' ? "To" : "From",
            cell: ({ row }) => (
                <div className={`font-medium ${!row.original.is_read ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>
                    {currentFolder === 'sent' ? row.original.recipient : row.original.sender}
                </div>
            )
        },
        {
            accessorKey: "subject",
            header: "Subject",
            cell: ({ row }) => (
                <div className="flex flex-col max-w-[400px]">
                    <span className={`text-sm ${!row.original.is_read ? 'font-bold' : ''}`}>
                        {row.getValue("subject")}
                        {row.original.matter && <Badge variant="outline" className="ml-2 text-xs py-0 h-5">{row.original.matter}</Badge>}
                    </span>
                    <span className="text-xs text-slate-500 truncate">{row.original.preview}</span>
                </div>
            )
        },
        {
            accessorKey: "has_attachment",
            header: "",
            cell: ({ row }) => row.original.has_attachment ? <Paperclip className="w-4 h-4 text-slate-400" /> : null
        },
        {
            accessorKey: "date",
            header: "Date",
            cell: ({ row }) => <span className="text-xs text-slate-500">{row.getValue("date")}</span>
        },
        {
            id: "actions",
            cell: () => (
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            )
        }
    ];

    return (
        <div className="w-full h-full flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-64 flex flex-col gap-2">
                <Button
                    className="w-full bg-blue-600 hover:bg-blue-500 mb-4 justify-start"
                    onClick={() => navigate("/dashboard/communications/email/compose")}
                >
                    <PlusCircle className="mr-2 h-4 w-4" /> Compose
                </Button>

                <Button
                    variant={currentFolder === 'inbox' ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setCurrentFolder('inbox')}
                >
                    <Inbox className="mr-2 h-4 w-4" /> Inbox
                    <Badge className="ml-auto bg-blue-100 text-blue-800 hover:bg-blue-100">2</Badge>
                </Button>
                <Button
                    variant={currentFolder === 'sent' ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setCurrentFolder('sent')}
                >
                    <Send className="mr-2 h-4 w-4" /> Sent
                </Button>
                <Button
                    variant={currentFolder === 'drafts' ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setCurrentFolder('drafts')}
                >
                    <File className="mr-2 h-4 w-4" /> Drafts
                </Button>
                <Button
                    variant={currentFolder === 'trash' ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setCurrentFolder('trash')}
                >
                    <Trash2 className="mr-2 h-4 w-4" /> Trash
                </Button>
            </div>

            {/* Main Content */}
            <div className="flex-1 space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight capitalize">{currentFolder}</h2>
                        <p className="text-muted-foreground text-sm">
                            {currentFolder === 'inbox' ? 'View and manage your incoming messages.' : `View your ${currentFolder} messages.`}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search emails..."
                                className="pl-8 h-10 w-full md:w-[250px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <DataTable
                            columns={columns}
                            data={data}
                            pageIndex={pageIndex}
                            pageSize={10}
                            onPageChange={setPageIndex}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
