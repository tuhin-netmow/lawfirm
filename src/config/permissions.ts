
//   group/module based permission


// --- Dashboard ---

export const SuperAdminPermission = {
  ACCESS_ALL: "*" as const,
};
export const DashboardPermission = {
  VIEW: "dashboard.view" as const,
};

// --- Products ---
export const ProductPermission = {
  VIEW: "products.view" as const,
  LIST: "products.list" as const,
  DETAILS: "products.details" as const,
  CREATE: "products.create" as const,
  EDIT: "products.edit" as const,
  // Categories
  VIEW_CATEGORIES: "products.categories.view" as const,
  CREATE_CATEGORIES: "products.categories.create" as const,
  Edit_CATEGORIES: "products.categories.edit" as const,
  DELETE_CATEGORIES: "products.categories.delete" as const,
  // Units
  VIEW_UNITS: "products.units.view" as const,
  CREATE_UNITS: "products.units.create" as const,
  EDIT_UNITS: "products.units.edit" as const,
  DELETE_UNITS: "products.units.delete" as const,

  // Stock Management
  VIEW_STOCK: "products.stock.view" as const,
  CREATE_STOCK: "products.stock.create" as const,
  EDIT_STOCK: "products.stock.edit" as const,
  DELETE_STOCK: "products.stock.delete" as const,
  MANAGE_STOCK: "products.stock.manage" as const,
};

// --- Customers ---
export const CustomerPermission = {
  VIEW: "customers.view" as const,
  LIST: "customers.list" as const,
  DETAILS: "customers.details" as const,
  CREATE: "customers.create" as const,
  EDIT: "customers.edit" as const,
  VIEW_ROUTE_DETAILS: "customers.routes.details.view" as const,
  ASSIGN_ROUTE: "customers.routes.assign" as const,
  VIEW_MAP: "customers.map.view" as const,
};

// --- Suppliers ---
export const SupplierPermission = {
  VIEW: "suppliers.view" as const,
  LIST: "suppliers.list" as const,
  CREATE: "suppliers.create" as const,
  EDIT: "suppliers.edit" as const,
  VIEW_PURCHASE_ORDERS: "suppliers.purchase_orders.view" as const,
  VIEW_PURCHASE_ORDER_DETAILS: "suppliers.purchase_orders.details.view" as const,
  CREATE_PURCHASE_ORDER: "suppliers.purchase_orders.create" as const,
  EDIT_PURCHASE_ORDER: "suppliers.purchase_orders.edit" as const,
  VIEW_PURCHASE_INVOICES: "suppliers.invoices.view" as const,
  VIEW_PURCHASE_INVOICE_DETAILS: "suppliers.invoices.details.view" as const,
  PREVIEW_PURCHASE_INVOICE: "suppliers.invoices.preview" as const,
  CREATE_PURCHASE_PAYMENT: "suppliers.payments.create" as const,
  VIEW_PURCHASE_PAYMENTS: "suppliers.payments.view" as const,
  VIEW_PURCHASE_PAYMENT_DETAILS: "suppliers.payments.details.view" as const,
  VIEW_PURCHASE_ORDERS_MAP: "suppliers.purchase_orders.map.view" as const,
};

// --- Staffs ---
export const StaffPermission = {
  VIEW: "staffs.view" as const,
  LIST: "staffs.list" as const,
  DETAILS: "staffs.details.view" as const,
  CREATE: "staffs.create" as const,
  EDIT: "staffs.edit" as const,
  VIEW_DEPARTMENTS: "departments.view" as const,
  CREATE_DEPARTMENTS: "departments.create" as const,
  EDIT_DEPARTMENTS: "departments.edit" as const,
  DELETE_DEPARTMENTS: "departments.delete" as const,
  VIEW_ATTENDANCE: "attendance.view" as const,
  MANAGE_LEAVES: "leaves.manage" as const,
  VIEW_STAFF_MAP: "staffs.map.view" as const,
};

// --- Sales & Orders ---
export const SalesPermission = {
  VIEW: "sales.view" as const,
  ORDERS: "sales.orders.view" as const,
  ORDER_DETAILS: "sales.orders.details.view" as const,
  CREATE_ORDER: "sales.orders.create" as const,
  EDIT_ORDER: "sales.orders.edit" as const,
  INVOICES: "sales.invoices.view" as const,
  INVOICE_DETAILS: "sales.invoices.details.view" as const,
  INVOICE_PREVIEW: "sales.invoices.preview" as const,
  PAYMENTS: "sales.payments.view" as const,
  PAYMENT_DETAILS: "sales.payments.details.view" as const,
  CREATE_PAYMENT: "sales.payments.create" as const,
  DELIVERY: "sales.delivery.view" as const,
  SALES_ROUTES: "sales.routes.view" as const,
  DETAILS_SALES_ROUTES: "sales.routes.details" as const,
  CREATE_ROUTE: "sales.routes.create" as const,
  ASSIGN_ROUTE: "sales.routes.assign" as const,
};

// --- Accounting ---
export const AccountingPermission = {
  VIEW: "accounting.view" as const,
  OVERVIEW: "accounting.overview.view" as const,
  INCOMES: "accounting.incomes.view" as const,
  EXPENSES: "accounting.expenses.view" as const,
  CREATE_INCOME: "accounting.incomes.create" as const,
  CREATE_EXPENSE: "accounting.expenses.create" as const,

  // Credit Heads
  VIEW_CREDIT_HEADS: "accounting.credit_heads.view" as const,
  CREATE_CREDIT_HEADS: "accounting.credit_heads.create" as const,
  EDIT_CREDIT_HEADS: "accounting.credit_heads.edit" as const,
  DELETE_CREDIT_HEADS: "accounting.credit_heads.delete" as const,

  // Debit Heads
  VIEW_DEBIT_HEADS: "accounting.debit_heads.view" as const,
  CREATE_DEBIT_HEADS: "accounting.debit_heads.create" as const,
  EDIT_DEBIT_HEADS: "accounting.debit_heads.edit" as const,
  DELETE_DEBIT_HEADS: "accounting.debit_heads.delete" as const,
};

// --- Users ---
export const UserPermission = {
  VIEW: "users.view" as const,
  LIST: "users.list" as const,
  CREATE: "users.create" as const,
  EDIT: "users.edit" as const,
  DETAILS: "users.details.view" as const,
};

// --- Roles & Permissions ---
export const RolePermission = {
  CREATE_ROLES: "roles.create" as const,
  DELETE_ROLES: "roles.delete" as const,
  VIEW_ROLES: "roles.view" as const,
  VIEW_PERMISSIONS: "permissions.view" as const,
  VIEW_ROLES_PERMISSIONS: "roles_permissions.view" as const,
  EDIT_ROLES_PERMISSIONS: "roles_permissions.edit" as const,

};

// --- Settings ---
export const SettingsPermission = {
  VIEW: "settings.view" as const,
  PROFILE: "settings.profile.view" as const,
  ACCOUNT: "settings.account.view" as const,
};

// --- Reports ---
export const ReportPermission = {
  VIEW: "reports.view" as const,
  SALES: "reports.sales.view" as const,
  INVENTORY: "reports.inventory.view" as const,
  CUSTOMERS: "reports.customers.view" as const,
  STAFFS: "reports.staffs.view" as const,
};

// --- Raw Materials ---
export const RawMaterialPermission = {
  VIEW: "raw_materials.view" as const,
  LIST: "raw_materials.list" as const,
  CREATE: "raw_materials.create" as const,
  EDIT: "raw_materials.edit" as const,
  DELETE: "raw_materials.delete" as const,
};

// --- Production ---
export const ProductionPermission = {
  VIEW: "production.view" as const,
  LIST: "production.list" as const,
  CREATE: "production.create" as const,
  EDIT: "production.edit" as const,
  DETAILS: "production.details" as const,
};




// --- Route Operations ---
// --- Route Operations ---
export const RouteOperationPermission = {
  VIEW: "route_operations.view" as const,
  ROUTE_WISE_ORDER: "route_operations.route_wise_order.view" as const,
  ORDER_MANAGE: "route_operations.order_manage.view" as const,
  STAFF_WISE_ROUTE: "route_operations.staff_wise_route.view" as const,
};

// --- Car Wash / Workshop Permissions ---

// CRM (Leads, Customers, Vehicles)
export const CrmPermission = {
  VIEW: "crm.view" as const,
  LEADS_LIST: "crm.leads.list" as const,
  LEADS_CREATE: "crm.leads.create" as const,
  CUSTOMERS_LIST: "crm.customers.list" as const,
  CUSTOMERS_CREATE: "crm.customers.create" as const,
  VEHICLES_LIST: "crm.vehicles.list" as const,
  VEHICLES_CREATE: "crm.vehicles.create" as const,
};

// Bookings
export const BookingPermission = {
  VIEW: "bookings.view" as const,
  CALENDAR: "bookings.calendar.view" as const,
  LIST: "bookings.list.view" as const,
  CREATE: "bookings.create" as const,
};

// Job Cards Service
export const JobCardPermission = {
  VIEW: "jobs.view" as const,
  BOARD: "jobs.board.view" as const,
  LIST: "jobs.list.view" as const,
  CREATE: "jobs.create" as const,
  ESTIMATES: "jobs.estimates.view" as const,
  INSPECTIONS: "jobs.inspections.view" as const,
};

// Mechanic Portal
export const MechanicPermission = {
  VIEW: "mechanic.view" as const,
  MY_JOBS: "mechanic.my_jobs.view" as const,
  TIMESHEET: "mechanic.timesheet.view" as const,
};

// Inventory (Parts, PO, GRN)
export const InventoryPermission = {
  VIEW: "inventory.view" as const,
  PARTS: "inventory.parts.view" as const,
  MOVEMENTS: "inventory.movements.view" as const,
  SUPPLIERS: "inventory.suppliers.view" as const,
  PURCHASE_ORDERS: "inventory.po.view" as const,
  GRN: "inventory.grn.view" as const,
};

// Finance (Invoices, Payments)
export const FinancePermission = {
  VIEW: "finance.view" as const,
  INVOICES: "finance.invoices.view" as const,
  PAYMENTS: "finance.payments.view" as const,
  CREDIT_NOTES: "finance.credit_notes.view" as const,
};

// --- Law Firm Permissions ---

// Clients (Law Firm)
export const ClientPermission = {
  VIEW: "clients.view" as const,
  LIST: "clients.list" as const,
  CREATE: "clients.create" as const,
  EDIT: "clients.edit" as const,
  DELETE: "clients.delete" as const,
  DETAILS: "clients.details" as const,
};

// Matters / Cases
export const MatterPermission = {
  VIEW: "matters.view" as const,
  LIST: "matters.list" as const,
  CREATE: "matters.create" as const,
  EDIT: "matters.edit" as const,
  DETAILS: "matters.details" as const,
  CLOSE: "matters.close" as const,
};

// Documents
export const DocumentPermission = {
  VIEW: "documents.view" as const,
  LIST: "documents.list" as const,
  UPLOAD: "documents.upload" as const,
  TEMPLATES: "documents.templates" as const,
};

// Tasks
export const TaskPermission = {
  VIEW: "tasks.view" as const,
  BOARD: "tasks.board.view" as const,
  LIST: "tasks.list.view" as const,
  CREATE: "tasks.create" as const,
};

// Calendar
export const CalendarPermission = {
  VIEW: "calendar.view" as const,
  CREATE: "calendar.create" as const,
  COURT_DATES: "calendar.court_dates.view" as const,
};

// Billing (Law Firm)
export const BillingPermission = {
  VIEW: "billing.view" as const,
  TIME_ENTRIES: "billing.time.view" as const,
  INVOICES: "billing.invoices.view" as const,
  PAYMENTS: "billing.payments.view" as const,
  TRUST: "billing.trust.view" as const,
};

// Communications
export const CommunicationPermission = {
  VIEW: "communications.view" as const,
  LOGS: "communications.logs.view" as const,
  EMAIL: "communications.email.view" as const,
};


//   for sidebar
export const PERMISSION_GROUPS = {

  Dashboard: DashboardPermission,
  Products: ProductPermission,
  Customers: CustomerPermission,
  Suppliers: SupplierPermission,
  Staffs: StaffPermission,
  Sales: SalesPermission,
  Accounting: AccountingPermission,
  Users: UserPermission,
  Roles: RolePermission,
  Settings: SettingsPermission,
  Reports: ReportPermission,
  RawMaterials: RawMaterialPermission,
  Production: ProductionPermission,
  RouteOperations: RouteOperationPermission,
  // Car Wash
  Crm: CrmPermission,
  Bookings: BookingPermission,
  JobCards: JobCardPermission,
  Mechanic: MechanicPermission,
  Inventory: InventoryPermission,
  Finance: FinancePermission,
  // Law Firm
  Clients: ClientPermission,
  Matters: MatterPermission,
  Documents: DocumentPermission,
  Tasks: TaskPermission,
  Calendar: CalendarPermission,
  Billing: BillingPermission,
  Communications: CommunicationPermission,
} as const;



// --- Helper type ---
export type PermissionType =
  | typeof DashboardPermission[keyof typeof DashboardPermission]
  | typeof ProductPermission[keyof typeof ProductPermission]
  | typeof CustomerPermission[keyof typeof CustomerPermission]
  | typeof SupplierPermission[keyof typeof SupplierPermission]
  | typeof StaffPermission[keyof typeof StaffPermission]
  | typeof SalesPermission[keyof typeof SalesPermission]
  | typeof AccountingPermission[keyof typeof AccountingPermission]
  | typeof UserPermission[keyof typeof UserPermission]
  | typeof RolePermission[keyof typeof RolePermission]
  | typeof SettingsPermission[keyof typeof SettingsPermission]
  | typeof ReportPermission[keyof typeof ReportPermission]
  | typeof RawMaterialPermission[keyof typeof RawMaterialPermission]
  | typeof ProductionPermission[keyof typeof ProductionPermission]
  | typeof RouteOperationPermission[keyof typeof RouteOperationPermission]
  // Car Wash
  | typeof CrmPermission[keyof typeof CrmPermission]
  | typeof BookingPermission[keyof typeof BookingPermission]
  | typeof JobCardPermission[keyof typeof JobCardPermission]
  | typeof MechanicPermission[keyof typeof MechanicPermission]
  | typeof InventoryPermission[keyof typeof InventoryPermission]
  | typeof FinancePermission[keyof typeof FinancePermission]
  // Law Firm
  | typeof ClientPermission[keyof typeof ClientPermission]
  | typeof MatterPermission[keyof typeof MatterPermission]
  | typeof DocumentPermission[keyof typeof DocumentPermission]
  | typeof TaskPermission[keyof typeof TaskPermission]
  | typeof CalendarPermission[keyof typeof CalendarPermission]
  | typeof BillingPermission[keyof typeof BillingPermission]
  | typeof CommunicationPermission[keyof typeof CommunicationPermission];
