import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import Link from "next/link"
import { getRecentInvoices } from "@/lib/data"

export async function RecentInvoices() {
  const invoices = await getRecentInvoices()

  return (
    <div className="space-y-8">
      {invoices.map((invoice) => (
        <div className="flex items-center" key={invoice.id}>
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary">
              {invoice.client.name
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              <Link href={`/clients/${invoice.clientId}`} className="hover:underline">
                {invoice.client.name}
              </Link>
            </p>
            <p className="text-sm text-muted-foreground">
              <Link href={`/invoices/${invoice.id}`} className="hover:underline">
                {invoice.invoiceNumber}
              </Link>
            </p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-sm font-medium">{formatCurrency(invoice.total)}</p>
            <Badge
              variant={invoice.status === "paid" ? "success" : invoice.status === "pending" ? "outline" : "destructive"}
              className="mt-1"
            >
              {invoice.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

