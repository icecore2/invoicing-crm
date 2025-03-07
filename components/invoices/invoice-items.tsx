import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

interface InvoiceItemsProps {
  items: InvoiceItem[]
  taxRate: number
}

export function InvoiceItems({ items, taxRate }: InvoiceItemsProps) {
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  const tax = subtotal * (taxRate / 100)
  const total = subtotal + tax

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50%]">Description</TableHead>
          <TableHead className="text-right">Qty</TableHead>
          <TableHead className="text-right">Unit Price</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.description}</TableCell>
            <TableCell className="text-right">{item.quantity}</TableCell>
            <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
            <TableCell className="text-right">{formatCurrency(item.quantity * item.unitPrice)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Subtotal</TableCell>
          <TableCell className="text-right">{formatCurrency(subtotal)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={3}>Tax ({taxRate}%)</TableCell>
          <TableCell className="text-right">{formatCurrency(tax)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={3} className="font-bold">
            Total
          </TableCell>
          <TableCell className="text-right font-bold">{formatCurrency(total)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

