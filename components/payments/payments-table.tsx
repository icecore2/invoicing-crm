import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatCurrency, formatDate } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getPayments } from "@/lib/data"

export async function PaymentsTable() {
  const payments = await getPayments()

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Transaction ID</TableHead>
          <TableHead>Invoice</TableHead>
          <TableHead>Client</TableHead>
          <TableHead className="hidden md:table-cell">Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell className="font-medium">{payment.transactionId}</TableCell>
            <TableCell>
              <Link href={`/invoices/${payment.invoiceId}`} className="hover:underline">
                {payment.invoiceNumber}
              </Link>
            </TableCell>
            <TableCell>{payment.clientName}</TableCell>
            <TableCell className="hidden md:table-cell">{formatDate(payment.date)}</TableCell>
            <TableCell>{formatCurrency(payment.amount)}</TableCell>
            <TableCell>{payment.method}</TableCell>
            <TableCell>
              <Badge
                variant={
                  payment.status === "completed"
                    ? "success"
                    : payment.status === "pending"
                      ? "outline"
                      : payment.status === "failed"
                        ? "destructive"
                        : "secondary"
                }
              >
                {payment.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Link href={`/payments/${payment.id}`}>
                <Button variant="ghost" size="sm">
                  View
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

