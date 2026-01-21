# Migration Consultancy ERP - Complete Sidebar Menu Structure

## 📊 Overview & Statistics

### System Summary
- **Total Main Menu Items**: 11
- **Total Sub-menu Items**: 100+
- **Total Routes Defined**: 100+
- **Role-based Access Levels**: 8
- **Icon System**: Lucide React Icons + Emoji indicators
- **Menu Type**: Hierarchical, Role-based, Collapsible
- **Navigation Style**: Sidebar with nested dropdowns

---

## 🎨 Complete Menu Hierarchy

### 1. 📊 Dashboard

**Main Route**: `/`  
**Permission**: `dashboard.view`  
**Icon**: `LayoutDashboard`  
**Accessible By**: All Roles

#### Sub-menu Items:
```
📊 Dashboard
├── 🏠 Home Dashboard
│   Route: /
│   Permission: dashboard.view
│   Description: Main overview with KPIs and quick stats
│   
├── 📈 Sales Dashboard
│   Route: /dashboard/sales
│   Permission: dashboard.sales.view
│   Description: Sales metrics, lead conversion, revenue
│   Accessible: Super Admin, Admin, Branch Manager, Sales Agent
│   
└── 📋 Operations Dashboard
    Route: /dashboard/operations
    Permission: dashboard.operations.view
    Description: Case progress, task completion, team workload
    Accessible: Super Admin, Admin, Branch Manager, Case Officer
```

---

### 2. 💼 Leads & CRM

**Main Route**: `/leads`  
**Permission**: `leads.view`  
**Icon**: `Users`  
**Accessible By**: Super Admin, Admin, Branch Manager, Sales Agent

#### Sub-menu Items:
```
💼 Leads & CRM
├── 📝 All Leads
│   Route: /leads
│   Permission: leads.view
│   Description: Complete list of all leads with filters
│   Features: Search, filter by status/source, export
│   Badge: Total active leads count
│   
├── 🎯 Pipeline View
│   Route: /leads/pipeline
│   Permission: leads.view
│   Description: Kanban board for lead stages
│   Stages: New → Contacted → Follow-up → Appointment → Converted → Lost
│   Features: Drag-and-drop, stage-specific actions
│   
├── ➕ Add New Lead
│   Route: /leads/create
│   Permission: leads.create
│   Description: Create new lead entry
│   Form Fields: Personal info, contact, visa interest, source
│   
├── 📊 Lead Sources
│   Route: /leads/sources
│   Permission: leads.view
│   Description: Manage and track lead sources
│   Examples: Facebook Ads, Google, Referral, Walk-in, Website
│   
├── 📞 Follow-ups
│   Route: /leads/followups
│   Permission: leads.view
│   Description: Scheduled follow-ups and reminders
│   Features: Calendar view, overdue alerts, completion tracking
│   Badge: Pending follow-ups count
│   
└── 📑 Lead Reports
    Route: /leads/reports
    Permission: reports.leads.view
    Description: Lead analytics and conversion reports
    Reports: Conversion rate, source performance, lost lead analysis
```

---

### 3. 👥 Clients

**Main Route**: `/clients`  
**Permission**: `clients.view`  
**Icon**: `UserCheck`  
**Accessible By**: All except Receptionist (limited access)

#### Sub-menu Items:
```
👥 Clients
├── 📋 All Clients
│   Route: /clients
│   Permission: clients.view
│   Description: Complete client database
│   Features: Advanced search, filters, export, bulk actions
│   Columns: Client ID, Name, Visa Type, Status, Consultant
│   
├── ➕ Add New Client
│   Route: /clients/create
│   Permission: clients.create
│   Description: Client onboarding form
│   Sections: Personal info, passport, family, employment, education
│   
├── 👨‍👩‍👧‍👦 Client Families
│   Route: /clients/families
│   Permission: clients.view
│   Description: Manage client family members and dependents
│   Features: Add spouse, children, parents, siblings
│   
├── 📄 Agreements
│   Route: /clients/agreements
│   Permission: clients.agreements.view
│   Description: Service agreements and contracts
│   Features: Generate, upload, e-signature, status tracking
│   Statuses: Draft, Sent, Signed, Cancelled
│   
└── 🔍 Client Search
    Route: /clients/search
    Permission: clients.view
    Description: Advanced client search
    Search By: Name, email, phone, passport, client number
```

---

### 4. 📂 Cases

**Main Route**: `/cases`  
**Permission**: `cases.view`  
**Icon**: `Briefcase`  
**Accessible By**: Super Admin, Admin, Branch Manager, Case Officer, Document Officer (view only)

#### Sub-menu Items:
```
📂 Cases
├── 📋 All Cases
│   Route: /cases
│   Permission: cases.view
│   Description: Complete case list with filters
│   Filters: Status, visa type, consultant, priority, date range
│   
├── ➕ Create New Case
│   Route: /cases/create
│   Permission: cases.create
│   Description: Create new visa application case
│   Required: Client selection, visa type, destination, priority
│   
├── ⏳ In Progress
│   Route: /cases/in-progress
│   Permission: cases.view
│   Description: Active cases currently being processed
│   Badge: Count of in-progress cases
│   
├── ✅ Completed
│   Route: /cases/completed
│   Permission: cases.view
│   Description: Successfully completed cases
│   Filters: Completion date, visa type, consultant
│   
├── ⚠️ Overdue
│   Route: /cases/overdue
│   Permission: cases.view
│   Description: Cases past expected completion date
│   Badge: Overdue count (red badge)
│   Alert: High priority notification
│   
├── 📊 Case Timeline
│   Route: /cases/timeline
│   Permission: cases.view
│   Description: Visual timeline of case milestones
│   View: Gantt chart, milestone tracker
│   
└── 📈 Case Reports
    Route: /cases/reports
    Permission: reports.cases.view
    Description: Case analytics and performance
    Reports: Success rate, processing time, bottlenecks
```

---

### 5. 📄 Documents

**Main Route**: `/documents`  
**Permission**: `documents.view`  
**Icon**: `FileText`  
**Accessible By**: Super Admin, Admin, Case Officer, Document Officer

#### Sub-menu Items:
```
📄 Documents
├── 📁 All Documents
│   Route: /documents
│   Permission: documents.view
│   Description: Complete document repository
│   Features: Search, filter by status/type, bulk download
│   
├── ⏳ Pending Verification
│   Route: /documents/pending
│   Permission: documents.verify
│   Description: Documents awaiting verification
│   Badge: Pending count (orange badge)
│   Actions: Verify, Reject, Request reupload
│   
├── ✅ Verified
│   Route: /documents/verified
│   Permission: documents.view
│   Description: Approved documents
│   Features: Download, view history, version control
│   
├── ❌ Rejected
│   Route: /documents/rejected
│   Permission: documents.view
│   Description: Rejected documents needing resubmission
│   Shows: Rejection reason, rejected by, date
│   
├── ⏰ Expiring Soon
│   Route: /documents/expiring
│   Permission: documents.view
│   Description: Documents expiring in next 30 days
│   Badge: Expiring count (yellow badge)
│   Alerts: 30, 15, 7 days before expiry
│   
├── 📋 Document Templates
│   Route: /documents/templates
│   Permission: settings.documents.manage
│   Description: Manage document checklists per visa type
│   Features: Create, edit, assign to visa types
│   
└── 📊 Document Reports
    Route: /documents/reports
    Permission: reports.documents.view
    Description: Document completion and verification stats
    Reports: Completion rate, verification time, expired docs
```

---

### 6. ✅ Tasks

**Main Route**: `/tasks`  
**Permission**: `tasks.view`  
**Icon**: `CheckSquare`  
**Accessible By**: All Roles (filtered by assignment)

#### Sub-menu Items:
```
✅ Tasks
├── 📋 All Tasks
│   Route: /tasks
│   Permission: tasks.view
│   Description: Complete task list
│   Filters: Status, priority, assignee, due date
│   
├── 📊 Task Board (Kanban)
│   Route: /tasks/board
│   Permission: tasks.view
│   Description: Kanban board for task management
│   Columns: To Do, In Progress, Review, Done
│   Features: Drag-and-drop, quick edit, filters
│   
├── ➕ Create Task
│   Route: /tasks/create
│   Permission: tasks.create
│   Description: Create new task
│   Fields: Title, description, type, priority, assignee, due date
│   Link To: Lead, Client, or Case
│   
├── 👤 My Tasks
│   Route: /tasks/my-tasks
│   Permission: tasks.view
│   Description: Tasks assigned to current user
│   Badge: My pending tasks count
│   Default View: Sorted by due date
│   
├── 👥 Team Tasks
│   Route: /tasks/team
│   Permission: tasks.view
│   Description: Tasks for entire team/branch
│   Accessible: Managers and above
│   
├── ⏰ Overdue Tasks
│   Route: /tasks/overdue
│   Permission: tasks.view
│   Description: Tasks past due date
│   Badge: Overdue count (red badge)
│   Alert: Daily notification
│   
└── ✔️ Completed Tasks
    Route: /tasks/completed
    Permission: tasks.view
    Description: Completed task archive
    Filters: Completion date, completed by
```

---

### 7. 📅 Appointments

**Main Route**: `/appointments`  
**Permission**: `appointments.view`  
**Icon**: `Calendar`  
**Accessible By**: All Roles (filtered by assignment)

#### Sub-menu Items:
```
📅 Appointments
├── 📋 All Appointments
│   Route: /appointments
│   Permission: appointments.view
│   Description: List view of all appointments
│   Filters: Date range, consultant, status, type
│   
├── 📆 Calendar View
│   Route: /appointments/calendar
│   Permission: appointments.view
│   Description: Full calendar with appointments
│   Views: Day, Week, Month
│   Features: Drag-and-drop reschedule, color coding
│   
├── ➕ Book Appointment
│   Route: /appointments/create
│   Permission: appointments.create
│   Description: Schedule new appointment
│   Fields: Client, type, consultant, date/time, mode
│   Modes: In-person, Video call, Phone call
│   
├── 🚶 Walk-in Management
│   Route: /appointments/walk-in
│   Permission: appointments.walkin.manage
│   Description: Token system for walk-in clients
│   Features: Issue token, queue management, status tracking
│   Accessible: Receptionist, Branch Manager
│   
├── ⏰ Today's Appointments
│   Route: /appointments/today
│   Permission: appointments.view
│   Description: Today's schedule
│   Badge: Today's appointment count
│   Features: Quick check-in, mark completed/no-show
│   
└── 📊 Appointment Reports
    Route: /appointments/reports
    Permission: reports.appointments.view
    Description: Appointment analytics
    Reports: Show rate, consultant utilization, peak times
```

---

### 8. 💰 Finance

**Main Route**: `/finance`  
**Permission**: `finance.view`  
**Icon**: `DollarSign`  
**Accessible By**: Super Admin, Admin, Branch Manager, Accounts/Finance

#### Sub-menu Items:

#### 8.1 📄 Invoices
```
📄 Invoices
├── All Invoices
│   Route: /invoices
│   Permission: invoices.view
│   Description: Complete invoice list
│   Columns: Invoice #, Client, Amount, Status, Due Date
│   
├── Create Invoice
│   Route: /invoices/create
│   Permission: invoices.create
│   Description: Generate new invoice
│   Auto-populate: From service agreement
│   
├── Draft Invoices
│   Route: /invoices/draft
│   Permission: invoices.view
│   Description: Unsent draft invoices
│   Actions: Edit, Send, Delete
│   
├── Sent Invoices
│   Route: /invoices/sent
│   Permission: invoices.view
│   Description: Invoices sent to clients
│   Status: Awaiting payment
│   
├── Paid Invoices
│   Route: /invoices/paid
│   Permission: invoices.view
│   Description: Fully paid invoices
│   Features: Download receipt, view payment history
│   
└── Overdue Invoices
    Route: /invoices/overdue
    Permission: invoices.view
    Description: Invoices past due date
    Badge: Overdue count (red)
    Actions: Send reminder, record payment
```

#### 8.2 💳 Payments
```
💳 Payments
├── All Payments
│   Route: /payments
│   Permission: payments.view
│   Description: Payment transaction history
│   Columns: Payment #, Invoice, Amount, Method, Date
│   
├── Record Payment
│   Route: /payments/create
│   Permission: payments.create
│   Description: Record new payment
│   Methods: Cash, Bank Transfer, Card, Cheque
│   Features: Upload receipt, partial payment support
│   
├── Payment History
│   Route: /payments/history
│   Permission: payments.view
│   Description: Complete payment ledger
│   Filters: Date range, client, method
│   
└── Pending Payments
    Route: /payments/pending
    Permission: payments.view
    Description: Invoices awaiting payment
    Badge: Pending amount (total)
```

#### 8.3 📊 Installments
```
📊 Installments
├── All Installments
│   Route: /installments
│   Permission: installments.view
│   Description: All installment plans
│   Shows: Plan, due dates, amounts, status
│   
├── Due This Month
│   Route: /installments/due
│   Permission: installments.view
│   Description: Installments due in current month
│   Badge: Count of due installments
│   
└── Overdue Installments
    Route: /installments/overdue
    Permission: installments.view
    Description: Missed installment payments
    Badge: Overdue count (red)
    Actions: Send reminder, record payment
```

#### 8.4 💵 Commissions
```
💵 Commissions
├── Commission Overview
│   Route: /commissions
│   Permission: commissions.view
│   Description: Commission dashboard
│   Shows: Total earned, pending, paid
│   
├── Pending Commissions
│   Route: /commissions/pending
│   Permission: commissions.view
│   Description: Commissions awaiting approval/payment
│   Badge: Pending amount
│   
├── Paid Commissions
│   Route: /commissions/paid
│   Permission: commissions.view
│   Description: Commission payment history
│   Filters: Date range, consultant
│   
└── Commission Rules
    Route: /commissions/rules
    Permission: settings.commissions.manage
    Description: Configure commission rates
    Types: Percentage, Fixed amount
    Accessible: Super Admin, Admin only
```

#### 8.5 📈 Financial Reports
```
📈 Financial Reports
├── Revenue Reports
│   Route: /finance/reports/revenue
│   Permission: reports.finance.view
│   Description: Revenue analysis
│   Views: Daily, Monthly, Yearly
│   Charts: Line graph, bar chart
│   
├── Outstanding Payments
│   Route: /finance/reports/outstanding
│   Permission: reports.finance.view
│   Description: Accounts receivable report
│   Shows: Aging analysis, client-wise outstanding
│   
├── Profit & Loss
│   Route: /finance/reports/pnl
│   Permission: reports.finance.view
│   Description: P&L statement
│   Accessible: Super Admin, Admin, Branch Manager
│   
└── Tax Reports
    Route: /finance/reports/tax
    Permission: reports.finance.view
    Description: Tax calculation and reports
    Features: GST/VAT summary, export for filing
```

---

### 9. 💬 Communication

**Main Route**: `/communication`  
**Permission**: `communication.view`  
**Icon**: `MessageSquare`  
**Accessible By**: Super Admin, Admin, Case Officer, Sales Agent

#### Sub-menu Items:
```
💬 Communication
├── 📧 Email Templates
│   Route: /communication/email-templates
│   Permission: communication.templates.manage
│   Description: Manage email templates
│   Categories: Appointment, Document Request, Payment Reminder, Status Update
│   Features: Variables, HTML editor, preview
│   
├── 💬 WhatsApp Templates
│   Route: /communication/whatsapp-templates
│   Permission: communication.templates.manage
│   Description: WhatsApp message templates
│   Features: Copy to clipboard, send via API
│   Status: Approved, Pending approval
│   
├── 📱 SMS Templates
│   Route: /communication/sms-templates
│   Permission: communication.templates.manage
│   Description: SMS message templates
│   Features: Character count, variable support
│   
├── 📜 Communication Logs
│   Route: /communication/logs
│   Permission: communication.view
│   Description: Complete communication history
│   Types: Email, WhatsApp, SMS, Call, Meeting
│   Filters: Client, type, date range
│   
├── 📤 Bulk Send
│   Route: /communication/bulk-send
│   Permission: communication.bulk.send
│   Description: Send messages to multiple clients
│   Features: Filter recipients, schedule sending
│   Accessible: Admin, Branch Manager only
│   
└── 📊 Communication Reports
    Route: /communication/reports
    Permission: reports.communication.view
    Description: Communication analytics
    Reports: Delivery rate, response rate, volume
```

---

### 10. 📊 Reports & Analytics

**Main Route**: `/reports`  
**Permission**: `reports.view`  
**Icon**: `BarChart3`  
**Accessible By**: Super Admin, Admin, Branch Manager

#### Sub-menu Items:

#### 10.1 📈 Executive Dashboard
```
📈 Executive Dashboard
Route: /reports/executive
Permission: reports.executive.view
Description: High-level business overview
Widgets: Revenue, Conversion rate, Active cases, Team performance
Charts: Trend lines, pie charts, bar graphs
Accessible: Super Admin, Admin, Branch Manager only
```

#### 10.2 💼 Sales Reports
```
💼 Sales Reports
├── Lead Conversion
│   Route: /reports/sales/conversion
│   Permission: reports.sales.view
│   Description: Lead to client conversion analysis
│   Metrics: Conversion rate, funnel visualization, time to convert
│   
├── Lead Sources
│   Route: /reports/sales/sources
│   Permission: reports.sales.view
│   Description: Lead source performance
│   Shows: ROI per source, volume, conversion by source
│   
├── Sales by Consultant
│   Route: /reports/sales/by-consultant
│   Permission: reports.sales.view
│   Description: Individual consultant performance
│   Metrics: Leads handled, conversion rate, revenue generated
│   
└── Lost Leads Analysis
    Route: /reports/sales/lost-leads
    Permission: reports.sales.view
    Description: Analysis of lost opportunities
    Shows: Lost reasons, stage of loss, recovery attempts
```

#### 10.3 📂 Case Reports
```
📂 Case Reports
├── Cases by Status
│   Route: /reports/cases/by-status
│   Permission: reports.cases.view
│   Description: Case distribution by status
│   Chart: Pie chart, status breakdown
│   
├── Cases by Visa Type
│   Route: /reports/cases/by-visa-type
│   Permission: reports.cases.view
│   Description: Visa type distribution and success rate
│   Shows: Volume per type, success rate, average processing time
│   
├── Processing Time
│   Route: /reports/cases/processing-time
│   Permission: reports.cases.view
│   Description: Average case processing duration
│   Breakdown: By visa type, by consultant, by milestone
│   
└── Success Rate
    Route: /reports/cases/success-rate
    Permission: reports.cases.view
    Description: Visa approval success metrics
    Shows: Overall success rate, by visa type, trends
```

#### 10.4 💰 Financial Reports
```
💰 Financial Reports
├── Revenue by Period
│   Route: /reports/finance/revenue
│   Permission: reports.finance.view
│   Description: Revenue trends over time
│   Views: Daily, Weekly, Monthly, Yearly
│   
├── Revenue by Visa Type
│   Route: /reports/finance/by-visa-type
│   Permission: reports.finance.view
│   Description: Revenue breakdown by service type
│   Shows: Most profitable visa types
│   
├── Payment Collection
│   Route: /reports/finance/collection
│   Permission: reports.finance.view
│   Description: Payment collection efficiency
│   Metrics: Collection rate, average days to payment
│   
└── Commission Summary
    Route: /reports/finance/commissions
    Permission: reports.finance.view
    Description: Commission payout analysis
    Shows: Total commissions, by consultant, trends
```

#### 10.5 📄 Document Reports
```
📄 Document Reports
├── Completion Rate
│   Route: /reports/documents/completion
│   Permission: reports.documents.view
│   Description: Document checklist completion stats
│   Shows: Average completion %, bottlenecks
│   
├── Pending Verifications
│   Route: /reports/documents/pending
│   Permission: reports.documents.view
│   Description: Document verification backlog
│   Shows: Pending count, aging, by document type
│   
└── Expired Documents
    Route: /reports/documents/expired
    Permission: reports.documents.view
    Description: Expired document tracking
    Shows: Expired count, expiring soon, renewal status
```

#### 10.6 👥 Team Performance
```
👥 Team Performance
├── Tasks Completed
│   Route: /reports/team/tasks
│   Permission: reports.team.view
│   Description: Task completion metrics
│   Shows: Completion rate, average time, overdue %
│   
├── Cases Handled
│   Route: /reports/team/cases
│   Permission: reports.team.view
│   Description: Case workload distribution
│   Shows: Cases per consultant, completion rate
│   
└── Consultant Performance
    Route: /reports/team/consultants
    Permission: reports.team.view
    Description: Individual performance scorecard
    Metrics: Cases closed, client satisfaction, revenue
```

---

### 11. ⚙️ Settings

**Main Route**: `/settings`  
**Permission**: `settings.view`  
**Icon**: `Settings`  
**Accessible By**: Super Admin, Admin (limited), Branch Manager (branch-specific)

#### Sub-menu Items:

#### 11.1 👤 My Profile
```
👤 My Profile
Route: /settings/profile
Permission: profile.edit
Description: User profile and preferences
Sections: Personal info, password change, preferences, notifications
Accessible: All users (own profile only)
```

#### 11.2 👥 User Management
```
👥 User Management
├── All Users
│   Route: /settings/users
│   Permission: users.view
│   Description: User list and management
│   Actions: Add, edit, deactivate, reset password
│   
├── Add User
│   Route: /settings/users/create
│   Permission: users.create
│   Description: Create new user account
│   Fields: Name, email, role, branch, permissions
│   
├── Roles & Permissions
│   Route: /settings/roles
│   Permission: roles.manage
│   Description: Role and permission management
│   Features: Create roles, assign permissions
│   Accessible: Super Admin only
│   
└── Activity Logs
    Route: /settings/activity-logs
    Permission: logs.view
    Description: User activity audit trail
    Shows: Who did what, when, IP address
    Accessible: Super Admin, Admin only
```

#### 11.3 🏢 Branch Management
```
🏢 Branch Management
├── All Branches
│   Route: /settings/branches
│   Permission: branches.view
│   Description: Branch list and details
│   Shows: Branch name, location, staff count
│   
├── Add Branch
│   Route: /settings/branches/create
│   Permission: branches.create
│   Description: Create new branch
│   Fields: Name, code, address, contact info
│   
└── Branch Settings
    Route: /settings/branches/settings
    Permission: branches.manage
    Description: Branch-specific configurations
    Settings: Working hours, services offered
```

#### 11.4 🛂 Visa Configuration
```
🛂 Visa Configuration
├── Visa Types
│   Route: /settings/visa-types
│   Permission: settings.visa.manage
│   Description: Manage visa types
│   Examples: Student, Tourist, Skilled, Partner
│   
├── Add Visa Type
│   Route: /settings/visa-types/create
│   Permission: settings.visa.create
│   Description: Create new visa type
│   Fields: Name, code, country, processing time
│   
├── Milestones
│   Route: /settings/milestones
│   Permission: settings.visa.manage
│   Description: Configure case milestones
│   Features: Define stages, sequence, estimated days
│   
└── Processing Times
    Route: /settings/processing-times
    Permission: settings.visa.manage
    Description: Expected processing durations
    By: Visa type, destination country
```

#### 11.5 📄 Document Configuration
```
📄 Document Configuration
├── Document Templates
│   Route: /settings/document-templates
│   Permission: settings.documents.manage
│   Description: Manage document templates
│   Features: Create, edit, assign to visa types
│   
├── Document Categories
│   Route: /settings/document-categories
│   Permission: settings.documents.manage
│   Description: Document category management
│   Examples: Identity, Financial, Educational
│   
└── Checklist Builder
    Route: /settings/checklist-builder
    Permission: settings.documents.manage
    Description: Build document checklists
    Features: Drag-and-drop, mandatory/optional flags
```

#### 11.6 💼 Service Packages
```
💼 Service Packages
├── All Packages
│   Route: /settings/packages
│   Permission: settings.packages.view
│   Description: Service package list
│   Types: Basic, Standard, Premium
│   
├── Add Package
│   Route: /settings/packages/create
│   Permission: settings.packages.create
│   Description: Create service package
│   Fields: Name, visa type, price, features
│   
├── Add-on Services
│   Route: /settings/addons
│   Permission: settings.packages.manage
│   Description: Manage add-on services
│   Examples: Translation, Courier, Priority processing
│   
└── Pricing Rules
    Route: /settings/pricing
    Permission: settings.packages.manage
    Description: Configure pricing rules
    Features: Discounts, seasonal pricing
```

#### 11.7 📧 Email Configuration
```
📧 Email Configuration
├── SMTP Settings
│   Route: /settings/email/smtp
│   Permission: settings.email.manage
│   Description: Email server configuration
│   Fields: Host, port, username, password
│   Accessible: Super Admin only
│   
├── Email Templates
│   Route: /settings/email/templates
│   Permission: settings.email.templates
│   Description: System email templates
│   Types: Welcome, Password reset, Notifications
│   
└── Email Logs
    Route: /settings/email/logs
    Permission: settings.email.view
    Description: Email sending history
    Shows: Sent, failed, delivery status
```

#### 11.8 💬 Communication Settings
```
💬 Communication Settings
├── WhatsApp API
│   Route: /settings/whatsapp
│   Permission: settings.communication.manage
│   Description: WhatsApp Business API setup
│   Fields: API key, phone number, webhook
│   
├── SMS Gateway
│   Route: /settings/sms
│   Permission: settings.communication.manage
│   Description: SMS service configuration
│   Providers: Twilio, AWS SNS
│   
└── Notification Settings
    Route: /settings/notifications
    Permission: settings.notifications.manage
    Description: System notification preferences
    Configure: Email, SMS, WhatsApp, In-app
```

#### 11.9 🔐 Security
```
🔐 Security
├── Password Policy
│   Route: /settings/security/password
│   Permission: settings.security.manage
│   Description: Password requirements
│   Settings: Min length, complexity, expiry
│   
├── Two-Factor Auth
│   Route: /settings/security/2fa
│   Permission: settings.security.manage
│   Description: 2FA configuration
│   Methods: TOTP, SMS
│   
├── Session Management
│   Route: /settings/security/sessions
│   Permission: settings.security.manage
│   Description: Session timeout and controls
│   Settings: Timeout duration, concurrent sessions
│   
└── IP Whitelist
    Route: /settings/security/ip-whitelist
    Permission: settings.security.manage
    Description: IP-based access control
    Features: Add/remove IPs, enable/disable
```

#### 11.10 🔔 Notifications
```
🔔 Notifications
├── Notification Rules
│   Route: /settings/notifications/rules
│   Permission: settings.notifications.manage
│   Description: Configure notification triggers
│   Examples: New lead, payment received, task overdue
│   
├── Email Notifications
│   Route: /settings/notifications/email
│   Permission: settings.notifications.manage
│   Description: Email notification settings
│   Configure: Recipients, frequency, templates
│   
└── In-App Notifications
    Route: /settings/notifications/in-app
    Permission: settings.notifications.manage
    Description: In-app notification preferences
    Settings: Sound, desktop notifications, badge
```

#### 11.11 🔧 System Settings
```
🔧 System Settings
├── General Settings
│   Route: /settings/general
│   Permission: settings.system.manage
│   Description: General system configuration
│   Settings: App name, timezone, date format
│   
├── Company Information
│   Route: /settings/company
│   Permission: settings.system.manage
│   Description: Company details
│   Fields: Name, logo, address, contact, tax ID
│   
├── Backup & Restore
│   Route: /settings/backup
│   Permission: settings.system.manage
│   Description: Database backup management
│   Features: Manual backup, scheduled backups, restore
│   Accessible: Super Admin only
│   
├── System Logs
│   Route: /settings/logs
│   Permission: settings.system.view
│   Description: System error and activity logs
│   Shows: Errors, warnings, info logs
│   Accessible: Super Admin only
│   
└── API Keys
    Route: /settings/api-keys
    Permission: settings.system.manage
    Description: API key management
    Features: Generate, revoke, usage tracking
    Accessible: Super Admin only
```

---

### 12. 🌐 Client Portal (Separate Application)

**Main Route**: `/portal`  
**Permission**: Client authentication required  
**Icon**: `Globe`  
**Accessible By**: Client Portal Users only

#### Sub-menu Items:
```
🌐 Client Portal
├── 🏠 Dashboard
│   Route: /portal/dashboard
│   Description: Client overview dashboard
│   Shows: Case status, document progress, payment status
│   Widgets: Next appointment, pending documents, messages
│   
├── 📄 My Documents
│   Route: /portal/documents
│   Description: Document checklist and upload
│   Features: View requirements, upload files, track status
│   Status: Pending, Received, Verified, Rejected
│   
├── 💰 Invoices & Payments
│   Route: /portal/invoices
│   Description: Invoice and payment information
│   Shows: Invoices, payment history, installment schedule
│   Features: Download invoice, download receipt
│   
├── 📅 My Appointments
│   Route: /portal/appointments
│   Description: Appointment management
│   Features: View scheduled, book new, reschedule, cancel
│   Shows: Upcoming appointments, past appointments
│   
├── 💬 Messages
│   Route: /portal/messages
│   Description: Communication with consultants
│   Features: Send message, view history, attachments
│   Badge: Unread message count
│   
└── ⚙️ Profile Settings
    Route: /portal/profile
    Description: Client profile and settings
    Sections: Personal info, password change, notification preferences
```

---

## 🎭 Role-Based Access Control (RBAC)

### Access Matrix by Role

#### 1. Super Admin
**Access Level**: Full System Access

**Accessible Menus**:
- ✅ Dashboard (All)
- ✅ Leads & CRM (All)
- ✅ Clients (All)
- ✅ Cases (All)
- ✅ Documents (All)
- ✅ Tasks (All)
- ✅ Appointments (All)
- ✅ Finance (All)
- ✅ Communication (All)
- ✅ Reports & Analytics (All)
- ✅ Settings (All)

**Special Permissions**:
- System Settings
- User Management
- Role & Permission Management
- API Keys
- Backup & Restore
- Activity Logs
- Security Settings

---

#### 2. Admin/Director
**Access Level**: Management Level

**Accessible Menus**:
- ✅ Dashboard (All)
- ✅ Leads & CRM (All)
- ✅ Clients (All)
- ✅ Cases (All)
- ✅ Documents (All)
- ✅ Tasks (All)
- ✅ Appointments (All)
- ✅ Finance (All)
- ✅ Communication (All)
- ✅ Reports & Analytics (All)
- ✅ Settings (Limited)

**Hidden Menus**:
- ❌ System Settings → API Keys
- ❌ System Settings → Backup & Restore
- ❌ System Settings → System Logs
- ❌ Security → IP Whitelist

**Restrictions**:
- Cannot delete users
- Cannot modify system-level settings
- Cannot access API keys

---

#### 3. Branch Manager
**Access Level**: Branch-Specific Management

**Accessible Menus**:
- ✅ Dashboard (Home, Sales, Operations)
- ✅ Leads & CRM (All)
- ✅ Clients (All)
- ✅ Cases (All)
- ✅ Documents (All)
- ✅ Tasks (All)
- ✅ Appointments (All)
- ✅ Finance (View only, no delete)
- ✅ Communication (All)
- ✅ Reports & Analytics (Branch-specific)
- ⚠️ Settings (Branch settings only)

**Hidden Menus**:
- ❌ Settings → User Management (except branch users)
- ❌ Settings → Roles & Permissions
- ❌ Settings → System Settings
- ❌ Settings → Security
- ❌ Finance → Commission Rules (view only)
- ❌ Reports → Global reports (only branch reports)

**Data Scope**:
- Only see data from assigned branch
- Cannot access other branches' data

---

#### 4. Sales/Lead Agent
**Access Level**: Sales Module Focus

**Accessible Menus**:
- ✅ Dashboard (Home, Sales)
- ✅ Leads & CRM (All)
- ⚠️ Clients (View only, limited fields)
- ⚠️ Tasks (Own tasks only)
- ⚠️ Appointments (Own appointments only)
- ✅ Communication (Templates, Logs)
- ⚠️ Settings (Profile only)

**Hidden Menus**:
- ❌ Dashboard → Operations
- ❌ Cases (All)
- ❌ Documents (All)
- ❌ Finance (All)
- ❌ Reports & Analytics (All)
- ❌ Settings (Except profile)

**Restrictions**:
- Can only see own leads and converted clients
- Cannot view financial information
- Cannot access case details
- Cannot verify documents

---

#### 5. Case Officer
**Access Level**: Case Management Focus

**Accessible Menus**:
- ✅ Dashboard (Home, Operations)
- ⚠️ Leads (View only)
- ⚠️ Clients (View only)
- ✅ Cases (All)
- ✅ Documents (All)
- ✅ Tasks (All)
- ✅ Appointments (All)
- ✅ Communication (All)
- ⚠️ Settings (Profile only)

**Hidden Menus**:
- ❌ Dashboard → Sales
- ❌ Leads → Add/Edit/Delete
- ❌ Finance (All)
- ❌ Reports & Analytics (All)
- ❌ Settings (Except profile)

**Restrictions**:
- Cannot create/edit leads
- Cannot view financial details
- Can view client info but not edit
- Can manage assigned cases only

---

#### 6. Document Officer
**Access Level**: Document Management Focus

**Accessible Menus**:
- ✅ Dashboard (Home)
- ⚠️ Clients (View only)
- ⚠️ Cases (View only)
- ✅ Documents (All)
- ⚠️ Tasks (Own tasks only)
- ⚠️ Settings (Profile only)

**Hidden Menus**:
- ❌ Dashboard → Sales, Operations
- ❌ Leads (All)
- ❌ Appointments (All)
- ❌ Finance (All)
- ❌ Communication (All)
- ❌ Reports & Analytics (All)
- ❌ Settings (Except profile)

**Restrictions**:
- Can only verify/reject documents
- Cannot create cases or clients
- Cannot view financial information
- Limited client information access

---

#### 7. Accounts/Finance
**Access Level**: Finance Module Focus

**Accessible Menus**:
- ✅ Dashboard (Home, Finance metrics)
- ⚠️ Clients (View only, for invoicing)
- ✅ Finance (All)
- ✅ Reports & Analytics (Financial reports only)
- ⚠️ Settings (Profile only)

**Hidden Menus**:
- ❌ Dashboard → Sales, Operations
- ❌ Leads (All)
- ❌ Cases (Detailed view)
- ❌ Documents (All)
- ❌ Tasks (Except own)
- ❌ Appointments (All)
- ❌ Communication (All)
- ❌ Reports → Non-financial reports
- ❌ Settings (Except profile)

**Restrictions**:
- Can view client info for invoicing only
- Cannot access case details
- Cannot view documents
- Can only see financial reports

---

#### 8. Receptionist
**Access Level**: Front Desk Operations

**Accessible Menus**:
- ✅ Dashboard (Home, basic)
- ⚠️ Clients (Basic info only)
- ✅ Appointments (All)
- ✅ Appointments → Walk-in Management
- ⚠️ Tasks (Own tasks only)
- ⚠️ Settings (Profile only)

**Hidden Menus**:
- ❌ Dashboard → Sales, Operations
- ❌ Leads (All)
- ❌ Cases (All)
- ❌ Documents (All)
- ❌ Finance (All)
- ❌ Communication (All)
- ❌ Reports & Analytics (All)
- ❌ Settings (Except profile)

**Restrictions**:
- Can only view basic client contact info
- Cannot access financial information
- Cannot view case details
- Can only manage appointments and walk-ins

---

## 🎨 UI/UX Implementation Details

### Sidebar Component Structure

```javascript
// Sidebar Component Hierarchy
<Sidebar>
  <SidebarHeader>
    <Logo />
    <CompanyName />
    <CollapseToggle />
  </SidebarHeader>
  
  <SidebarSearch>
    <QuickSearch placeholder="Search menu... (Ctrl+K)" />
  </SidebarSearch>
  
  <SidebarMenu>
    <MenuItem>
      <MenuIcon />
      <MenuLabel />
      <Badge /> {/* Optional */}
      <ExpandIcon /> {/* If has children */}
      
      <SubMenu> {/* Nested */}
        <SubMenuItem />
        <SubMenuItem />
      </SubMenu>
    </MenuItem>
  </SidebarMenu>
  
  <SidebarFooter>
    <UserProfile />
    <QuickActions />
  </SidebarFooter>
</Sidebar>
```

### Menu Item States

1. **Default State**
   - Normal background
   - Default text color
   - Icon in neutral color

2. **Hover State**
   - Light background highlight
   - Slightly darker text
   - Icon color change
   - Smooth transition (200ms)

3. **Active State**
   - Primary color background
   - White text
   - White icon
   - Left border accent (4px)

4. **Disabled State**
   - Grayed out text
   - Grayed out icon
   - No hover effect
   - Cursor: not-allowed

5. **Badge State**
   - Small colored badge (red for urgent, orange for pending)
   - Number or dot indicator
   - Positioned top-right of menu item

### Responsive Behavior

#### Desktop (≥1024px)
- Full sidebar (280px width)
- All labels visible
- Nested menus expand inline
- Collapsible to icon-only mode (64px)

#### Tablet (768px - 1023px)
- Collapsible sidebar
- Default: Icon-only mode
- Expand on hover or click
- Overlay on content

#### Mobile (<768px)
- Hamburger menu
- Full-screen drawer
- Slide in from left
- Close on route change
- Backdrop overlay

### Icon System

**Icon Library**: Lucide React Icons

**Commonly Used Icons**:
```javascript
{
  Dashboard: "LayoutDashboard",
  Leads: "Users",
  Clients: "UserCheck",
  Cases: "Briefcase",
  Documents: "FileText",
  Tasks: "CheckSquare",
  Appointments: "Calendar",
  Finance: "DollarSign",
  Communication: "MessageSquare",
  Reports: "BarChart3",
  Settings: "Settings",
  
  // Sub-menu icons
  Add: "Plus",
  List: "List",
  Pipeline: "Kanban",
  Search: "Search",
  Calendar: "CalendarDays",
  Pending: "Clock",
  Completed: "CheckCircle",
  Overdue: "AlertCircle"
}
```

### Badge System

**Badge Types**:

1. **Count Badge**
   ```javascript
   <Badge variant="count" color="red">5</Badge>
   // Shows: "5" in red circle
   ```

2. **Dot Badge**
   ```javascript
   <Badge variant="dot" color="orange" />
   // Shows: Orange dot indicator
   ```

3. **Text Badge**
   ```javascript
   <Badge variant="text" color="green">New</Badge>
   // Shows: "New" in green pill
   ```

**Badge Colors**:
- Red: Urgent, Overdue, Error
- Orange: Pending, Warning
- Green: Success, Completed
- Blue: Info, New
- Gray: Neutral, Inactive

### Keyboard Shortcuts

```javascript
// Global shortcuts
Ctrl/Cmd + K: Open quick search
Ctrl/Cmd + B: Toggle sidebar
Ctrl/Cmd + /: Show keyboard shortcuts

// Navigation shortcuts
G then D: Go to Dashboard
G then L: Go to Leads
G then C: Go to Clients
G then A: Go to Cases
G then T: Go to Tasks

// Quick actions
N then L: New Lead
N then C: New Client
N then A: New Case
N then T: New Task
```

### Animation & Transitions

```css
/* Sidebar expand/collapse */
.sidebar {
  transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Menu item hover */
.menu-item {
  transition: all 200ms ease-in-out;
}

/* Submenu expand */
.submenu {
  transition: max-height 300ms ease-in-out,
              opacity 200ms ease-in-out;
}

/* Badge pulse (for new notifications) */
.badge-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

### Accessibility Features

1. **Keyboard Navigation**
   - Tab through menu items
   - Enter to activate
   - Arrow keys for submenu navigation
   - Escape to close submenu

2. **Screen Reader Support**
   - ARIA labels on all menu items
   - ARIA-expanded for submenus
   - ARIA-current for active page
   - Role="navigation" on sidebar

3. **Focus Indicators**
   - Visible focus outline
   - High contrast mode support
   - Focus trap in mobile drawer

4. **Color Contrast**
   - WCAG AA compliant
   - Minimum 4.5:1 contrast ratio
   - Color-blind friendly palette

---

## 📊 Menu Configuration Data Structure

### Complete Menu JSON Schema

```json
{
  "menus": [
    {
      "id": "dashboard",
      "label": "Dashboard",
      "icon": "LayoutDashboard",
      "route": "/",
      "permission": "dashboard.view",
      "order": 1,
      "badge": null,
      "children": [
        {
          "id": "home-dashboard",
          "label": "Home Dashboard",
          "icon": "Home",
          "route": "/",
          "permission": "dashboard.view",
          "description": "Main overview dashboard"
        },
        {
          "id": "sales-dashboard",
          "label": "Sales Dashboard",
          "icon": "TrendingUp",
          "route": "/dashboard/sales",
          "permission": "dashboard.sales.view",
          "description": "Sales metrics and performance"
        },
        {
          "id": "operations-dashboard",
          "label": "Operations Dashboard",
          "icon": "Activity",
          "route": "/dashboard/operations",
          "permission": "dashboard.operations.view",
          "description": "Operations and case management overview"
        }
      ]
    },
    {
      "id": "leads",
      "label": "Leads & CRM",
      "icon": "Users",
      "route": "/leads",
      "permission": "leads.view",
      "order": 2,
      "badge": {
        "type": "count",
        "source": "api/leads/count/pending",
        "color": "blue"
      },
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
        },
        {
          "id": "lead-sources",
          "label": "Lead Sources",
          "icon": "Target",
          "route": "/leads/sources",
          "permission": "leads.view"
        },
        {
          "id": "followups",
          "label": "Follow-ups",
          "icon": "Phone",
          "route": "/leads/followups",
          "permission": "leads.view",
          "badge": {
            "type": "count",
            "source": "api/leads/followups/pending",
            "color": "orange"
          }
        },
        {
          "id": "lead-reports",
          "label": "Lead Reports",
          "icon": "FileBarChart",
          "route": "/leads/reports",
          "permission": "reports.leads.view"
        }
      ]
    }
    // ... (continue for all menus)
  ],
  "roleAccess": {
    "super_admin": ["*"],
    "admin": ["dashboard", "leads", "clients", "cases", "documents", "tasks", "appointments", "finance", "communication", "reports"],
    "branch_manager": ["dashboard", "leads", "clients", "cases", "documents", "tasks", "appointments", "finance.view", "communication", "reports.branch"],
    "sales_agent": ["dashboard.sales", "leads", "clients.view", "tasks.own", "appointments.own", "communication"],
    "case_officer": ["dashboard.operations", "cases", "documents", "tasks", "clients.view", "communication"],
    "document_officer": ["dashboard", "documents", "cases.view", "clients.view", "tasks.own"],
    "accounts": ["dashboard", "finance", "clients.view", "reports.finance"],
    "receptionist": ["dashboard", "appointments", "appointments.walkin", "clients.basic", "tasks.own"]
  }
}
```

---

## 🚀 Implementation Checklist

### Phase 1: Core Sidebar Structure
- [ ] Create Sidebar component
- [ ] Implement collapsible functionality
- [ ] Add logo and branding
- [ ] Create menu item component
- [ ] Implement nested submenu support
- [ ] Add active state highlighting
- [ ] Implement responsive behavior

### Phase 2: Menu Data & Routing
- [ ] Create menu configuration JSON
- [ ] Implement dynamic menu rendering
- [ ] Set up routing for all pages
- [ ] Add permission checking
- [ ] Implement role-based menu filtering
- [ ] Add breadcrumb navigation

### Phase 3: Interactive Features
- [ ] Add quick search (Ctrl+K)
- [ ] Implement keyboard shortcuts
- [ ] Add badge system
- [ ] Implement real-time badge updates
- [ ] Add tooltip descriptions
- [ ] Create quick actions menu

### Phase 4: Polish & Optimization
- [ ] Add smooth animations
- [ ] Implement accessibility features
- [ ] Add dark mode support
- [ ] Optimize performance (lazy loading)
- [ ] Add user preference persistence
- [ ] Test across all screen sizes

### Phase 5: Testing
- [ ] Test all menu items and routes
- [ ] Test role-based access control
- [ ] Test responsive behavior
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility
- [ ] Cross-browser testing

---

## 📝 Notes & Best Practices

### Menu Organization Principles
1. **Frequency-based ordering**: Most used items at top
2. **Logical grouping**: Related items together
3. **Depth limit**: Maximum 2 levels of nesting
4. **Clear labeling**: Descriptive, concise labels
5. **Consistent icons**: Same icon for same concept across app

### Performance Considerations
1. **Lazy load submenus**: Only render when expanded
2. **Virtualize long lists**: If menu items exceed 50
3. **Debounce search**: 300ms delay on quick search
4. **Cache menu data**: Store in local storage
5. **Optimize icons**: Use icon library with tree-shaking

### Security Considerations
1. **Server-side permission check**: Don't rely only on frontend
2. **Hide sensitive routes**: Don't expose in HTML
3. **Audit menu access**: Log permission denials
4. **Regular permission review**: Quarterly access audit

### Maintenance Guidelines
1. **Document new menus**: Update this file when adding routes
2. **Version control**: Track menu changes in git
3. **Migration plan**: For menu structure changes
4. **User communication**: Notify of major menu changes

---

## 📞 Support & Documentation

For questions or clarifications about the menu structure:
- **Technical Lead**: [Your Name]
- **Documentation**: This file
- **Last Updated**: January 6, 2026
- **Version**: 1.0

---

**End of Document**
