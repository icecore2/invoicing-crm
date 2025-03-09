// Types for our data models
export type Client = {
  id: string
  name: string
  email: string
  company: string
  phone: string
  address: string
  createdAt: Date
  updatedAt: Date
}

export type Invoice = {
  id: string
  invoiceNumber: string
  clientId: string
  client: Client
  date: Date
  dueDate: Date
  status: "draft" | "pending" | "paid" | "overdue" | "cancelled"
  items: InvoiceItem[]
  subtotal: number
  taxRate: number
  taxAmount: number
  total: number
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export type InvoiceItem = {
  id: string
  invoiceId: string
  description: string
  quantity: number
  unitPrice: number
  amount: number
}

export type Payment = {
  id: string
  transactionId: string
  invoiceId: string
  invoiceNumber: string
  clientId: string
  clientName: string
  date: Date
  amount: number
  method: "credit-card" | "bank-transfer" | "paypal"
  status: "completed" | "pending" | "failed" | "refunded"
  metadata?: Record<string, any>
}

export type DashboardStats = {
  totalRevenue: number
  previousMonthRevenue: number
  paidInvoices: number
  pendingAmount: number
  pendingInvoices: number
  totalClients: number
  newClients: number
  revenueByMonth: {
    name: string
    revenue: number
    pending: number
  }[]
}

// Function to fetch dashboard stats
export async function getDashboardStats(): Promise<DashboardStats> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, this would be a database query
  return {
    totalRevenue: 45231.89,
    previousMonthRevenue: 37658.22,
    paidInvoices: 27,
    pendingAmount: 6350,
    pendingInvoices: 8,
    totalClients: 34,
    newClients: 12,
    revenueByMonth: [
      {
        name: "Jan",
        revenue: 4000,
        pending: 2400,
      },
      {
        name: "Feb",
        revenue: 3000,
        pending: 1398,
      },
      {
        name: "Mar",
        revenue: 5000,
        pending: 3000,
      },
      {
        name: "Apr",
        revenue: 3780,
        pending: 3908,
      },
      {
        name: "May",
        revenue: 5890,
        pending: 4800,
      },
      {
        name: "Jun",
        revenue: 6390,
        pending: 3800,
      },
      {
        name: "Jul",
        revenue: 4490,
        pending: 4300,
      },
      {
        name: "Aug",
        revenue: 5490,
        pending: 4300,
      },
      {
        name: "Sep",
        revenue: 6590,
        pending: 3300,
      },
      {
        name: "Oct",
        revenue: 7590,
        pending: 2300,
      },
      {
        name: "Nov",
        revenue: 9590,
        pending: 1300,
      },
      {
        name: "Dec",
        revenue: 8590,
        pending: 2300,
      },
    ],
  }
}

// Function to fetch recent invoices
export async function getRecentInvoices(limit = 5): Promise<Invoice[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // In a real app, this would be a database query
  return [
    {
      id: "INV-001",
      invoiceNumber: "INV-001",
      clientId: "1",
      client: {
        id: "1",
        name: "John Smith",
        email: "john@example.com",
        company: "Smith Web Design",
        phone: "+1 (555) 123-4567",
        address: "123 Main St, New York, NY 10001",
        createdAt: new Date("2023-01-15"),
        updatedAt: new Date("2023-01-15"),
      },
      date: new Date("2023-11-03"),
      dueDate: new Date("2023-11-17"),
      status: "paid",
      items: [
        {
          id: "1",
          invoiceId: "INV-001",
          description: "Website Design",
          quantity: 1,
          unitPrice: 1250,
          amount: 1250,
        },
      ],
      subtotal: 1250,
      taxRate: 0,
      taxAmount: 0,
      total: 1250,
      notes: "Thank you for your business",
      createdAt: new Date("2023-11-03"),
      updatedAt: new Date("2023-11-10"),
    },
    {
      id: "INV-002",
      invoiceNumber: "INV-002",
      clientId: "2",
      client: {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        company: "Johnson & Co",
        phone: "+1 (555) 987-6543",
        address: "456 Park Ave, Boston, MA 02108",
        createdAt: new Date("2023-02-20"),
        updatedAt: new Date("2023-02-20"),
      },
      date: new Date("2023-11-05"),
      dueDate: new Date("2023-11-19"),
      status: "pending",
      items: [
        {
          id: "2",
          invoiceId: "INV-002",
          description: "Marketing Consultation",
          quantity: 8,
          unitPrice: 400,
          amount: 3200,
        },
      ],
      subtotal: 3200,
      taxRate: 0,
      taxAmount: 0,
      total: 3200,
      notes: "Net 14 payment terms",
      createdAt: new Date("2023-11-05"),
      updatedAt: new Date("2023-11-05"),
    },
    {
      id: "INV-003",
      invoiceNumber: "INV-003",
      clientId: "3",
      client: {
        id: "3",
        name: "Michael Brown",
        email: "michael@example.com",
        company: "Brown Enterprises",
        phone: "+1 (555) 456-7890",
        address: "789 Oak St, Chicago, IL 60601",
        createdAt: new Date("2023-03-10"),
        updatedAt: new Date("2023-03-10"),
      },
      date: new Date("2023-11-08"),
      dueDate: new Date("2023-11-22"),
      status: "paid",
      items: [
        {
          id: "3",
          invoiceId: "INV-003",
          description: "Logo Design",
          quantity: 1,
          unitPrice: 850,
          amount: 850,
        },
      ],
      subtotal: 850,
      taxRate: 0,
      taxAmount: 0,
      total: 850,
      notes: "Thank you for your prompt payment",
      createdAt: new Date("2023-11-08"),
      updatedAt: new Date("2023-11-15"),
    },
    {
      id: "INV-004",
      invoiceNumber: "INV-004",
      clientId: "4",
      client: {
        id: "4",
        name: "Emily Davis",
        email: "emily@example.com",
        company: "Davis Marketing",
        phone: "+1 (555) 789-0123",
        address: "321 Pine St, San Francisco, CA 94101",
        createdAt: new Date("2023-04-05"),
        updatedAt: new Date("2023-04-05"),
      },
      date: new Date("2023-10-25"),
      dueDate: new Date("2023-11-08"),
      status: "overdue",
      items: [
        {
          id: "4",
          invoiceId: "INV-004",
          description: "Social Media Campaign",
          quantity: 1,
          unitPrice: 2400,
          amount: 2400,
        },
      ],
      subtotal: 2400,
      taxRate: 0,
      taxAmount: 0,
      total: 2400,
      notes: "Please remit payment as soon as possible",
      createdAt: new Date("2023-10-25"),
      updatedAt: new Date("2023-10-25"),
    },
    {
      id: "INV-005",
      invoiceNumber: "INV-005",
      clientId: "5",
      client: {
        id: "5",
        name: "David Wilson",
        email: "david@example.com",
        company: "Wilson Tech",
        phone: "+1 (555) 321-6540",
        address: "654 Maple Ave, Seattle, WA 98101",
        createdAt: new Date("2023-05-12"),
        updatedAt: new Date("2023-05-12"),
      },
      date: new Date("2023-11-10"),
      dueDate: new Date("2023-11-24"),
      status: "pending",
      items: [
        {
          id: "5",
          invoiceId: "INV-005",
          description: "IT Consulting",
          quantity: 4,
          unitPrice: 400,
          amount: 1600,
        },
      ],
      subtotal: 1600,
      taxRate: 0,
      taxAmount: 0,
      total: 1600,
      notes: "Net 14 payment terms",
      createdAt: new Date("2023-11-10"),
      updatedAt: new Date("2023-11-10"),
    },
  ]
}

// Function to fetch all clients
export async function getAllClients(): Promise<Client[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // In a real app, this would be a database query
  return [
    {
      id: "1",
      name: "John Smith",
      email: "john@example.com",
      company: "Smith Web Design",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, New York, NY 10001",
      createdAt: new Date("2023-01-15"),
      updatedAt: new Date("2023-01-15"),
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      company: "Johnson & Co",
      phone: "+1 (555) 987-6543",
      address: "456 Park Ave, Boston, MA 02108",
      createdAt: new Date("2023-02-20"),
      updatedAt: new Date("2023-02-20"),
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael@example.com",
      company: "Brown Enterprises",
      phone: "+1 (555) 456-7890",
      address: "789 Oak St, Chicago, IL 60601",
      createdAt: new Date("2023-03-10"),
      updatedAt: new Date("2023-03-10"),
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@example.com",
      company: "Davis Marketing",
      phone: "+1 (555) 789-0123",
      address: "321 Pine St, San Francisco, CA 94101",
      createdAt: new Date("2023-04-05"),
      updatedAt: new Date("2023-04-05"),
    },
    {
      id: "5",
      name: "David Wilson",
      email: "david@example.com",
      company: "Wilson Tech",
      phone: "+1 (555) 321-6540",
      address: "654 Maple Ave, Seattle, WA 98101",
      createdAt: new Date("2023-05-12"),
      updatedAt: new Date("2023-05-12"),
    },
  ]
}

// Function to get client by ID
export async function getClientById(id: string): Promise<Client | null> {
  const clients = await getAllClients()
  return clients.find((client) => client.id === id) || null
}

// Function to get invoice by ID
export async function getInvoiceById(id: string): Promise<Invoice | null> {
  const invoices = await getRecentInvoices(100) // Get all invoices
  return invoices.find((invoice) => invoice.id === id) || null
}

// Function to get invoices by client ID
export async function getInvoicesByClientId(clientId: string): Promise<Invoice[]> {
  const invoices = await getRecentInvoices(100) // Get all invoices
  return invoices.filter((invoice) => invoice.clientId === clientId)
}

// Function to get total revenue
export async function getTotalRevenue(): Promise<number> {
  const invoices = await getRecentInvoices(100) // Get all invoices
  return invoices.filter((invoice) => invoice.status === "paid").reduce((sum, invoice) => sum + invoice.total, 0)
}

// Function to get pending amount
export async function getPendingAmount(): Promise<number> {
  const invoices = await getRecentInvoices(100) // Get all invoices
  return invoices
    .filter((invoice) => invoice.status === "pending" || invoice.status === "overdue")
    .reduce((sum, invoice) => sum + invoice.total, 0)
}

// Function to get invoice counts by status
export async function getInvoiceCountsByStatus(): Promise<Record<string, number>> {
  const invoices = await getRecentInvoices(100) // Get all invoices
  const counts: Record<string, number> = {
    draft: 0,
    pending: 0,
    paid: 0,
    overdue: 0,
    cancelled: 0,
  }

  invoices.forEach((invoice) => {
    counts[invoice.status] += 1
  })

  return counts
}

// Function to get payments
export async function getPayments(): Promise<Payment[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // In a real app, this would be a database query
  return [
    {
      id: "1",
      transactionId: "TRX-12345",
      invoiceId: "INV-001",
      invoiceNumber: "INV-001",
      clientId: "1",
      clientName: "John Smith",
      date: new Date("2023-11-10"),
      amount: 1250,
      method: "credit-card",
      status: "completed",
    },
    {
      id: "2",
      transactionId: "TRX-12346",
      invoiceId: "INV-003",
      invoiceNumber: "INV-003",
      clientId: "3",
      clientName: "Michael Brown",
      date: new Date("2023-11-15"),
      amount: 850,
      method: "bank-transfer",
      status: "completed",
    },
    {
      id: "3",
      transactionId: "TRX-12347",
      invoiceId: "INV-002",
      invoiceNumber: "INV-002",
      clientId: "2",
      clientName: "Sarah Johnson",
      date: new Date("2023-11-18"),
      amount: 1600,
      method: "paypal",
      status: "pending",
    },
    {
      id: "4",
      transactionId: "TRX-12348",
      invoiceId: "INV-005",
      invoiceNumber: "INV-005",
      clientId: "5",
      clientName: "David Wilson",
      date: new Date("2023-11-20"),
      amount: 1600,
      method: "credit-card",
      status: "failed",
    },
    {
      id: "5",
      transactionId: "TRX-12349",
      invoiceId: "INV-004",
      invoiceNumber: "INV-004",
      clientId: "4",
      clientName: "Emily Davis",
      date: new Date("2023-11-22"),
      amount: 2400,
      method: "credit-card",
      status: "pending",
    },
  ]
}

// Function to get activities
export async function getActivities(): Promise<any[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // In a real app, this would be a database query
  return [
    {
      id: "1",
      type: "invoices",
      action: "created",
      title: "Invoice INV-001 created",
      description: "New invoice for John Smith has been created",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      link: "/invoices/INV-001",
      user: "Admin User",
    },
    {
      id: "2",
      type: "invoices",
      action: "sent",
      title: "Invoice INV-001 sent",
      description: "Invoice has been emailed to john@example.com",
      timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
      link: "/invoices/INV-001",
      user: "Admin User",
    },
    {
      id: "3",
      type: "payments",
      action: "completed",
      title: "Payment received for INV-001",
      description: "Payment of $1,250.00 received via Credit Card",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      link: "/payments/1",
      user: "System",
    },
    {
      id: "4",
      type: "clients",
      action: "created",
      title: "New client added",
      description: "Sarah Johnson has been added as a new client",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      link: "/clients/2",
      user: "Admin User",
    },
    {
      id: "5",
      type: "invoices",
      action: "created",
      title: "Invoice INV-002 created",
      description: "New invoice for Sarah Johnson has been created",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      link: "/invoices/INV-002",
      user: "Admin User",
    },
    {
      id: "6",
      type: "invoices",
      action: "sent",
      title: "Invoice INV-002 sent",
      description: "Invoice has been emailed to sarah@example.com",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6 - 1000 * 60 * 5), // 6 hours 5 minutes ago
      link: "/invoices/INV-002",
      user: "Admin User",
    },
    {
      id: "7",
      type: "invoices",
      action: "overdue",
      title: "Invoice INV-004 is overdue",
      description: "Payment for invoice INV-004 is overdue by 2 days",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      link: "/invoices/INV-004",
      user: "System",
    },
    {
      id: "8",
      type: "system",
      action: "updated",
      title: "System settings updated",
      description: "SMTP settings have been updated",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      link: "/settings",
      user: "Admin User",
    },
    {
      id: "9",
      type: "payments",
      action: "failed",
      title: "Payment failed for INV-005",
      description: "Credit card payment for invoice INV-005 has failed",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 - 1000 * 60 * 60 * 3), // 2 days 3 hours ago
      link: "/payments/4",
      user: "System",
    },
    {
      id: "10",
      type: "clients",
      action: "updated",
      title: "Client information updated",
      description: "Contact information for Michael Brown has been updated",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      link: "/clients/3",
      user: "Admin User",
    },
  ]
}

// Function to get invoice templates
export async function getTemplates(): Promise<any[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, this would be a database query
  return [
    {
      id: "template-1",
      name: "Professional",
      description: "Clean and professional invoice design",
      thumbnail: "/placeholder.svg?height=297&width=210",
      createdAt: new Date("2023-09-05"),
      updatedAt: new Date("2023-09-05"),
    },
    {
      id: "template-2",
      name: "Minimalist",
      description: "Simple and minimalist layout",
      thumbnail: "/placeholder.svg?height=297&width=210",
      createdAt: new Date("2023-10-10"),
      updatedAt: new Date("2023-10-10"),
    },
    {
      id: "template-3",
      name: "Modern",
      description: "Contemporary design with color accents",
      thumbnail: "/placeholder.svg?height=297&width=210",
      createdAt: new Date("2023-11-15"),
      updatedAt: new Date("2023-11-15"),
    },
    {
      id: "template-4",
      name: "Creative",
      description: "Artistic design for creative professionals",
      thumbnail: "/placeholder.svg?height=297&width=210",
      createdAt: new Date("2023-12-01"),
      updatedAt: new Date("2023-12-01"),
    },
  ]
}

// Function to get template by ID
export async function getTemplateById(id: string): Promise<any | null> {
  const templates = await getTemplates()
  return templates.find((template) => template.id === id) || null
}

