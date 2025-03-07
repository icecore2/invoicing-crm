import { Badge } from "@/components/ui/badge"

interface InvoiceStatusBadgeProps {
  status: string
}

export function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  return (
    <Badge variant={status === "paid" ? "success" : status === "pending" ? "outline" : "destructive"}>{status}</Badge>
  )
}

