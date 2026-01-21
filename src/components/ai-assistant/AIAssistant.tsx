import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import ChatWindow from "./ChatWindow";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { toggleChat, setIsOpen } from "@/store/features/ai-assistant/aiSlice";

const AIAssistant = () => {
    const { isOpen } = useAppSelector((state) => state.aiAssistant);
    const dispatch = useAppDispatch();

    // Handle open state via Redux
    const handleToggle = () => dispatch(toggleChat());
    const handleClose = () => dispatch(setIsOpen(false));

    console.log("AIAssistant rendering - isOpen:", isOpen);

    return (
        <>
            <ChatWindow isOpen={isOpen} onClose={handleClose} />

            {!isOpen && (
                <Button
                    onClick={handleToggle}
                    className="fixed z-[9999] w-14 h-14 rounded-full shadow-2xl bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-110 transition-all text-white flex items-center justify-center animate-in zoom-in slide-in-from-bottom-4"
                >
                    <Bot size={28} />
                    {/* Notification Badge */}
                    <span className="absolute top-0 right-0 flex w-3 h-3 -mt-1 -mr-1">
                        <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
                        <span className="relative inline-flex w-3 h-3 bg-red-500 rounded-full"></span>
                    </span>
                </Button>
            )}
        </>
    );
};

export default AIAssistant;
