import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { aiService } from "@/services/aiService";
import type { Message } from "@/types/chat";

export type { Message };

interface AIState {
    isOpen: boolean;
    messages: Message[];
    isLoading: boolean;
    draftByFormId: Record<string, Record<string, any>>; // Wizard memory
}

const initialState: AIState = {
    isOpen: false,
    messages: [{
        id: "init-1",
        role: "assistant",
        content: "Hello! I'm your Auto Service Assistant. How can I help you today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "text"
    }],
    isLoading: false,
    draftByFormId: {}, // Initialize wizard memory
};

export const sendMessage = createAsyncThunk(
    "ai/sendMessage",
    async (text: string) => {
        // 1. Add User Message immediately is handled by component optimistically. 

        const response = await aiService.processQuery(text);
        return response;
    }
);

const aiSlice = createSlice({
    name: "aiAssistant",
    initialState,
    reducers: {
        toggleChat: (state) => {
            state.isOpen = !state.isOpen;
        },
        setIsOpen: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        clearChat: (state) => {
            state.messages = [initialState.messages[0]];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.isLoading = false;

                const aiMsg: Message = {
                    id: Date.now().toString(),
                    role: "assistant",
                    content: action.payload.text,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    type: action.payload.type,
                    data: action.payload.data
                };
                state.messages.push(aiMsg);
            })
            .addCase(sendMessage.rejected, (state) => {
                state.isLoading = false;
                state.messages.push({
                    id: Date.now().toString(),
                    role: "assistant",
                    content: "Sorry, I encountered an error connecting to the brain.",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                });
            });
    },
});

export const { toggleChat, setIsOpen, addMessage, clearChat } = aiSlice.actions;
export default aiSlice.reducer;
