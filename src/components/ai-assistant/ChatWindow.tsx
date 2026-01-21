import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, X, Sparkles, Loader2, MessageSquare } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { sendMessage, addMessage, type Message } from "@/store/features/ai-assistant/aiSlice";

interface ChatWindowProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChatWindow = ({ isOpen, onClose }: ChatWindowProps) => {
    const [input, setInput] = useState("");
    const { messages, isLoading } = useAppSelector((state) => state.aiAssistant);
    const dispatch = useAppDispatch();
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen, isLoading]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input.trim(),
            timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };

        dispatch(addMessage(userMsg));
        dispatch(sendMessage(input.trim()));
        setInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-20 right-6 w-[420px] h-[650px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 z-50 animate-in slide-in-from-bottom-5 duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-4 flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-base">AI Assistant</h3>
                        <p className="text-xs text-blue-100">Always here to help</p>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-white hover:bg-white/20 rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </Button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 bg-gradient-to-b from-gray-50 to-white overflow-y-auto">
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}

                    {/* Loading Indicator */}
                    {isLoading && (
                        <div className="flex items-center gap-2 p-3 bg-white rounded-xl shadow-sm border border-gray-100 w-fit">
                            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                            <span className="text-sm text-gray-600">AI is thinking...</span>
                        </div>
                    )}

                    <div ref={scrollRef} />
                </div>
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {["Menu", "Book Service", "Check Job Status", "View Invoice"].map((action) => (
                        <Button
                            key={action}
                            variant="outline"
                            size="sm"
                            className="text-xs whitespace-nowrap bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-all"
                            onClick={() => {
                                setInput(action.toLowerCase());
                                setTimeout(() => handleSend(), 100);
                            }}
                        >
                            {action}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex gap-2">
                    <div className="flex-1 relative">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message or select an action..."
                            className="pr-10 h-11 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                            disabled={isLoading}
                        />
                        <MessageSquare className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                    <Button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="h-11 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                    </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                    Powered by AI • Press Enter to send
                </p>
            </div>
        </div>
    );
};

export default ChatWindow;
