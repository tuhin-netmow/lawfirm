import { Bot, User } from "lucide-react";
import ActionWidget from "./ActionWidget";
import FormWidget from "./FormWidget";
import type { Message } from "@/store/features/ai-assistant/aiSlice";

interface ChatMessageProps {
    message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
    const isUser = message.role === "user";

    return (
        <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            {/* Avatar */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${isUser
                    ? "bg-gradient-to-br from-blue-500 to-purple-500"
                    : "bg-gradient-to-br from-indigo-500 to-purple-600"
                }`}>
                {isUser ? (
                    <User className="w-4 h-4 text-white" />
                ) : (
                    <Bot className="w-4 h-4 text-white" />
                )}
            </div>

            {/* Message Content */}
            <div className={`flex-1 max-w-[85%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}>
                {/* Sender Name & Time */}
                <div className={`flex items-center gap-2 px-1 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
                    <span className="text-xs font-semibold text-gray-700">
                        {isUser ? "You" : "AI Assistant"}
                    </span>
                    <span className="text-xs text-gray-400">{message.timestamp}</span>
                </div>

                {/* Message Bubble or Widget */}
                {message.type === "form" && message.data ? (
                    <FormWidget data={message.data} />
                ) : message.type === "card" && message.data ? (
                    <ActionWidget data={message.data} />
                ) : message.type === "action" && message.data ? (
                    <ActionWidget data={message.data} />
                ) : (
                    <div
                        className={`px-4 py-3 rounded-2xl shadow-sm ${isUser
                                ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-tr-sm"
                                : "bg-white border border-gray-200 text-gray-800 rounded-tl-sm"
                            }`}
                    >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                            {message.content}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatMessage;
