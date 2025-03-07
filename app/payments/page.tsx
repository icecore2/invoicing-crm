import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Filter, Search } from "lucide-react"
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
import { Suspense } from "react"
import { PaymentsTableSkeleton } from "@/components/payments/payments-table-skeleton"
import { PaymentsTable } from "@/components/payments/payments-table"

export default function PaymentsPage() {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 w-full border-b bg-background px-4 h-14 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Payments</h1>
      </header>

      <div className="p-4 md:p-8 pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search payments..." className="pl-8 w-full" />
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
                <DropdownMenuRadioItem value="completed">Completed</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="pending">Pending</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="failed">Failed</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="refunded">Refunded</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Filter by Method</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value="all">
                <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="credit-card">Credit Card</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bank-transfer">Bank Transfer</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="paypal">PayPal</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Card>
          <Suspense fallback={<PaymentsTableSkeleton />}>
            <PaymentsTable />
          </Suspense>
        </Card>
      </div>
    </div>
  )
}

