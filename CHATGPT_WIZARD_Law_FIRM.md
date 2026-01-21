# ChatGPT Wizard - Law Firm ERP Plan

## User Prompt
For legal firms build a secure web-based system tailored specifically for your law practice, such as:
• Client & case management
• Case status tracking & timelines
• Document management (secure files, agreements, evidence)
• Appointment & court date reminders
• Billing, invoices & payment tracking
• Task management for lawyers & staff
• Role-based access & data security
• Reports & dashboard

Can youmake complete plan menus and sub menus I need plan and page details with Entity relationship for each page

# ChatGPT Response

Below is a complete secure web-based Law Firm Management System plan with menus + submenus, page-by-page details (fields + CRUD), and an Entity Relationship (ER) map tied to each page.

## 1) Roles & Security Model

### User Roles (RBAC)
*   **Super Admin** (system owner / IT)
*   **Firm Admin** (managing partner / practice manager)
*   **Lawyer / Solicitor**
*   **Paralegal**
*   **Accounts / Finance**
*   **Receptionist**
*   **Client Portal User** (optional)

### Security Essentials (must-have)
*   **2FA** for staff (optional for clients)
*   **Role-based permissions** per module + per record (matter-level access)
*   **Audit log** for all sensitive actions (view, download, edit, delete)
*   **Encryption at rest** for documents + secure signed URLs for downloads
*   **Session timeout**, IP/device tracking (optional)
*   **Matter “Ethical Wall”** (restrict specific users from a matter)

## 2) Main Navigation: Menus & Submenus

### A) Dashboard
*   Overview
*   My Tasks
*   Today’s Appointments
*   Upcoming Court Dates
*   Recent Documents
*   Billing Snapshot (role-based)

### B) Clients
*   Client List (Individuals / Organisations)
*   Add Client
*   Client Profile (tabs)
    *   Overview
    *   Contacts
    *   Matters
    *   Documents
    *   Invoices & Payments
    *   Notes
    *   Activity Log

### C) Matters / Cases
*   Matter List (filters: open/closed, lawyer, practice area, status)
*   Create Matter
*   Matter Details (tabs)
    *   Overview
    *   Parties
    *   Timeline / Status
    *   Tasks
    *   Documents
    *   Appointments & Court Dates
    *   Billing (Time entries, invoices)
    *   Notes
    *   Audit / Activity

### D) Documents
*   Document Library (global)
*   Upload Document
*   Templates (agreements, letters)
*   E-sign (optional)
*   Document Requests (client upload requests)

### E) Calendar & Reminders
*   Calendar (appointments)
*   Court Dates
*   Reminder Rules (email/SMS/in-app)
*   Notification Log

### F) Tasks & Workflow
*   Task Board (Kanban)
*   Task List
*   Task Templates (checklists per matter type)
*   Approvals (optional)

### G) Time & Billing
*   Time Entries (timesheet)
*   Rate Cards (lawyer rates)
*   Disbursements
*   Invoices
*   Payments
*   Trust / Retainer (optional)
*   Expense Claims (optional)

### H) Communications
*   Email Log (sent/received tracking)
*   SMS Log (optional)
*   Client Messages (portal chat style)
*   Call Notes

### I) Reports
*   Matter Status Report
*   Workload Report
*   Billing & Collections
*   Trust/Retainer (optional)
*   Productivity (time vs billed)
*   Document Access Report (security)

### J) Administration / Settings
*   Firm Profile
*   Users & Roles
*   Permission Matrix
*   Practice Areas
*   Court / Location Directory
*   Document Categories & Tags
*   Invoice Settings (tax, numbering)
*   Integrations (Email/SMS, Storage)
*   Audit Logs
*   Data Export / Backup (admin only)

### K) Client Portal (optional module)
*   My Matters
*   Upload Documents
*   Messages
*   Appointments
*   Invoices & Payments
*   Signed Documents

## 3) Page-by-Page Details (with Entities + CRUD)

### 3.1 Dashboard (Read-focused)
*   **Shows**:
    *   KPIs: Open matters, overdue tasks, unpaid invoices, upcoming court dates
    *   My tasks & appointments
*   **Entities used**: matters, tasks, events, invoices, payments
*   **CRUD**: Mostly Read; quick actions create: task/event/time entry

### 3.2 Clients Module

#### A) Client List
*   **Fields shown**: Client Name, Type, Email, Phone, Status, Primary Lawyer, Open Matters count
*   **CRUD**: Create, Read, Update, (Soft) Delete
*   **Entities**: clients

#### B) Add/Edit Client
*   **Client fields**:
    *   Client Type: Individual / Organisation
    *   Full Name / Company Name
    *   Email, Phone
    *   Address
    *   ID/ACN/ABN (optional)
    *   Notes, Tags
    *   Status (active/inactive)
*   **Entities**: clients

#### C) Client Profile (tabs)
*   **Contacts tab** → client contact persons
    *   Entity: client_contacts (CRUD)
*   **Matters tab** → linked matters
    *   Entity: matters (Read, Create from here)
*   **Documents tab** → documents linked to client
    *   Entity: documents + document_links (Read, Upload, Delete)
*   **Invoices tab**
    *   Entities: invoices, payments (Read, create payment if role allows)

### 3.3 Matters / Cases Module

#### A) Matter List
*   **Fields shown**: Matter No, Client, Practice Area, Assigned Lawyer, Status, Stage, Next Date, Updated
*   **CRUD**: Create, Read, Update, Close/Reopen, Archive
*   **Entities**: matters, clients, practice_areas, matter_assignments

#### B) Create/Edit Matter
*   **Fields**:
    *   Matter No (auto)
    *   Client (required)
    *   Practice Area
    *   Matter Title
    *   Description
    *   Status (Open/Hold/Closed)
    *   Stage (custom pipeline)
    *   Assigned team (multiple)
    *   Opposing party summary
    *   Open date, close date
    *   Confidential flag / Ethical wall flag
*   **Entities**: matters, matter_assignments, matter_parties

## 4) Entity Relationship Model (Text ERD)

### Core Entities
*   **users (1)** —— (M) **time_entries**
*   **users (1)** —— (M) **tasks**
*   **users (M)** —— (M) **matters** via **matter_assignments**
*   **clients (1)** —— (M) **matters**
*   **matters (1)** —— (M) **matter_parties**
*   **matters (1)** —— (M) **matter_status_logs**
*   **matters (1)** —— (M) **events**
*   **events (M)** —— (M) **users** via **event_attendees**

### Documents (secure)
*   **documents (1)** —— (M) **document_versions**
*   **documents (M)** —— (M) **matters/clients** via **document_links**
*   **documents (M)** —— (M) **users/roles** via **document_permissions**
*   **documents (M)** —— (M) **tags** via **document_tags**

### Billing
*   **matters (1)** —— (M) **time_entries**
*   **matters (1)** —— (M) **disbursements**
*   **clients (1)** —— (M) **invoices**
*   **invoices (1)** —— (M) **invoice_items**
*   **invoices (1)** —— (M) **payments**
*   **clients (1)** —— (M) **retainers** (optional)
*   **retainers (1)** —— (M) **retainer_transactions** (optional)

### Audit & Notifications
*   **users (1)** —— (M) **audit_logs**
*   **users (1)** —— (M) **notification_logs**
*   **events/tasks (1)** —— (M) **reminders** (linked by type + id)

## 1) Exact Database Table List (Key Fields + Indexes)

### 1.1 Core: Firm / Users / Security

**firms** (for multi-tenant; even single firm can keep it)
*   id (PK, big int)
*   name
*   address
*   phone
*   timezone
*   status (active/suspended)
*   created_at, updated_at
*   **Indexes**:
    *   UNIQUE (name) (optional)
    *   INDEX (status)

**users**
*   id (PK)
*   firm_id (FK → firms.id)
*   first_name, last_name
*   email (unique per firm)
*   phone (nullable)
*   password_hash
*   status (active/disabled)
*   last_login_at, last_login_ip
*   twofa_enabled (bool)
*   created_at, updated_at
*   **Indexes**:
    *   UNIQUE (firm_id, email)
    *   INDEX (firm_id, status)
    *   INDEX (firm_id, last_name, first_name) (search)
    *   INDEX (firm_id, last_login_at)

**roles**
*   id (PK)
*   firm_id (FK)
*   name (Super Admin, Firm Admin, Lawyer, etc.)
*   is_system (bool)
*   **Indexes**:
    *   UNIQUE (firm_id, name)
    *   INDEX (firm_id)

**permissions**
*   id (PK)
*   code (e.g., matter.view, doc.download)
*   description
*   **Indexes**:
    *   UNIQUE (code)

**role_permissions**
*   role_id (FK)
*   permission_id (FK)
*   **Indexes**:
    *   PRIMARY KEY (role_id, permission_id)
    *   INDEX (permission_id)

**user_roles**
*   user_id (FK)
*   role_id (FK)
*   **Indexes**:
    *   PRIMARY KEY (user_id, role_id)
    *   INDEX (role_id)

**sessions** (optional if you store server-side sessions)
*   id (PK)
*   user_id
*   firm_id
*   token_hash
*   ip, user_agent
*   created_at, expires_at, revoked_at
*   **Indexes**:
    *   UNIQUE (token_hash)
    *   INDEX (user_id, expires_at)
    *   INDEX (firm_id, expires_at)

**audit_logs** (security-critical)
*   id (PK)
*   firm_id
*   user_id (nullable for system)
*   action (e.g., VIEW_DOC, UPDATE_MATTER)
*   entity_type (clients/matters/documents/etc.)
*   entity_id
*   meta_json (ip, user_agent, diff summary)
*   created_at
*   **Indexes**:
    *   INDEX (firm_id, created_at)
    *   INDEX (firm_id, user_id, created_at)
    *   INDEX (firm_id, entity_type, entity_id)
    *   INDEX (firm_id, action, created_at)

### 1.2 Clients

**clients**
*   id (PK)
*   firm_id (FK)
*   type (individual/organisation)
*   display_name (search-friendly)
*   first_name, last_name (nullable)
*   company_name (nullable)
*   email, phone
*   address_line1, address_line2, city, state, postcode, country
*   identifier_no (optional: passport/ACN/ABN)
*   status (active/inactive)
*   created_by, created_at, updated_at
*   **Indexes**:
    *   INDEX (firm_id, status)
    *   INDEX (firm_id, display_name)
    *   INDEX (firm_id, email)
    *   INDEX (firm_id, phone)
    *   FULLTEXT (display_name, email, phone) (if supported; else use trigram/search engine)

**client_contacts**
*   id (PK)
*   firm_id
*   client_id (FK)
*   name
*   email, phone
*   role_title (e.g., Director, HR)
*   is_primary (bool)
*   created_at
*   **Indexes**:
    *   INDEX (client_id)
    *   INDEX (firm_id, client_id)
    *   INDEX (firm_id, email)

### 1.3 Matters / Cases

**practice_areas**
*   id (PK)
*   firm_id
*   name (Family, Commercial, etc.)
*   status
*   **Indexes**:
    *   UNIQUE (firm_id, name)
    *   INDEX (firm_id, status)

**matter_stages**
*   id (PK)
*   firm_id
*   practice_area_id (nullable)
*   name (Intake, Filed, Hearing, Settlement…)
*   sort_order
*   is_closed_stage (bool)
*   **Indexes**:
    *   INDEX (firm_id, sort_order)
    *   INDEX (firm_id, practice_area_id)

**matters**
*   id (PK)
*   firm_id
*   matter_no (unique per firm)
*   client_id (FK)
*   practice_area_id (FK)
*   title
*   description
*   status (open/on_hold/closed/archived)
*   stage_id (FK matter_stages)
*   open_date, close_date
*   confidential_level (normal/restricted/high)
*   ethical_wall_enabled (bool)
*   created_by, created_at, updated_at
*   **Indexes**:
    *   UNIQUE (firm_id, matter_no)
    *   INDEX (firm_id, status, stage_id)
    *   INDEX (firm_id, client_id)
    *   INDEX (firm_id, practice_area_id)
    *   INDEX (firm_id, updated_at)
    *   FULLTEXT (title, description) (if supported)

**matter_assignments** (team members)
*   id (PK)
*   firm_id
*   matter_id (FK)
*   user_id (FK)
*   role_on_matter (Responsible Lawyer, Assistant, Paralegal)
*   is_primary (bool)
*   added_at
*   **Indexes**:
    *   UNIQUE (matter_id, user_id)
    *   INDEX (user_id)
    *   INDEX (firm_id, matter_id)

**matter_ethics_walls** (deny list, overrides)
*   id (PK)
*   firm_id
*   matter_id
*   user_id
*   access (deny/allow) ← supports explicit allow exceptions
*   reason
*   created_by, created_at
*   **Indexes**:
    *   UNIQUE (matter_id, user_id)
    *   INDEX (firm_id, matter_id)
    *   INDEX (firm_id, user_id)

**matter_parties**
*   id (PK)
*   firm_id
*   matter_id
*   party_type (opponent/witness/expert/other)
*   name
*   email, phone
*   address
*   notes
*   **Indexes**:
    *   INDEX (matter_id, party_type)
    *   INDEX (firm_id, matter_id)

**matter_status_logs** (timeline)
*   id (PK)
*   firm_id
*   matter_id
*   stage_id (nullable)
*   status (mirrors matters.status or custom)
*   note
*   event_date
*   next_action_date (nullable)
*   created_by, created_at
*   **Indexes**:
    *   INDEX (matter_id, event_date)
    *   INDEX (firm_id, next_action_date)
    *   FULLTEXT (note) (optional)

### 1.4 Tasks

**tasks**
*   id (PK)
*   firm_id
*   matter_id (nullable)
*   client_id (nullable)
*   title
*   description
*   status (todo/in_progress/waiting/done/cancelled)
*   priority (low/med/high)
*   due_date
*   assigned_to (user_id)
*   created_by
*   created_at, updated_at, completed_at
*   **Indexes**:
    *   INDEX (firm_id, status, due_date)
    *   INDEX (firm_id, assigned_to, status)
    *   INDEX (matter_id)
    *   FULLTEXT (title, description) (optional)

**task_comments**
*   id (PK)
*   firm_id
*   task_id
*   comment
*   created_by, created_at
*   **Indexes**:
    *   INDEX (task_id, created_at)

**task_checklist_items**
*   id (PK)
*   firm_id
*   task_id
*   label
*   is_done
*   sort_order
*   **Indexes**:
    *   INDEX (task_id, sort_order)

### 1.5 Calendar / Events / Reminders

**events**
*   id (PK)
*   firm_id
*   matter_id (nullable)
*   client_id (nullable)
*   type (appointment/court/meeting)
*   title
*   location
*   start_at, end_at
*   notes
*   created_by, created_at
*   **Indexes**:
    *   INDEX (firm_id, start_at)
    *   INDEX (firm_id, type, start_at)
    *   INDEX (matter_id, start_at)
    *   INDEX (client_id, start_at)

**event_attendees**
*   event_id
*   user_id
*   **Indexes**:
    *   PRIMARY KEY (event_id, user_id)
    *   INDEX (user_id)

**reminder_rules**
*   id (PK)
*   firm_id
*   event_type
*   minutes_before (e.g., 1440 for 1 day)
*   channel (email/sms/inapp)
*   is_enabled
*   **Indexes**:
    *   INDEX (firm_id, event_type)
    *   INDEX (firm_id, is_enabled)

**reminders** (instances queued/sent)
*   id (PK)
*   firm_id
*   entity_type (event/task)
*   entity_id
*   recipient_user_id
*   channel
*   send_at
*   sent_at (nullable)
*   status (queued/sent/failed)
*   error_message (nullable)
*   **Indexes**:
    *   INDEX (firm_id, status, send_at)
    *   INDEX (recipient_user_id, send_at)
    *   INDEX (entity_type, entity_id)

**notification_logs**
*   id (PK)
*   firm_id
*   user_id
*   channel
*   title
*   message
*   created_at
*   read_at
*   **Indexes**:
    *   INDEX (user_id, read_at)
    *   INDEX (firm_id, created_at)

### 1.6 Documents (Secure + Versioning + Permissions)

**document_categories**
*   id (PK)
*   firm_id
*   name
*   sort_order
*   **Indexes**:
    *   UNIQUE (firm_id, name)
    *   INDEX (firm_id, sort_order)

**documents**
*   id (PK)
*   firm_id
*   title
*   category_id
*   uploaded_by
*   visibility (private/team/client)
*   security_level (normal/restricted/high)
*   is_locked (bool)
*   current_version_id (FK)
*   created_at
*   **Indexes**:
    *   INDEX (firm_id, category_id)
    *   INDEX (firm_id, visibility)
    *   INDEX (firm_id, uploaded_by, created_at)
    *   FULLTEXT (title) (optional)

**document_versions**
*   id (PK)
*   firm_id
*   document_id
*   version_no (1,2,3…)
*   file_name
*   mime_type
*   file_size
*   storage_provider (local/s3/spaces)
*   storage_path (not public)
*   checksum_sha256
*   created_by, created_at
*   **Indexes**:
    *   UNIQUE (document_id, version_no)
    *   INDEX (document_id, created_at)

**document_links** (attach doc to client/matter/task)
*   id (PK)
*   firm_id
*   document_id
*   entity_type (client/matter/task)
*   entity_id
*   **Indexes**:
    *   UNIQUE (document_id, entity_type, entity_id)
    *   INDEX (entity_type, entity_id)
    *   INDEX (firm_id, document_id)

**document_permissions** (fine-grained access)
*   id (PK)
*   firm_id
*   document_id
*   principal_type (user/role)
*   principal_id
*   can_view can_download can_edit can_delete
*   **Indexes**:
    *   UNIQUE (document_id, principal_type, principal_id)
    *   INDEX (principal_type, principal_id)
    *   INDEX (document_id)

**document_access_tokens** (signed download links)
*   id (PK)
*   firm_id
*   document_version_id
*   user_id
*   token_hash
*   expires_at
*   used_at (nullable)
*   **Indexes**:
    *   UNIQUE (token_hash)
    *   INDEX (user_id, expires_at)
    *   INDEX (document_version_id)

**tags + document_tags**
*   tags: id, firm_id, name
*   **Indexes**:
    *   UNIQUE (firm_id, name)
*   document_tags: document_id, tag_id
*   **Indexes**:
    *   PRIMARY KEY (document_id, tag_id)

### 1.7 Billing

**rate_cards**
*   id (PK)
*   firm_id
*   user_id (nullable; if null = default)
*   hourly_rate
*   currency
*   effective_from
*   **Indexes**:
    *   INDEX (firm_id, user_id, effective_from)

**time_entries**
*   id (PK)
*   firm_id
*   matter_id
*   user_id
*   work_date
*   minutes
*   rate_applied
*   is_billable
*   description
*   invoice_item_id (nullable)
*   created_at
*   **Indexes**:
    *   INDEX (firm_id, user_id, work_date)
    *   INDEX (matter_id, work_date)
    *   INDEX (firm_id, is_billable)
    *   FULLTEXT (description) (optional)

**disbursements**
*   id (PK)
*   firm_id
*   matter_id
*   date
*   description
*   amount
*   is_billable
*   invoice_item_id (nullable)
*   **Indexes**:
    *   INDEX (matter_id, date)
    *   INDEX (firm_id, is_billable)

**invoices**
*   id (PK)
*   firm_id
*   invoice_no (unique per firm)
*   client_id
*   matter_id (nullable)
*   status (draft/sent/paid/overdue/void)
*   issue_date
*   due_date
*   subtotal, tax, total
*   created_by, created_at
*   **Indexes**:
    *   UNIQUE (firm_id, invoice_no)
    *   INDEX (firm_id, status, due_date)
    *   INDEX (client_id, issue_date)
    *   INDEX (matter_id)

**invoice_items**
*   id (PK)
*   firm_id
*   invoice_id
*   item_type (time/disbursement/fixed)
*   ref_id (time_entries.id or disbursements.id)
*   description
*   qty
*   unit_price
*   line_total
*   **Indexes**:
    *   INDEX (invoice_id)
    *   INDEX (firm_id, item_type, ref_id)

**payments**
*   id (PK)
*   firm_id
*   invoice_id
*   amount
*   method (bank/card/cash)
*   reference
*   paid_at
*   created_by
*   **Indexes**:
    *   INDEX (invoice_id, paid_at)
    *   INDEX (firm_id, paid_at)

**(Optional) retainers + retainer_transactions**
For trust/retainer workflows.

## 2) Screen-by-Screen UI Layout (Tabs, Sections, Buttons, Validations)

### 2.1 Login
*   **Sections**:
    *   Email
    *   Password
    *   2FA code (if enabled)
*   **Buttons**:
    *   Login
    *   Forgot password
*   **Validations**:
    *   email format, required
    *   password required
    *   lockout after X failed attempts

### 2.2 Dashboard
*   **Widgets**:
    *   KPIs (Open Matters, Overdue Tasks, Unpaid Invoices, Upcoming Court)
    *   My Tasks (list + quick complete)
    *   Today Calendar
    *   Recent Docs (role-based)
*   **Buttons**:
    *   New Matter
    *   New Client
    *   New Task
    *   New Event
*   **Validations**:
    *   permission checks per quick action

### 2.3 Clients

**Client List**
*   **Top filters**:
    *   keyword search (name/email/phone)
    *   status
    *   type
*   **Table columns**:
    *   Name, Type, Email, Phone, Open Matters, Status, Actions
*   **Row actions**:
    *   View
    *   Edit
    *   Archive (soft delete)
*   **Validations**:
    *   prevent delete if active matters (or force archive)

**Add/Edit Client**
*   **Form sections**:
    *   Client Type (Individual/Organisation)
    *   Identity (name fields depending on type)
    *   Contact (email/phone)
    *   Address
    *   Tags + Notes
    *   Status
*   **Buttons**:
    *   Save
    *   Save & Create Matter
    *   Cancel
*   **Validations**:
    *   required: name/display_name
    *   email format
    *   unique email per firm (optional rule)

**Client Profile (Tabs)**
*   **Overview**: key info + quick actions
*   **Contacts**: add/edit contact persons
*   **Matters**: list matters + create new
*   **Documents**: upload + linked docs
*   **Invoices**: invoice list + record payment (finance role)
*   **Notes**: internal notes only
*   **Activity**: view audit snapshot

### 2.4 Matters

**Matter List**
*   **Filters**:
    *   status, stage, practice area
    *   assigned to (me / user)
    *   client
    *   confidential only (admin)
*   **Table**:
    *   Matter No, Title, Client, Stage, Status, Primary Lawyer, Next Date, Actions
*   **Actions**:
    *   View
    *   Edit (if allowed)
    *   Close/Reopen
    *   Archive

**Create/Edit Matter**
*   **Sections**:
    *   Basics: Title, Practice Area, Client
    *   Status & Stage
    *   Team Assignment (multi-select users)
    *   Confidentiality: normal/restricted/high
    *   Ethical Wall toggle + reason (if enabled)
    *   Dates: open/close, next action date
*   **Buttons**:
    *   Save
    *   Save & Add Parties
    *   Save & Upload Document
*   **Validations**:
    *   required: client, title, practice area
    *   stage must belong to firm/practice area
    *   if ethical wall ON → require reason + at least one assigned lawyer

**Matter Details (Tabs)**
*   **Tab: Overview**:
    *   Matter summary card
    *   Team card
    *   Next dates card
    *   Buttons: Edit, Add status update, Add task, Add event, Upload doc
*   **Tab: Parties**:
    *   Table: Name, Type, Contact, Notes, Actions
    *   Buttons: Add Party
    *   Validations: name required, party_type required
*   **Tab: Timeline / Status**:
    *   Timeline list: date, stage/status, note
    *   Form: stage/status dropdown, note textarea, next action date
    *   Validations: note required for significant changes (configurable)
*   **Tab: Tasks**:
    *   Views: Kanban + list toggle
    *   Task fields: title, due, priority, assigned, status
    *   Buttons: Create Task, Bulk assign / bulk due date (admin/manager)
    *   Validations: title required, due date cannot be past (unless allowed)
*   **Tab: Documents**:
    *   Sections: Upload area, Linked docs table (title, category, visibility, version, uploaded_by)
    *   Buttons: Upload, Preview, Download, New Version, Lock/Unlock, Archive
    *   Validations: file type allowlist (pdf/docx/jpg/png), size limit, visibility rules (client-visible requires review permission)
*   **Tab: Events (Appointments & Court)**:
    *   Calendar list: date/time, type, title, location, attendees
    *   Buttons: Add Event, Send Reminder now (admin)
    *   Validations: start/end required; end > start; if type=court → location optional but recommended
*   **Tab: Billing**:
    *   Sub-tabs: Time Entries, Disbursements, Invoices
    *   Buttons: Add Time, Add Disbursement, Create Invoice (finance/admin)
    *   Validations: minutes > 0, rate auto from rate card but editable by finance, invoicing only if matter open (configurable)
*   **Tab: Notes**:
    *   Fields: note body, visibility: internal only / team (no client unless portal)
    *   Validations: note required
*   **Tab: Audit**:
    *   Read-only activity stream (views/downloads/edits)

### 2.5 Documents (Global)
*   **Filters**:
    *   category, tag, linked matter/client, uploaded by, date
*   **Actions**:
    *   Upload, Preview, Download (signed link), Manage permissions (admin)
*   **Validations**:
    *   download requires doc permission + matter ethical wall pass

### 2.6 Calendar
*   **Views**:
    *   Day/Week/Month
*   **Quick create**:
    *   appointment/court
*   **Validations**:
    *   conflicts warning (not block), reminders auto based on rules

### 2.7 Time & Billing

**Time Entry Form**
*   **Fields**:
    *   matter, date, duration, rate, billable, description
*   **Validations**:
    *   matter required, duration > 0, description required if billable

**Invoice Create Wizard**
*   **Steps**:
    *   select client/matter
    *   pick time entries/disbursements
    *   add fixed items
    *   preview totals
*   **Validations**:
    *   cannot invoice already-linked time entries, invoice number unique

## 3) Permission Matrix + Ethical Wall Rules

### 3.1 Role Definitions (default)
*   **Super Admin**: everything across firms (SaaS)
*   **Firm Admin**: everything within firm
*   **Lawyer**: full access to assigned matters + their own time/tasks
*   **Paralegal**: access to assigned matters; limited billing controls
*   **Accounts**: billing + invoices + payments; limited matter editing
*   **Receptionist**: clients + calendar; limited documents
*   **Client Portal**: only their own matters/documents/invoices (if enabled)

### 3.2 Permissions by Module (V/E/D)
Legend: V view, C create, E edit, D delete, A approve/lock, $ finance

**Clients**
*   Firm Admin: V C E D
*   Lawyer: V C E (no D)
*   Paralegal: V C E (no D)
*   Accounts: V (limited), E (billing details only)
*   Receptionist: V C E (no D)
*   Client Portal: V (own record only), E (limited contact info)

**Matters**
*   Firm Admin: V C E D (D = archive)
*   Lawyer: V C E (only assigned matters)
*   Paralegal: V C E (only assigned matters; cannot close)
*   Accounts: V (assigned or firm-wide if allowed), E (billing tab only)
*   Receptionist: V (basic), C (appointments), no E on legal fields
*   Client Portal: V (own matters summary only)

**Tasks**
*   Firm Admin: V C E D
*   Lawyer: V C E D (assigned/created; within assigned matters)
*   Paralegal: V C E D (assigned/created)
*   Accounts: V C E (billing-related tasks)
*   Receptionist: V C E (appointments tasks only)

**Documents (most sensitive)**
*   Firm Admin: V C E D A (permissions, lock, categories)
*   Lawyer: V C E D (only within assigned matters + doc permissions)
*   Paralegal: V C E (no delete unless granted), download yes
*   Accounts: V (invoice docs), download limited
*   Receptionist: V (client-intake docs only), upload yes, download limited
*   Client Portal: V/download only documents marked visibility=client

**Billing**
*   Firm Admin: V C E D $
*   Lawyer: V C E (time entries), no payments
*   Paralegal: V C (time drafts) if allowed
*   Accounts: V C E D $ (full invoices/payments)
*   Receptionist: none (or view invoice status only)

**Reports**
*   Firm Admin: V export
*   Lawyer: V export (assigned matters only)
*   Accounts: V export billing reports
*   Receptionist: limited

**Admin Settings**
*   Firm Admin: full
*   Others: none (except personal profile)

### 3.3 Ethical Wall (Matter-Level Access Control)

**Rule Priority (recommended)**
1.  **Firm boundary**: user must match firm_id
2.  **Role permission**: must have module permission (e.g., matter.view)
3.  **Ethical wall enforcement**:
    *   If `matters.ethical_wall_enabled = true`:
        *   Default = DENY unless the user is:
            *   assigned in `matter_assignments`, OR
            *   explicitly allowed in `matter_ethics_walls` (access=allow), OR
            *   Firm Admin (configurable to bypass or not)
    *   If user has `matter_ethics_walls` access=deny → always deny even if assigned (hard deny)
4.  **Confidentiality level**:
    *   `security_level=high` requires explicit assignment + (optional) 2FA enabled
5.  **Document-level permission**:
    *   even if matter access allowed, doc may still be denied by `document_permissions`

**Practical outcomes**
*   A Lawyer not assigned to the matter cannot see it in lists, cannot search it, cannot access docs/events/tasks tied to it.
*   Staff who are denied are blocked from:
    *   matter overview
    *   linked docs
    *   timeline/status logs
    *   billing items
    *   events
*   Audit logs still record “DENIED_ACCESS_ATTEMPT”.

### 3.4 Suggested Permission Codes (for your matrix engine)
*   `client.view/create/edit/delete`
*   `matter.view/create/edit/close/archive`
*   `task.view/create/edit/delete`
*   `document.view/upload/edit/delete/download/lock/permissions`
*   `event.view/create/edit/delete`
*   `time.view/create/edit/delete`
*   `invoice.view/create/edit/send/void`
*   `payment.view/create/refund`
*   `report.view/export`
*   `admin.manage_users/manage_roles/manage_settings`
*   `audit.view`
