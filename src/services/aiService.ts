import type { FormWidgetData, CardData } from "@/types/chat";
import dummyData from "@/data/dummyData";

interface AIResponse {
    text: string;
    type: "text" | "card" | "form" | "action";
    data?: any;
}

// Helper to create form responses
function createFormResponse(
    formId: string,
    stepId: string,
    title: string,
    fields: any[],
    submitLabel: string,
    intent: string,
    stepIndex: number,
    draft: Record<string, any> = {}
): AIResponse {
    return {
        text: "",
        type: "form",
        data: {
            formId,
            stepId,
            title,
            submitLabel,
            fields,
            meta: { intent, stepIndex, draft }
        } as FormWidgetData
    };
}

// Helper for card responses
function card(title: string, badge: string, lines: string[], status?: string, progress?: number): AIResponse {
    return {
        text: "",
        type: "card",
        data: { title, badge, lines, status, progress } as CardData
    };
}

// Helper for text responses
function text(message: string): AIResponse {
    return { text: message, type: "text" };
}

export const aiService = {
    processQuery: async (input: string): Promise<AIResponse> => {
        const lowerInput = input.toLowerCase();

        // Simulated latency
        await new Promise((resolve) => setTimeout(resolve, 800));

        // ========== FORM SUBMISSION HANDLER ==========
        if (input.startsWith("Submitted Form:")) {
            const formDataMatch = input.match(/Submitted Form: (.+)/);
            if (!formDataMatch) return text("Error processing form.");

            const formDataStr = formDataMatch[1];
            const parsedData: Record<string, string> = {};
            formDataStr.split(", ").forEach(pair => {
                const [key, value] = pair.split(": ");
                if (key && value) parsedData[key] = value;
            });

            // --- LEAD CREATION WIZARD (4 Steps) ---
            // Step 1: Visa Type → Step 2: Destination
            if (parsedData.visa && !parsedData.country) {
                return createFormResponse(
                    "lead_create", "destination_select", "Select Destination Country",
                    [{
                        name: "country", label: "Destination", type: "radio",
                        options: ["Australia", "Canada", "UK", "USA", "New Zealand", "Germany"], required: true
                    }],
                    "Next", "create_lead", 1, { visa: parsedData.visa }
                );
            }

            // Step 2: Destination → Step 3: Personal Info
            if (parsedData.country && parsedData.visa && !parsedData.firstName) {
                return createFormResponse(
                    "lead_create", "personal_info", "Personal Information",
                    [
                        { name: "firstName", label: "First Name", type: "text", required: true, placeholder: "John" },
                        { name: "lastName", label: "Last Name", type: "text", required: true, placeholder: "Doe" },
                        { name: "email", label: "Email", type: "email", required: true, placeholder: "john@example.com" },
                        { name: "phone", label: "Phone", type: "text", required: true, placeholder: "+880 1XXX-XXXXXX" }
                    ],
                    "Next", "create_lead", 2, { visa: parsedData.visa, country: parsedData.country }
                );
            }

            // Step 3: Personal Info → Step 4: Source & Notes
            if (parsedData.firstName && parsedData.email && !parsedData.source) {
                return createFormResponse(
                    "lead_create", "source_notes", "Lead Source & Notes",
                    [
                        {
                            name: "source", label: "How did you hear about us?", type: "radio",
                            options: ["Website", "Facebook Ads", "Google Ads", "Referral", "Walk-in", "Email Campaign", "Other"],
                            required: true
                        },
                        { name: "notes", label: "Additional Notes", type: "textarea", required: false, placeholder: "Any additional information..." }
                    ],
                    "Create Lead", "create_lead", 3,
                    {
                        visa: parsedData.visa, country: parsedData.country, firstName: parsedData.firstName,
                        lastName: parsedData.lastName, email: parsedData.email, phone: parsedData.phone
                    }
                );
            }

            // Step 4: Final - Lead Created
            if (parsedData.source && parsedData.firstName) {
                const leadId = "L" + Math.floor(100 + Math.random() * 900);
                return card(
                    `✅ Lead Created: ${leadId}`, "Success",
                    [
                        `Name: ${parsedData.firstName} ${parsedData.lastName}`,
                        `Email: ${parsedData.email}`,
                        `Phone: ${parsedData.phone}`,
                        `Visa Interest: ${parsedData.visa}`,
                        `Destination: ${parsedData.country}`,
                        `Source: ${parsedData.source}`,
                        ...(parsedData.notes ? [`Notes: ${parsedData.notes}`] : [])
                    ]
                );
            }

            // --- CASE CREATION WIZARD (3 Steps) ---
            if (parsedData.caseAction === "Create New Case") {
                return createFormResponse(
                    "case_create", "visa_select", "Select Visa Type",
                    [{
                        name: "visaType", label: "Visa Type", type: "radio",
                        options: ["Student Visa (500)", "Skilled Migration (189)", "Partner Visa (820)", "Visitor Visa (600)"],
                        required: true
                    }],
                    "Next", "create_case", 0
                );
            }

            if (parsedData.visaType && !parsedData.destination) {
                return createFormResponse(
                    "case_create", "destination_select", "Select Destination",
                    [{
                        name: "destination", label: "Destination", type: "radio",
                        options: ["Australia", "Canada", "UK", "USA"], required: true
                    }],
                    "Next", "create_case", 1, { visaType: parsedData.visaType }
                );
            }

            if (parsedData.visaType && parsedData.destination && !parsedData.priority) {
                return createFormResponse(
                    "case_create", "priority_notes", "Priority & Notes",
                    [
                        { name: "priority", label: "Priority", type: "radio", options: ["High", "Medium", "Low"], required: true },
                        { name: "caseNotes", label: "Initial Notes", type: "textarea", required: false, placeholder: "Case details..." }
                    ],
                    "Create Case", "create_case", 2, { visaType: parsedData.visaType, destination: parsedData.destination }
                );
            }

            if (parsedData.priority && parsedData.visaType) {
                const caseId = "CASE-2024-" + Math.floor(100 + Math.random() * 900);
                return card(
                    `✅ Case Created: ${caseId}`, "Success",
                    [
                        `Visa Type: ${parsedData.visaType}`,
                        `Destination: ${parsedData.destination}`,
                        `Priority: ${parsedData.priority}`,
                        ...(parsedData.caseNotes ? [`Notes: ${parsedData.caseNotes}`] : []),
                        `Status: Document Collection`,
                        `Next Action: Upload required documents`
                    ]
                );
            }

            // --- APPOINTMENT BOOKING (2 Steps) ---
            if (parsedData.apptAction === "Book New") {
                return createFormResponse(
                    "appt_book", "service_mode", "Appointment Type",
                    [
                        {
                            name: "serviceType", label: "Service Type", type: "radio",
                            options: ["Initial Consultation", "Document Review", "Visa Lodgement", "Other"], required: true
                        },
                        {
                            name: "meetingMode", label: "Meeting Mode", type: "radio",
                            options: ["In Person", "Video Call", "Phone Call"], required: true
                        }
                    ],
                    "Next", "book_appointment", 0
                );
            }

            if (parsedData.serviceType && parsedData.meetingMode && !parsedData.date) {
                return createFormResponse(
                    "appt_book", "date_time", "Schedule",
                    [
                        { name: "date", label: "Date", type: "date", required: true },
                        {
                            name: "timeSlot", label: "Time", type: "radio",
                            options: ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM"], required: true
                        }
                    ],
                    "Confirm Booking", "book_appointment", 1,
                    { serviceType: parsedData.serviceType, meetingMode: parsedData.meetingMode }
                );
            }

            if (parsedData.date && parsedData.timeSlot) {
                const apptId = "APT-" + Math.floor(100 + Math.random() * 900);
                return card(
                    `✅ Appointment Booked: ${apptId}`, "Confirmed",
                    [
                        `Service: ${parsedData.serviceType}`,
                        `Mode: ${parsedData.meetingMode}`,
                        `Date: ${parsedData.date}`,
                        `Time: ${parsedData.timeSlot}`,
                        `Location: ${parsedData.meetingMode === "In Person" ? "Office Room 101" : "Online"}`,
                        `Confirmation sent to your email`
                    ]
                );
            }

            // ========== CAR WASH SERVICE FORMS ==========

            // --- CREATE INVOICE WIZARD (3 Steps) ---
            if (parsedData.invoiceAction === "Create New Invoice") {
                return createFormResponse(
                    "invoice_create", "customer_vehicle", "Customer & Vehicle Details",
                    [
                        { name: "customerName", label: "Customer Name", type: "text", required: true, placeholder: "John Doe" },
                        { name: "vehicleMake", label: "Vehicle Make", type: "text", required: true, placeholder: "Toyota" },
                        { name: "vehicleModel", label: "Vehicle Model", type: "text", required: true, placeholder: "Camry" },
                        { name: "plateNumber", label: "Plate Number", type: "text", required: true, placeholder: "ABC-1234" }
                    ],
                    "Next", "create_invoice", 0
                );
            }

            if (parsedData.customerName && parsedData.vehicleMake && !parsedData.serviceType) {
                return createFormResponse(
                    "invoice_create", "service_select", "Select Services",
                    [
                        {
                            name: "serviceType", label: "Service Type", type: "radio",
                            options: ["Oil Change", "Brake Inspection", "Tire Rotation", "Engine Diagnostic", "Full Service"],
                            required: true
                        },
                        { name: "serviceAmount", label: "Service Amount ($)", type: "text", required: true, placeholder: "450.00" }
                    ],
                    "Next", "create_invoice", 1,
                    { customerName: parsedData.customerName, vehicleMake: parsedData.vehicleMake, vehicleModel: parsedData.vehicleModel, plateNumber: parsedData.plateNumber }
                );
            }

            if (parsedData.serviceType && parsedData.serviceAmount && !parsedData.dueDate) {
                return createFormResponse(
                    "invoice_create", "payment_terms", "Payment Terms",
                    [
                        { name: "issueDate", label: "Issue Date", type: "date", required: true },
                        { name: "dueDate", label: "Due Date", type: "date", required: true },
                        { name: "invoiceNotes", label: "Notes", type: "textarea", required: false, placeholder: "Additional notes..." }
                    ],
                    "Create Invoice", "create_invoice", 2,
                    {
                        customerName: parsedData.customerName, vehicleMake: parsedData.vehicleMake,
                        vehicleModel: parsedData.vehicleModel, plateNumber: parsedData.plateNumber,
                        serviceType: parsedData.serviceType, serviceAmount: parsedData.serviceAmount
                    }
                );
            }

            if (parsedData.dueDate && parsedData.serviceAmount) {
                const invoiceId = "INV-2024-" + Math.floor(100 + Math.random() * 900);
                return card(
                    `✅ Invoice Created: ${invoiceId}`, "Success",
                    [
                        `Customer: ${parsedData.customerName}`,
                        `Vehicle: ${parsedData.vehicleMake} ${parsedData.vehicleModel} (${parsedData.plateNumber})`,
                        `Service: ${parsedData.serviceType}`,
                        `Amount: $${parsedData.serviceAmount}`,
                        `Issue Date: ${parsedData.issueDate}`,
                        `Due Date: ${parsedData.dueDate}`,
                        ...(parsedData.invoiceNotes ? [`Notes: ${parsedData.invoiceNotes}`] : []),
                        `Status: Unpaid`
                    ]
                );
            }

            // --- RECORD PAYMENT WIZARD (2 Steps) ---
            if (parsedData.paymentAction === "Record New Payment") {
                return createFormResponse(
                    "payment_record", "invoice_select", "Select Invoice",
                    [
                        {
                            name: "invoiceNumber", label: "Invoice Number", type: "radio",
                            options: ["INV-2024-001 ($450.00)", "INV-2024-002 ($1,250.00)", "INV-2024-003 ($890.00)"],
                            required: true
                        },
                        { name: "paymentAmount", label: "Payment Amount ($)", type: "text", required: true, placeholder: "450.00" }
                    ],
                    "Next", "record_payment", 0
                );
            }

            if (parsedData.invoiceNumber && parsedData.paymentAmount && !parsedData.paymentMethod) {
                return createFormResponse(
                    "payment_record", "payment_details", "Payment Details",
                    [
                        { name: "paymentDate", label: "Payment Date", type: "date", required: true },
                        {
                            name: "paymentMethod", label: "Payment Method", type: "radio",
                            options: ["Cash", "Card", "Bank Transfer", "Online"], required: true
                        },
                        { name: "reference", label: "Reference/Transaction ID", type: "text", required: false, placeholder: "TXN-123456" }
                    ],
                    "Record Payment", "record_payment", 1,
                    { invoiceNumber: parsedData.invoiceNumber, paymentAmount: parsedData.paymentAmount }
                );
            }

            if (parsedData.paymentMethod && parsedData.paymentAmount) {
                const paymentId = "PAY-2024-" + Math.floor(100 + Math.random() * 900);
                return card(
                    `✅ Payment Recorded: ${paymentId}`, "Success",
                    [
                        `Invoice: ${parsedData.invoiceNumber}`,
                        `Amount: $${parsedData.paymentAmount}`,
                        `Date: ${parsedData.paymentDate}`,
                        `Method: ${parsedData.paymentMethod}`,
                        ...(parsedData.reference ? [`Reference: ${parsedData.reference}`] : []),
                        `Status: Received`
                    ]
                );
            }

            // --- ADD PART WIZARD (2 Steps) ---
            if (parsedData.inventoryAction === "Add New Part") {
                return createFormResponse(
                    "part_add", "part_details", "Part Information",
                    [
                        { name: "partCode", label: "Part Code", type: "text", required: true, placeholder: "PT-001" },
                        { name: "partName", label: "Part Name", type: "text", required: true, placeholder: "Oil Filter" },
                        {
                            name: "partCategory", label: "Category", type: "radio",
                            options: ["Filters", "Brakes", "Engine", "Electrical", "Body Parts"], required: true
                        }
                    ],
                    "Next", "add_part", 0
                );
            }

            if (parsedData.partName && parsedData.partCategory && !parsedData.unitCost) {
                return createFormResponse(
                    "part_add", "pricing_stock", "Pricing & Stock",
                    [
                        { name: "unitCost", label: "Unit Cost ($)", type: "text", required: true, placeholder: "12.50" },
                        { name: "sellingPrice", label: "Selling Price ($)", type: "text", required: true, placeholder: "25.00" },
                        { name: "initialStock", label: "Initial Stock Quantity", type: "text", required: true, placeholder: "50" },
                        { name: "minStock", label: "Minimum Stock Level", type: "text", required: true, placeholder: "20" }
                    ],
                    "Add Part", "add_part", 1,
                    { partCode: parsedData.partCode, partName: parsedData.partName, partCategory: parsedData.partCategory }
                );
            }

            if (parsedData.unitCost && parsedData.sellingPrice) {
                return card(
                    `✅ Part Added: ${parsedData.partCode}`, "Success",
                    [
                        `Name: ${parsedData.partName}`,
                        `Category: ${parsedData.partCategory}`,
                        `Unit Cost: $${parsedData.unitCost}`,
                        `Selling Price: $${parsedData.sellingPrice}`,
                        `Stock: ${parsedData.initialStock} units`,
                        `Min Stock: ${parsedData.minStock} units`,
                        `Status: Active`
                    ]
                );
            }

            // --- CREATE PURCHASE ORDER WIZARD (2 Steps) ---
            if (parsedData.poAction === "Create New PO") {
                return createFormResponse(
                    "po_create", "supplier_select", "Select Supplier",
                    [
                        {
                            name: "supplierName", label: "Supplier", type: "radio",
                            options: ["AutoParts Direct", "Quality Oil Supplies", "Brake Masters Inc"], required: true
                        },
                        { name: "expectedDate", label: "Expected Delivery Date", type: "date", required: true }
                    ],
                    "Next", "create_po", 0
                );
            }

            if (parsedData.supplierName && parsedData.expectedDate && !parsedData.poTotal) {
                return createFormResponse(
                    "po_create", "po_details", "Purchase Order Details",
                    [
                        { name: "itemCount", label: "Number of Items", type: "text", required: true, placeholder: "5" },
                        { name: "poTotal", label: "Total Amount ($)", type: "text", required: true, placeholder: "1250.50" },
                        { name: "poNotes", label: "Notes", type: "textarea", required: false, placeholder: "Special instructions..." }
                    ],
                    "Create PO", "create_po", 1,
                    { supplierName: parsedData.supplierName, expectedDate: parsedData.expectedDate }
                );
            }

            if (parsedData.poTotal && parsedData.supplierName) {
                const poId = "PO-2024-" + Math.floor(100 + Math.random() * 900);
                return card(
                    `✅ Purchase Order Created: ${poId}`, "Success",
                    [
                        `Supplier: ${parsedData.supplierName}`,
                        `Items: ${parsedData.itemCount}`,
                        `Total: $${parsedData.poTotal}`,
                        `Expected: ${parsedData.expectedDate}`,
                        ...(parsedData.poNotes ? [`Notes: ${parsedData.poNotes}`] : []),
                        `Status: Pending`
                    ]
                );
            }

            // --- MAIN MENU ROUTING ---
            // --- CUSTOMER-FACING SERVICE MENU ROUTING ---
            if (parsedData.mainAction === "Book Service") {
                return createFormResponse(
                    "service_booking", "vehicle_info", "Vehicle Information",
                    [
                        { name: "customerName", label: "Your Name", type: "text", required: true, placeholder: "John Doe" },
                        { name: "phone", label: "Phone Number", type: "text", required: true, placeholder: "+1 234-567-8900" },
                        { name: "vehicleMake", label: "Vehicle Make", type: "text", required: true, placeholder: "Toyota" },
                        { name: "vehicleModel", label: "Vehicle Model", type: "text", required: true, placeholder: "Camry" },
                        { name: "plateNumber", label: "License Plate", type: "text", required: true, placeholder: "ABC-1234" }
                    ],
                    "Next", "book_service", 0
                );
            }

            if (parsedData.mainAction === "Check Job Status") {
                return createFormResponse(
                    "job_status", "job_lookup", "Check Your Job Status",
                    [
                        {
                            name: "lookupMethod", label: "How would you like to check?", type: "radio",
                            options: ["Job Number", "Phone Number", "License Plate"], required: true
                        },
                        { name: "lookupValue", label: "Enter Details", type: "text", required: true, placeholder: "Enter your job number, phone, or plate" }
                    ],
                    "Check Status", "check_job_status", 0
                );
            }

            if (parsedData.mainAction === "View Invoice") {
                return createFormResponse(
                    "view_invoice", "invoice_lookup", "Find Your Invoice",
                    [
                        {
                            name: "searchMethod", label: "Search by", type: "radio",
                            options: ["Invoice Number", "Phone Number", "License Plate"], required: true
                        },
                        { name: "searchValue", label: "Enter Details", type: "text", required: true, placeholder: "Enter invoice number, phone, or plate" }
                    ],
                    "Find Invoice", "view_invoice", 0
                );
            }

            if (parsedData.mainAction === "Make Payment") {
                return createFormResponse(
                    "make_payment", "payment_lookup", "Make a Payment",
                    [
                        { name: "invoiceNumber", label: "Invoice Number", type: "text", required: true, placeholder: "INV-2024-001" },
                        { name: "paymentAmount", label: "Payment Amount ($)", type: "text", required: true, placeholder: "450.00" }
                    ],
                    "Next", "make_payment", 0
                );
            }

            // --- BOOKING SERVICE WIZARD ---
            if (parsedData.customerName && parsedData.vehicleMake && !parsedData.serviceType) {
                return createFormResponse(
                    "service_booking", "service_select", "Select Service",
                    [
                        {
                            name: "serviceType", label: "What service do you need?", type: "radio",
                            options: ["Oil Change", "Brake Service", "Tire Rotation", "Engine Diagnostic", "Full Service", "Other"],
                            required: true
                        },
                        { name: "preferredDate", label: "Preferred Date", type: "date", required: true },
                        {
                            name: "preferredTime", label: "Preferred Time", type: "radio",
                            options: ["Morning (8AM-12PM)", "Afternoon (12PM-4PM)", "Evening (4PM-7PM)"],
                            required: true
                        }
                    ],
                    "Next", "book_service", 1,
                    { customerName: parsedData.customerName, phone: parsedData.phone, vehicleMake: parsedData.vehicleMake, vehicleModel: parsedData.vehicleModel, plateNumber: parsedData.plateNumber }
                );
            }

            if (parsedData.serviceType && parsedData.preferredDate && !parsedData.bookingConfirmed) {
                const bookingId = "BK-" + Math.floor(1000 + Math.random() * 9000);
                return card(
                    `✅ Booking Confirmed: ${bookingId}`, "Success",
                    [
                        `Customer: ${parsedData.customerName}`,
                        `Phone: ${parsedData.phone}`,
                        `Vehicle: ${parsedData.vehicleMake} ${parsedData.vehicleModel} (${parsedData.plateNumber})`,
                        `Service: ${parsedData.serviceType}`,
                        `Date: ${parsedData.preferredDate}`,
                        `Time: ${parsedData.preferredTime}`,
                        `Status: Confirmed`,
                        `We'll send you a reminder 24 hours before your appointment.`
                    ]
                );
            }

            // --- JOB STATUS CHECK ---
            if (parsedData.lookupMethod && parsedData.lookupValue) {
                return card(
                    "🔧 Job Status: In Progress", "Active",
                    [
                        `Job Number: JOB-2024-456`,
                        `Vehicle: Toyota Camry (ABC-1234)`,
                        `Service: Oil Change + Brake Inspection`,
                        `Status: Technician working on it`,
                        `Progress: 65% Complete`,
                        `Estimated Completion: Today, 4:30 PM`,
                        `Technician: Mike Johnson`,
                        `You'll receive an SMS when ready for pickup.`
                    ],
                    "In Progress", 65
                );
            }

            // --- VIEW INVOICE ---
            if (parsedData.searchMethod && parsedData.searchValue) {
                const invoice = dummyData.carWashInvoices[0];
                return card(
                    `${invoice.invoice_no} - ${invoice.customer}`, invoice.status,
                    [
                        `Date: ${invoice.date}`,
                        `Vehicle: ${invoice.vehicle}`,
                        `Services: Oil Change, Filter Replacement`,
                        `Subtotal: $${(invoice.amount * 0.9).toFixed(2)}`,
                        `Tax: $${(invoice.amount * 0.1).toFixed(2)}`,
                        `Total Amount: $${invoice.amount.toFixed(2)}`,
                        `Paid: $${invoice.paid.toFixed(2)}`,
                        `Balance Due: $${invoice.balance.toFixed(2)}`,
                        `Due Date: ${invoice.due_date}`,
                        invoice.balance > 0 ? `💳 Click "Make Payment" to pay now` : `✅ Paid in Full`
                    ]
                );
            }

            // --- MAKE PAYMENT ---
            if (parsedData.invoiceNumber && parsedData.paymentAmount && !parsedData.paymentMethod) {
                return createFormResponse(
                    "make_payment", "payment_method", "Payment Method",
                    [
                        {
                            name: "paymentMethod", label: "How would you like to pay?", type: "radio",
                            options: ["Credit Card", "Debit Card", "Cash", "Bank Transfer"], required: true
                        },
                        { name: "email", label: "Email for Receipt", type: "email", required: true, placeholder: "john@example.com" }
                    ],
                    "Complete Payment", "make_payment", 1,
                    { invoiceNumber: parsedData.invoiceNumber, paymentAmount: parsedData.paymentAmount }
                );
            }

            if (parsedData.paymentMethod && parsedData.email) {
                const paymentId = "PAY-" + Math.floor(1000 + Math.random() * 9000);
                return card(
                    `✅ Payment Successful: ${paymentId}`, "Paid",
                    [
                        `Invoice: ${parsedData.invoiceNumber}`,
                        `Amount Paid: $${parsedData.paymentAmount}`,
                        `Payment Method: ${parsedData.paymentMethod}`,
                        `Date: ${new Date().toLocaleDateString()}`,
                        `Receipt sent to: ${parsedData.email}`,
                        `Thank you for your payment!`,
                        `Transaction ID: ${paymentId}`
                    ]
                );
            }
        }

        // ========== DIRECT QUERIES ==========
        // Main Menu
        if (lowerInput.includes("menu") || lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("start") || lowerInput.includes("help")) {
            return createFormResponse(
                "main_menu", "main_select", "Welcome to Auto Service Manager! How can I help you today?",
                [{
                    name: "mainAction", label: "Select an option", type: "radio",
                    options: ["Book Service", "Check Job Status", "View Invoice", "Make Payment"], required: true
                }],
                "Go", "main_menu", 0
            );
        }

        // ========== CAR WASH DIRECT QUERIES ==========

        // Direct Service Booking
        if (lowerInput.includes("book service") || lowerInput.includes("book appointment") || lowerInput.includes("schedule service")) {
            return createFormResponse(
                "service_booking", "vehicle_info", "Vehicle Information",
                [
                    { name: "customerName", label: "Your Name", type: "text", required: true, placeholder: "John Doe" },
                    { name: "phone", label: "Phone Number", type: "text", required: true, placeholder: "+1 234-567-8900" },
                    { name: "vehicleMake", label: "Vehicle Make", type: "text", required: true, placeholder: "Toyota" },
                    { name: "vehicleModel", label: "Vehicle Model", type: "text", required: true, placeholder: "Camry" },
                    { name: "plateNumber", label: "License Plate", type: "text", required: true, placeholder: "ABC-1234" }
                ],
                "Next", "book_service", 0
            );
        }

        // Direct Job Status Check
        if (lowerInput.includes("job status") || lowerInput.includes("check status") || lowerInput.includes("my car")) {
            return createFormResponse(
                "job_status", "job_lookup", "Check Your Job Status",
                [
                    {
                        name: "lookupMethod", label: "How would you like to check?", type: "radio",
                        options: ["Job Number", "Phone Number", "License Plate"], required: true
                    },
                    { name: "lookupValue", label: "Enter Details", type: "text", required: true, placeholder: "Enter your job number, phone, or plate" }
                ],
                "Check Status", "check_job_status", 0
            );
        }

        // Direct Invoice View
        if (lowerInput.includes("view invoice") || lowerInput.includes("my invoice") || lowerInput.includes("show invoice")) {
            return createFormResponse(
                "view_invoice", "invoice_lookup", "Find Your Invoice",
                [
                    {
                        name: "searchMethod", label: "Search by", type: "radio",
                        options: ["Invoice Number", "Phone Number", "License Plate"], required: true
                    },
                    { name: "searchValue", label: "Enter Details", type: "text", required: true, placeholder: "Enter invoice number, phone, or plate" }
                ],
                "Find Invoice", "view_invoice", 0
            );
        }

        // Direct Payment
        if (lowerInput.includes("make payment") || lowerInput.includes("pay invoice") || lowerInput.includes("pay now")) {
            return createFormResponse(
                "make_payment", "payment_lookup", "Make a Payment",
                [
                    { name: "invoiceNumber", label: "Invoice Number", type: "text", required: true, placeholder: "INV-2024-001" },
                    { name: "paymentAmount", label: "Payment Amount ($)", type: "text", required: true, placeholder: "450.00" }
                ],
                "Next", "make_payment", 0
            );
        }

        // ========== CAR WASH / AUTO REPAIR QUERIES ==========

        // Check Inventory / Stock
        if (lowerInput.includes("inventory") || lowerInput.includes("stock") || lowerInput.includes("parts")) {
            const lowStockParts = dummyData.parts.filter(p => p.status === "Low Stock");
            return card(
                "📦 Inventory Status", "Stock Overview",
                [
                    `Total Parts: ${dummyData.parts.length}`,
                    `Active: ${dummyData.parts.filter(p => p.status === "Active").length}`,
                    `Low Stock: ${lowStockParts.length}`,
                    lowStockParts.length > 0 ? `⚠️ Low Stock Items: ${lowStockParts.map(p => p.name).join(", ")}` : "✅ All items well stocked",
                    `Pending POs: ${dummyData.purchaseOrders.filter(po => po.status === "Pending").length}`
                ]
            );
        }

        // Check Purchase Orders
        if (lowerInput.includes("purchase order") || lowerInput.includes("po ")) {
            const po = dummyData.purchaseOrders[0];
            return card(
                `${po.po_no} - ${po.supplier}`, po.status,
                [
                    `Date: ${po.date}`,
                    `Expected: ${po.expectedDate}`,
                    `Items: ${po.items}`,
                    `Total: $${po.total.toFixed(2)}`,
                    `Status: ${po.status}`
                ]
            );
        }

        // Check Invoice Status
        if (lowerInput.includes("invoice") && (lowerInput.includes("status") || lowerInput.includes("check"))) {
            const invoice = dummyData.carWashInvoices[0];
            return card(
                `${invoice.invoice_no} - ${invoice.customer}`, invoice.status,
                [
                    `Date: ${invoice.date}`,
                    `Vehicle: ${invoice.vehicle}`,
                    `Amount: $${invoice.amount.toFixed(2)}`,
                    `Paid: $${invoice.paid.toFixed(2)}`,
                    `Balance: $${invoice.balance.toFixed(2)}`,
                    `Due Date: ${invoice.due_date}`,
                    `Status: ${invoice.status}`
                ]
            );
        }

        // Check Payment Records
        if (lowerInput.includes("payment") && (lowerInput.includes("recent") || lowerInput.includes("last"))) {
            const payment = dummyData.carWashPayments[0];
            return card(
                `${payment.payment_no} - ${payment.customer}`, "Received",
                [
                    `Date: ${payment.date}`,
                    `Invoice: ${payment.invoice_no}`,
                    `Amount: $${payment.amount.toFixed(2)}`,
                    `Method: ${payment.method}`,
                    `Reference: ${payment.reference}`,
                    `Received By: ${payment.received_by}`
                ]
            );
        }

        // Check Service Reminders
        if (lowerInput.includes("reminder") || lowerInput.includes("service due")) {
            const activeReminders = dummyData.serviceReminders.filter(r => r.status === "Active");
            return card(
                "🔔 Service Reminders", "Active Rules",
                [
                    `Total Rules: ${dummyData.serviceReminders.length}`,
                    `Active: ${activeReminders.length}`,
                    `Time-Based: ${activeReminders.filter(r => r.triggerType === "Time" || r.triggerType === "Both").length}`,
                    `Mileage-Based: ${activeReminders.filter(r => r.triggerType === "Mileage" || r.triggerType === "Both").length}`,
                    `Next: ${activeReminders[0]?.name || "No reminders"}`
                ]
            );
        }

        // Check Vehicle Makes/Models
        if (lowerInput.includes("vehicle") || lowerInput.includes("make") || lowerInput.includes("model")) {
            return card(
                "🚗 Vehicle Database", "Master Data",
                [
                    `Total Makes: ${dummyData.vehicleMakes.length}`,
                    `Total Models: ${dummyData.vehicleModels.length}`,
                    `Popular Makes: ${dummyData.vehicleMakes.slice(0, 3).map(m => m.name).join(", ")}`,
                    `Active Makes: ${dummyData.vehicleMakes.filter(m => m.status === "Active").length}`,
                    `Avg Models per Make: ${(dummyData.vehicleModels.length / dummyData.vehicleMakes.length).toFixed(1)}`
                ]
            );
        }

        // Check Services
        if (lowerInput.includes("service") && (lowerInput.includes("list") || lowerInput.includes("catalog"))) {
            const activeServices = dummyData.services.filter(s => s.status === "Active");
            return card(
                "⚙️ Service Catalog", "Available Services",
                [
                    `Total Services: ${dummyData.services.length}`,
                    `Active: ${activeServices.length}`,
                    `Categories: Maintenance, Inspection, Diagnostic, Repair`,
                    `Popular: ${activeServices.slice(0, 3).map(s => s.name).join(", ")}`,
                    `Avg Rate: $${(activeServices.reduce((sum, s) => sum + s.rate, 0) / activeServices.length).toFixed(2)}/hr`
                ]
            );
        }

        // Check Suppliers
        if (lowerInput.includes("supplier")) {
            const supplier = dummyData.suppliers[0];
            return card(
                `${supplier.name}`, supplier.status,
                [
                    `Contact: ${supplier.contact}`,
                    `Email: ${supplier.email}`,
                    `Phone: ${supplier.phone}`,
                    `Category: ${supplier.category}`,
                    `Address: ${supplier.address}`
                ]
            );
        }

        // Financial Summary
        if (lowerInput.includes("financial") || lowerInput.includes("revenue") || lowerInput.includes("sales")) {
            const totalInvoiced = dummyData.carWashInvoices.reduce((sum, inv) => sum + inv.amount, 0);
            const totalPaid = dummyData.carWashInvoices.reduce((sum, inv) => sum + inv.paid, 0);
            const outstanding = totalInvoiced - totalPaid;

            return card(
                "💰 Financial Summary", "Overview",
                [
                    `Total Invoiced: $${totalInvoiced.toFixed(2)}`,
                    `Total Paid: $${totalPaid.toFixed(2)}`,
                    `Outstanding: $${outstanding.toFixed(2)}`,
                    `Overdue Invoices: ${dummyData.carWashInvoices.filter(i => i.status === "Overdue").length}`,
                    `Recent Payments: ${dummyData.carWashPayments.length}`
                ]
            );
        }

        // Default response
        return text("I can help you with:\n• Book Service\n• Check Job Status\n• View Invoice\n• Make Payment\n\nType 'menu' to see all options!");
    }
};
