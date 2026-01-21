# Migration Consultancy Software - Complete Analysis & Implementation Plan

## 📋 Executive Summary

This document outlines a comprehensive Enterprise Resource Planning (ERP) system specifically designed for Migration Consultancy businesses. The system will manage the complete lifecycle from lead acquisition to visa approval, including client management, document processing, team collaboration, and financial operations.

---

## 🎯 System Goals & Objectives

### Primary Goals
1. **Centralized Operations** - Single platform for all consultancy operations
2. **Process Automation** - Reduce manual work through automated workflows
3. **Compliance & Audit Trail** - Complete activity logging for regulatory compliance
4. **Client Experience** - Self-service portal for document submission and status tracking
5. **Business Intelligence** - Real-time reporting for data-driven decisions

### Key Performance Indicators (KPIs)
- Lead-to-Client conversion rate
- Average case processing time
- Document completion rate
- Revenue per consultant
- Client satisfaction score
- Task completion rate

---

## 👥 User Roles & Access Control Matrix

| Role | Access Level | Key Permissions |
|------|-------------|-----------------|
| **Super Admin** | Full System Access | All CRUD operations, system settings, user management |
| **Admin/Director** | Management Level | All modules except system settings, view all reports |
| **Branch Manager** | Branch-specific | Manage branch staff, view branch reports, approve payments |
| **Sales/Lead Agent** | Sales Module | Leads, follow-ups, client conversion, limited client view |
| **Case Officer** | Case Management | Case files, documents, status updates, client communication |
| **Document Officer** | Document Module | Document verification, checklist management, upload/download |
| **Accounts/Finance** | Finance Module | Invoices, payments, receipts, financial reports |
| **Receptionist** | Front Desk | Appointments, walk-ins, basic client info, call logs |
| **Client Portal User** | Self-Service | Own documents, case status, payments, messages |

### Permission Structure
```
Permissions:
├── leads.view
├── leads.create
├── leads.edit
├── leads.delete
├── leads.assign
├── clients.view
├── clients.create
├── clients.edit
├── cases.view
├── cases.create
├── cases.update_status
├── documents.view
├── documents.upload
├── documents.verify
├── documents.delete
├── tasks.view
├── tasks.create
├── tasks.assign
├── invoices.view
├── invoices.create
├── payments.record
├── reports.view
└── settings.manage
```

---

## � Sidebar Menu Structure

### Admin Panel Navigation

The sidebar menu is role-based and dynamically shows/hides items based on user permissions.

#### Complete Menu Hierarchy

```
📊 Dashboard
├── 🏠 Home Dashboard (/)
├── 📈 Sales Dashboard (/dashboard/sales)
└── 📋 Operations Dashboard (/dashboard/operations)

💼 Leads & CRM
├── 📝 All Leads (/leads)
├── 🎯 Pipeline View (/leads/pipeline)
├── ➕ Add New Lead (/leads/create)
├── 📊 Lead Sources (/leads/sources)
├── 📞 Follow-ups (/leads/followups)
└── 📑 Lead Reports (/leads/reports)

👥 Clients
├── 📋 All Clients (/clients)
├── ➕ Add New Client (/clients/create)
├── 👨‍👩‍👧‍👦 Client Families (/clients/families)
├── 📄 Agreements (/clients/agreements)
└── 🔍 Client Search (/clients/search)

📂 Cases
├── 📋 All Cases (/cases)
├── ➕ Create New Case (/cases/create)
├── ⏳ In Progress (/cases/in-progress)
├── ✅ Completed (/cases/completed)
├── ⚠️ Overdue (/cases/overdue)
├── 📊 Case Timeline (/cases/timeline)
└── 📈 Case Reports (/cases/reports)

📄 Documents
├── 📁 All Documents (/documents)
├── ⏳ Pending Verification (/documents/pending)
├── ✅ Verified (/documents/verified)
├── ❌ Rejected (/documents/rejected)
├── ⏰ Expiring Soon (/documents/expiring)
├── 📋 Document Templates (/documents/templates)
└── 📊 Document Reports (/documents/reports)

✅ Tasks
├── 📋 All Tasks (/tasks)
├── 📊 Task Board (Kanban) (/tasks/board)
├── ➕ Create Task (/tasks/create)
├── 👤 My Tasks (/tasks/my-tasks)
├── 👥 Team Tasks (/tasks/team)
├── ⏰ Overdue Tasks (/tasks/overdue)
└── ✔️ Completed Tasks (/tasks/completed)

📅 Appointments
├── 📋 All Appointments (/appointments)
├── 📆 Calendar View (/appointments/calendar)
├── ➕ Book Appointment (/appointments/create)
├── 🚶 Walk-in Management (/appointments/walk-in)
├── ⏰ Today's Appointments (/appointments/today)
└── 📊 Appointment Reports (/appointments/reports)

💰 Finance
├── 📄 Invoices
│   ├── All Invoices (/invoices)
│   ├── Create Invoice (/invoices/create)
│   ├── Draft Invoices (/invoices/draft)
│   ├── Sent Invoices (/invoices/sent)
│   ├── Paid Invoices (/invoices/paid)
│   └── Overdue Invoices (/invoices/overdue)
├── 💳 Payments
│   ├── All Payments (/payments)
│   ├── Record Payment (/payments/create)
│   ├── Payment History (/payments/history)
│   └── Pending Payments (/payments/pending)
├── 📊 Installments
│   ├── All Installments (/installments)
│   ├── Due This Month (/installments/due)
│   └── Overdue Installments (/installments/overdue)
├── 💵 Commissions
│   ├── Commission Overview (/commissions)
│   ├── Pending Commissions (/commissions/pending)
│   ├── Paid Commissions (/commissions/paid)
│   └── Commission Rules (/commissions/rules)
└── 📈 Financial Reports
    ├── Revenue Reports (/finance/reports/revenue)
    ├── Outstanding Payments (/finance/reports/outstanding)
    ├── Profit & Loss (/finance/reports/pnl)
    └── Tax Reports (/finance/reports/tax)

💬 Communication
├── 📧 Email Templates (/communication/email-templates)
├── 💬 WhatsApp Templates (/communication/whatsapp-templates)
├── 📱 SMS Templates (/communication/sms-templates)
├── 📜 Communication Logs (/communication/logs)
├── 📤 Bulk Send (/communication/bulk-send)
└── 📊 Communication Reports (/communication/reports)

📊 Reports & Analytics
├── 📈 Executive Dashboard (/reports/executive)
├── 💼 Sales Reports
│   ├── Lead Conversion (/reports/sales/conversion)
│   ├── Lead Sources (/reports/sales/sources)
│   ├── Sales by Consultant (/reports/sales/by-consultant)
│   └── Lost Leads Analysis (/reports/sales/lost-leads)
├── 📂 Case Reports
│   ├── Cases by Status (/reports/cases/by-status)
│   ├── Cases by Visa Type (/reports/cases/by-visa-type)
│   ├── Processing Time (/reports/cases/processing-time)
│   └── Success Rate (/reports/cases/success-rate)
├── 💰 Financial Reports
│   ├── Revenue by Period (/reports/finance/revenue)
│   ├── Revenue by Visa Type (/reports/finance/by-visa-type)
│   ├── Payment Collection (/reports/finance/collection)
│   └── Commission Summary (/reports/finance/commissions)
├── 📄 Document Reports
│   ├── Completion Rate (/reports/documents/completion)
│   ├── Pending Verifications (/reports/documents/pending)
│   └── Expired Documents (/reports/documents/expired)
└── 👥 Team Performance
    ├── Tasks Completed (/reports/team/tasks)
    ├── Cases Handled (/reports/team/cases)
    └── Consultant Performance (/reports/team/consultants)

⚙️ Settings
├── 👤 My Profile (/settings/profile)
├── 👥 User Management
│   ├── All Users (/settings/users)
│   ├── Add User (/settings/users/create)
│   ├── Roles & Permissions (/settings/roles)
│   └── Activity Logs (/settings/activity-logs)
├── 🏢 Branch Management
│   ├── All Branches (/settings/branches)
│   ├── Add Branch (/settings/branches/create)
│   └── Branch Settings (/settings/branches/settings)
├── 🛂 Visa Configuration
│   ├── Visa Types (/settings/visa-types)
│   ├── Add Visa Type (/settings/visa-types/create)
│   ├── Milestones (/settings/milestones)
│   └── Processing Times (/settings/processing-times)
├── 📄 Document Configuration
│   ├── Document Templates (/settings/document-templates)
│   ├── Document Categories (/settings/document-categories)
│   └── Checklist Builder (/settings/checklist-builder)
├── 💼 Service Packages
│   ├── All Packages (/settings/packages)
│   ├── Add Package (/settings/packages/create)
│   ├── Add-on Services (/settings/addons)
│   └── Pricing Rules (/settings/pricing)
├── 📧 Email Configuration
│   ├── SMTP Settings (/settings/email/smtp)
│   ├── Email Templates (/settings/email/templates)
│   └── Email Logs (/settings/email/logs)
├── 💬 Communication Settings
│   ├── WhatsApp API (/settings/whatsapp)
│   ├── SMS Gateway (/settings/sms)
│   └── Notification Settings (/settings/notifications)
├── 🔐 Security
│   ├── Password Policy (/settings/security/password)
│   ├── Two-Factor Auth (/settings/security/2fa)
│   ├── Session Management (/settings/security/sessions)
│   └── IP Whitelist (/settings/security/ip-whitelist)
├── 🔔 Notifications
│   ├── Notification Rules (/settings/notifications/rules)
│   ├── Email Notifications (/settings/notifications/email)
│   └── In-App Notifications (/settings/notifications/in-app)
└── 🔧 System Settings
    ├── General Settings (/settings/general)
    ├── Company Information (/settings/company)
    ├── Backup & Restore (/settings/backup)
    ├── System Logs (/settings/logs)
    └── API Keys (/settings/api-keys)

🌐 Client Portal (Separate Portal)
├── 🏠 Dashboard (/portal/dashboard)
├── 📄 My Documents (/portal/documents)
├── 💰 Invoices & Payments (/portal/invoices)
├── 📅 My Appointments (/portal/appointments)
├── 💬 Messages (/portal/messages)
└── ⚙️ Profile Settings (/portal/profile)
```

### Role-Based Menu Visibility

#### Super Admin
- **Access**: All menu items
- **Special Access**: System Settings, User Management, API Keys

#### Admin/Director
- **Access**: All except System Settings
- **Hidden**: API Keys, Backup & Restore, System Logs

#### Branch Manager
- **Access**: Dashboard, Leads, Clients, Cases, Documents, Tasks, Appointments, Finance (view only), Reports (branch-specific)
- **Hidden**: System Settings, Global Reports, Commission Rules

#### Sales/Lead Agent
- **Access**: Dashboard (sales), Leads, Clients (limited), Tasks (own), Appointments (own)
- **Hidden**: Finance, Documents (verification), Settings, Reports

#### Case Officer
- **Access**: Dashboard (operations), Cases, Documents, Tasks, Clients (view), Communication
- **Hidden**: Finance, Leads, Settings, Reports

#### Document Officer
- **Access**: Documents, Cases (view), Clients (view), Tasks (own)
- **Hidden**: Finance, Leads, Settings, Reports

#### Accounts/Finance
- **Access**: Dashboard (finance), Finance (all), Invoices, Payments, Clients (view), Reports (financial)
- **Hidden**: Leads, Cases (detailed), Documents, Settings

#### Receptionist
- **Access**: Dashboard (basic), Appointments, Walk-in Management, Clients (basic info), Tasks (own)
- **Hidden**: Finance, Cases (detailed), Documents, Settings, Reports

### Menu Item Metadata

Each menu item includes:

```javascript
{
  id: "menu-item-id",
  label: "Menu Label",
  icon: "IconName", // Lucide React icons
  route: "/route-path",
  permission: "module.action", // Required permission
  badge: null, // Optional badge (e.g., count of pending items)
  children: [], // Submenu items
  isActive: true, // Whether menu is active
  order: 1, // Display order
  description: "Menu description" // Tooltip text
}
```

### Example Menu Configuration (JSON)

```json
{
  "dashboard": {
    "id": "dashboard",
    "label": "Dashboard",
    "icon": "LayoutDashboard",
    "route": "/",
    "permission": "dashboard.view",
    "children": [
      {
        "id": "home-dashboard",
        "label": "Home Dashboard",
        "icon": "Home",
        "route": "/",
        "permission": "dashboard.view"
      },
      {
        "id": "sales-dashboard",
        "label": "Sales Dashboard",
        "icon": "TrendingUp",
        "route": "/dashboard/sales",
        "permission": "dashboard.sales.view"
      },
      {
        "id": "operations-dashboard",
        "label": "Operations Dashboard",
        "icon": "Activity",
        "route": "/dashboard/operations",
        "permission": "dashboard.operations.view"
      }
    ]
  },
  "leads": {
    "id": "leads",
    "label": "Leads & CRM",
    "icon": "Users",
    "route": "/leads",
    "permission": "leads.view",
    "badge": "pending_count",
    "children": [
      {
        "id": "all-leads",
        "label": "All Leads",
        "icon": "List",
        "route": "/leads",
        "permission": "leads.view"
      },
      {
        "id": "pipeline-view",
        "label": "Pipeline View",
        "icon": "Kanban",
        "route": "/leads/pipeline",
        "permission": "leads.view"
      },
      {
        "id": "add-lead",
        "label": "Add New Lead",
        "icon": "Plus",
        "route": "/leads/create",
        "permission": "leads.create"
      }
    ]
  }
}
```

### Sidebar UI Features

1. **Collapsible Sidebar**
   - Expand/collapse toggle
   - Icons-only mode when collapsed
   - Remembers user preference

2. **Active State Highlighting**
   - Current page highlighted
   - Parent menu expanded when child is active
   - Breadcrumb trail

3. **Search Functionality**
   - Quick menu search (Cmd/Ctrl + K)
   - Fuzzy search across all menu items
   - Recent pages

4. **Badges & Notifications**
   - Pending tasks count
   - Overdue items
   - New messages
   - Real-time updates

5. **Quick Actions**
   - Floating action button
   - Common actions (Add Lead, Create Case, etc.)
   - Keyboard shortcuts

6. **Responsive Design**
   - Mobile: Drawer/hamburger menu
   - Tablet: Collapsible sidebar
   - Desktop: Full sidebar

---

## �🏗️ System Architecture

### Technology Stack

#### Frontend
- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 18+
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand / React Query
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts / Chart.js
- **Calendar**: FullCalendar
- **File Upload**: React Dropzone
- **Rich Text**: Tiptap / Quill

#### Backend
- **Runtime**: Node.js 20+ LTS
- **Framework**: Express.js / NestJS (recommended for scalability)
- **API Style**: RESTful API + GraphQL (optional for complex queries)
- **Authentication**: JWT + Refresh Tokens
- **Authorization**: RBAC (Role-Based Access Control)
- **Validation**: Joi / Zod
- **File Processing**: Multer + Sharp (image optimization)

#### Database
- **Primary DB**: MySQL 8.0+ (DigitalOcean Managed Database)
- **Caching**: Redis (session management, rate limiting)
- **Search**: Elasticsearch (optional for advanced search)

#### Storage
- **File Storage**: DigitalOcean Spaces (S3-compatible)
- **CDN**: DigitalOcean CDN for static assets

#### DevOps
- **Server**: Ubuntu 22.04 LTS
- **Web Server**: Nginx (reverse proxy + SSL)
- **Process Manager**: PM2
- **SSL**: Let's Encrypt (auto-renewal)
- **Monitoring**: PM2 Plus / New Relic
- **Backup**: Automated daily backups (DB + files)

#### Communication
- **Email**: SendGrid / AWS SES
- **SMS**: Twilio / AWS SNS
- **WhatsApp**: Twilio WhatsApp API / Meta Business API

---

## 📦 Core Modules - Detailed Breakdown

### Module 1: Leads & CRM (Sales Pipeline)

#### Purpose
Track inquiries from first contact to conversion, manage follow-ups, and optimize sales process.

#### Features
1. **Lead Capture**
   - Manual entry form
   - Website integration (API endpoint)
   - Import from CSV/Excel
   - Email parsing (optional)

2. **Lead Information**
   - Personal details (name, email, phone, country)
   - Inquiry type (visa category, destination country)
   - Lead source (Facebook, Google, Referral, Walk-in, Website)
   - Lead score (auto-calculated based on engagement)
   - Tags & custom fields

3. **Pipeline Management**
   - Stages: New → Contacted → Follow-up → Appointment → Proposal Sent → Converted → Lost
   - Drag-and-drop Kanban board
   - Stage-specific actions and templates
   - Conversion probability indicator

4. **Follow-up System**
   - Automated reminders (email/in-app notifications)
   - Call logging with notes
   - Meeting scheduling
   - Follow-up history timeline
   - Next action suggestions

5. **Lead Assignment**
   - Auto-assign based on rules (round-robin, territory, expertise)
   - Manual reassignment
   - Load balancing across sales team

6. **Duplicate Detection**
   - Check by email, phone, passport number
   - Merge duplicate leads
   - Alert on potential duplicates

#### Database Tables
```sql
leads
├── id (PK)
├── lead_number (unique, auto-generated)
├── first_name
├── last_name
├── email
├── phone
├── country_code
├── nationality
├── visa_type_interest
├── destination_country
├── lead_source_id (FK)
├── lead_status (enum: new, contacted, follow_up, appointment, converted, lost)
├── lead_score (0-100)
├── assigned_to (FK → users)
├── converted_to_client_id (FK → clients)
├── lost_reason
├── created_by (FK → users)
├── created_at
├── updated_at

lead_sources
├── id (PK)
├── name (Facebook Ads, Google Ads, Referral, Walk-in, Website, etc.)
├── is_active

lead_notes
├── id (PK)
├── lead_id (FK)
├── note_type (call, email, meeting, general)
├── content
├── created_by (FK → users)
├── created_at

lead_followups
├── id (PK)
├── lead_id (FK)
├── followup_date
├── followup_type (call, email, meeting)
├── status (pending, completed, cancelled)
├── notes
├── assigned_to (FK → users)
├── completed_at
├── created_at
```

#### API Endpoints
```
POST   /api/leads                    - Create new lead
GET    /api/leads                    - List leads (with filters)
GET    /api/leads/:id                - Get lead details
PUT    /api/leads/:id                - Update lead
DELETE /api/leads/:id                - Delete lead
POST   /api/leads/:id/convert        - Convert lead to client
POST   /api/leads/:id/notes          - Add note
POST   /api/leads/:id/followups      - Schedule follow-up
PUT    /api/leads/:id/assign         - Assign to user
GET    /api/leads/pipeline           - Get pipeline view data
POST   /api/leads/import             - Bulk import
```

---

### Module 2: Client Onboarding

#### Purpose
Transform qualified leads into active clients with complete profiles and service agreements.

#### Features
1. **Client Profile Creation**
   - Auto-populate from lead data
   - Passport information
   - Family members (spouse, children, dependents)
   - Contact details (primary, secondary, emergency)
   - Address (current, permanent)
   - Employment history
   - Education background

2. **Service Selection**
   - Visa type selection
   - Service package (Basic, Standard, Premium)
   - Add-on services (document translation, courier, etc.)
   - Pricing calculation

3. **Agreement Management**
   - Digital contract generation
   - E-signature integration (optional)
   - Contract upload
   - Terms acceptance log

4. **KYC Checklist**
   - Document requirements based on visa type
   - Initial document collection
   - Verification status tracking

#### Database Tables
```sql
clients
├── id (PK)
├── client_number (unique, auto-generated: CLI-2024-0001)
├── lead_id (FK, nullable)
├── first_name
├── last_name
├── email
├── phone
├── date_of_birth
├── gender
├── nationality
├── passport_number
├── passport_issue_date
├── passport_expiry_date
├── marital_status
├── current_address
├── permanent_address
├── emergency_contact_name
├── emergency_contact_phone
├── profile_photo_url
├── status (active, inactive, blacklisted)
├── branch_id (FK)
├── assigned_consultant_id (FK → users)
├── created_by (FK → users)
├── created_at
├── updated_at

client_family
├── id (PK)
├── client_id (FK)
├── relationship (spouse, child, parent, sibling)
├── first_name
├── last_name
├── date_of_birth
├── passport_number
├── passport_expiry_date
├── is_dependent (boolean)
├── created_at

client_employment
├── id (PK)
├── client_id (FK)
├── company_name
├── designation
├── start_date
├── end_date (nullable)
├── is_current (boolean)
├── salary
├── job_description

client_education
├── id (PK)
├── client_id (FK)
├── institution_name
├── degree
├── field_of_study
├── start_date
├── end_date
├── grade_percentage

client_agreements
├── id (PK)
├── client_id (FK)
├── agreement_number
├── service_package_id (FK)
├── total_amount
├── agreement_date
├── file_url
├── signed_by_client_at
├── signed_by_consultant_id (FK → users)
├── status (draft, sent, signed, cancelled)
├── created_at
```

#### API Endpoints
```
POST   /api/clients                  - Create client
GET    /api/clients                  - List clients
GET    /api/clients/:id              - Get client details
PUT    /api/clients/:id              - Update client
DELETE /api/clients/:id              - Delete client
POST   /api/clients/:id/family       - Add family member
POST   /api/clients/:id/employment   - Add employment
POST   /api/clients/:id/education    - Add education
POST   /api/clients/:id/agreement    - Create agreement
```

---

### Module 3: Case / Application Management (Visa Workflow)

#### Purpose
Track each visa application through its complete lifecycle with milestone tracking and deadline management.

#### Features
1. **Case Creation**
   - Auto-generated case number
   - Link to client profile
   - Visa type & destination country
   - Priority level (Normal, High, Urgent)
   - Expected completion date

2. **Milestone Tracking**
   - Customizable milestones per visa type
   - Default milestones:
     - Documents Collection
     - Eligibility Assessment
     - Application Preparation
     - Lodgement
     - Biometrics
     - Medical Examination
     - Interview (if required)
     - Decision Awaited
     - Visa Granted / Refused
   - Progress percentage
   - Time spent per milestone

3. **Status Management**
   - Current status indicator
   - Status change log (audit trail)
   - Automated notifications on status change
   - Color-coded status badges

4. **Deadline Tracker**
   - Document submission deadlines
   - Appointment dates
   - Visa expiry alerts
   - Passport expiry warnings
   - Overdue task highlighting

5. **Case Assignment**
   - Primary case officer
   - Supporting team members
   - Workload distribution
   - Reassignment history

6. **Notes & Communication**
   - Internal notes (team only)
   - Client-facing updates
   - File attachments
   - @mentions for team collaboration

#### Database Tables
```sql
cases
├── id (PK)
├── case_number (unique: CASE-2024-0001)
├── client_id (FK)
├── visa_type_id (FK)
├── destination_country
├── priority (normal, high, urgent)
├── current_status_id (FK → case_statuses)
├── current_milestone_id (FK → case_milestones)
├── progress_percentage (0-100)
├── expected_completion_date
├── actual_completion_date
├── assigned_officer_id (FK → users)
├── branch_id (FK)
├── is_archived (boolean)
├── created_at
├── updated_at

visa_types
├── id (PK)
├── name (Student Visa, Tourist Visa, Skilled Migration, Partner Visa, etc.)
├── code (STU, TOU, SKL, PAR)
├── destination_country
├── processing_time_days
├── is_active

case_milestones
├── id (PK)
├── visa_type_id (FK)
├── milestone_name
├── sequence_order
├── is_mandatory (boolean)
├── estimated_days

case_status_log
├── id (PK)
├── case_id (FK)
├── from_status
├── to_status
├── milestone_id (FK, nullable)
├── notes
├── changed_by (FK → users)
├── changed_at

case_deadlines
├── id (PK)
├── case_id (FK)
├── deadline_type (document_submission, biometrics, medical, interview, decision)
├── deadline_date
├── is_completed (boolean)
├── completed_at
├── reminder_sent (boolean)

case_team
├── id (PK)
├── case_id (FK)
├── user_id (FK)
├── role (primary_officer, supporting_officer, document_officer)
├── assigned_at

case_notes
├── id (PK)
├── case_id (FK)
├── note_type (internal, client_update)
├── content
├── attachments (JSON array)
├── created_by (FK → users)
├── created_at
```

#### API Endpoints
```
POST   /api/cases                    - Create case
GET    /api/cases                    - List cases (with filters)
GET    /api/cases/:id                - Get case details
PUT    /api/cases/:id                - Update case
DELETE /api/cases/:id                - Delete case
PUT    /api/cases/:id/status         - Update status
POST   /api/cases/:id/notes          - Add note
POST   /api/cases/:id/team           - Assign team member
GET    /api/cases/:id/timeline       - Get case timeline
POST   /api/cases/:id/deadlines      - Add deadline
```

---

### Module 4: Document Management (Checklist System)

#### Purpose
Systematic collection, verification, and management of all required documents with version control.

#### Features
1. **Template Checklists**
   - Pre-defined checklists per visa type
   - Customizable document requirements
   - Mandatory vs. optional documents
   - Document categories (Identity, Financial, Educational, etc.)

2. **Document Upload**
   - Drag-and-drop interface
   - Multiple file formats (PDF, JPG, PNG, DOCX)
   - File size limits and validation
   - Bulk upload support
   - Client portal upload capability

3. **Document Status Tracking**
   - Pending (not uploaded)
   - Received (uploaded, awaiting verification)
   - Verified (approved by document officer)
   - Rejected (needs replacement)
   - Expired (needs renewal)

4. **Expiry Management**
   - Expiry date tracking
   - Automated expiry alerts (30, 15, 7 days before)
   - Renewal reminders

5. **Version Control**
   - Multiple versions of same document
   - Version history
   - Rollback capability
   - Compare versions

6. **Document Security**
   - Encrypted storage
   - Access control (role-based)
   - Download logs
   - Watermarking (optional)

#### Database Tables
```sql
document_templates
├── id (PK)
├── visa_type_id (FK)
├── document_category_id (FK)
├── document_name
├── is_mandatory (boolean)
├── description
├── sample_file_url
├── sequence_order
├── is_active

document_categories
├── id (PK)
├── name (Identity, Financial, Educational, Employment, Medical, Travel History)
├── icon
├── color

client_documents
├── id (PK)
├── case_id (FK)
├── client_id (FK)
├── document_template_id (FK)
├── document_name
├── file_url
├── file_type
├── file_size
├── version_number
├── parent_document_id (FK, for versions)
├── status (pending, received, verified, rejected, expired)
├── expiry_date
├── rejection_reason
├── uploaded_by (FK → users, nullable for client uploads)
├── verified_by (FK → users)
├── verified_at
├── uploaded_at
├── created_at

document_access_log
├── id (PK)
├── document_id (FK)
├── user_id (FK)
├── action (view, download, delete)
├── ip_address
├── accessed_at
```

#### API Endpoints
```
GET    /api/documents/templates/:visaTypeId  - Get checklist template
POST   /api/documents/upload                 - Upload document
GET    /api/documents/case/:caseId           - Get case documents
PUT    /api/documents/:id/verify             - Verify document
PUT    /api/documents/:id/reject             - Reject document
DELETE /api/documents/:id                    - Delete document
GET    /api/documents/:id/versions           - Get document versions
GET    /api/documents/:id/download           - Download document
```

---

### Module 5: Appointments & Calendar

#### Purpose
Manage consultations, interviews, and important dates with automated reminders.

#### Features
1. **Appointment Booking**
   - Internal booking (staff creates)
   - Client self-booking (portal)
   - Appointment types (consultation, document review, follow-up)
   - Duration selection
   - Consultant availability

2. **Calendar Views**
   - Day / Week / Month views
   - Consultant-specific calendars
   - Color-coded by appointment type
   - Drag-and-drop rescheduling

3. **Reminders**
   - Email reminders (24hrs, 1hr before)
   - SMS reminders (optional)
   - WhatsApp reminders (optional)
   - In-app notifications

4. **Google Calendar Sync** (Optional)
   - Two-way sync
   - OAuth integration
   - Conflict detection

5. **Walk-in Management**
   - Token system
   - Queue management
   - Average wait time display

#### Database Tables
```sql
appointments
├── id (PK)
├── appointment_number
├── client_id (FK, nullable for walk-ins)
├── case_id (FK, nullable)
├── appointment_type (consultation, document_review, follow_up, interview_prep)
├── consultant_id (FK → users)
├── appointment_date
├── start_time
├── end_time
├── duration_minutes
├── status (scheduled, confirmed, completed, cancelled, no_show)
├── meeting_mode (in_person, video_call, phone_call)
├── meeting_link (for video calls)
├── notes
├── reminder_sent (boolean)
├── created_by (FK → users)
├── created_at
├── updated_at

consultant_availability
├── id (PK)
├── consultant_id (FK → users)
├── day_of_week (0-6)
├── start_time
├── end_time
├── is_available (boolean)

walk_in_tokens
├── id (PK)
├── token_number
├── client_name
├── client_phone
├── purpose
├── assigned_to (FK → users)
├── status (waiting, in_progress, completed)
├── issued_at
├── completed_at
```

#### API Endpoints
```
POST   /api/appointments             - Create appointment
GET    /api/appointments             - List appointments
GET    /api/appointments/:id         - Get appointment
PUT    /api/appointments/:id         - Update appointment
DELETE /api/appointments/:id         - Cancel appointment
GET    /api/appointments/calendar    - Get calendar data
POST   /api/appointments/walk-in     - Issue walk-in token
```

---

### Module 6: Task & Team Workflow

#### Purpose
Manage team tasks, assignments, and collaboration with deadline tracking.

#### Features
1. **Task Management**
   - Task creation linked to Lead/Client/Case
   - Task types (call, email, document_review, follow_up, meeting)
   - Priority levels (Low, Medium, High, Urgent)
   - Due dates with reminders
   - Recurring tasks (optional)

2. **Task Assignment**
   - Assign to individual or team
   - Reassignment capability
   - Workload balancing

3. **Kanban Board**
   - Columns: To Do / In Progress / Review / Done
   - Drag-and-drop
   - Filters (by assignee, priority, date)

4. **Collaboration**
   - Task comments
   - File attachments
   - @mentions
   - Activity feed

5. **Notifications**
   - In-app notifications
   - Email digests
   - Overdue alerts

#### Database Tables
```sql
tasks
├── id (PK)
├── task_number
├── title
├── description
├── task_type (call, email, document_review, follow_up, meeting, general)
├── priority (low, medium, high, urgent)
├── status (todo, in_progress, review, done)
├── related_to_type (lead, client, case)
├── related_to_id
├── assigned_to (FK → users)
├── assigned_by (FK → users)
├── due_date
├── completed_at
├── created_at
├── updated_at

task_comments
├── id (PK)
├── task_id (FK)
├── comment
├── attachments (JSON)
├── created_by (FK → users)
├── created_at

task_attachments
├── id (PK)
├── task_id (FK)
├── file_name
├── file_url
├── file_size
├── uploaded_by (FK → users)
├── uploaded_at
```

#### API Endpoints
```
POST   /api/tasks                    - Create task
GET    /api/tasks                    - List tasks
GET    /api/tasks/:id                - Get task
PUT    /api/tasks/:id                - Update task
DELETE /api/tasks/:id                - Delete task
PUT    /api/tasks/:id/status         - Update status
POST   /api/tasks/:id/comments       - Add comment
```

---

### Module 7: Finance (Payments, Invoices, Installments)

#### Purpose
Manage all financial transactions, invoicing, and commission tracking.

#### Features
1. **Service Packages**
   - Package definition (Basic, Standard, Premium)
   - Pricing per visa type
   - Add-on services pricing
   - Discount rules

2. **Invoice Generation**
   - Auto-generate from service agreement
   - Manual invoice creation
   - Invoice templates
   - Tax calculation (GST/VAT)
   - PDF generation

3. **Payment Tracking**
   - Payment methods (Cash, Bank Transfer, Card, Cheque)
   - Partial payments
   - Payment receipts
   - Payment reminders

4. **Installment Plans**
   - Flexible installment schedules
   - Due date tracking
   - Overdue notifications
   - Auto-calculation of remaining balance

5. **Commission Management**
   - Agent commission rules (percentage or fixed)
   - Commission calculation
   - Commission reports
   - Payout tracking

6. **Financial Reports**
   - Revenue reports (daily, monthly, yearly)
   - Outstanding payments
   - Commission summaries
   - Profit margins

#### Database Tables
```sql
service_packages
├── id (PK)
├── name (Basic, Standard, Premium)
├── visa_type_id (FK)
├── base_price
├── description
├── features (JSON)
├── is_active

addon_services
├── id (PK)
├── name (Document Translation, Courier, Priority Processing)
├── price
├── is_active

invoices
├── id (PK)
├── invoice_number (unique: INV-2024-0001)
├── client_id (FK)
├── case_id (FK, nullable)
├── service_package_id (FK)
├── subtotal
├── tax_percentage
├── tax_amount
├── discount_percentage
├── discount_amount
├── total_amount
├── invoice_date
├── due_date
├── status (draft, sent, partially_paid, paid, overdue, cancelled)
├── notes
├── created_by (FK → users)
├── created_at
├── updated_at

invoice_items
├── id (PK)
├── invoice_id (FK)
├── item_type (service_package, addon_service, custom)
├── item_id (FK, nullable)
├── description
├── quantity
├── unit_price
├── total_price

payments
├── id (PK)
├── payment_number (unique: PAY-2024-0001)
├── invoice_id (FK)
├── client_id (FK)
├── amount
├── payment_method (cash, bank_transfer, card, cheque)
├── payment_date
├── transaction_reference
├── receipt_url
├── notes
├── received_by (FK → users)
├── created_at

installment_plans
├── id (PK)
├── invoice_id (FK)
├── installment_number
├── amount
├── due_date
├── status (pending, paid, overdue)
├── paid_at
├── payment_id (FK, nullable)

commission_rules
├── id (PK)
├── user_id (FK)
├── visa_type_id (FK, nullable - null means all)
├── commission_type (percentage, fixed)
├── commission_value
├── is_active

commissions
├── id (PK)
├── user_id (FK)
├── invoice_id (FK)
├── payment_id (FK)
├── commission_amount
├── status (pending, approved, paid)
├── paid_at
├── created_at
```

#### API Endpoints
```
POST   /api/invoices                 - Create invoice
GET    /api/invoices                 - List invoices
GET    /api/invoices/:id             - Get invoice
PUT    /api/invoices/:id             - Update invoice
POST   /api/invoices/:id/send        - Send invoice to client
GET    /api/invoices/:id/pdf         - Download PDF
POST   /api/payments                 - Record payment
GET    /api/payments                 - List payments
POST   /api/installments             - Create installment plan
GET    /api/commissions              - List commissions
GET    /api/finance/reports          - Financial reports
```

---

### Module 8: Communication & Templates

#### Purpose
Streamline client communication with templates and centralized logging.

#### Features
1. **Email Templates**
   - Pre-defined templates
   - Variable placeholders ({{client_name}}, {{case_number}})
   - Template categories (appointment, document_request, payment_reminder, status_update)
   - HTML email support
   - Attachment capability

2. **WhatsApp Templates**
   - Message templates
   - Copy-to-clipboard functionality
   - Send via WhatsApp Business API (optional)
   - Template approval status (for API)

3. **SMS Templates**
   - Short message templates
   - Character count
   - Send via SMS gateway (optional)

4. **Communication Log**
   - All client communications in one timeline
   - Email sent/received
   - Calls made
   - WhatsApp messages
   - Meeting notes
   - Filter by type and date

5. **Bulk Communication**
   - Send to multiple clients
   - Filter recipients
   - Schedule sending

#### Database Tables
```sql
message_templates
├── id (PK)
├── name
├── category (email, whatsapp, sms)
├── subject (for email)
├── content
├── variables (JSON array: ["client_name", "case_number"])
├── is_active
├── created_by (FK → users)
├── created_at

communication_logs
├── id (PK)
├── client_id (FK)
├── case_id (FK, nullable)
├── communication_type (email, whatsapp, sms, call, meeting)
├── direction (inbound, outbound)
├── subject
├── content
├── attachments (JSON)
├── status (sent, delivered, failed, read)
├── sent_by (FK → users)
├── sent_at
├── created_at

email_queue
├── id (PK)
├── to_email
├── subject
├── body
├── attachments (JSON)
├── status (pending, sent, failed)
├── scheduled_at
├── sent_at
├── error_message
```

#### API Endpoints
```
GET    /api/templates                - List templates
POST   /api/templates                - Create template
PUT    /api/templates/:id            - Update template
DELETE /api/templates/:id            - Delete template
POST   /api/communications/send      - Send communication
GET    /api/communications/client/:id - Get client communication log
POST   /api/communications/bulk      - Bulk send
```

---

### Module 9: Client Portal (Self-Service)

#### Purpose
Empower clients with self-service capabilities to reduce staff workload.

#### Features
1. **Portal Access**
   - Unique login credentials
   - Password reset
   - Multi-factor authentication (optional)

2. **Dashboard**
   - Case status overview
   - Document checklist progress
   - Upcoming appointments
   - Payment status

3. **Document Upload**
   - View required documents
   - Upload files
   - Track verification status
   - Download submitted documents

4. **Payment Information**
   - View invoices
   - Payment history
   - Download receipts
   - Installment schedule

5. **Messages**
   - Receive updates from consultants
   - Ask questions
   - View communication history

6. **Appointments**
   - Book appointments
   - View scheduled appointments
   - Reschedule/cancel

#### Database Tables
```sql
client_portal_users
├── id (PK)
├── client_id (FK)
├── email
├── password_hash
├── is_active (boolean)
├── last_login_at
├── password_reset_token
├── password_reset_expires
├── created_at

client_messages
├── id (PK)
├── client_id (FK)
├── case_id (FK, nullable)
├── sender_type (client, staff)
├── sender_id (FK → users or client_portal_users)
├── message
├── attachments (JSON)
├── is_read (boolean)
├── read_at
├── created_at
```

#### API Endpoints (Client Portal)
```
POST   /api/portal/auth/login        - Client login
POST   /api/portal/auth/reset        - Password reset
GET    /api/portal/dashboard         - Dashboard data
GET    /api/portal/documents         - Document checklist
POST   /api/portal/documents/upload  - Upload document
GET    /api/portal/invoices          - View invoices
GET    /api/portal/appointments      - View appointments
POST   /api/portal/appointments      - Book appointment
POST   /api/portal/messages          - Send message
GET    /api/portal/messages          - Get messages
```

---

### Module 10: Reports & Dashboard

#### Purpose
Provide actionable insights through comprehensive reporting and analytics.

#### Features

1. **Executive Dashboard**
   - Total leads (this month vs. last month)
   - Conversion rate
   - Active cases
   - Revenue (this month)
   - Overdue tasks
   - Overdue payments
   - Top performing consultants
   - Case status distribution (pie chart)
   - Revenue trend (line chart)

2. **Sales Reports**
   - Leads by source
   - Conversion funnel
   - Lead response time
   - Sales by consultant
   - Lost leads analysis

3. **Case Reports**
   - Cases by status
   - Cases by visa type
   - Average processing time
   - Success rate
   - Cases by consultant
   - Overdue cases

4. **Financial Reports**
   - Revenue by period (daily, monthly, yearly)
   - Revenue by visa type
   - Revenue by consultant
   - Outstanding payments
   - Payment collection rate
   - Commission summary

5. **Document Reports**
   - Document completion rate
   - Pending verifications
   - Expired documents
   - Document submission timeline

6. **Team Performance**
   - Tasks completed
   - Average task completion time
   - Cases handled
   - Client satisfaction (if feedback collected)

7. **Export Options**
   - PDF export
   - Excel export
   - CSV export
   - Scheduled email reports

#### Database Views (for reporting)
```sql
CREATE VIEW vw_lead_conversion_rate AS
SELECT 
    DATE_FORMAT(created_at, '%Y-%m') as month,
    COUNT(*) as total_leads,
    SUM(CASE WHEN lead_status = 'converted' THEN 1 ELSE 0 END) as converted_leads,
    (SUM(CASE WHEN lead_status = 'converted' THEN 1 ELSE 0 END) / COUNT(*) * 100) as conversion_rate
FROM leads
GROUP BY month;

CREATE VIEW vw_revenue_summary AS
SELECT 
    DATE_FORMAT(payment_date, '%Y-%m') as month,
    SUM(amount) as total_revenue,
    COUNT(DISTINCT client_id) as unique_clients,
    COUNT(*) as total_payments
FROM payments
GROUP BY month;
```

#### API Endpoints
```
GET    /api/reports/dashboard        - Dashboard data
GET    /api/reports/sales            - Sales reports
GET    /api/reports/cases            - Case reports
GET    /api/reports/finance          - Financial reports
GET    /api/reports/documents        - Document reports
GET    /api/reports/team             - Team performance
POST   /api/reports/export           - Export report
```

---

## 🗄️ Complete Database Schema (ERD)

### Core Entities & Relationships

```
users (1) ──< (M) leads
users (1) ──< (M) clients
users (1) ──< (M) cases
users (1) ──< (M) tasks

leads (1) ──< (1) clients [conversion]

clients (1) ──< (M) client_family
clients (1) ──< (M) client_employment
clients (1) ──< (M) client_education
clients (1) ──< (M) client_agreements
clients (1) ──< (M) cases
clients (1) ──< (M) invoices
clients (1) ──< (M) appointments

cases (1) ──< (M) case_status_log
cases (1) ──< (M) case_deadlines
cases (1) ──< (M) case_team
cases (1) ──< (M) case_notes
cases (1) ──< (M) client_documents
cases (1) ──< (M) tasks

visa_types (1) ──< (M) cases
visa_types (1) ──< (M) document_templates
visa_types (1) ──< (M) case_milestones

invoices (1) ──< (M) invoice_items
invoices (1) ──< (M) payments
invoices (1) ──< (M) installment_plans

branches (1) ──< (M) users
branches (1) ──< (M) clients
branches (1) ──< (M) cases
```

### Additional Tables

```sql
-- System Tables
branches
├── id (PK)
├── name
├── code
├── address
├── phone
├── email
├── is_active
├── created_at

roles
├── id (PK)
├── name (super_admin, admin, branch_manager, sales_agent, case_officer, etc.)
├── description
├── created_at

permissions
├── id (PK)
├── name (leads.view, leads.create, etc.)
├── module
├── description

role_permissions
├── role_id (FK)
├── permission_id (FK)
├── PRIMARY KEY (role_id, permission_id)

users
├── id (PK)
├── employee_id (unique)
├── first_name
├── last_name
├── email (unique)
├── password_hash
├── phone
├── role_id (FK)
├── branch_id (FK)
├── profile_photo_url
├── is_active (boolean)
├── last_login_at
├── created_at
├── updated_at

-- Activity Logging
activity_logs
├── id (PK)
├── user_id (FK)
├── action (create, update, delete, view)
├── entity_type (lead, client, case, document, etc.)
├── entity_id
├── old_values (JSON)
├── new_values (JSON)
├── ip_address
├── user_agent
├── created_at

-- Settings
system_settings
├── id (PK)
├── setting_key (unique)
├── setting_value
├── setting_type (string, number, boolean, json)
├── description
├── updated_by (FK → users)
├── updated_at
```

---

## 📱 User Interface Structure

### Admin Panel Pages

#### 1. Authentication
- `/login` - Login page
- `/forgot-password` - Password reset request
- `/reset-password/:token` - Password reset form

#### 2. Dashboard
- `/` - Executive dashboard
- `/dashboard/sales` - Sales dashboard
- `/dashboard/operations` - Operations dashboard

#### 3. Leads & CRM
- `/leads` - Leads list (table + filters)
- `/leads/pipeline` - Kanban pipeline view
- `/leads/create` - Create new lead
- `/leads/:id` - Lead details & timeline
- `/leads/:id/edit` - Edit lead
- `/leads/:id/convert` - Convert to client

#### 4. Clients
- `/clients` - Clients list
- `/clients/create` - Create client
- `/clients/:id` - Client profile (tabs: Overview, Cases, Documents, Invoices, Communication)
- `/clients/:id/edit` - Edit client

#### 5. Cases
- `/cases` - Cases list
- `/cases/create` - Create case
- `/cases/:id` - Case details (tabs: Overview, Timeline, Documents, Team, Notes)
- `/cases/:id/edit` - Edit case

#### 6. Documents
- `/documents` - All documents (filterable)
- `/documents/pending-verification` - Pending verifications
- `/documents/expired` - Expired documents

#### 7. Tasks
- `/tasks` - Task list view
- `/tasks/board` - Kanban board
- `/tasks/create` - Create task
- `/tasks/:id` - Task details

#### 8. Appointments
- `/appointments` - Appointments list
- `/appointments/calendar` - Calendar view
- `/appointments/create` - Create appointment
- `/appointments/walk-in` - Walk-in management

#### 9. Finance
- `/invoices` - Invoices list
- `/invoices/create` - Create invoice
- `/invoices/:id` - Invoice details
- `/payments` - Payments list
- `/payments/create` - Record payment
- `/commissions` - Commission tracking

#### 10. Communication
- `/communication/templates` - Message templates
- `/communication/logs` - Communication logs
- `/communication/bulk-send` - Bulk communication

#### 11. Reports
- `/reports/sales` - Sales reports
- `/reports/cases` - Case reports
- `/reports/finance` - Financial reports
- `/reports/documents` - Document reports
- `/reports/team` - Team performance

#### 12. Settings
- `/settings/profile` - User profile
- `/settings/users` - User management
- `/settings/roles` - Role & permissions
- `/settings/branches` - Branch management
- `/settings/visa-types` - Visa types
- `/settings/document-templates` - Document templates
- `/settings/service-packages` - Service packages
- `/settings/system` - System settings

### Client Portal Pages

- `/portal/login` - Client login
- `/portal/dashboard` - Client dashboard
- `/portal/documents` - Document checklist & upload
- `/portal/invoices` - Invoices & payments
- `/portal/appointments` - Appointments
- `/portal/messages` - Messages
- `/portal/profile` - Profile settings

---

## 🎨 UI/UX Design Guidelines

### Design Principles
1. **Clean & Professional** - Migration consultancy is a serious business
2. **Data-Dense but Organized** - Lots of information, well-structured
3. **Quick Actions** - Common tasks accessible within 2 clicks
4. **Mobile Responsive** - Tablet-friendly for on-the-go consultants
5. **Accessibility** - WCAG 2.1 AA compliant

### Color Scheme (Suggested)
```css
Primary: #2563EB (Blue - Trust & Professionalism)
Secondary: #10B981 (Green - Success & Growth)
Accent: #F59E0B (Amber - Attention & Warnings)
Danger: #EF4444 (Red - Errors & Urgent)
Neutral: #64748B (Slate - Text & Borders)
Background: #F8FAFC (Light Gray)
```

### Component Library
- **Tables**: Sortable, filterable, with pagination
- **Forms**: Multi-step wizards for complex data entry
- **Cards**: Information cards with quick actions
- **Modals**: For quick edits without page navigation
- **Dropdowns**: For filters and quick actions
- **Badges**: Status indicators (color-coded)
- **Timeline**: For activity logs and case progress
- **Kanban**: Drag-and-drop boards
- **Calendar**: Full-featured calendar component
- **Charts**: Line, bar, pie, donut charts
- **File Upload**: Drag-and-drop with preview

---

## 🔐 Security & Compliance

### Authentication & Authorization
1. **Password Policy**
   - Minimum 8 characters
   - Must include uppercase, lowercase, number, special character
   - Password expiry (90 days)
   - Password history (last 5 passwords)

2. **Session Management**
   - JWT access token (15 min expiry)
   - Refresh token (7 days)
   - Automatic logout on inactivity (30 min)

3. **Role-Based Access Control (RBAC)**
   - Granular permissions
   - Permission inheritance
   - Dynamic permission checking

4. **Two-Factor Authentication (Optional)**
   - TOTP (Google Authenticator)
   - SMS OTP

### Data Security
1. **Encryption**
   - Data at rest: AES-256
   - Data in transit: TLS 1.3
   - Sensitive fields: Encrypted in database (passport numbers, etc.)

2. **File Security**
   - Virus scanning on upload
   - Encrypted storage
   - Signed URLs for downloads (expiring links)
   - Watermarking for sensitive documents

3. **Audit Trail**
   - All CRUD operations logged
   - User actions tracked
   - IP address & user agent logged
   - Immutable logs

4. **Backup & Recovery**
   - Daily automated backups
   - Point-in-time recovery
   - Backup encryption
   - Disaster recovery plan

### Compliance
1. **GDPR Compliance** (if applicable)
   - Right to access
   - Right to erasure
   - Data portability
   - Consent management

2. **Data Retention**
   - Client data: 7 years (or as per local law)
   - Financial records: 7 years
   - Communication logs: 3 years

---

## 🚀 Development Phases & Timeline

### Phase 1: MVP (Foundation) - 4-6 Weeks

#### Week 1-2: Setup & Core Infrastructure
- [ ] Project setup (Next.js + Node.js)
- [ ] Database design & creation
- [ ] Authentication system (JWT)
- [ ] Role & permission system
- [ ] User management
- [ ] Basic dashboard layout

#### Week 3-4: Leads & Client Management
- [ ] Leads module (CRUD)
- [ ] Lead pipeline (Kanban)
- [ ] Follow-up system
- [ ] Client onboarding
- [ ] Client profile management
- [ ] Lead-to-client conversion

#### Week 5-6: Cases & Documents
- [ ] Case creation & management
- [ ] Case status tracking
- [ ] Document templates
- [ ] Document upload & verification
- [ ] Basic checklist system
- [ ] Simple task management

**Deliverables:**
✅ Working authentication
✅ Leads → Clients → Cases flow
✅ Document management
✅ Basic dashboard
✅ User roles & permissions

---

### Phase 2: Automation & Workflow - 6-8 Weeks

#### Week 7-8: Advanced Case Management
- [ ] Milestone tracking
- [ ] Case timeline visualization
- [ ] Deadline management
- [ ] Automated reminders
- [ ] Case team assignment
- [ ] Internal notes & collaboration

#### Week 9-10: Finance Module
- [ ] Service packages
- [ ] Invoice generation
- [ ] Payment recording
- [ ] Installment plans
- [ ] Payment reminders
- [ ] Basic financial reports

#### Week 11-12: Communication & Templates
- [ ] Email templates
- [ ] WhatsApp templates
- [ ] Communication logs
- [ ] Email integration (SendGrid/SES)
- [ ] Bulk communication
- [ ] Template variables

#### Week 13-14: Appointments & Tasks
- [ ] Appointment booking
- [ ] Calendar view
- [ ] Appointment reminders
- [ ] Task board (Kanban)
- [ ] Task assignments
- [ ] Task notifications

**Deliverables:**
✅ Complete case workflow
✅ Financial management
✅ Communication system
✅ Appointment scheduling
✅ Task management

---

### Phase 3: Client Portal & Advanced Features - 8-10 Weeks

#### Week 15-16: Client Portal
- [ ] Client portal authentication
- [ ] Client dashboard
- [ ] Document upload (client-side)
- [ ] Invoice viewing
- [ ] Appointment booking
- [ ] Messaging system

#### Week 17-18: Advanced Reporting
- [ ] Executive dashboard
- [ ] Sales reports
- [ ] Case reports
- [ ] Financial reports
- [ ] Team performance reports
- [ ] Export functionality (PDF, Excel)

#### Week 19-20: Commission & Multi-Branch
- [ ] Commission rules
- [ ] Commission calculation
- [ ] Commission reports
- [ ] Branch management
- [ ] Branch-specific access control
- [ ] Branch performance comparison

#### Week 21-22: Integrations & Automation
- [ ] WhatsApp Business API integration
- [ ] SMS gateway integration
- [ ] Google Calendar sync
- [ ] Automated workflows
- [ ] Email automation
- [ ] Document expiry alerts

#### Week 23-24: Polish & Testing
- [ ] UI/UX refinements
- [ ] Performance optimization
- [ ] Security audit
- [ ] User acceptance testing
- [ ] Bug fixes
- [ ] Documentation

**Deliverables:**
✅ Client portal
✅ Comprehensive reporting
✅ Commission system
✅ Multi-branch support
✅ Third-party integrations
✅ Production-ready system

---

## 📊 Success Metrics

### Technical Metrics
- Page load time < 2 seconds
- API response time < 500ms
- 99.9% uptime
- Zero data loss
- < 1% error rate

### Business Metrics
- 30% increase in lead conversion
- 50% reduction in document processing time
- 40% reduction in missed follow-ups
- 25% increase in client satisfaction
- 20% increase in revenue per consultant

---

## 🔄 Post-Launch Roadmap

### Phase 4: Advanced Features (3-6 months post-launch)
- [ ] AI-powered lead scoring
- [ ] Chatbot for client queries
- [ ] Mobile app (React Native)
- [ ] Advanced analytics & predictions
- [ ] Integration with immigration portals
- [ ] E-signature integration
- [ ] Video consultation integration (Zoom/Meet)
- [ ] Multi-language support
- [ ] White-label capability

### Phase 5: Scale & Optimize (6-12 months post-launch)
- [ ] Microservices architecture (if needed)
- [ ] Advanced caching strategies
- [ ] CDN optimization
- [ ] Load balancing
- [ ] Horizontal scaling
- [ ] Advanced security features
- [ ] Compliance certifications

---

## 💡 Best Practices & Recommendations

### Development
1. **Code Quality**
   - ESLint + Prettier
   - TypeScript (strongly recommended)
   - Code reviews
   - Unit tests (Jest)
   - Integration tests
   - E2E tests (Playwright)

2. **Git Workflow**
   - Feature branches
   - Pull requests
   - Semantic versioning
   - Changelog maintenance

3. **Documentation**
   - API documentation (Swagger/OpenAPI)
   - Code comments
   - README files
   - User manual
   - Admin guide

### Deployment
1. **CI/CD Pipeline**
   - GitHub Actions / GitLab CI
   - Automated testing
   - Automated deployment
   - Rollback capability

2. **Monitoring**
   - Application monitoring (PM2 Plus / New Relic)
   - Error tracking (Sentry)
   - Log aggregation (Logtail / Papertrail)
   - Uptime monitoring (UptimeRobot)

3. **Performance**
   - Database indexing
   - Query optimization
   - Caching (Redis)
   - Image optimization
   - Code splitting
   - Lazy loading

---

## 📝 Next Steps

### Immediate Actions
1. **Review & Approve** this document
2. **Finalize** technology stack choices
3. **Set up** development environment
4. **Create** project repository
5. **Design** database schema in detail
6. **Create** wireframes/mockups for key screens
7. **Set up** project management (Trello/Jira)
8. **Define** sprint schedule

### Questions to Address
1. Do you want to use **NestJS** or **Express.js** for backend?
2. Should we use **TypeScript** throughout?
3. Do you need **multi-tenancy** (SaaS model) or single-tenant?
4. What's your preference for **UI component library** (shadcn/ui, Material-UI, Ant Design)?
5. Do you want **real-time features** (WebSockets for notifications)?
6. What's the **initial deployment target** (DigitalOcean droplet size)?
7. Do you need **internationalization** (i18n) from day one?

---

## 📎 Appendix

### A. Sample Workflows

#### Workflow 1: Lead to Client Conversion
1. Lead captured (website form / manual entry)
2. Auto-assigned to sales agent
3. Sales agent contacts lead
4. Follow-up scheduled
5. Appointment booked
6. Consultation completed
7. Service package selected
8. Agreement generated
9. Client signs agreement
10. Lead converted to client
11. Case created
12. Invoice generated

#### Workflow 2: Document Collection
1. Case created
2. Document checklist auto-generated (based on visa type)
3. Email sent to client with checklist
4. Client uploads documents via portal
5. Document officer receives notification
6. Document verified/rejected
7. If rejected, client notified to re-upload
8. All documents verified
9. Case moves to next milestone

#### Workflow 3: Payment Collection
1. Invoice generated
2. Invoice sent to client (email + portal)
3. Payment reminder (7 days before due date)
4. Payment reminder (on due date)
5. Payment reminder (3 days overdue)
6. Payment received
7. Receipt generated & sent
8. Invoice marked as paid
9. Commission calculated for agent

### B. Sample API Response Formats

```json
// GET /api/leads/:id
{
  "success": true,
  "data": {
    "id": 1,
    "lead_number": "LEAD-2024-0001",
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "visa_type_interest": "Student Visa",
    "lead_status": "follow_up",
    "lead_score": 75,
    "assigned_to": {
      "id": 5,
      "name": "Sarah Agent"
    },
    "created_at": "2024-01-15T10:30:00Z",
    "next_followup": {
      "date": "2024-01-20T14:00:00Z",
      "type": "call"
    }
  }
}

// GET /api/cases/:id
{
  "success": true,
  "data": {
    "id": 1,
    "case_number": "CASE-2024-0001",
    "client": {
      "id": 10,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "visa_type": "Student Visa - Australia",
    "current_status": "Documents Collection",
    "progress_percentage": 35,
    "assigned_officer": {
      "id": 8,
      "name": "Michael Consultant"
    },
    "milestones": [
      {
        "name": "Documents Collection",
        "status": "in_progress",
        "completion": 60
      },
      {
        "name": "Eligibility Assessment",
        "status": "pending",
        "completion": 0
      }
    ],
    "created_at": "2024-01-10T09:00:00Z"
  }
}
```

### C. Environment Variables Template

```env
# Application
NODE_ENV=production
PORT=5000
APP_URL=https://yourdomain.com
FRONTEND_URL=https://yourdomain.com

# Database
DB_HOST=your-db-host
DB_PORT=3306
DB_NAME=migration_erp
DB_USER=your-db-user
DB_PASSWORD=your-db-password

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-refresh-token-secret
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# File Storage (DigitalOcean Spaces)
DO_SPACES_ENDPOINT=https://sgp1.digitaloceanspaces.com
DO_SPACES_KEY=your-spaces-key
DO_SPACES_SECRET=your-spaces-secret
DO_SPACES_BUCKET=migration-docs

# Email (SendGrid)
SENDGRID_API_KEY=your-sendgrid-key
EMAIL_FROM=noreply@yourdomain.com

# SMS (Twilio)
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=+1234567890

# WhatsApp (Twilio)
TWILIO_WHATSAPP_NUMBER=whatsapp:+1234567890

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your-redis-password

# Encryption
ENCRYPTION_KEY=your-32-character-encryption-key
```

---

## ✅ Conclusion

This comprehensive plan provides a complete roadmap for building a world-class Migration Consultancy ERP system. The phased approach ensures:

1. **Quick Time-to-Market** - MVP in 4-6 weeks
2. **Scalability** - Architecture supports growth
3. **Maintainability** - Clean code & documentation
4. **User Satisfaction** - Intuitive UI/UX
5. **Business Value** - ROI through automation & efficiency

**Total Estimated Timeline:** 24-28 weeks for complete system

**Recommended Team:**
- 1 Full-Stack Developer (You)
- 1 UI/UX Designer (Part-time, initial phase)
- 1 QA Tester (Part-time, later phases)

---

**Document Version:** 1.0  
**Created:** January 6, 2026  
**Author:** Antigravity AI  
**Status:** Ready for Review

---

## 🎯 What's Next?

I'm ready to proceed with:

1. **Detailed UI/UX Designs** - Wireframes & mockups for all key screens
2. **Database Schema SQL** - Complete SQL script with all tables, indexes, and relationships
3. **API Documentation** - Complete API specification with all endpoints
4. **Project Structure** - Folder structure for both frontend and backend
5. **Development Kickoff** - Start building the MVP

**Please review this document and let me know:**
- Any changes or additions needed
- Which phase you'd like to start with
- Technology preferences (NestJS vs Express, etc.)
- When you're ready for UI design phase

I'm excited to help you build this comprehensive system! 🚀
