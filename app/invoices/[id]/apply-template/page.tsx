import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getInvoiceById, getTemplates } from "@/lib/data"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface ApplyTemplatePageProps {
  params: { id: string }
}

export default async function ApplyTemplatePage({ params }: ApplyTemplatePageProps) {
  const invoiceId = params.id
  const invoice = await getInvoiceById(invoiceId)

  if (!invoice) {
    notFound()
  }

  const templates = await getTemplates()

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 w-full border-b bg-background px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={`/invoices/${invoiceId}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to invoice</span>
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">Apply Template to Invoice {invoice.invoiceNumber}</h1>
        </div>
      </header>

      <div className="p-4 md:p-8 pt-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden hover:border-primary transition-colors cursor-pointer">
              <Link href={`/invoices/${invoiceId}/apply-template?template=${template.id}`}>
                <div className="relative aspect-[210/297] border-b">
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    <img
                      src={template.thumbnail || "/placeholder.svg"}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        <div className="flex justify-end">
          <Button variant="outline" asChild className="mr-2">
            <Link href={`/invoices/${invoiceId}`}>Cancel</Link>
          </Button>
          <Button asChild>
            <Link href={`/invoice-designer/new?invoice=${invoiceId}`}>Create New Template</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

