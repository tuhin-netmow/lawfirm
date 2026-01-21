import {
  CalendarCheck,
  CheckSquare,
  Calendar,
  Clock,
  CreditCard,
  DollarSign,
  Kanban,
  Landmark,
  Layers,
  LayoutDashboard,
  PlusCircle,
  Settings,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Users,
  Bot,
  Gavel,
  File,
  Mail,
  MessageSquare,
  ClipboardCheck,
  Briefcase as BriefcaseIcon,
  List,
  FileText,
  FileCode,
} from "lucide-react";
import Dashboard from "../pages/dashboard/Dashboard";

import Staffs from "@/pages/staffs";
import StaffDetails from "@/pages/staffs/StaffDetails";
import AddStaffPage from "@/pages/staffs/add";
import EditStaff from "@/pages/staffs/edit";

import UserProfilePage from "@/pages/Settings/pages/UserProfilePage";
import AccountSettings from "@/pages/Settings/pages/Account";

import SettingsSidebarLayout from "@/pages/Settings/Settings";
import AttendancePage from "@/pages/staffs/attendance";

import DepartmentsPage from "@/pages/departments";

import UsersList from "@/pages/users/UsersList";
import UserDetails from "@/pages/users/UserDetails";
import AddUserPage from "@/pages/users/AddUser";
import EditUserPage from "@/pages/users/EditUser";

import Roles from "@/pages/rolesPermission/Roles";
import PermissionsPage from "@/pages/rolesPermission/PermissionsPage";

import {
  DashboardPermission,
  StaffPermission,
  UserPermission,
  RolePermission,
  SettingsPermission,
  SuperAdminPermission,

  // Car Wash (Legacy - Kept for reference or shared use)
  // Removed CrmPermission, BookingPermission, JobCardPermission, MechanicPermission, InventoryPermission, FinancePermission

  // Law Firm
  ClientPermission,
  MatterPermission,
  DocumentPermission,
  TaskPermission,
  CalendarPermission,
  BillingPermission,
  CommunicationPermission,
} from "./permissions";

import LeaveRequest from "@/pages/staffs/leaves/LeaveRequest";
import AttendanceDetailsPage from "@/pages/staffs/attendance/attendanceDetails";

// Car Wash / Workshop Page Imports (Unused but kept for reference)
// import CWLeadsList from "@/pages/crm/LeadsList";
// import CWCustomersList from "@/pages/crm/CustomersList";
// import CWVehiclesList from "@/pages/crm/VehiclesList";
// import CWCreateCustomer from "@/pages/crm/CreateCustomer";
// import CWBookingCalendar from "@/pages/bookings/BookingCalendar";
// import CWBookingList from "@/pages/bookings/BookingList";
// import CWCreateBooking from "@/pages/bookings/CreateBooking";
// import CWJobBoard from "@/pages/jobs/JobBoard";
// import CWJobCardsList from "@/pages/jobs/JobCardsList";
// import CWCreateJobCard from "@/pages/jobs/CreateJobCard";
// import CWEstimatesList from "@/pages/jobs/EstimatesList";
// import CWInspectionsList from "@/pages/jobs/InspectionsList";
// import CWMyJobs from "@/pages/mechanic/MyJobs";
// import CWTimesheet from "@/pages/mechanic/Timesheet";
// import CWPartsList from "@/pages/inventory/PartsList";
// import CWStockMovements from "@/pages/inventory/StockMovements";
// import CWSuppliersList from "@/pages/inventory/SuppliersList";
// import CWPurchaseOrders from "@/pages/inventory/PurchaseOrders";
// import CWGoodsReceipt from "@/pages/inventory/GoodsReceipt";

import MattersList from "@/pages/matters/MattersList";
import CreateMatter from "@/pages/matters/CreateMatter";
import MyMatters from "@/pages/matters/MyMatters";
import ClientsList from "@/pages/clients/ClientsList";
import CreateClient from "@/pages/clients/CreateClient";
import DocumentsList from "@/pages/documents/DocumentsList";
import UploadDocument from "@/pages/documents/UploadDocument";
import DocumentTemplates from "@/pages/documents/DocumentTemplates";
import TaskBoard from "@/pages/tasks/TaskBoard";
import CreateTask from "@/pages/tasks/CreateTask";
import TasksList from "@/pages/tasks/TasksList";
import LawFirmCalendar from "@/pages/calendar/LawFirmCalendar";
import CreateEvent from "@/pages/calendar/CreateEvent";
import CourtDates from "@/pages/calendar/CourtDates";
import TimeEntries from "@/pages/billing/TimeEntries";
import InvoicesList from "@/pages/billing/InvoicesList";
import CreateInvoice from "@/pages/billing/CreateInvoice";
import PaymentsList from "@/pages/billing/PaymentsList";
import ReceivePayment from "@/pages/billing/ReceivePayment";
import TrustAccounts from "@/pages/billing/TrustAccounts";
import DepositFunds from "@/pages/billing/DepositFunds";
import EmailList from "@/pages/communications/EmailList";
import ComposeEmail from "@/pages/communications/ComposeEmail";
import ClientMessages from "@/pages/communications/ClientMessages";
// import CWInvoicesList from "@/pages/finance/InvoicesList";
// import CWPaymentsList from "@/pages/finance/PaymentsList";
// import CWCreditNotes from "@/pages/finance/CreditNotes";
// import CWServiceCatalog from "@/pages/Settings/carwash/ServiceCatalog";
// import CWMakesModels from "@/pages/Settings/carwash/MakesModels";
// import CWReminders from "@/pages/Settings/carwash/Reminders";

// AI Chat Widget
import WidgetSettings from "@/pages/ai-chat/WidgetSettings";
import EmbedCode from "@/pages/ai-chat/EmbedCode";

export const sidebarItemLink = [
  // DASHBOARD
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    element: <Dashboard />,
    allowedPermissions: [
      DashboardPermission.VIEW,
      SuperAdminPermission.ACCESS_ALL,
    ],
  },

  // ==================================================================================
  // LAW FIRM MODULES
  // ==================================================================================

  // CLIENTS
  {
    title: "Clients",
    url: "#",
    icon: Users,
    allowedPermissions: [ClientPermission.VIEW, SuperAdminPermission.ACCESS_ALL],
    items: [
      {
        title: "Client List",
        url: "/dashboard/clients",
        element: <ClientsList />,
        icon: List,
        allowedPermissions: [ClientPermission.LIST, SuperAdminPermission.ACCESS_ALL],
      },
      {
        title: "Add Client",
        url: "/dashboard/clients/create",
        element: <CreateClient />,
        icon: UserPlus,
        allowedPermissions: [ClientPermission.CREATE, SuperAdminPermission.ACCESS_ALL],
      },
    ],
  },

  // MATTERS / CASES
  {
    title: "Matters",
    url: "#",
    icon: BriefcaseIcon, // or Scale
    allowedPermissions: [MatterPermission.VIEW, SuperAdminPermission.ACCESS_ALL],
    items: [
      {
        title: "All Matters",
        url: "/dashboard/matters",
        element: <MattersList />,
        icon: List,
        allowedPermissions: [MatterPermission.LIST, SuperAdminPermission.ACCESS_ALL],
      },
      {
        title: "Create Matter",
        url: "/dashboard/matters/create",
        element: <CreateMatter />,
        icon: PlusCircle,
        allowedPermissions: [MatterPermission.CREATE, SuperAdminPermission.ACCESS_ALL],
      },
      {
        title: "My Matters",
        url: "/dashboard/matters/my-matters",
        element: <MyMatters />,
        icon: UserCheck,
        allowedPermissions: [MatterPermission.VIEW, SuperAdminPermission.ACCESS_ALL],
      },
    ],
  },

  // DOCUMENTS
  {
    title: "Documents",
    url: "#",
    icon: FileText,
    allowedPermissions: [DocumentPermission.VIEW, SuperAdminPermission.ACCESS_ALL],
    items: [
      {
        title: "Document Library",
        url: "/dashboard/documents",
        element: <DocumentsList />,
        icon: Layers,
        allowedPermissions: [DocumentPermission.LIST, SuperAdminPermission.ACCESS_ALL],
      },
      {
        title: "Upload Document",
        url: "/dashboard/documents/upload",
        element: <UploadDocument />,
        icon: PlusCircle,
        allowedPermissions: [DocumentPermission.UPLOAD, SuperAdminPermission.ACCESS_ALL],
      },
      {
        title: "Templates",
        url: "/dashboard/documents/templates",
        element: <DocumentTemplates />,
        icon: File,
        allowedPermissions: [DocumentPermission.TEMPLATES, SuperAdminPermission.ACCESS_ALL],
      },
    ],
  },

  // TASKS
  {
    title: "Tasks & Workflow",
    url: "#",
    icon: ClipboardCheck, // or Kanban
    allowedPermissions: [TaskPermission.VIEW, SuperAdminPermission.ACCESS_ALL],
    items: [
      {
        title: "Task Board",
        url: "/dashboard/tasks/board",
        element: <TaskBoard />,
        icon: Kanban,
        allowedPermissions: [TaskPermission.BOARD, SuperAdminPermission.ACCESS_ALL],
      },
      {
        title: "Create Task",
        url: "/dashboard/tasks/create",
        element: <CreateTask />,
        icon: PlusCircle,
        allowedPermissions: [TaskPermission.CREATE, SuperAdminPermission.ACCESS_ALL],
      },
      {
        title: "Task List",
        url: "/dashboard/tasks/list",
        element: <TasksList />,
        icon: CheckSquare,
        allowedPermissions: [TaskPermission.LIST, SuperAdminPermission.ACCESS_ALL],
      },
    ],
  },

  // CALENDAR
  {
    title: "Calendar",
    url: "#",
    icon: CalendarCheck,
    allowedPermissions: [CalendarPermission.VIEW, SuperAdminPermission.ACCESS_ALL],
    items: [
      {
        title: "Calendar",
        url: "/dashboard/calendar",
        element: <LawFirmCalendar />,
        icon: Calendar,
        allowedPermissions: [CalendarPermission.VIEW, SuperAdminPermission.ACCESS_ALL],
      },
      {
        title: "Create Event",
        url: "/dashboard/calendar/create",
        element: <CreateEvent />,
        icon: PlusCircle,
        allowedPermissions: [CalendarPermission.CREATE, SuperAdminPermission.ACCESS_ALL],
      },
      {
        title: "Court Dates",
        url: "/dashboard/calendar/court-dates",
        element: <CourtDates />,
        icon: Gavel,
        allowedPermissions: [CalendarPermission.COURT_DATES, SuperAdminPermission.ACCESS_ALL],
      },
    ],
  },

  // BILLING
  {
    title: "Billing & Trust",
    url: "#",
    icon: DollarSign, // or Scale/Wallet
    allowedPermissions: [BillingPermission.VIEW, SuperAdminPermission.ACCESS_ALL],
    items: [
      {
        title: "Time Entries",
        url: "/dashboard/billing/time-entries",
        element: <TimeEntries />,
        icon: Clock,
        allowedPermissions: [BillingPermission.TIME_ENTRIES, SuperAdminPermission.ACCESS_ALL],
      },
      {
        title: "Invoices",
        url: "/dashboard/billing/invoices",
        element: <InvoicesList />,
        icon: FileText,
        allowedPermissions: [BillingPermission.INVOICES, SuperAdminPermission.ACCESS_ALL],
      },
      {
        title: "Create Invoice",
        url: "/dashboard/billing/create",
        element: <CreateInvoice />,
        icon: PlusCircle,
        allowedPermissions: [BillingPermission.INVOICES, SuperAdminPermission.ACCESS_ALL], // Using INVOICES permission for create
      },
      {
        title: "Payments",
        url: "/dashboard/billing/payments",
        element: <PaymentsList />,
        icon: CreditCard,
        allowedPermissions: [BillingPermission.PAYMENTS, SuperAdminPermission.ACCESS_ALL],
      },
      {
        title: "Receive Payment",
        url: "/dashboard/billing/receive-payment",
        element: <ReceivePayment />,
        icon: PlusCircle,
        allowedPermissions: [BillingPermission.PAYMENTS, SuperAdminPermission.ACCESS_ALL],
      },
      {
        title: "Trust / Retainer",
        url: "/dashboard/billing/trust",
        element: <TrustAccounts />,
        icon: Landmark,
        allowedPermissions: [BillingPermission.TRUST, SuperAdminPermission.ACCESS_ALL],
      },
      {
        title: "Deposit Funds",
        url: "/dashboard/billing/trust/deposit",
        element: <DepositFunds />,
        icon: PlusCircle,
        allowedPermissions: [BillingPermission.TRUST, SuperAdminPermission.ACCESS_ALL],
      },
    ],
  },

  // COMMUNICATIONS
  {
    title: "Communications",
    url: "#",
    icon: Mail,
    allowedPermissions: [CommunicationPermission.VIEW, SuperAdminPermission.ACCESS_ALL],
    items: [
      {
        title: "Email",
        url: "/dashboard/communications/email",
        element: <EmailList />,
        icon: Mail,
        allowedPermissions: [CommunicationPermission.EMAIL, SuperAdminPermission.ACCESS_ALL],
      },
      {
        title: "Compose Email",
        url: "/dashboard/communications/email/compose",
        element: <ComposeEmail />,
        icon: PlusCircle,
        allowedPermissions: [CommunicationPermission.EMAIL, SuperAdminPermission.ACCESS_ALL],
      },
      {
        title: "Client Messages",
        url: "/dashboard/communications/messages",
        element: <ClientMessages />,
        icon: MessageSquare,
        allowedPermissions: [CommunicationPermission.VIEW, SuperAdminPermission.ACCESS_ALL],
      },
    ],
  },

  // ==================================================================================
  // SYSTEM MODULES
  // ==================================================================================

  // STAFFS
  {
    title: "Staffs",
    url: "#",
    icon: Users,
    allowedPermissions: [StaffPermission.VIEW, SuperAdminPermission.ACCESS_ALL],
    items: [
      {
        title: "All Staffs",
        url: "/dashboard/staffs",
        element: <Staffs />,
        icon: List,
        allowedPermissions: [
          StaffPermission.LIST,
          SuperAdminPermission.ACCESS_ALL,
        ],
      },
      {
        title: "",
        url: "/dashboard/staffs/:staffId",
        element: <StaffDetails />,
        allowedPermissions: [
          StaffPermission.DETAILS,
          SuperAdminPermission.ACCESS_ALL,
        ],
      },
      {
        title: "",
        url: "/dashboard/staffs/add",
        element: <AddStaffPage />,
        allowedPermissions: [
          StaffPermission.CREATE,
          SuperAdminPermission.ACCESS_ALL,
        ],
      },
      {
        title: "",
        url: "/dashboard/staffs/:staffId/edit",
        element: <EditStaff />,
        allowedPermissions: [
          StaffPermission.EDIT,
          SuperAdminPermission.ACCESS_ALL,
        ],
      },
      {
        title: "Departments",
        url: "/dashboard/departments",
        element: <DepartmentsPage />,
        icon: Layers,
        allowedPermissions: [
          StaffPermission.VIEW_DEPARTMENTS,
          SuperAdminPermission.ACCESS_ALL,
        ],
      },
      {
        title: "Attendance",
        url: "/dashboard/staffs/attendance",
        element: <AttendancePage />,
        icon: CalendarCheck,
        allowedPermissions: [
          StaffPermission.VIEW_ATTENDANCE,
          SuperAdminPermission.ACCESS_ALL,
        ],
      },
      {
        title: "",
        url: "/dashboard/staffs/attendance/:staffId",
        element: <AttendanceDetailsPage />,
        allowedPermissions: [
          StaffPermission.VIEW_ATTENDANCE,
          SuperAdminPermission.ACCESS_ALL,
        ],
      },
      {
        title: "",
        url: "/dashboard/staffs/leaves/request",
        element: <LeaveRequest />,
        allowedPermissions: [
          StaffPermission.MANAGE_LEAVES,
          SuperAdminPermission.ACCESS_ALL,
        ],
      },
    ],
  },

  // USERS
  {
    title: "Users",
    url: "#",
    icon: Users,
    allowedPermissions: [UserPermission.VIEW, SuperAdminPermission.ACCESS_ALL],
    items: [
      {
        title: "User List",
        url: "/dashboard/users/list",
        element: <UsersList />,
        icon: List,
        allowedPermissions: [
          UserPermission.LIST,
          SuperAdminPermission.ACCESS_ALL,
        ],
      },
      {
        title: "Add Users",
        url: "/dashboard/users/add",
        element: <AddUserPage />,
        icon: UserPlus,
        allowedPermissions: [
          UserPermission.CREATE,
          SuperAdminPermission.ACCESS_ALL,
        ],
      },
      {
        title: "",
        url: "/dashboard/users/:userId/edit",
        element: <EditUserPage />,
        allowedPermissions: [
          UserPermission.EDIT,
          SuperAdminPermission.ACCESS_ALL,
        ],
      },
      {
        title: "",
        url: "/dashboard/users/:userId",
        element: <UserDetails />,
        allowedPermissions: [
          UserPermission.DETAILS,
          SuperAdminPermission.ACCESS_ALL,
        ],
      },
    ],
  },

  // ROLES & PERMISSIONS
  {
    title: "Roles & Permissions",
    url: "#",
    icon: ShieldCheck,
    allowedPermissions: [
      RolePermission.VIEW_ROLES_PERMISSIONS,
      SuperAdminPermission.ACCESS_ALL,
    ],
    items: [
      {
        title: "Roles",
        url: "/dashboard/roles",
        element: <Roles />,
        icon: Users,
        allowedPermissions: [
          RolePermission.VIEW_ROLES,
          SuperAdminPermission.ACCESS_ALL,
        ],
      },
      {
        title: "",
        url: "/dashboard/permissions/:roleId/edit",
        element: <PermissionsPage />,
        allowedPermissions: [
          RolePermission.EDIT_ROLES_PERMISSIONS,
          SuperAdminPermission.ACCESS_ALL,
        ],
      },
    ],
  },

  // SETTINGS
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
    layout: <SettingsSidebarLayout />,
    allowedPermissions: [
      SettingsPermission.VIEW,
      SuperAdminPermission.ACCESS_ALL,
    ],
    items: [
      {
        title: "Profile",
        url: "/dashboard/settings/profile",
        element: <UserProfilePage />,
        allowedPermissions: [
          SettingsPermission.PROFILE,
          SuperAdminPermission.ACCESS_ALL,
        ],
      },
      {
        title: "Account",
        url: "/dashboard/settings/account",
        element: <AccountSettings />,
        allowedPermissions: [
          SettingsPermission.ACCOUNT,
          SuperAdminPermission.ACCESS_ALL,
        ],
      },
    ],
  },

  // CHAT WIDGET
  {
    title: "Chat Widget",
    url: "#",
    icon: Bot,
    allowedPermissions: [SuperAdminPermission.ACCESS_ALL],
    items: [
      {
        title: "Widget Settings",
        url: "/dashboard/ai-chat/settings",
        element: <WidgetSettings />,
        icon: Settings,
        allowedPermissions: [SuperAdminPermission.ACCESS_ALL],
      },
      {
        title: "Installation / Embed",
        url: "/dashboard/ai-chat/embed",
        element: <EmbedCode />,
        icon: FileCode,
        allowedPermissions: [SuperAdminPermission.ACCESS_ALL],
      },
    ],
  },
];
