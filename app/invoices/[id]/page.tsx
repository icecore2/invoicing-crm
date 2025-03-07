import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatCurrency, formatDate } from "@/lib/utils"
import { ArrowLeft, FileEdit, MoreHorizontal, Printer, Share2 } from "lucide-react"
import Link from "next/link"
import { ClientCard } from "@/components/invoices/client-card"
import { InvoiceItems } from "@/components/invoices/invoice-items"
import { InvoiceStatusBadge } from "@/components/invoices/invoice-status-badge"
import { EmailInvoiceDialog } from "@/components/invoices/email-invoice-dialog"
import { DownloadInvoice } from "@/components/invoices/download-invoice"
import { getInvoiceById } from "@/lib/data"
import { notFound } from "next/navigation"

export default async function InvoiceDetailsPage({ params }: { params: { id: string } }) {
  const invoiceId = params.id
  const invoice = await getInvoiceById(invoiceId)

  if (!invoice) {
    notFound()
  }

  // Calculate subtotal, tax and total
  const subtotal = invoice.subtotal
  const tax = invoice.taxAmount
  const total = invoice.total

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 w-full border-b bg-background px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/invoices">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to invoices</span>
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">{invoice.invoiceNumber}</h1>
          <InvoiceStatusBadge status={invoice.status} />
        </div>
        <div className="flex items-center gap-2">
          <EmailInvoiceDialog invoiceId={invoiceId} />
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <DownloadInvoice invoiceId={invoiceId} invoiceData={invoice} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/invoices/${invoiceId}/edit`}>
                  <FileEdit className="h-4 w-4 mr-2" />
                  Edit Invoice
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="p-4 md:p-8 space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Invoice {invoice.invoiceNumber}</CardTitle>
              <CardDescription>
                Issued on {formatDate(invoice.date)} • Due on {formatDate(invoice.dueDate)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InvoiceItems items={invoice.items} taxRate={invoice.taxRate} />
            </CardContent>
            <CardFooter className="flex flex-col items-start border-t p-6">
              <p className="text-sm text-muted-foreground">{invoice.notes || "No additional notes"}</p>
            </CardFooter>
          </Card>

          <div className="space-y-6">
            <ClientCard
              name={invoice.client.name}
              email={invoice.client.email}
              address={invoice.client.address}
              phone={invoice.client.phone}
            />

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax ({invoice.taxRate}%)</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Mark as Paid</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

