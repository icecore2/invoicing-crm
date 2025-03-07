import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDate } from "@/lib/utils"
import { Filter, Plus, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample data
const invoices = [
  {
    id: "INV-001",
    client: "John Smith",
    email: "john@example.com",
    amount: 1250,
    status: "paid",
    date: "2023-11-03",
  },
  {
    id: "INV-002",
    client: "Sarah Johnson",
    email: "sarah@example.com",
    amount: 3200,
    status: "pending",
    date: "2023-11-05",
  },
  {
    id: "INV-003",
    client: "Michael Brown",
    email: "michael@example.com",
    amount: 850,
    status: "paid",
    date: "2023-11-08",
  },
  {
    id: "INV-004",
    client: "Emily Davis",
    email: "emily@example.com",
    amount: 2400,
    status: "overdue",
    date: "2023-10-25",
  },
  {
    id: "INV-005",
    client: "David Wilson",
    email: "david@example.com",
    amount: 1600,
    status: "pending",
    date: "2023-11-10",
  },
  {
    id: "INV-006",
    client: "Lisa Taylor",
    email: "lisa@example.com",
    amount: 900,
    status: "paid",
    date: "2023-11-12",
  },
  {
    id: "INV-007",
    client: "Robert Miller",
    email: "robert@example.com",
    amount: 1800,
    status: "pending",
    date: "2023-11-15",
  },
  {
    id: "INV-008",
    client: "Jennifer White",
    email: "jennifer@example.com",
    amount: 3000,
    status: "pending",
    date: "2023-11-18",
  },
  {
    id: "INV-009",
    client: "Daniel Harris",
    email: "daniel@example.com",
    amount: 1200,
    status: "overdue",
    date: "2023-10-30",
  },
  {
    id: "INV-010",
    client: "Jessica Green",
    email: "jessica@example.com",
    amount: 2100,
    status: "paid",
    date: "2023-11-20",
  },
]

export default function InvoicesPage() {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 w-full border-b bg-background px-4 h-14 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Invoices</h1>
        <Link href="/invoices/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </Link>
      </header>

      <div className="p-4 md:p-8 pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search invoices..." className="pl-8 w-full" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-2">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value="all">
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="paid">Paid</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="pending">Pending</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="overdue">Overdue</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Client</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    <Link href={`/invoices/${invoice.id}`} className="hover:underline">
                      {invoice.id}
                    </Link>
                  </TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(invoice.date)}</TableCell>
                  <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        invoice.status === "paid" ? "success" : invoice.status === "pending" ? "outline" : "destructive"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/invoices/${invoice.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}

