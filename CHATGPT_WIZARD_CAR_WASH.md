N) Administration
1) Users

CRUD

Create user

Assign role/branch

Reset password

Deactivate

2) Roles & Permissions

CRUD

Create role

Toggle permission matrix

Assign role to users

3) Branches

CRUD

Create/edit branch

Set branch hours

Branch labour rate

4) Audit Logs

Logs:

invoice edits, voids

stock adjustments

price override

deletion attempts

login history

CRUD

View logs (no delete)

Export logs

O) Settings / Master Data

Submenus

Company profile

Logo, invoice template, footer notes

Tax/VAT settings

Numbering rules (JOB-0001, INV-0001)

Service categories

Parts categories

Payment methods

Notification templates

Backup settings

CRUD

Update configurations + master lists

4) Key Workflows (Step-by-step)
Workflow 1: Walk-in Service

Customer → Vehicle → Job Card → Checklist → Estimate → Approval → Work → Invoice → Payment → Delivery → Reminder

Workflow 2: Booking-based

Booking → Job Card auto-created → Assign mechanic → Execute → Close job → Invoice

Workflow 3: Parts Purchasing

Low stock alert → PO → Approval → GRN receive → Stock updated → Supplier bill

Workflow 4: Warranty Claim

Warranty job → Claim created → Docs attached → Approval tracking → Payment received

5) Non-Functional Requirements (Very Important for Cloud)

Security: HTTPS, role-based access, password hashing, 2FA optional

Data privacy: branch isolation, access logs

Auditability: immutable logs for finance & stock

Backups: daily automated backup + retention

Performance: optimized lists, pagination, search indexing

Uptime: target 99.5%+

Scalability: multi-tenant ready (if you sell as SaaS)

Mobile-friendly: mechanic view + booking calendar

6) Suggested Development Phases (MVP → Full)
Phase 1 (MVP)

Customers, Vehicles

Bookings

Job cards + tasks + parts usage

Inventory basic

Invoices + payments

Basic reports + dashboard

Phase 2

Purchasing + GRN

Stock transfers + audits

Reminders + templates

Mechanic time tracking

Phase 3

Warranty, customer portal

POS parts sales

Advanced analytics, scheduled reports

Integrations (WhatsApp/SMS/accounting)

7) CRUD Summary (Quick View)

Masters: Services, Parts, Categories, Makes/Models, Branches, Users, Roles
Operations: Bookings, Job Cards, Tasks, Parts Used, Estimates, Invoices, Payments, PO, GRN, Stock Moves, Reminders
Logs/Reports: Audit logs, performance dashboards, exports

If you want, I can also add a complete “SRS-style” section next:

exact field list for every table/entity

validation rules (required/unique)

status transitions & permission gates

screen list (page-by-page UI plan)

Just say: “Yes, write SRS full fields + validations” and I’ll generate it in the same format.

If you want, I can also add a complete “SRS-style” section next: yes do

Below is the SRS-style (Software Requirements Specification) section for the Cloud Car Workshop System — with screens, fields, validations, CRUD rules, status workflows, and permission gates. (No code.)

1) SRS Scope & Definitions
1.1 Scope

This system will manage:

Customers, vehicles, bookings

Job cards (work orders), inspections, estimates, approvals

Parts inventory, purchasing, stock movements

Invoices, payments, receivables

Staff roles & branch access

Reports, audit logs, reminders

1.2 Key Definitions

Job Card / Work Order: operational record for a vehicle service/repair.

Estimate/Quotation: pre-approval cost summary.

GRN: Goods Received Note (stock receiving).

Stock Movement: any stock in/out/adjust/transfer event.

2) Screen List (UI Pages) — Full
Common

Login

Forgot Password (optional)

User Profile

Dashboard (widgets + filters)

CRM

Leads List (optional)

Lead Create/Edit/View

Customers List

Customer Create/Edit/View (with tabs: Vehicles, Jobs, Invoices, Payments)

Vehicles List

Vehicle Create/Edit/View (tabs: History, Reminders)

Scheduling

Booking Calendar

Booking List

Booking Create/Edit/View

Workshop Ops

Job Cards List

Job Card Create/Edit/View (multi-tab)

Job Status Board (Kanban)

Inspection Checklist (fill + photos)

Estimate Create/Edit/View + Approval

Mechanics

My Jobs (mechanic)

Job Task Updates

Time Tracking / Timesheet (optional)

Inventory & Purchasing

Parts List

Part Create/Edit/View

Stock Movements List

Stock In (manual / purchase)

Stock Out (manual / job consumption)

Stock Adjustment (approval required)

Stock Transfer (branch-to-branch)

Stock Audit Session (cycle count)

Suppliers List

Supplier Create/Edit/View

Purchase Orders List

PO Create/Edit/View

GRN Receive (partial receiving)

Sales/Finance

Invoices List

Invoice View/Print

Invoice Create (manual)

Invoice from Job Card

Payments List

Payment Create/Edit

Credit Notes/Refunds (optional)

Receivables (Outstanding Invoices)

Retention

Service Reminders Rules

Reminder Queue + Logs

Templates (SMS/WhatsApp/Email)

Admin

Users List

User Create/Edit

Roles & Permissions Matrix

Branches

Settings (Company, Tax, Numbering)

Audit Logs

Report Center + Exports

3) Functional Requirements by Module (FR)
3.1 Authentication & Access (FR-AUTH)

FR-AUTH-01: Users must login with email/phone + password.

FR-AUTH-02: Roles enforce page and action permissions.

FR-AUTH-03: Branch users only see branch data unless “Head Office” permission exists.

FR-AUTH-04: Audit log must record key actions (invoice edits, stock adjustments, deletes, approvals).

4) Data Entities — Fields + Validation + CRUD Rules

Format: Entity → Fields → Validations → CRUD + Business Rules

A) Branches
Fields

id (auto)

branch_name

branch_code (optional)

address

phone

email (optional)

working_hours (optional)

default_labour_rate

status (active/inactive)

created_at, updated_at

Validations

branch_name: required, min 2

default_labour_rate: required, numeric ≥ 0

status: required enum

CRUD Rules

Create: Super Admin only

Update: Super Admin

Delete: not hard delete; inactive only (to preserve history)

B) Users
Fields

id

full_name

email (optional) / phone (optional) (at least one required)

password_hash

role_id

branch_id

status (active/inactive)

last_login_at (system)

created_at, updated_at

Validations

full_name: required

email: unique (if provided)

phone: unique (if provided)

role_id: required

branch_id: required (except super admin)

status: enum

CRUD Rules

Create: Admin / Manager

Update: Admin

Reset Password: Admin

Deactivate: Admin

Delete: not allowed (inactive instead)

C) Roles & Permissions
Fields

role_id

role_name

permissions (list / matrix flags)

Validations

role_name: required unique

CRUD Rules

Only Super Admin can edit permissions

Admin can assign roles to users

D) Leads (Optional)
Fields

id

name

phone

email (optional)

vehicle_plate (optional)

interested_service (optional)

source (walk-in/fb/referral/etc)

status (new/contacted/booked/lost)

notes

branch_id

created_by

created_at, updated_at

Validations

name: required

phone OR email: at least one required

status: enum

CRUD Rules

Reception creates/updates

Convert lead → Customer + Booking allowed

Delete: soft delete only

E) Customers
Fields

id

customer_type (individual/company)

name

phone

email (optional)

address (optional)

company_name (optional)

tax_id (optional)

notes (optional)

tags (optional)

status (active/blocked)

branch_id

created_at, updated_at

Validations

name: required

phone: required (or at least one contact required)

status: enum

branch_id: required

CRUD Rules

Create: Reception/Advisor

Update: Reception/Advisor

Delete: soft delete only

Blocked customers cannot create bookings/invoices unless override

F) Vehicles
Fields

id

customer_id

plate_no

vin (optional)

make

model

year (optional)

engine_no (optional)

fuel_type (petrol/diesel/hybrid/ev)

transmission (auto/manual)

current_mileage

notes (optional)

branch_id

created_at, updated_at

Validations

customer_id: required

plate_no: required, unique per branch

make/model: required

current_mileage: numeric ≥ 0

CRUD Rules

Create: Advisor

Update: Advisor

Delete: soft delete only

Mileage auto-updates when job card closes (if new mileage higher)

G) Bookings
Fields

id

booking_no (auto)

customer_id

vehicle_id

booking_datetime

estimated_duration_minutes

service_type (free text or service category)

symptoms/notes

advisor_id (optional)

status (scheduled/confirmed/cancelled/no_show/completed)

branch_id

created_by

created_at, updated_at

Validations

customer_id + vehicle_id: required

booking_datetime: required, future time (unless walk-in)

status: enum

CRUD Rules

Create booking

Convert booking → job card (one-click)

Cancelling must require a cancel reason (optional rule)

No-show cannot be converted

H) Job Cards (Work Orders)
Fields

id

job_no (auto)

branch_id

customer_id

vehicle_id

booking_id (optional)

advisor_id

assigned_mechanic_id (optional) (or multiple via job_mechanics table)

odometer_in

complaint_summary

diagnosis_notes (optional)

priority (normal/urgent)

status (draft/awaiting_approval/in_progress/waiting_parts/completed/delivered/closed)

promised_delivery_date (optional)

internal_notes (optional)

attachments (optional)

created_by

created_at, updated_at, closed_at

Validations

customer_id, vehicle_id, advisor_id: required

odometer_in: required numeric ≥ 0

status: enum

complaint_summary: required

CRUD Rules

Create: Advisor

Update: Advisor while status in Draft/Awaiting Approval

Mechanic can update only: diagnosis_notes, task status, time logs, photos (limited)

Delete: Not allowed once any tasks/parts exist; otherwise soft delete

Close job: allowed only if estimate approved OR override permission

Reopen job: Admin only + reason required

I) Job Tasks (Labour/Services Lines)
Fields

id

job_id

service_id (optional if free text)

task_title / service_name

description (optional)

estimated_hours (optional)

actual_hours (optional)

rate

qty (default 1)

discount

tax_rate

line_total

assigned_mechanic_id (optional)

status (pending/in_progress/done)

created_at, updated_at

Validations

job_id: required

task_title: required

rate: numeric ≥ 0

qty: numeric > 0

status: enum

CRUD Rules

Add tasks: Advisor/Manager

Mechanic can mark status + add actual_hours

Discount > X% requires Manager approval

Deleting task allowed only before invoice generated

J) Job Parts (Parts Consumption)
Fields

id

job_id

part_id

qty

unit_price

discount

tax_rate

line_total

stock_deducted (yes/no)

returned_qty (optional)

created_at, updated_at

Validations

part_id: required

qty: required numeric > 0

unit_price: numeric ≥ 0

CRUD Rules

Storekeeper/Advisor can add parts

Cannot exceed available stock unless permission “Allow negative stock”

Stock deduction rule:

Option A: deduct immediately when added

Option B: deduct when job card is closed (recommended with reservation system)

Returned parts add back to stock (stock movement created)

K) Inspection Checklists
Checklist Template Fields

id

name

category (general/safety/prepurchase)

items (list: item name, type yes/no/scale, notes allowed)

active

Filled Checklist Fields

id

job_id

template_id

responses (json style)

photos (optional)

notes

created_by

created_at

Rules

Template: Admin creates

Filled checklist tied to job card; immutable once job closed (or admin override)

L) Estimates / Quotations
Fields

id

estimate_no (auto)

job_id

customer_id

subtotal

discount_total

tax_total

grand_total

status (draft/sent/approved/rejected/expired)

valid_until (optional)

approved_by (customer/staff)

approval_note (optional)

created_at, updated_at

Validations

job_id: required

status: enum

grand_total: numeric ≥ 0

CRUD Rules

Create/Edit while draft

Once sent, editing requires manager permission + creates revision log

Approval:

Customer portal OR staff records verbal approval (with note)

Job cannot move to In Progress unless estimate approved (configurable)

M) Parts Catalog
Fields

id

name

sku/barcode (optional)

category_id

brand (optional)

unit (pcs/litre)

cost_price

selling_price

tax_rate

min_stock_level

status (active/inactive)

created_at, updated_at

Validations

name: required

category_id: required

cost_price/selling_price: numeric ≥ 0

CRUD Rules

Storekeeper manages parts

Price change requires permission; logged in audit

Deleting: soft delete only

N) Inventory Stock (Per Branch)
Fields

id

part_id

branch_id

quantity_on_hand

quantity_reserved (optional)

reorder_level

updated_at

Validations

quantity_on_hand: numeric ≥ 0 (unless negative allowed)

Rules

System updates via stock_movements only (no direct edits except admin repair)

O) Stock Movements (Audit Critical)
Fields

id

movement_no

movement_type (in/out/adjust/transfer)

reference_type (job/invoice/po/grn/manual)

reference_id

branch_id

part_id

qty (+/-)

cost_price_snapshot

notes

performed_by

approved_by (for adjustment)

created_at

Validations

movement_type: required enum

qty: required, non-zero

part_id, branch_id: required

Rules

Adjustment requires approval

No delete allowed (never). Reversal movement instead.

P) Suppliers
Fields

id

supplier_name

contact_person (optional)

phone

email (optional)

address (optional)

payment_terms (net7/net15/net30)

notes

status

created_at

Validations

supplier_name: required

phone: required

CRUD Rules

Create/update/delete(soft) by Storekeeper/Manager

Q) Purchase Orders (PO) + Items
PO Fields

id

po_no

supplier_id

branch_id

status (draft/approved/ordered/received/cancelled)

total_cost

created_by, approved_by

created_at

PO Item Fields

id

po_id

part_id

qty_ordered

unit_cost

line_total

Validations

supplier_id: required

qty_ordered: > 0

Rules

Approval required before ordering

Partial receiving allowed (track received qty)

R) GRN (Goods Receipt) + Items
Fields

id

grn_no

po_id (optional)

supplier_id

branch_id

received_date

status (received/partial)

attachment_invoice (optional)

created_by

Item Fields

grn_id, part_id, qty_received, unit_cost

Rules

GRN posts stock in movements

GRN cannot be deleted; only reversal allowed

S) Invoices + Items
Invoice Fields

id

invoice_no

branch_id

customer_id

vehicle_id (optional)

job_id (optional)

issue_date

due_date (optional)

subtotal, discount_total, tax_total, grand_total

paid_total, balance_due

status (unpaid/partial/paid/overdue/void)

notes

created_by, voided_by (optional)

created_at

Invoice Item Fields

id

invoice_id

item_type (service/part)

ref_id (service_id/part_id optional)

description

qty

unit_price

discount

tax_rate

line_total

Validations

customer_id: required

grand_total: ≥ 0

status enum

Rules (Critical)

Invoice generated from job locks job pricing lines

Editing invoice after payment requires admin approval

Voiding invoice requires admin + reason; creates audit log + reversals (stock if relevant)

T) Payments
Fields

id

payment_no

invoice_id

payment_date

amount

method (cash/card/bank/online)

reference (txn id)

received_by

notes

created_at

Validations

invoice_id required

amount > 0

payment_date required

method enum

Rules

Total payments cannot exceed invoice total unless overpayment allowed (then credit balance)

Editing payment requires finance role + logs

U) Service Reminders
Reminder Rule Fields

id

name

trigger_type (time/mileage)

months_interval (if time)

km_interval (if mileage)

message_template_id

active

Reminder Queue Fields

id

customer_id

vehicle_id

due_date

due_mileage (optional)

status (pending/sent/failed/cancelled)

channel (sms/whatsapp/email)

sent_at

created_at

Rules

System generates reminders based on last service/job close

Resend allowed with permission + logs

V) Audit Logs (Mandatory)
Fields

id

action_type (create/update/delete/approve/void/login)

module (invoice/job/stock/user/etc)

record_id

before_data (snapshot)

after_data (snapshot)

performed_by

performed_at

ip_address (optional)

Rules

Cannot be deleted

Export allowed for owner/admin

5) Validation Rules (Global)
Required Core

Branch is mandatory for all operational records.

Customer must exist before vehicle/job/invoice.

Vehicle must belong to customer.

Mileage cannot decrease unless admin override with reason.

Unique

invoice_no, job_no, booking_no, po_no, grn_no unique per branch (or global based on settings)

plate_no unique per branch

Soft Delete Policy

Customers, vehicles, parts, suppliers: soft delete only

Invoices, stock movements, GRN: never deleted (void/reversal only)

6) Status Workflows + Gate Conditions
Job Card Status Workflow

Draft → Awaiting Approval → In Progress → Waiting Parts → Completed → Delivered → Closed

Gates

Draft → Awaiting Approval: estimate must exist (if enabled)

Awaiting Approval → In Progress: estimate approved OR manager override

Completed → Delivered: invoice generated OR “pay later” allowed

Closed: once closed, job becomes read-only (except admin)

Estimate Workflow

Draft → Sent → Approved/Rejected → (Expired)

Invoice Workflow

Unpaid → Partial → Paid

Overdue = rule-based when due_date passed and balance_due > 0

Void = admin only

Purchase Workflow

PO Draft → Approved → Ordered → Received (GRN)

7) Permission Gates (Examples)
High-Risk Actions (must be restricted + logged)

Invoice edit after payment

Invoice void/cancel

Stock adjustment

Allow negative stock

Discount above threshold (e.g., 10%)

Reopen closed job

Edit mileage downward

Delete any record (even soft delete)

8) Notifications (System Events)
Trigger Events

Booking created/confirmed (customer)

Estimate sent (customer)

Estimate approved (advisor)

Job status changed (advisor + mechanic)

Invoice created (customer)

Payment received (customer)

Overdue invoice reminder (customer)

Low stock alert (storekeeper/manager)

Delivery Channels

Email (basic)

SMS/WhatsApp (optional integration)

In-app notifications + logs

9) Non-Functional Requirements (NFR)
Security

HTTPS only

Secure passwords + optional 2FA

Role/branch data segregation

Rate limiting login attempts

Full audit log for finance/stock

Performance

Pagination everywhere

Search indexing on: customer phone, plate no, invoice no, job no

Caching dashboard totals (optional)

Backup & Recovery

Daily DB backup

File attachments backup

Restore process documented

Availability

99.5% uptime target (or higher depending on hosting)

10) Deliverables (What the final system includes)

Full cloud web application

Admin panel + branch support

PDF invoice/estimate templates

Reports + export

Audit & logs

Deployment docs + user manual

If you want, next I can generate “Screen-by-screen fields & UI layout” (like: Job Card screen tab 1/2/3 with exact form sections) and a full “Table list with relations” (ERD text form).

If you want, next I can generate “Screen-by-screen fields & UI layout” (like: Job Card screen tab 1/2/3 with exact form sections) and a full “Table list with relations” (ERD text form).

Absolutely — here are both:

Screen-by-screen fields & UI layout (with tabs/sections)

Full table list + relations (ERD in text form)

1) Screen-by-screen Fields & UI Layout
1. Login

Fields

Email/Phone

Password
Actions

Login

Forgot password (optional)

DASHBOARD
2. Dashboard Overview

Top Filters

Branch (if permitted)

Date range (Today/Week/Month/Custom)

Widgets

Open Jobs / In Progress / Waiting Parts / Completed / Delivered

Today Bookings

Unpaid Invoices (count + amount)

Revenue Today / This Month

Low Stock Alerts

Top Mechanics (hours/jobs)

Quick Actions: + Booking, + Job Card, + Invoice, + Stock In

CRM
3. Customers List

Table Columns

Customer Name

Phone

Email

Type

Total Jobs

Outstanding Balance

Status

Actions (View / Edit / Delete)

Search

Name, Phone, Email, Tag

CRUD

Add Customer, Edit, Soft Delete, Export

4. Customer Profile (View)

Tabs

Overview

Customer info panel

Quick stats: total visits, total spend, outstanding

Notes / Tags

Vehicles

Vehicle list table + Add Vehicle

Jobs

Job history list (job no, date, status, amount)

Invoices

Invoice list + payment status

Payments

Payment history

Documents (optional)

Uploaded docs

5. Vehicles List

Table Columns

Plate No

Make/Model

Customer

Current Mileage

Last Service Date

Actions (View/Edit)

6. Vehicle Profile (View)

Tabs

Overview (vehicle details, owner)

Service History Timeline (jobs + invoices)

Reminders (next due)

Photos/Documents (optional)

BOOKINGS
7. Booking Calendar

Views

Day / Week / Month

Booking Card Shows

Time, Plate No, Customer, Service Type, Status

Actions

Create booking

Drag & drop reschedule

Convert to Job Card

8. Booking Create/Edit

Sections

Customer & Vehicle

Customer (search/select)

Vehicle (dropdown by customer)

Add new customer/vehicle quick links

Schedule

Date/time

Duration

Advisor

Details

Service type/category

Symptoms/notes

Reminder toggle

Actions

Save, Confirm, Cancel, Convert to Job Card

JOB CARDS (CORE)
9. Job Cards List

Filters

Status

Branch

Advisor

Mechanic

Date range

Plate No / Customer / Job No

Table Columns

Job No

Date

Customer

Plate No

Status

Assigned Mechanic

Estimate Status

Invoice Status

Actions (View/Edit/Print)

10. Job Card Create/Edit/View (Multi-tab Layout)

Header Bar (always visible)

Job No, Status badge, Branch

Customer + Vehicle + Mileage in

Buttons: Save, Send Estimate, Approve, Start Job, Complete, Generate Invoice, Close

TAB 1: Job Details

Sections

Customer & Vehicle

Customer select

Vehicle select

Odometer in

Booking ref (auto if created from booking)

Complaint & Diagnosis

Complaint summary (required)

Diagnosis notes

Priority

Promised delivery date

Assignment

Advisor

Mechanics (multi-select)

Internal notes

Attachments

Upload photos/docs

TAB 2: Inspection / Checklist

Sections

Checklist template select

Checklist items (Yes/No/Condition/Notes)

Add photos per item

Overall inspection note
Actions

Save checklist

Generate checklist PDF (optional)

TAB 3: Tasks / Labour

Grid Columns

Task/Service

Description

Estimated hours

Assigned mechanic

Rate

Qty

Discount

Tax

Line total

Status (pending/in progress/done)

Actions

Add service from catalog

Add custom task

Bulk mark done

TAB 4: Parts Used

Grid Columns

Part (search SKU/name)

Available stock (display)

Qty

Unit price

Discount

Tax

Line total

Stock status (reserved/deducted)

Actions

Reserve parts

Deduct now / deduct on close (based on settings)

Return parts (enter returned qty)

TAB 5: Estimate / Approval

Sections

Estimate summary (subtotal/discount/tax/total)

Estimate status (draft/sent/approved/rejected)

Valid until date

Approval record (who approved + time + note)
Actions

Create estimate

Send to customer (PDF link)

Record approval / rejection

TAB 6: Timeline / Activity

Shows

Status changes

Notes/comments

Parts added/returned

Estimate revisions

User + timestamp + before/after snapshots (important actions)

11. Job Status Board (Kanban)

Columns

Draft

Awaiting Approval

In Progress

Waiting Parts

Completed

Delivered/Closed

Card Shows

Job No, Plate, Customer, Mechanic, ETA
Actions

Drag to move (permission-based)

Quick “Assign mechanic” / “Mark waiting parts”

MECHANIC MODULE
12. Mechanic “My Jobs”

List

Assigned jobs only

Quick actions:

Start/Stop task

Add note

Upload photo

Mark task done

Request parts

13. Time Tracking / Timesheet (Optional)

Screen

Start/stop timer per task/job

Daily/weekly view

Export timesheet
Approval

Manager can edit/approve time corrections

INVENTORY & PURCHASING
14. Parts List

Filters

Category, brand, low stock only, branch

Table Columns

Part name

SKU

Stock on hand

Min stock

Cost

Selling

Actions (View/Edit)

