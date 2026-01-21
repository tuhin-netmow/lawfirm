// Comprehensive Dummy Data for Migration Consultancy ERP
// Based on SIDEBAR_MENU_STRUCTURE.md

export const dummyData = {
    // ========== LEADS & CRM ==========
    leads: [
        {
            id: "L001",
            name: "Alice Johnson",
            email: "alice.johnson@email.com",
            phone: "+1-416-555-0101",
            visaInterest: "Student Visa",
            destination: "Canada",
            source: "Facebook Ads",
            status: "New",
            assignedTo: "Sarah Mitchell",
            createdDate: "2024-01-15",
            lastContact: null,
            priority: "Medium"
        },
        {
            id: "L002",
            name: "Bob Chen",
            email: "bob.chen@email.com",
            phone: "+61-2-9555-0102",
            visaInterest: "Skilled Migration",
            destination: "Australia",
            source: "Google Search",
            status: "Contacted",
            assignedTo: "Michael Torres",
            createdDate: "2024-01-12",
            lastContact: "2024-01-14",
            priority: "High"
        },
        {
            id: "L003",
            name: "Carol Williams",
            email: "carol.w@email.com",
            phone: "+44-20-7555-0103",
            visaInterest: "Work Visa",
            destination: "UK",
            source: "Referral",
            status: "Follow-up",
            assignedTo: "Sarah Mitchell",
            createdDate: "2024-01-10",
            lastContact: "2024-01-13",
            priority: "Medium"
        },
        {
            id: "L004",
            name: "David Kumar",
            email: "d.kumar@email.com",
            phone: "+91-11-2555-0104",
            visaInterest: "PR",
            destination: "Canada",
            source: "Website",
            status: "Appointment",
            assignedTo: "Emily Rodriguez",
            createdDate: "2024-01-08",
            lastContact: "2024-01-14",
            priority: "High"
        },
        {
            id: "L005",
            name: "Emma Thompson",
            email: "emma.t@email.com",
            phone: "+1-212-555-0105",
            visaInterest: "Tourist Visa",
            destination: "USA",
            source: "Walk-in",
            status: "Converted",
            assignedTo: "Michael Torres",
            createdDate: "2024-01-05",
            lastContact: "2024-01-12",
            priority: "Low"
        }
    ],

    // ========== CLIENTS ==========
    clients: [
        {
            id: "C001",
            clientNumber: "CLT-2024-001",
            name: "John Anderson",
            email: "john.anderson@email.com",
            phone: "+1-416-555-0201",
            passportNumber: "P12345678",
            nationality: "Indian",
            dateOfBirth: "1990-05-15",
            maritalStatus: "Married",
            visaType: "Skilled Migration",
            destination: "Canada",
            consultant: "Sarah Mitchell",
            status: "Active",
            onboardedDate: "2024-01-10",
            familyMembers: 2
        },
        {
            id: "C002",
            clientNumber: "CLT-2024-002",
            name: "Maria Garcia",
            email: "maria.garcia@email.com",
            phone: "+34-91-555-0202",
            passportNumber: "ES87654321",
            nationality: "Spanish",
            dateOfBirth: "1988-08-22",
            maritalStatus: "Single",
            visaType: "Work Visa",
            destination: "Australia",
            consultant: "Michael Torres",
            status: "Active",
            onboardedDate: "2024-01-08",
            familyMembers: 0
        },
        {
            id: "C003",
            clientNumber: "CLT-2024-003",
            name: "Ahmed Hassan",
            email: "ahmed.hassan@email.com",
            phone: "+971-4-555-0203",
            passportNumber: "AE11223344",
            nationality: "Egyptian",
            dateOfBirth: "1985-12-10",
            maritalStatus: "Married",
            visaType: "Partner Visa",
            destination: "UK",
            consultant: "Emily Rodriguez",
            status: "Active",
            onboardedDate: "2024-01-05",
            familyMembers: 3
        }
    ],

    // ========== CASES ==========
    cases: [
        {
            id: "CASE-2024-001",
            clientId: "C001",
            clientName: "John Anderson",
            visaType: "Skilled Migration (Subclass 189)",
            destination: "Australia",
            priority: "High",
            status: "In Progress",
            currentMilestone: "Medical Examination",
            progress: 65,
            assignedOfficer: "Sarah Mitchell",
            startDate: "2024-01-10",
            expectedCompletion: "2024-06-15",
            lastUpdate: "Medical check requested on 12th Jan",
            nextAction: "Upload Medical Certificate"
        },
        {
            id: "CASE-2024-002",
            clientId: "C002",
            clientName: "Maria Garcia",
            visaType: "Student Visa (Subclass 500)",
            destination: "Canada",
            priority: "Medium",
            status: "In Progress",
            currentMilestone: "Document Verification",
            progress: 45,
            assignedOfficer: "Michael Torres",
            startDate: "2024-01-08",
            expectedCompletion: "2024-04-20",
            lastUpdate: "Awaiting university acceptance letter",
            nextAction: "Submit Acceptance Letter"
        },
        {
            id: "CASE-2024-003",
            clientId: "C003",
            clientName: "Ahmed Hassan",
            visaType: "Partner Visa (Subclass 820)",
            destination: "UK",
            priority: "High",
            status: "Submitted",
            currentMilestone: "Awaiting Decision",
            progress: 90,
            assignedOfficer: "Emily Rodriguez",
            startDate: "2023-12-15",
            expectedCompletion: "2024-03-01",
            lastUpdate: "Application submitted to immigration",
            nextAction: "Monitor application status"
        },
        {
            id: "CASE-2024-004",
            clientId: "C001",
            clientName: "John Anderson",
            visaType: "Work Visa (Tier 2)",
            destination: "USA",
            priority: "Low",
            status: "Overdue",
            currentMilestone: "Police Clearance",
            progress: 30,
            assignedOfficer: "Sarah Mitchell",
            startDate: "2023-11-20",
            expectedCompletion: "2024-01-10",
            lastUpdate: "Waiting for police clearance certificate",
            nextAction: "Follow up with client"
        },
        {
            id: "CASE-2024-005",
            clientId: "C002",
            clientName: "Maria Garcia",
            visaType: "Tourist Visa",
            destination: "New Zealand",
            priority: "Low",
            status: "Completed",
            currentMilestone: "Visa Granted",
            progress: 100,
            assignedOfficer: "Michael Torres",
            startDate: "2023-12-01",
            expectedCompletion: "2024-01-05",
            lastUpdate: "Visa approved and issued",
            nextAction: "None"
        }
    ],

    // ========== DOCUMENTS ==========
    documents: [
        {
            id: "DOC-001",
            caseId: "CASE-2024-001",
            clientName: "John Anderson",
            documentType: "Passport",
            fileName: "passport_john_anderson.pdf",
            uploadedDate: "2024-01-10",
            status: "Verified",
            verifiedBy: "Document Officer",
            verifiedDate: "2024-01-11",
            expiryDate: "2030-05-15",
            version: 1
        },
        {
            id: "DOC-002",
            caseId: "CASE-2024-001",
            clientName: "John Anderson",
            documentType: "Birth Certificate",
            fileName: "birth_cert_john.pdf",
            uploadedDate: "2024-01-12",
            status: "Pending Verification",
            verifiedBy: null,
            verifiedDate: null,
            expiryDate: null,
            version: 1
        },
        {
            id: "DOC-003",
            caseId: "CASE-2024-002",
            clientName: "Maria Garcia",
            documentType: "Educational Certificate",
            fileName: "degree_maria.pdf",
            uploadedDate: "2024-01-09",
            status: "Rejected",
            verifiedBy: "Document Officer",
            verifiedDate: "2024-01-10",
            rejectionReason: "Document quality too low, please rescan",
            expiryDate: null,
            version: 2
        },
        {
            id: "DOC-004",
            caseId: "CASE-2024-003",
            clientName: "Ahmed Hassan",
            documentType: "Marriage Certificate",
            fileName: "marriage_cert_ahmed.pdf",
            uploadedDate: "2023-12-20",
            status: "Verified",
            verifiedBy: "Document Officer",
            verifiedDate: "2023-12-21",
            expiryDate: null,
            version: 1
        },
        {
            id: "DOC-005",
            caseId: "CASE-2024-001",
            clientName: "John Anderson",
            documentType: "Police Clearance",
            fileName: "police_clearance_john.pdf",
            uploadedDate: "2024-01-05",
            status: "Verified",
            verifiedBy: "Document Officer",
            verifiedDate: "2024-01-06",
            expiryDate: "2024-07-05",
            version: 1
        }
    ],

    // ========== TASKS ==========
    tasks: [
        {
            id: "TSK-001",
            title: "Follow up with John Anderson - Medical Exam",
            description: "Call client to confirm medical examination appointment",
            type: "Follow-up",
            priority: "High",
            status: "To Do",
            assignedTo: "Sarah Mitchell",
            linkedTo: { type: "Case", id: "CASE-2024-001" },
            dueDate: "2024-01-16",
            createdDate: "2024-01-14",
            completedDate: null
        },
        {
            id: "TSK-002",
            title: "Verify Maria's educational documents",
            description: "Check authenticity of degree certificate",
            type: "Document Verification",
            priority: "Medium",
            status: "In Progress",
            assignedTo: "Document Officer",
            linkedTo: { type: "Case", id: "CASE-2024-002" },
            dueDate: "2024-01-15",
            createdDate: "2024-01-13",
            completedDate: null
        },
        {
            id: "TSK-003",
            title: "Prepare agreement for new client",
            description: "Draft service agreement for Emma Thompson",
            type: "Administrative",
            priority: "Medium",
            status: "Done",
            assignedTo: "Michael Torres",
            linkedTo: { type: "Client", id: "C002" },
            dueDate: "2024-01-12",
            createdDate: "2024-01-10",
            completedDate: "2024-01-12"
        },
        {
            id: "TSK-004",
            title: "Submit visa application for Ahmed",
            description: "Final submission to UK immigration",
            type: "Case Processing",
            priority: "High",
            status: "Review",
            assignedTo: "Emily Rodriguez",
            linkedTo: { type: "Case", id: "CASE-2024-003" },
            dueDate: "2024-01-14",
            createdDate: "2024-01-12",
            completedDate: null
        },
        {
            id: "TSK-005",
            title: "Contact overdue lead - Bob Chen",
            description: "Follow up on pending appointment scheduling",
            type: "Lead Follow-up",
            priority: "Low",
            status: "Overdue",
            assignedTo: "Michael Torres",
            linkedTo: { type: "Lead", id: "L002" },
            dueDate: "2024-01-13",
            createdDate: "2024-01-10",
            completedDate: null
        }
    ],

    // ========== APPOINTMENTS ==========
    appointments: [
        {
            id: "APT-001",
            clientName: "Alice Johnson",
            clientId: "L001",
            type: "Initial Consultation",
            consultant: "Sarah Mitchell",
            date: "2024-01-16",
            time: "10:00 AM",
            duration: "60 minutes",
            mode: "In-Person",
            status: "Scheduled",
            location: "Main Office - Room 2",
            notes: "First-time consultation for student visa"
        },
        {
            id: "APT-002",
            clientName: "John Anderson",
            clientId: "C001",
            type: "Document Review",
            consultant: "Sarah Mitchell",
            date: "2024-01-16",
            time: "02:00 PM",
            duration: "30 minutes",
            mode: "Video Call",
            status: "Scheduled",
            location: "Zoom Meeting",
            notes: "Review medical examination documents"
        },
        {
            id: "APT-003",
            clientName: "Maria Garcia",
            clientId: "C002",
            type: "Case Update",
            consultant: "Michael Torres",
            date: "2024-01-16",
            time: "04:30 PM",
            duration: "45 minutes",
            mode: "Phone Call",
            status: "Scheduled",
            location: "Phone",
            notes: "Update on student visa application progress"
        },
        {
            id: "APT-004",
            clientName: "David Kumar",
            clientId: "L004",
            type: "Initial Consultation",
            consultant: "Emily Rodriguez",
            date: "2024-01-15",
            time: "11:00 AM",
            duration: "60 minutes",
            mode: "In-Person",
            status: "Completed",
            location: "Main Office - Room 1",
            notes: "PR consultation completed successfully"
        },
        {
            id: "APT-005",
            clientName: "Bob Chen",
            clientId: "L002",
            type: "Follow-up Meeting",
            consultant: "Michael Torres",
            date: "2024-01-14",
            time: "03:00 PM",
            duration: "30 minutes",
            mode: "Video Call",
            status: "No-Show",
            location: "Zoom Meeting",
            notes: "Client did not attend scheduled meeting"
        }
    ],

    // ========== INVOICES ==========
    invoices: [
        {
            id: "INV-2024-001",
            invoiceNumber: "INV-2024-001",
            clientId: "C001",
            clientName: "John Anderson",
            caseId: "CASE-2024-001",
            amount: 5500.00,
            currency: "AUD",
            status: "Sent",
            issueDate: "2024-01-10",
            dueDate: "2024-01-25",
            paidAmount: 0,
            balancedue: 5500.00,
            items: [
                { description: "Skilled Migration Visa Processing", quantity: 1, rate: 4500.00, amount: 4500.00 },
                { description: "Document Verification Fee", quantity: 1, rate: 500.00, amount: 500.00 },
                { description: "Consultation Fee", quantity: 2, rate: 250.00, amount: 500.00 }
            ]
        },
        {
            id: "INV-2024-002",
            invoiceNumber: "INV-2024-002",
            clientId: "C002",
            clientName: "Maria Garcia",
            caseId: "CASE-2024-002",
            amount: 3200.00,
            currency: "CAD",
            status: "Paid",
            issueDate: "2024-01-08",
            dueDate: "2024-01-23",
            paidAmount: 3200.00,
            balanceDue: 0,
            paidDate: "2024-01-12",
            paymentMethod: "Bank Transfer",
            items: [
                { description: "Student Visa Application", quantity: 1, rate: 2800.00, amount: 2800.00 },
                { description: "Document Translation", quantity: 1, rate: 400.00, amount: 400.00 }
            ]
        },
        {
            id: "INV-2024-003",
            invoiceNumber: "INV-2024-003",
            clientId: "C003",
            clientName: "Ahmed Hassan",
            caseId: "CASE-2024-003",
            amount: 6800.00,
            currency: "GBP",
            status: "Overdue",
            issueDate: "2023-12-20",
            dueDate: "2024-01-05",
            paidAmount: 3400.00,
            balanceDue: 3400.00,
            items: [
                { description: "Partner Visa Processing", quantity: 1, rate: 6000.00, amount: 6000.00 },
                { description: "Priority Service Fee", quantity: 1, rate: 800.00, amount: 800.00 }
            ]
        },
        {
            id: "INV-2024-004",
            invoiceNumber: "INV-2024-004",
            clientId: "C001",
            clientName: "John Anderson",
            caseId: null,
            amount: 1500.00,
            currency: "AUD",
            status: "Draft",
            issueDate: null,
            dueDate: null,
            paidAmount: 0,
            balanceDue: 1500.00,
            items: [
                { description: "Additional Consultation Services", quantity: 3, rate: 500.00, amount: 1500.00 }
            ]
        }
    ],

    // ========== PAYMENTS ==========
    payments: [
        {
            id: "PAY-001",
            paymentNumber: "PAY-2024-001",
            invoiceId: "INV-2024-002",
            clientName: "Maria Garcia",
            amount: 3200.00,
            currency: "CAD",
            method: "Bank Transfer",
            date: "2024-01-12",
            reference: "TXN123456789",
            receivedBy: "Accounts Department",
            notes: "Full payment received"
        },
        {
            id: "PAY-002",
            paymentNumber: "PAY-2024-002",
            invoiceId: "INV-2024-003",
            clientName: "Ahmed Hassan",
            amount: 3400.00,
            currency: "GBP",
            method: "Credit Card",
            date: "2023-12-22",
            reference: "CC-987654321",
            receivedBy: "Accounts Department",
            notes: "Partial payment - 50% advance"
        }
    ],

    // ========== COMMISSIONS ==========
    commissions: [
        {
            id: "COM-001",
            consultantName: "Sarah Mitchell",
            caseId: "CASE-2024-001",
            clientName: "John Anderson",
            invoiceAmount: 5500.00,
            commissionRate: 10,
            commissionAmount: 550.00,
            status: "Pending",
            earnedDate: "2024-01-10",
            paidDate: null
        },
        {
            id: "COM-002",
            consultantName: "Michael Torres",
            caseId: "CASE-2024-002",
            clientName: "Maria Garcia",
            invoiceAmount: 3200.00,
            commissionRate: 10,
            commissionAmount: 320.00,
            status: "Paid",
            earnedDate: "2024-01-08",
            paidDate: "2024-01-13"
        },
        {
            id: "COM-003",
            consultantName: "Emily Rodriguez",
            caseId: "CASE-2024-003",
            clientName: "Ahmed Hassan",
            invoiceAmount: 6800.00,
            commissionRate: 12,
            commissionAmount: 816.00,
            status: "Pending",
            earnedDate: "2023-12-20",
            paidDate: null
        }
    ],

    // ========== STAFF/USERS ==========
    staff: [
        {
            id: "USR-001",
            name: "Sarah Mitchell",
            email: "sarah.mitchell@company.com",
            role: "Migration Consultant",
            department: "Consultancy",
            phone: "+1-416-555-1001",
            status: "Active",
            joinDate: "2022-03-15",
            activeCases: 12,
            completedCases: 45
        },
        {
            id: "USR-002",
            name: "Michael Torres",
            email: "michael.torres@company.com",
            role: "Senior Consultant",
            department: "Consultancy",
            phone: "+1-416-555-1002",
            status: "Active",
            joinDate: "2021-06-01",
            activeCases: 15,
            completedCases: 78
        },
        {
            id: "USR-003",
            name: "Emily Rodriguez",
            email: "emily.rodriguez@company.com",
            role: "Case Officer",
            department: "Operations",
            phone: "+1-416-555-1003",
            status: "Active",
            joinDate: "2023-01-10",
            activeCases: 8,
            completedCases: 22
        },
        {
            id: "USR-004",
            name: "James Wilson",
            email: "james.wilson@company.com",
            role: "Document Officer",
            department: "Operations",
            phone: "+1-416-555-1004",
            status: "Active",
            joinDate: "2022-09-20",
            activeCases: 0,
            completedCases: 156
        }
    ],

    // ========== STATISTICS ==========
    statistics: {
        leads: {
            total: 125,
            new: 35,
            contacted: 42,
            followUp: 28,
            converted: 15,
            lost: 5
        },
        clients: {
            total: 89,
            active: 67,
            inactive: 22
        },
        cases: {
            total: 156,
            inProgress: 45,
            submitted: 23,
            completed: 78,
            overdue: 10
        },
        documents: {
            total: 1247,
            verified: 892,
            pending: 234,
            rejected: 89,
            expiringSoon: 32
        },
        tasks: {
            total: 234,
            toDo: 67,
            inProgress: 89,
            review: 34,
            done: 44,
            overdue: 12
        },
        appointments: {
            total: 456,
            scheduled: 23,
            completed: 389,
            noShow: 34,
            cancelled: 10
        },
        finance: {
            totalRevenue: 456789.50,
            pendingPayments: 125430.00,
            overdueInvoices: 45670.00,
            paidThisMonth: 89450.00
        }
    },

    // ========== CAR WASH / AUTO REPAIR SERVICES ==========

    // ========== INVENTORY - PURCHASE ORDERS ==========
    purchaseOrders: [
        {
            id: 1,
            po_no: "PO-2024-001",
            supplier: "AutoParts Direct",
            date: "2024-05-20",
            expectedDate: "2024-05-27",
            items: 5,
            total: 1250.50,
            status: "Pending"
        },
        {
            id: 2,
            po_no: "PO-2024-002",
            supplier: "Quality Oil Supplies",
            date: "2024-05-18",
            expectedDate: "2024-05-25",
            items: 3,
            total: 850.00,
            status: "Received"
        },
        {
            id: 3,
            po_no: "PO-2024-003",
            supplier: "Brake Masters Inc",
            date: "2024-05-15",
            expectedDate: "2024-05-22",
            items: 8,
            total: 2100.75,
            status: "Partial"
        }
    ],

    // ========== INVENTORY - GOODS RECEIPT NOTES ==========
    goodsReceiptNotes: [
        {
            id: 1,
            grn_no: "GRN-2024-001",
            po_no: "PO-2024-002",
            supplier: "Quality Oil Supplies",
            date: "2024-05-25",
            items: 3,
            status: "Received"
        },
        {
            id: 2,
            grn_no: "GRN-2024-002",
            po_no: "PO-2024-003",
            supplier: "Brake Masters Inc",
            date: "2024-05-23",
            items: 5,
            status: "Partial"
        }
    ],

    // ========== INVENTORY - PARTS ==========
    parts: [
        {
            id: 1,
            code: "PT-001",
            name: "Oil Filter",
            category: "Filters",
            stock: 45,
            minStock: 20,
            unitCost: 12.50,
            sellingPrice: 25.00,
            supplier: "AutoParts Direct",
            status: "Active"
        },
        {
            id: 2,
            code: "PT-002",
            name: "Brake Pads",
            category: "Brakes",
            stock: 15,
            minStock: 10,
            unitCost: 45.00,
            sellingPrice: 89.00,
            supplier: "Brake Masters Inc",
            status: "Active"
        },
        {
            id: 3,
            code: "PT-003",
            name: "Air Filter",
            category: "Filters",
            stock: 8,
            minStock: 15,
            unitCost: 8.50,
            sellingPrice: 18.00,
            supplier: "AutoParts Direct",
            status: "Low Stock"
        },
        {
            id: 4,
            code: "PT-004",
            name: "Spark Plug",
            category: "Engine",
            stock: 60,
            minStock: 25,
            unitCost: 6.00,
            sellingPrice: 12.00,
            supplier: "Quality Oil Supplies",
            status: "Active"
        }
    ],

    // ========== INVENTORY - SUPPLIERS ==========
    suppliers: [
        {
            id: 1,
            name: "AutoParts Direct",
            contact: "John Smith",
            email: "john@autopartsdirect.com",
            phone: "+1-555-0101",
            address: "123 Auto St, Detroit, MI",
            category: "General Parts",
            status: "Active"
        },
        {
            id: 2,
            name: "Quality Oil Supplies",
            contact: "Sarah Johnson",
            email: "sarah@qualityoil.com",
            phone: "+1-555-0102",
            address: "456 Oil Ave, Houston, TX",
            category: "Lubricants",
            status: "Active"
        },
        {
            id: 3,
            name: "Brake Masters Inc",
            contact: "Mike Brown",
            email: "mike@brakemasters.com",
            phone: "+1-555-0103",
            address: "789 Brake Blvd, Chicago, IL",
            category: "Brake Systems",
            status: "Active"
        }
    ],

    // ========== FINANCE - INVOICES (CAR WASH) ==========
    carWashInvoices: [
        {
            id: 1,
            invoice_no: "INV-2024-001",
            date: "2024-05-25",
            customer: "John Doe",
            vehicle: "Toyota Camry (ABC-1234)",
            amount: 450.00,
            paid: 450.00,
            balance: 0,
            status: "Paid",
            due_date: "2024-06-10"
        },
        {
            id: 2,
            invoice_no: "INV-2024-002",
            date: "2024-05-24",
            customer: "Sarah Smith",
            vehicle: "Honda Civic (XYZ-5678)",
            amount: 1250.00,
            paid: 500.00,
            balance: 750.00,
            status: "Partial",
            due_date: "2024-06-08"
        },
        {
            id: 3,
            invoice_no: "INV-2024-003",
            date: "2024-05-23",
            customer: "Mike Johnson",
            vehicle: "Ford F-150 (DEF-9012)",
            amount: 890.00,
            paid: 0,
            balance: 890.00,
            status: "Unpaid",
            due_date: "2024-06-07"
        },
        {
            id: 4,
            invoice_no: "INV-2024-004",
            date: "2024-05-15",
            customer: "Emily Davis",
            vehicle: "BMW X5 (GHI-3456)",
            amount: 2100.00,
            paid: 0,
            balance: 2100.00,
            status: "Overdue",
            due_date: "2024-05-30"
        },
        {
            id: 5,
            invoice_no: "INV-2024-005",
            date: "2024-05-22",
            customer: "Robert Brown",
            vehicle: "Tesla Model 3 (JKL-7890)",
            amount: 675.00,
            paid: 675.00,
            balance: 0,
            status: "Paid",
            due_date: "2024-06-06"
        }
    ],

    // ========== FINANCE - PAYMENTS (CAR WASH) ==========
    carWashPayments: [
        {
            id: 1,
            payment_no: "PAY-2024-001",
            date: "2024-05-25",
            invoice_no: "INV-2024-001",
            customer: "John Doe",
            amount: 450.00,
            method: "Cash",
            reference: "-",
            received_by: "Admin"
        },
        {
            id: 2,
            payment_no: "PAY-2024-002",
            date: "2024-05-24",
            invoice_no: "INV-2024-002",
            customer: "Sarah Smith",
            amount: 500.00,
            method: "Card",
            reference: "TXN-789456",
            received_by: "Admin"
        },
        {
            id: 3,
            payment_no: "PAY-2024-003",
            date: "2024-05-23",
            invoice_no: "INV-2024-005",
            customer: "Robert Brown",
            amount: 675.00,
            method: "Bank",
            reference: "REF-123456",
            received_by: "Admin"
        },
        {
            id: 4,
            payment_no: "PAY-2024-004",
            date: "2024-05-22",
            invoice_no: "INV-2024-003",
            customer: "Mike Johnson",
            amount: 300.00,
            method: "Online",
            reference: "PAY-ONLINE-456",
            received_by: "Cashier"
        }
    ],

    // ========== FINANCE - CREDIT NOTES ==========
    creditNotes: [
        {
            id: 1,
            cn_no: "CN-2024-001",
            date: "2024-05-26",
            invoice_no: "INV-2024-002",
            customer: "Sarah Smith",
            amount: 250.00,
            reason: "Defective parts returned",
            status: "Issued"
        },
        {
            id: 2,
            cn_no: "CN-2024-002",
            date: "2024-05-25",
            invoice_no: "INV-2024-004",
            customer: "Emily Davis",
            amount: 500.00,
            reason: "Service not completed",
            status: "Pending"
        },
        {
            id: 3,
            cn_no: "CN-2024-003",
            date: "2024-05-24",
            invoice_no: "INV-2024-003",
            customer: "Mike Johnson",
            amount: 150.00,
            reason: "Overcharge correction",
            status: "Applied"
        }
    ],

    // ========== SETTINGS - SERVICE CATALOG ==========
    services: [
        {
            id: 1,
            code: "SVC-001",
            name: "Oil Change",
            category: "Maintenance",
            hours: 0.5,
            rate: 45.00,
            price: 22.50,
            status: "Active"
        },
        {
            id: 2,
            code: "SVC-002",
            name: "Brake Inspection",
            category: "Inspection",
            hours: 1.0,
            rate: 45.00,
            price: 45.00,
            status: "Active"
        },
        {
            id: 3,
            code: "SVC-003",
            name: "Tire Rotation",
            category: "Maintenance",
            hours: 0.75,
            rate: 45.00,
            price: 33.75,
            status: "Active"
        },
        {
            id: 4,
            code: "SVC-004",
            name: "Engine Diagnostic",
            category: "Diagnostic",
            hours: 2.0,
            rate: 65.00,
            price: 130.00,
            status: "Active"
        },
        {
            id: 5,
            code: "SVC-005",
            name: "Transmission Service",
            category: "Repair",
            hours: 3.0,
            rate: 55.00,
            price: 165.00,
            status: "Active"
        },
        {
            id: 6,
            code: "SVC-006",
            name: "Air Filter Replacement",
            category: "Maintenance",
            hours: 0.25,
            rate: 45.00,
            price: 11.25,
            status: "Inactive"
        }
    ],

    // ========== SETTINGS - VEHICLE MAKES ==========
    vehicleMakes: [
        {
            id: 1,
            name: "Toyota",
            country: "Japan",
            models: 12,
            status: "Active"
        },
        {
            id: 2,
            name: "Honda",
            country: "Japan",
            models: 8,
            status: "Active"
        },
        {
            id: 3,
            name: "Ford",
            country: "USA",
            models: 10,
            status: "Active"
        },
        {
            id: 4,
            name: "BMW",
            country: "Germany",
            models: 15,
            status: "Active"
        },
        {
            id: 5,
            name: "Tesla",
            country: "USA",
            models: 5,
            status: "Active"
        }
    ],

    // ========== SETTINGS - VEHICLE MODELS ==========
    vehicleModels: [
        {
            id: 1,
            make: "Toyota",
            name: "Camry",
            year: "2020-2024",
            type: "Sedan",
            status: "Active"
        },
        {
            id: 2,
            make: "Toyota",
            name: "Corolla",
            year: "2019-2024",
            type: "Sedan",
            status: "Active"
        },
        {
            id: 3,
            make: "Honda",
            name: "Civic",
            year: "2020-2024",
            type: "Sedan",
            status: "Active"
        },
        {
            id: 4,
            make: "Honda",
            name: "CR-V",
            year: "2021-2024",
            type: "SUV",
            status: "Active"
        },
        {
            id: 5,
            make: "Ford",
            name: "F-150",
            year: "2018-2024",
            type: "Truck",
            status: "Active"
        },
        {
            id: 6,
            make: "BMW",
            name: "X5",
            year: "2020-2024",
            type: "SUV",
            status: "Active"
        },
        {
            id: 7,
            make: "Tesla",
            name: "Model 3",
            year: "2019-2024",
            type: "Sedan",
            status: "Active"
        }
    ],

    // ========== SETTINGS - SERVICE REMINDERS ==========
    serviceReminders: [
        {
            id: 1,
            name: "Oil Change Reminder",
            service: "Oil Change",
            triggerType: "Time",
            interval: "6 months",
            mileage: null,
            template: "Standard Service",
            status: "Active"
        },
        {
            id: 2,
            name: "Tire Rotation",
            service: "Tire Rotation",
            triggerType: "Mileage",
            interval: null,
            mileage: "10,000 km",
            template: "Maintenance Alert",
            status: "Active"
        },
        {
            id: 3,
            name: "Brake Inspection",
            service: "Brake Inspection",
            triggerType: "Time",
            interval: "12 months",
            mileage: null,
            template: "Safety Check",
            status: "Active"
        },
        {
            id: 4,
            name: "Engine Service",
            service: "Engine Diagnostic",
            triggerType: "Both",
            interval: "12 months",
            mileage: "20,000 km",
            template: "Premium Service",
            status: "Active"
        },
        {
            id: 5,
            name: "Battery Check",
            service: "Battery Inspection",
            triggerType: "Time",
            interval: "24 months",
            mileage: null,
            template: "Standard Service",
            status: "Inactive"
        }
    ]
};

export default dummyData;
