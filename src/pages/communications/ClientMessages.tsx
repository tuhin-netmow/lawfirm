
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Search,
    MessageSquare,
    Send,
    Phone,
    Video,
    MoreVertical,
    CheckCheck,
    Mic
} from "lucide-react";
import { useState } from "react";
// import { useNavigate } from "react-router";

interface Message {
    id: number;
    text: string;
    sender: 'me' | 'other';
    timestamp: string;
    status: 'sent' | 'delivered' | 'read';
}

interface Thread {
    id: number;
    contactName: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    avatar?: string; // Optional avatar URL
    isOnline: boolean;
    messages: Message[];
}

const MOCK_THREADS: Thread[] = [
    {
        id: 1,
        contactName: "John Smith",
        lastMessage: "Thank you for the update.",
        lastMessageTime: "10:30 AM",
        unreadCount: 0,
        isOnline: true,
        messages: [
            { id: 1, text: "Hello John, any updates on the documents?", sender: "me", timestamp: "10:00 AM", status: "read" },
            { id: 2, text: "Yes, I'll send them over shortly.", sender: "other", timestamp: "10:15 AM", status: "read" },
            { id: 3, text: "Great, thanks!", sender: "me", timestamp: "10:16 AM", status: "read" },
            { id: 4, text: "Thank you for the update.", sender: "other", timestamp: "10:30 AM", status: "read" }
        ]
    },
    {
        id: 2,
        contactName: "Sarah Conner",
        lastMessage: "When is the next court date?",
        lastMessageTime: "Yesterday",
        unreadCount: 1,
        isOnline: false,
        messages: [
            { id: 1, text: "Hi Sarah, just checking in.", sender: "me", timestamp: "Yesterday 9:00 AM", status: "read" },
            { id: 2, text: "When is the next court date?", sender: "other", timestamp: "Yesterday 2:00 PM", status: "read" }
        ]
    },
    {
        id: 3,
        contactName: "TechCorp Legal",
        lastMessage: "Contract revision attached.",
        lastMessageTime: "Mon",
        unreadCount: 0,
        isOnline: false,
        messages: [
            { id: 1, text: "Contract revision attached.", sender: "other", timestamp: "Mon 11:00 AM", status: "read" }
        ]
    }
];

export default function ClientMessages() {
    // const navigate = useNavigate();
    const [activeThreadId, setActiveThreadId] = useState<number>(MOCK_THREADS[0].id);
    const [inputText, setInputText] = useState("");
    const [threads, setThreads] = useState<Thread[]>(MOCK_THREADS);

    const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newMessage: Message = {
            id: Date.now(),
            text: inputText,
            sender: 'me',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'sent'
        };

        const updatedThreads = threads.map(thread => {
            if (thread.id === activeThreadId) {
                return {
                    ...thread,
                    messages: [...thread.messages, newMessage],
                    lastMessage: inputText,
                    lastMessageTime: "Just now"
                };
            }
            return thread;
        });

        setThreads(updatedThreads);
        setInputText("");
    };

    return (
        <div className="flex h-[calc(100vh-140px)] gap-4">
            {/* Sidebar List */}
            <Card className="w-full md:w-80 flex flex-col">
                <CardHeader className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search messages..."
                            className="pl-8"
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0 overflow-y-auto flex-1">
                    {threads.map((thread) => (
                        <div
                            key={thread.id}
                            className={`flex items-start gap-3 p-4 border-b cursor-pointer hover:bg-slate-50 transition-colors ${activeThreadId === thread.id ? 'bg-slate-50 border-l-4 border-l-blue-600' : ''}`}
                            onClick={() => setActiveThreadId(thread.id)}
                        >
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                                    {thread.contactName.charAt(0)}
                                </div>
                                {thread.isOnline && (
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h4 className="font-semibold text-sm truncate">{thread.contactName}</h4>
                                    <span className="text-xs text-slate-500 whitespace-nowrap">{thread.lastMessageTime}</span>
                                </div>
                                <p className={`text-sm truncate ${thread.unreadCount > 0 ? 'font-medium text-slate-900' : 'text-slate-500'}`}>
                                    {thread.lastMessage}
                                </p>
                            </div>
                            {thread.unreadCount > 0 && (
                                <div className="min-w-[20px] h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center px-1.5 font-bold">
                                    {thread.unreadCount}
                                </div>
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Chat Area */}
            <Card className="flex-1 flex flex-col shadow-sm">
                {/* Chat Header */}
                <div className="p-4 border-b flex justify-between items-center bg-white rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                                {activeThread.contactName.charAt(0)}
                            </div>
                            {activeThread.isOnline && (
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                            )}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">{activeThread.contactName}</h3>
                            <span className="text-xs text-green-600 flex items-center gap-1">
                                {activeThread.isOnline ? 'Online' : 'Offline'}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600">
                            <Phone className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-blue-600">
                            <Video className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-slate-500">
                            <MoreVertical className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Messages Feed */}
                <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4">
                    {activeThread.messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] rounded-2xl px-4 py-3 shadow-sm ${msg.sender === 'me'
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-white text-slate-800 border rounded-bl-none'
                                }`}>
                                <p className="text-sm">{msg.text}</p>
                                <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${msg.sender === 'me' ? 'text-blue-100' : 'text-slate-400'}`}>
                                    <span>{msg.timestamp}</span>
                                    {msg.sender === 'me' && <CheckCheck className="w-3 h-3" />}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t rounded-b-lg">
                    <form onSubmit={handleSendMessage} className="flex gap-2">
                        <Button type="button" variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
                            <MessageSquare className="w-5 h-5" />
                        </Button>
                        <Input
                            placeholder="Type a message..."
                            className="bg-slate-50 border-0 focus-visible:ring-1 focus-visible:ring-blue-200"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        />
                        <Button type="button" variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600">
                            <Mic className="w-5 h-5" />
                        </Button>
                        <Button type="submit" className="bg-blue-600 hover:bg-blue-500 px-4">
                            <Send className="w-4 h-4" />
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
}
