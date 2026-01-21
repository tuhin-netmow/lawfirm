# Car Wash / Workshop ERP Menu Plan

This document outlines the menu structure for the new Car Wash / Workshop ERP modules integrated into the application sidebar.

## 1. CRM
**Permissions:** `crm.view`
*   **Leads** (`/dashboard/crm/leads`) - `crm.leads.list`
*   **Customers** (`/dashboard/crm/customers`) - `crm.customers.list`
*   **Vehicles** (`/dashboard/crm/vehicles`) - `crm.vehicles.list`
*   **Add Customer** (`/dashboard/crm/customers/create`) - `crm.customers.create`

## 2. Bookings
**Permissions:** `bookings.view`
*   **Calendar** (`/dashboard/bookings/calendar`) - `bookings.calendar.view`
*   **Booking List** (`/dashboard/bookings/list`) - `bookings.list.view`
*   **Create Booking** (`/dashboard/bookings/create`) - `bookings.create`

## 3. Workshop Jobs (Operations)
**Permissions:** `jobs.view`
*   **Job Board** (`/dashboard/jobs/board`) - `jobs.board.view`
*   **All Job Cards** (`/dashboard/jobs/list`) - `jobs.list.view`
*   **Create Job Card** (`/dashboard/jobs/create`) - `jobs.create`
*   **Estimates** (`/dashboard/jobs/estimates`) - `jobs.estimates.view`
*   **Inspections** (`/dashboard/jobs/inspections`) - `jobs.inspections.view`

## 4. Mechanic Portal
**Permissions:** `mechanic.view`
*   **My Jobs** (`/dashboard/mechanic/my-jobs`) - `mechanic.my_jobs.view`
*   **Timesheet** (`/dashboard/mechanic/timesheet`) - `mechanic.timesheet.view`

## 5. Inventory
**Permissions:** `inventory.view`
*   **Parts Catalog** (`/dashboard/inventory/parts`) - `inventory.parts.view`
*   **Stock Movements** (`/dashboard/inventory/movements`) - `inventory.movements.view`
*   **Suppliers** (`/dashboard/inventory/suppliers`) - `inventory.suppliers.view`
*   **Purchase Orders** (`/dashboard/inventory/purchase-orders`) - `inventory.po.view`
*   **Goods Receipt** (`/dashboard/inventory/grn`) - `inventory.grn.view`

## 6. Finance
**Permissions:** `finance.view`
*   **Invoices** (`/dashboard/finance/invoices`) - `finance.invoices.view`
*   **Payments** (`/dashboard/finance/payments`) - `finance.payments.view`
*   **Credit Notes** (`/dashboard/finance/credit-notes`) - `finance.credit_notes.view`

## 7. System Setup
**Permissions:** `settings.view`
*   **Service Catalog** (`/dashboard/settings/services`)
*   **Makes & Models** (`/dashboard/settings/master-data`)
*   **Reminders** (`/dashboard/settings/reminders`)
