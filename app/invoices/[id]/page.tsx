"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { formatCurrency, formatDate } from "@/lib/utils"
import { ArrowLeft, Download, FileEdit, MoreHorizontal, Printer, Share2 } from "lucide-react"
import Link from "next/link"
import { ClientCard } from "@/components/invoices/client-card"
import { InvoiceItems } from "@/components/invoices/invoice-items"
import { InvoiceStatusBadge } from "@/components/invoices/invoice-status-badge"
import { EmailInvoiceDialog } from "@/components/invoices/email-invoice-dialog"
import { DownloadInvoice } from "@/components/invoices/download-invoice"
import { ApplyTemplateButton } from "@/components/invoices/apply-template-button"
import { getInvoiceById } from "@/lib/data"
import { notFound } from "next/navigation"
import { DeleteInvoiceDialog } from "@/components/invoices/delete-invoice-dialog"

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
          <ApplyTemplateButton invoiceId={invoiceId} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/invoices/${invoiceId}/edit`} className="flex items-center">
                  <FileEdit className="h-4 w-4 mr-2" />
                  Edit Invoice
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a href="#" className="flex items-center" onClick={(e) => e.preventDefault()}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="#" className="flex items-center" onClick={(e) => e.preventDefault()}>
                  <Download className="h-4 w-4 mr-2" />
                  Download CSV
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DeleteInvoiceDialog invoiceId={invoiceId} invoiceNumber={invoice.invoiceNumber} />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="p-4 md:p-8 space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">Invoice {invoice.invoiceNumber}</CardTitle>
                  <CardDescription className="mt-1">
                    Issued on {formatDate(invoice.date)} • Due on {formatDate(invoice.dueDate)}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Amount Due</p>
                  <p className="text-2xl font-bold mt-1">{formatCurrency(total)}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">From</h3>
                  <p className="font-medium">Your Company Name</p>
                  <p className="text-sm">123 Business Street</p>
                  <p className="text-sm">New York, NY 10001</p>
                  <p className="text-sm">contact@yourcompany.com</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Bill To</h3>
                  <p className="font-medium">{invoice.client.name}</p>
                  <p className="text-sm">{invoice.client.address}</p>
                  <p className="text-sm">{invoice.client.email}</p>
                  <p className="text-sm">{invoice.client.phone}</p>
                </div>
              </div>
              <InvoiceItems items={invoice.items} taxRate={invoice.taxRate} />
            </CardContent>
            <CardFooter className="flex flex-col items-start border-t p-6">
              <div className="w-full">
                <h3 className="text-sm font-medium mb-2">Notes</h3>
                <p className="text-sm text-muted-foreground">{invoice.notes || "No additional notes"}</p>
              </div>
              <div className="w-full mt-4 pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">Payment Methods</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Bank Transfer</p>
                    <p className="text-sm">First National Bank</p>
                    <p className="text-sm">Account: 1234567890</p>
                    <p className="text-sm">Routing: 987654321</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Online Payment</p>
                    <p className="text-sm">Pay securely online at:</p>
                    <p className="text-sm text-primary">https://pay.yourcompany.com/{invoice.invoiceNumber}</p>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>

          <div className="space-y-6">
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
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full">Mark as Paid</Button>
                <DownloadInvoice invoiceId={invoiceId} invoiceData={invoice} />
              </CardFooter>
            </Card>

            <ClientCard
              name={invoice.client.name}
              email={invoice.client.email}
              address={invoice.client.address}
              phone={invoice.client.phone}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

