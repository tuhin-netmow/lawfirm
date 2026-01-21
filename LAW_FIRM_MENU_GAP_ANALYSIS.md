# Law Firm ERP - Menu Gap Analysis & Implementation Plan

## 1. Current State (sidebarItemLInk.tsx)

The following modules are currently **ACTIVE**:
*   **Dashboard**: Generic dashboard.
*   **Staffs**: Staff management, Departments, Attendance, Leaves.
*   **Users**: System user management.
*   **Roles & Permissions**: RBAC management.
*   **Settings**: User profile and Account settings.
*   **Chat Widget**: AI Chat configuration.

The following modules are **COMMENTED OUT (Legacy Car Workshop)**:
*   Products, Customers (Car-focused), Suppliers, Raw Materials, Production, Sales & Orders, Bookings, Workshop Jobs, Mechanic Portal, Inventory, Finance (Car-focused).

## 2. Target State (Law Firm ERP Plan)

Base on `CHATGPT_WIZARD_Law_FIRM.md`, we need the following menu structure:

### A) Dashboard
*   Overview (KPIs for Law Firm)
*   My Tasks
*   Today’s Appointments
*   Upcoming Court Dates

### B) Clients
*   Client List (Individuals / Organisations)
*   Add Client
*   Client Profile

### C) Matters / Cases
*   Matter List
*   Create Matter
*   Matter Details (Parties, Timeline, Tasks, Docs, Billing)

### D) Documents
*   Document Library
*   Upload Document
*   Templates
*   Document Requests

### E) Calendar & Reminders
*   Calendar (Appointments/Court)
*   Court Dates
*   Notifications

### F) Tasks & Workflow
*   Task Board (Kanban)
*   Task List
*   Approvals

### G) Time & Billing
*   Time Entries (Timesheet)
*   Disbursements
*   Invoices
*   Payments
*   Trust / Retainer

### H) Communications
*   Email Log
*   Client Messages
*   Call Notes

### I) Reports
*   Matter Status, Workload, Billing, Productivity.

### J) Settings (Enhanced)
*   Practice Areas
*   Court / Location Directory
*   Document Categories
*   Invoice Settings

## 3. Gap Analysis & Implementation Actions

We have a significant gap between the current generic admin shell and the required Law Firm features.

### Priority 1: Core Law Modules
These are completely missing and need to be added to `sidebarItemLink.tsx`.

1.  **Clients Module**
    *   *Action*: Create new menu item `Clients`.
    *   *Submenus*: List, Add Client.
    *   *Note*: Do not reuse the "Car Workshop Customers" module as the fields (Vehicle, etc.) differ.

2.  **Matters / Cases Module**
    *   *Action*: Create new menu item `Matters`.
    *   *Submenus*: Matter List, Create Matter.

3.  **Documents Module**
    *   *Action*: Create new menu item `Documents`.
    *   *Submenus*: Library, Upload, Templates.

### Priority 2: Legal Operations
4.  **Calendar & Reminders**
    *   *Action*: Create `Calendar` menu.
    *   *Submenus*: View Calendar, Court Dates.

5.  **Tasks & Workflow**
    *   *Action*: Create `Tasks` menu.
    *   *Submenus*: Task Board, My Tasks.

### Priority 3: Financials
6.  **Time & Billing**
    *   *Action*: Create `Billing` menu (replacing legacy Finance).
    *   *Submenus*: Time Entries, Invoices, Payments, Trust Accounts.

### Priority 4: Communications & Reports
7.  **Communications**: Email & Messaging logs.
8.  **Reports**: Specialized legal reports.

## 4. Recommended Sidebar Structure (Pseudo-code)

```javascript
export const sidebarItemLink = [
  // 1. Dashboard
  { title: "Dashboard", url: "/dashboard", ... },

  // 2. Core Legal
  {
    title: "Clients",
    items: [
      { title: "Client List", url: "/dashboard/clients" },
      { title: "Add Client", url: "/dashboard/clients/create" }
    ]
  },
  {
    title: "Matters",
    items: [
      { title: "All Matters", url: "/dashboard/matters" },
      { title: "Create Matter", url: "/dashboard/matters/create" },
      { title: "My Matters", url: "/dashboard/matters/mine" }
    ]
  },
  {
    title: "Documents",
    items: [
      { title: "Library", url: "/dashboard/documents" },
      { title: "Templates", url: "/dashboard/documents/templates" }
    ]
  },

  // 3. Operations
  {
    title: "Tasks",
    items: [
      { title: "Task Board", url: "/dashboard/tasks/board" },
      { title: "My Tasks", url: "/dashboard/tasks/mine" }
    ]
  },
  {
    title: "Calendar",
    items: [
      { title: "Calendar", url: "/dashboard/calendar" },
      { title: "Court Dates", url: "/dashboard/calendar/court-dates" }
    ]
  },

  // 4. Finance
  {
    title: "Billing & Trust",
    items: [
      { title: "Time Entries", url: "/dashboard/billing/time" },
      { title: "Invoices", url: "/dashboard/billing/invoices" },
      { title: "Payments", url: "/dashboard/billing/payments" }
    ]
  },

  // 5. Staff & Admin (Existing + Extensions)
  { title: "Staffs", ... }, // Existing
  { title: "Users", ... },  // Existing
  { title: "Roles", ... },  // Existing
  {
    title: "Law Firm Settings", // Extend existing Settings
    items: [
       // ... existing profile ...
       { title: "Practice Areas", url: "/dashboard/settings/practices" },
       { title: "Court Directory", url: "/dashboard/settings/courts" }
    ]
  }
];
```
