# Chat Form Schemas - Complete Reference

## 📋 **All Form Structures for AI Chat Integration**

This document contains the exact form structures from all create pages, ready to be used in the AI chat wizard system.

---

## 1. **Create Lead Form**
**Route**: `/dashboard/migration/leads/create`  
**Component**: `CreateLead.tsx`

### Form Fields:
```typescript
{
  // Personal Information
  firstName: {
    type: "text",
    label: "First Name",
    required: true,
    placeholder: "Enter first name"
  },
  lastName: {
    type: "text",
    label: "Last Name",
    required: true,
    placeholder: "Enter last name"
  },
  email: {
    type: "email",
    label: "Email",
    required: true,
    placeholder: "email@example.com"
  },
  phone: {
    type: "text",
    label: "Phone",
    required: true,
    placeholder: "+880 1XXX-XXXXXX"
  },
  
  // Visa Information
  visaType: {
    type: "select",
    label: "Visa Type",
    required: true,
    options: [
      { value: "student", label: "Student Visa" },
      { value: "tourist", label: "Tourist Visa" },
      { value: "work", label: "Work Visa" },
      { value: "skilled", label: "Skilled Migration" },
      { value: "partner", label: "Partner Visa" },
      { value: "business", label: "Business Visa" }
    ]
  },
  destination: {
    type: "select",
    label: "Destination Country",
    required: true,
    options: [
      { value: "australia", label: "Australia" },
      { value: "canada", label: "Canada" },
      { value: "usa", label: "United States" },
      { value: "uk", label: "United Kingdom" },
      { value: "germany", label: "Germany" },
      { value: "newzealand", label: "New Zealand" }
    ]
  },
  
  // Lead Source
  source: {
    type: "select",
    label: "Source",
    required: true,
    options: [
      { value: "website", label: "Website" },
      { value: "facebook", label: "Facebook Ads" },
      { value: "google", label: "Google Ads" },
      { value: "referral", label: "Referral" },
      { value: "walkin", label: "Walk-in" },
      { value: "email", label: "Email Campaign" },
      { value: "other", label: "Other" }
    ]
  },
  notes: {
    type: "textarea",
    label: "Additional Notes",
    required: false,
    placeholder: "Any additional information about this lead..."
  }
}
```

### Chat Form Wizard (3 Steps):
```typescript
// Step 1: Visa Interest
{
  formId: "lead_create",
  stepId: "visa_select",
  title: "Select Visa Interest",
  fields: [
    { name: "visaType", label: "Visa Type", type: "radio", 
      options: ["Student Visa", "Work Visa", "Skilled Migration", "Partner Visa", "Tourist Visa", "Business Visa"],
      required: true }
  ]
}

// Step 2: Destination
{
  formId: "lead_create",
  stepId: "destination_select",
  title: "Select Destination Country",
  fields: [
    { name: "destination", label: "Destination", type: "radio",
      options: ["Australia", "Canada", "USA", "UK", "Germany", "New Zealand"],
      required: true }
  ]
}

// Step 3: Contact Details
{
  formId: "lead_create",
  stepId: "contact_details",
  title: "Enter Contact Information",
  fields: [
    { name: "firstName", label: "First Name", type: "text", required: true },
    { name: "lastName", label: "Last Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "text", required: true },
    { name: "source", label: "How did you hear about us?", type: "radio",
      options: ["Website", "Facebook", "Google", "Referral", "Walk-in", "Other"],
      required: true }
  ]
}
```

---

## 2. **Create Client Form**
**Route**: `/dashboard/migration/clients/create`  
**Component**: `CreateClient.tsx`

### Form Fields:
```typescript
{
  // Personal Information
  firstName: { type: "text", label: "First Name", required: true },
  lastName: { type: "text", label: "Last Name", required: true },
  email: { type: "email", label: "Email", required: true },
  phone: { type: "text", label: "Phone", required: true },
  dateOfBirth: { type: "date", label: "Date of Birth", required: true },
  gender: {
    type: "select",
    label: "Gender",
    required: true,
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" }
    ]
  },
  nationality: { type: "text", label: "Nationality", required: true, placeholder: "e.g., Bangladesh" },
  maritalStatus: {
    type: "select",
    label: "Marital Status",
    required: false,
    options: [
      { value: "single", label: "Single" },
      { value: "married", label: "Married" },
      { value: "divorced", label: "Divorced" },
      { value: "widowed", label: "Widowed" }
    ]
  },
  
  // Passport Information
  passportNumber: { type: "text", label: "Passport Number", required: true, placeholder: "e.g., A12345678" },
  passportIssueDate: { type: "date", label: "Issue Date", required: false },
  passportExpiryDate: { type: "date", label: "Expiry Date", required: true },
  
  // Address
  currentAddress: { type: "text", label: "Street Address", required: false },
  city: { type: "text", label: "City", required: false },
  postalCode: { type: "text", label: "Postal Code", required: false },
  country: { type: "text", label: "Country", required: false },
  
  // Visa Information
  visaType: {
    type: "select",
    label: "Visa Type",
    required: true,
    options: [
      { value: "student", label: "Student Visa" },
      { value: "tourist", label: "Tourist Visa" },
      { value: "work", label: "Work Visa" },
      { value: "skilled", label: "Skilled Migration" },
      { value: "partner", label: "Partner Visa" },
      { value: "business", label: "Business Visa" }
    ]
  },
  destination: {
    type: "select",
    label: "Destination Country",
    required: true,
    options: [
      { value: "australia", label: "Australia" },
      { value: "canada", label: "Canada" },
      { value: "usa", label: "United States" },
      { value: "uk", label: "United Kingdom" },
      { value: "germany", label: "Germany" },
      { value: "newzealand", label: "New Zealand" }
    ]
  },
  notes: { type: "textarea", label: "Additional Notes", required: false }
}
```

### Chat Form Wizard (4 Steps):
```typescript
// Step 1: Personal Info
{
  formId: "client_create",
  stepId: "personal_info",
  title: "Personal Information",
  fields: [
    { name: "firstName", label: "First Name", type: "text", required: true },
    { name: "lastName", label: "Last Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "text", required: true },
    { name: "dateOfBirth", label: "Date of Birth", type: "date", required: true },
    { name: "gender", label: "Gender", type: "radio", options: ["Male", "Female", "Other"], required: true },
    { name: "nationality", label: "Nationality", type: "text", required: true }
  ]
}

// Step 2: Passport Info
{
  formId: "client_create",
  stepId: "passport_info",
  title: "Passport Information",
  fields: [
    { name: "passportNumber", label: "Passport Number", type: "text", required: true },
    { name: "passportExpiryDate", label: "Expiry Date", type: "date", required: true }
  ]
}

// Step 3: Visa Preference
{
  formId: "client_create",
  stepId: "visa_preference",
  title: "Visa Preference",
  fields: [
    { name: "visaType", label: "Visa Type", type: "radio",
      options: ["Student Visa", "Work Visa", "Skilled Migration", "Partner Visa", "Tourist Visa"],
      required: true },
    { name: "destination", label: "Destination", type: "radio",
      options: ["Australia", "Canada", "USA", "UK", "New Zealand"],
      required: true }
  ]
}

// Step 4: Additional Info
{
  formId: "client_create",
  stepId: "additional_info",
  title: "Additional Information",
  fields: [
    { name: "maritalStatus", label: "Marital Status", type: "radio",
      options: ["Single", "Married", "Divorced", "Widowed"], required: false },
    { name: "notes", label: "Notes", type: "textarea", required: false }
  ]
}
```

---

## 3. **Create Case Form**
**Route**: `/dashboard/migration/cases/create`  
**Component**: `CreateCase.tsx`

### Form Fields:
```typescript
{
  // Client Selection
  clientId: {
    type: "select",
    label: "Select Client",
    required: true,
    options: [] // Dynamic from database
  },
  
  // Case Details
  visaType: {
    type: "select",
    label: "Visa Type",
    required: true,
    options: [
      { value: "student", label: "Student Visa (500)" },
      { value: "skilled", label: "Skilled Migration (189/190)" },
      { value: "partner", label: "Partner Visa (820/801)" },
      { value: "visitor", label: "Visitor Visa (600)" }
    ]
  },
  destination: {
    type: "select",
    label: "Destination Country",
    required: true,
    options: [
      { value: "au", label: "Australia" },
      { value: "ca", label: "Canada" },
      { value: "uk", label: "United Kingdom" },
      { value: "us", label: "USA" }
    ]
  },
  priority: {
    type: "select",
    label: "Case Priority",
    required: true,
    options: [
      { value: "high", label: "High Priority" },
      { value: "medium", label: "Medium Priority" },
      { value: "low", label: "Low Priority" }
    ]
  },
  notes: {
    type: "textarea",
    label: "Description / Notes",
    required: false,
    placeholder: "Enter initial case notes..."
  },
  
  // Assignment
  assignedTo: {
    type: "select",
    label: "Assign To Agent",
    required: false,
    options: [] // Dynamic from staff
  },
  dueDate: {
    type: "date",
    label: "Due Date",
    required: false
  }
}
```

### Chat Form Wizard (2 Steps):
```typescript
// Step 1: Visa Type & Destination
{
  formId: "case_create",
  stepId: "visa_destination",
  title: "Case Details",
  fields: [
    { name: "visaType", label: "Visa Type", type: "radio",
      options: ["Student Visa (500)", "Skilled Migration (189)", "Partner Visa (820)", "Visitor Visa (600)"],
      required: true },
    { name: "destination", label: "Destination", type: "radio",
      options: ["Australia", "Canada", "UK", "USA"],
      required: true }
  ]
}

// Step 2: Priority & Assignment
{
  formId: "case_create",
  stepId: "priority_assignment",
  title: "Priority & Assignment",
  fields: [
    { name: "priority", label: "Priority", type: "radio",
      options: ["High", "Medium", "Low"], required: true },
    { name: "notes", label: "Initial Notes", type: "textarea", required: false }
  ]
}
```

---

## 4. **Create Task Form**
**Route**: `/dashboard/migration/tasks/create`  
**Component**: `CreateTask.tsx`

### Form Fields:
```typescript
{
  // Task Information
  title: {
    type: "text",
    label: "Task Title",
    required: true,
    placeholder: "e.g. Verify Financial Documents for Ahmed"
  },
  relatedClient: {
    type: "select",
    label: "Related Client",
    required: false,
    options: [] // Dynamic
  },
  description: {
    type: "textarea",
    label: "Description",
    required: false,
    placeholder: "Enter task details..."
  },
  priority: {
    type: "select",
    label: "Priority",
    required: true,
    options: [
      { value: "high", label: "High" },
      { value: "medium", label: "Medium" },
      { value: "low", label: "Low" }
    ]
  },
  type: {
    type: "select",
    label: "Type",
    required: true,
    options: [
      { value: "doc", label: "Document Verification" },
      { value: "call", label: "Client Call" },
      { value: "email", label: "Email Follow-up" },
      { value: "admin", label: "Administrative" }
    ]
  },
  
  // Assignment
  assignedTo: {
    type: "select",
    label: "Assign To",
    required: true,
    options: [] // Dynamic
  },
  dueDate: {
    type: "date",
    label: "Due Date",
    required: true
  }
}
```

### Chat Form Wizard (2 Steps):
```typescript
// Step 1: Task Details
{
  formId: "task_create",
  stepId: "task_details",
  title: "Task Details",
  fields: [
    { name: "title", label: "Task Title", type: "text", required: true },
    { name: "type", label: "Task Type", type: "radio",
      options: ["Document Verification", "Client Call", "Email Follow-up", "Administrative"],
      required: true },
    { name: "priority", label: "Priority", type: "radio",
      options: ["High", "Medium", "Low"], required: true }
  ]
}

// Step 2: Assignment & Due Date
{
  formId: "task_create",
  stepId: "assignment",
  title: "Assignment",
  fields: [
    { name: "dueDate", label: "Due Date", type: "date", required: true },
    { name: "description", label: "Description", type: "textarea", required: false }
  ]
}
```

---

## 5. **Create Appointment Form**
**Route**: `/dashboard/migration/appointments/create`  
**Component**: `CreateAppointment.tsx`

### Form Fields:
```typescript
{
  // Client & Service
  clientId: {
    type: "select",
    label: "Select Client",
    required: true,
    options: [] // Dynamic
  },
  serviceType: {
    type: "select",
    label: "Service Type",
    required: true,
    options: [
      { value: "consultation", label: "Initial Consultation" },
      { value: "doc_review", label: "Document Review" },
      { value: "visa_lodge", label: "Visa Lodgement" },
      { value: "other", label: "Other" }
    ]
  },
  meetingMode: {
    type: "select",
    label: "Meeting Mode",
    required: true,
    options: [
      { value: "in_person", label: "In Person" },
      { value: "video", label: "Video Call (Zoom)" },
      { value: "phone", label: "Phone Call" }
    ]
  },
  notes: {
    type: "textarea",
    label: "Notes / Agenda",
    required: false,
    placeholder: "Briefly describe the purpose of the meeting..."
  },
  
  // Date & Time
  date: {
    type: "date",
    label: "Date",
    required: true
  },
  timeSlot: {
    type: "select",
    label: "Time Slot",
    required: true,
    options: [
      { value: "0900", label: "09:00 AM" },
      { value: "1000", label: "10:00 AM" },
      { value: "1100", label: "11:00 AM" },
      { value: "1400", label: "02:00 PM" },
      { value: "1500", label: "03:00 PM" }
    ]
  },
  
  // Consultant
  consultantId: {
    type: "select",
    label: "Assign To",
    required: true,
    options: [] // Dynamic
  },
  location: {
    type: "text",
    label: "Location",
    required: false,
    defaultValue: "Office Room 101"
  }
}
```

### Chat Form Wizard (2 Steps):
```typescript
// Step 1: Service & Mode
{
  formId: "appointment_create",
  stepId: "service_mode",
  title: "Appointment Type",
  fields: [
    { name: "serviceType", label: "Service Type", type: "radio",
      options: ["Initial Consultation", "Document Review", "Visa Lodgement", "Other"],
      required: true },
    { name: "meetingMode", label: "Meeting Mode", type: "radio",
      options: ["In Person", "Video Call", "Phone Call"],
      required: true }
  ]
}

// Step 2: Date & Time
{
  formId: "appointment_create",
  stepId: "date_time",
  title: "Schedule",
  fields: [
    { name: "date", label: "Date", type: "date", required: true },
    { name: "timeSlot", label: "Time", type: "radio",
      options: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"],
      required: true }
  ]
}
```

---

## 📊 **Summary Table**

| Form Type | Total Fields | Required Fields | Steps in Wizard | Complexity |
|-----------|--------------|-----------------|-----------------|------------|
| **Lead** | 8 | 7 | 3 | Medium |
| **Client** | 18 | 10 | 4 | High |
| **Case** | 7 | 4 | 2 | Low |
| **Task** | 7 | 5 | 2 | Low |
| **Appointment** | 9 | 5 | 2 | Medium |

---

## 🎯 **Usage in AI Chat**

All these schemas are ready to be used in `aiService.ts` with the `createFormResponse()` helper function. Simply reference the wizard steps above to create multi-step conversational forms!

**Example**:
```typescript
// In aiService.ts
if (input.includes("create lead")) {
  return createFormResponse(
    "lead_create",
    "visa_select",
    "Select Visa Interest",
    [
      { name: "visaType", label: "Visa Type", type: "radio",
        options: ["Student Visa", "Work Visa", "Skilled Migration"],
        required: true }
    ],
    "Next",
    "create_lead",
    0
  );
}
```

**All form structures are production-ready!** 🎉
