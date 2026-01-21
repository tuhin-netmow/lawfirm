# AI Chat System: Analysis & Form Design

## 1. Analysis of Migration Consultancy Modules

Based on `MIGRATION_CONSULTANCY_ANALYSIS.md` and the Sidebar structure, the AI Assistant needs to handle queries and actions for the following core entities:

### A. Leads & CRM (`/leads`)
*   **Key Fields**: Name, Email, Phone, Visa Interest, Destination.
*   **Common Actions**: Create Lead, Check Pipeline Status, Add Follow-up Note.
*   **AI Use Case**: "Add a new lead for John Doe interested in Student Visa for Canada."

### B. Clients (`/clients`)
*   **Key Fields**: Passport Number, Marital Status, Family Members.
*   **Common Actions**: Onboard Client (Draft Agreement), Update Passport Info.
*   **AI Use Case**: "Generate agreement for Client #102."

### C. Cases (`/cases`)
*   **Key Fields**: Case ID, Visa Type, Priority, Current Milestone.
*   **Common Actions**: Check Status, Update Milestone, Flag Overdue.
*   **AI Use Case**: "Status of Case CASE-2024-001?" -> Returns Milestone Progress Card.

### D. Appointments (`/appointments`)
*   **Key Fields**: Date, Time, Consultant, Client, Type (Online/In-person).
*   **Common Actions**: Book Appointment, Reschedule.
*   **AI Use Case**: "Book a consultation for tomorrow at 2 PM."

---

## 2. Dummy Data (Mock Database)

The `aiService` will use this mock data to simulate responses.

### 2.1 Manufacturers / Entities

```json
{
  "leads": [
    { "id": "L001", "name": "Alice Smith", "visa": "Student", "country": "Canada", "status": "New" },
    { "id": "L002", "name": "Bob Jones", "visa": "Skilled", "country": "Australia", "status": "Contacted" }
  ],
  "cases": [
    { 
      "id": "C101", 
      "client": "John Doe", 
      "type": "Partner Visa (Subclass 820)", 
      "status": "In Progress", 
      "milestone": "Medical Exam", 
      "progress": 45,
      "last_update": "Medical check requested on 12th Jan"
    },
    { 
      "id": "C102", 
      "client": "Jane Doe", 
      "type": "Student Visa", 
      "status": "Submitted", 
      "milestone": "Awaiting Decision", 
      "progress": 90,
      "last_update": "Additional docs submitted"
    }
  ],
  "appointments": [
    { "id": "A501", "time": "10:00 AM", "client": "Alice Smith", "type": "Initial Consultation" },
    { "id": "A502", "time": "02:00 PM", "client": "Bob Jones", "type": "Document Signing" }
  ]
}
```

---

## 3. UI Chat Prompt Form Design

To support complex data entry (like "Create Lead") inside the chat without overwhelming the text input, we will implement **Embedded Form Widgets**.

### 3.1 Form Schema Structure containing Radio Box
The AI response will include a `type: "form"` with a schema definition.

**Example Schema (Create Lead):**

```typescript
interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "date" | "select" | "radio";
  options?: string[]; // For select/radio
  required?: boolean;
}

interface FormWidgetData {
  title: string;
  submitLabel: string;
  fields: FormField[];
}
```

### 3.2 Feature: Radio Box inside Chat Prompt
Sometimes the computer needs a quick decision.
**Use Case**: Selecting Visa Priority or Gender.

**Mock Response for "Select Gender":**
```json
{
  "type": "form",
  "data": {
    "title": "Quick Selection",
    "fields": [
      {
        "name": "gender",
        "label": "Select Gender",
        "type": "radio",
        "options": ["Male", "Female", "Other"],
        "required": true
      }
    ]
  }
}
```

---

## 4. Implementation Plan for Chat Forms

### Step 1: Update `aiSlice` & `Message` Type
Add `form` to the `type` union in `Message`.

### Step 2: Create `FormWidget.tsx`
*   Uses `react-hook-form` and `zod` (optional) to render fields based on the JSON schema.
*   Renders standard inputs and **Radio Groups**.
*   On Submit -> Dispatches a user message with the form data formatted as string or a hidden data payload.

### Step 3: Update `ChatMessage.tsx`
*   Import and render `<FormWidget />` if `msg.type === 'form'`.

### Step 4: AI Service Logic
*   Update `aiService.ts` to return these form structures when intents like "add lead" are detected.

---
**Status**: Ready for Implementation
