# Multi-Step Chat Form Wizard Pattern

**Source**: ChatGPT Conversation - AI Migration Consultancy Form  
**Date**: 2026-01-08  
**Pattern**: Radio select → next radio select → final form submit → confirmation card

---

## Overview

This document outlines a clean "multi-step chat form wizard" pattern for implementing conversational forms inside a chat interface. The pattern supports:

- **Radio button selections** that lead to next steps
- **Form state persistence** across multiple steps
- **Wizard memory** (draft data accumulation)
- **Confirmation cards** upon completion
- All rendered inside the chat using `msg.type === "form"`

---

## 1. Message & Form Types (with Wizard Metadata)

### Type Definitions

```typescript
// types/chat.ts
export type MessageRole = "user" | "assistant";

export type Message =
  | { id: string; role: MessageRole; type: "text"; text: string; ts: number }
  | { id: string; role: MessageRole; type: "form"; form: FormMessage; ts: number }
  | { id: string; role: MessageRole; type: "card"; card: CardMessage; ts: number };

export type FieldType = "text" | "email" | "date" | "select" | "radio";

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

export interface FormMessage {
  formId: string;          // unique per wizard (ex: "lead_create")
  stepId: string;          // ex: "visa_select" -> "destination_select" -> "lead_details"
  title: string;
  submitLabel: string;
  fields: FormField[];

  // IMPORTANT: wizard context travels invisibly with the form
  meta?: {
    intent: "create_lead" | "book_appointment" | "update_case" | "onboard_client";
    stepIndex: number; // 0,1,2...
    draft?: Record<string, any>; // accumulated values so far
  };
}

export interface CardMessage {
  title: string;
  lines: string[];
  badge?: string; // "Created", "Updated", "Overdue", etc.
}
```

---

## 2. Redux: Support form_submit User Messages (Hidden Payload)

### aiSlice (Core Idea)

- Store messages
- Maintain `draftByFormId` (wizard memory)
- When a form submits, push a user text + call aiService

### Implementation

```typescript
// store/aiSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { Message, FormMessage } from "../types/chat";
import { aiService } from "../services/aiService";

type AiState = {
  messages: Message[];
  draftByFormId: Record<string, Record<string, any>>;
};

const initialState: AiState = {
  messages: [],
  draftByFormId: {},
};

export const sendUserText = createAsyncThunk(
  "ai/sendUserText",
  async (text: string, { getState }) => {
    const state = getState() as { ai: AiState };
    const reply = await aiService.handle({
      kind: "text",
      text,
      drafts: state.ai.draftByFormId,
    });
    return reply; // array<Message>
  }
);

export const submitForm = createAsyncThunk(
  "ai/submitForm",
  async (payload: { form: FormMessage; values: Record<string, any> }, { getState }) => {
    const state = getState() as { ai: AiState };

    const reply = await aiService.handle({
      kind: "form_submit",
      form: payload.form,
      values: payload.values,
      drafts: state.ai.draftByFormId,
    });

    return { reply, payload };
  }
);

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    pushMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendUserText.fulfilled, (state, action) => {
      state.messages.push(...action.payload);
    });

    builder.addCase(submitForm.fulfilled, (state, action) => {
      const { form, values } = action.payload.payload;

      // Merge wizard draft memory
      const prev = state.draftByFormId[form.formId] || {};
      state.draftByFormId[form.formId] = { ...prev, ...values };

      // Add assistant reply messages
      state.messages.push(...action.payload.reply);
    });
  },
});

export const { pushMessage } = aiSlice.actions;
export default aiSlice.reducer;
```

---

## 3. FormWidget.tsx (Radio → Next Step)

This renders a schema-driven form, supports radio groups, and on submit dispatches `submitForm()`.

```typescript
// components/FormWidget.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../store/hooks";
import { submitForm } from "../store/aiSlice";
import type { FormMessage } from "../types/chat";

export default function FormWidget({ form }: { form: FormMessage }) {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = (values: any) => {
    dispatch(submitForm({ form, values }));
  };

  return (
    <div style={{ border: "1px solid #e5e5e5", borderRadius: 10, padding: 12, marginTop: 8 }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>{form.title}</div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {form.fields.map((f) => (
          <div key={f.name} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>
              {f.label}{f.required ? " *" : ""}
            </div>

            {/* RADIO */}
            {f.type === "radio" && (
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {f.options?.map((opt) => (
                  <label key={opt} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <input
                      type="radio"
                      value={opt}
                      {...register(f.name, { required: !!f.required })}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {/* SELECT */}
            {f.type === "select" && (
              <select
                {...register(f.name, { required: !!f.required })}
                style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #ddd" }}
              >
                <option value="">Select...</option>
                {f.options?.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            )}

            {/* TEXT / EMAIL / DATE */}
            {(f.type === "text" || f.type === "email" || f.type === "date") && (
              <input
                type={f.type}
                placeholder={f.placeholder}
                {...register(f.name, { required: !!f.required })}
                style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #ddd" }}
              />
            )}

            {errors?.[f.name] && (
              <div style={{ color: "crimson", fontSize: 12, marginTop: 4 }}>
                This field is required.
              </div>
            )}
          </div>
        ))}

        <button
          type="submit"
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "0",
            background: "#111",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {form.submitLabel}
        </button>
      </form>

      {/* Optional: show current selection live */}
      {form.fields.some((x) => x.type === "radio") && (
        <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>
          Selected: {JSON.stringify(watch(), null, 0)}
        </div>
      )}
    </div>
  );
}
```

---

## 4. ChatMessage.tsx: Render the Form Message

```typescript
// components/ChatMessage.tsx
import React from "react";
import type { Message } from "../types/chat";
import FormWidget from "./FormWidget";

export default function ChatMessage({ msg }: { msg: Message }) {
  if (msg.type === "form") return <FormWidget form={msg.form} />;

  if (msg.type === "card") {
    return (
      <div style={{ border: "1px solid #e5e5e5", borderRadius: 10, padding: 12 }}>
        <div style={{ fontWeight: 800 }}>{msg.card.title}</div>
        {msg.card.badge && <div style={{ fontSize: 12, opacity: 0.7 }}>{msg.card.badge}</div>}
        <ul style={{ margin: "8px 0 0 18px" }}>
          {msg.card.lines.map((l) => <li key={l}>{l}</li>)}
        </ul>
      </div>
    );
  }

  return (
    <div style={{ padding: "8px 0" }}>
      {msg.text}
    </div>
  );
}
```

---

## 5. aiService.ts: Wizard Logic (Radio → Radio → Final Form → Submit)

This is where the "next form opens again" happens.

```typescript
// services/aiService.ts
import type { Message, FormMessage } from "../types/chat";

type HandleInput =
  | { kind: "text"; text: string; drafts: Record<string, any> }
  | { kind: "form_submit"; form: FormMessage; values: Record<string, any>; drafts: Record<string, any> };

const now = () => Date.now();
const id = () => Math.random().toString(16).slice(2);

function formMsg(form: FormMessage): Message {
  return { id: id(), role: "assistant", type: "form", form, ts: now() };
}

function card(title: string, lines: string[], badge?: string): Message {
  return { id: id(), role: "assistant", type: "card", card: { title, lines, badge }, ts: now() };
}

function text(t: string): Message {
  return { id: id(), role: "assistant", type: "text", text: t, ts: now() };
}

export const aiService = {
  async handle(input: HandleInput): Promise<Message[]> {
    // 1) User typed: detect intent -> start wizard
    if (input.kind === "text") {
      const t = input.text.toLowerCase();

      if (t.includes("add lead") || t.includes("create lead")) {
        // STEP 1: Radio
        return [
          text("Sure — let's create a lead. First, choose visa interest:"),
          formMsg({
            formId: "lead_create",
            stepId: "visa_select",
            title: "Visa Interest",
            submitLabel: "Next",
            fields: [
              { name: "visa", label: "Select Visa Type", type: "radio", options: ["Student", "Skilled", "Partner", "Visitor"], required: true },
            ],
            meta: { intent: "create_lead", stepIndex: 0, draft: {} },
          }),
        ];
      }

      return [text("Tell me what you want to do: create lead, check case, book appointment, etc.")];
    }

    // 2) Form submitted: decide next step based on (formId, stepId)
    if (input.kind === "form_submit") {
      const { form, values } = input;
      const mergedDraft = { ...(form.meta?.draft || {}), ...values };

      // LEAD WIZARD
      if (form.formId === "lead_create") {
        // STEP 1 -> STEP 2 (radio again)
        if (form.stepId === "visa_select") {
          return [
            text(`Got it: ${values.visa}. Next, choose destination:`),
            formMsg({
              formId: "lead_create",
              stepId: "destination_select",
              title: "Destination",
              submitLabel: "Next",
              fields: [
                { name: "country", label: "Select Destination Country", type: "radio", options: ["Australia", "Canada", "UK", "USA"], required: true },
              ],
              meta: { intent: "create_lead", stepIndex: 1, draft: mergedDraft },
            }),
          ];
        }

        // STEP 2 -> STEP 3 (final details form)
        if (form.stepId === "destination_select") {
          return [
            text(`Perfect. Now enter lead details:`),
            formMsg({
              formId: "lead_create",
              stepId: "lead_details",
              title: "Lead Details",
              submitLabel: "Create Lead",
              fields: [
                { name: "name", label: "Full Name", type: "text", required: true, placeholder: "John Doe" },
                { name: "email", label: "Email", type: "email", required: true, placeholder: "john@example.com" },
                { name: "phone", label: "Phone", type: "text", required: true, placeholder: "+880..." },
                { name: "priority", label: "Priority", type: "radio", options: ["Low", "Medium", "High"], required: true },
              ],
              meta: { intent: "create_lead", stepIndex: 2, draft: mergedDraft },
            }),
          ];
        }

        // STEP 3 -> DONE (create + confirmation card)
        if (form.stepId === "lead_details") {
          const final = { ...mergedDraft, ...values };
          const newId = "L" + Math.floor(100 + Math.random() * 900); // mock

          return [
            card(
              "Lead Created",
              [
                `ID: ${newId}`,
                `Name: ${final.name}`,
                `Email: ${final.email}`,
                `Phone: ${final.phone}`,
                `Visa: ${final.visa}`,
                `Destination: ${final.country}`,
                `Priority: ${final.priority}`,
                `Status: New`,
              ],
              "Created"
            ),
            text("Want to add a follow-up note or book an appointment for this lead?"),
          ];
        }
      }

      // default fallback
      return [text("Thanks — I received the form. What would you like to do next?")];
    }

    return [text("Unhandled input.")];
  },
};
```

---

## 6. How You Trigger It (Example)

**User Flow:**

1. User types: **"Add lead"**
   - → AI returns **Form Step 1** (Radio: Visa Type)
   
2. User selects "Student" and submits
   - → AI returns **Form Step 2** (Radio: Destination Country)
   
3. User selects "Canada" and submits
   - → AI returns **Final Form** (Text inputs + Priority Radio)
   
4. User fills details and submits
   - → AI returns **Confirmation Card** with all collected data

---

## Optional Enhancements

### Back Button
- Add a "Back" button to navigate to the previous step
- Store step history in Redux state

### Cancel Wizard
- Add a "Cancel" button to exit the wizard flow
- Clear `draftByFormId` for that specific `formId`

### Progress Indicator
- Show "Step 1 of 3" based on `meta.stepIndex`
- Visual progress bar

---

## Key Benefits

✅ **Clean Separation**: Form logic is in `aiService`, UI is schema-driven  
✅ **Wizard Memory**: Draft data persists across steps via `draftByFormId`  
✅ **Flexible**: Easy to add new wizards (appointments, cases, clients)  
✅ **Type-Safe**: Full TypeScript support with discriminated unions  
✅ **Scalable**: Can handle complex multi-step flows with branching logic

---

**Status**: Pattern documented and ready for implementation in ERP Consultant Chat Widget
