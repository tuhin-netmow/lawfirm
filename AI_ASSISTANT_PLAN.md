# AI Automated Reply System Implementation Plan

## 1. Overview
We will implement an intelligent **AI Assistant** (`<AIAssistant />`) integrated into the ERP Consultant application. This system will serve as a virtual assistant for consultants (and potentially clients) to quickly access information about **Cases, Documents, Leads, Migration Status, and Appointments** without navigating complex menus.

The system will feature:
- **Floating Chat Interface**: Accessible from anywhere in the application.
- **Context Awareness**: Ability to understand queries about specific entities (e.g., "Status of Case #123").
- **Step-by-Step Workflows**: Guided interactions for complex tasks (e.g., "New Lead Intake").
- **Embedded Forms**: Ability to render input forms directly within the chat stream.

## 2. Architecture

### 2.1 Frontend Components
- `src/components/ai-assistant/`:
    - `AIAssistant.tsx`: Main container (floating button + chat window).
    - `ChatWindow.tsx`: Message list and input area.
    - `ChatMessage.tsx`: Individual message bubble (supports Text, Markdown, Widgets).
    - `ChatInput.tsx`: Input field with optional voice/attachment triggers.
    - `ActionWidget.tsx`: For rendering buttons, quick replies, or status cards.
    - `FormWidget.tsx`: For rendering embedded forms (using `react-hook-form` + `zod`).

### 2.2 State Management (Redux)
- `src/store/features/ai-assistant/`:
    - `aiSlice.ts`: Manages chat history, open/close state, and "thinking" status.
    - `aiActions.ts`: Thunks for processing user input and fetching data.

### 2.3 AI Service Layer (Simulation/Integration)
- `src/services/aiService.ts`: 
    - A service that interprets user input. 
    - Initially, this will use a **Rule-Based Engine** / **Intent Matcher** to simulate AI behavior.
    - It will be structured to easily swap with a real LLM (OpenAI/Gemini) backend later.
    - **Capabilities**:
        - `checkCaseStatus(id)`: Fetches case details.
        - `checkAppointment(date/id)`: Fetches appointments.
        - `guideProcess(workflow)`: Initiates a step-by-step Q&A.

## 3. Detailed Features

### 3.1 Sidebar & Configuration (New)
We will add a dedicated **"Chat Widget"** section to the left sidebar with the following sub-menus:
1.  **Widget Settings**: Configure the assistant's name, welcome message, and theme color.
2.  **Installation / Embed**: A page providing the "Copy Code" facility so the widget can be used on external client-facing websites.
3.  **Chat Logs (Optional)**: View past conversations.

### 3.2 Supported Intents (Domains)
1.  **Case Information**:
    - *"What is the status of Case [ID]?"*
    - *"Show me recent updates for client [Name]."*
2.  **Lead Management**:
    - *"Create a new lead."* -> Triggers Step-by-Step Form.
    - *"Lead status for [Name]?"*
3.  **Documents**:
    - *"Which documents are pending for Case [ID]?"*
    - *"Upload status of [Document Name]."*
4.  **Appointments**:
    - *"My appointments for today."*
    - *"Schedule a meeting with [Client]?"* -> Triggers Form.

### 3.3 Step-by-Step & Forms
The chat can push a "Form Message" which renders React Hook Form components.
- **Example Flow**:
    1. User: "Add new Lead"
    2. AI: "Sure, what is the Lead's First Name?" (Input Field appears)
    3. User: enters name.
    4. AI: "And the Last Name?" (Input Field appears)
    ...
    5. AI: "Lead created successfully! [Link]"

## 4. Implementation Steps

### Step 1: Sidebar & Routes
- Update `sidebarItemLink.tsx` to include "Chat Widget".
- Create page `src/pages/ai-chat/WidgetSettings.tsx`.
- Create page `src/pages/ai-chat/EmbedCode.tsx` (The "Copy and Use" facility).

### Step 2: Core UI Components
- Create the floating button and chat window layout (`<AIAssistant />`).
- Implement the message bubble styles (User vs AI).
- **Home Page Integration**: Ensure `<AIAssistant />` is mounted in the main layout (`Layout.tsx`) so it appears on the Dashboard/Home.

### Step 2: Redux Setup
- Create `simulateResponse` async thunk.
- Handle state for `messages`, `isOpen`, `isTyping`.

### Step 3: "BRAIN" Implementation (Mock Logic)
- Implement `aiService.processQuery(text)`:
    - Regex matching for keywords like "Case", "Lead", "Appointment".
    - Mock data responses for "Status" queries.

### Step 4: Intelligent Widgets
- Create `StatusCard` for displaying Case/Lead details nicely in chat.
- Create `MiniForm` for simple inputs.

### Step 5: Integration
- Add `<AIAssistant />` to `src/layouts/Layout.tsx` (or `App.tsx`) so it persists across pages.

## 5. Technology Stack
- **React** (UI)
- **Redux Toolkit** (State)
- **Lucide React** (Icons)
- **Tailwind CSS** (Styling)
- **React Hook Form** (Embedded Forms)
