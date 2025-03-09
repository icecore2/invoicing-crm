import { DesignerHeader } from "@/components/invoice-designer/designer-header"
import { InvoiceDesigner } from "@/components/invoice-designer/invoice-designer"

export default function InvoiceDesignerPage() {
  return (
    <div className="flex flex-col h-screen">
      <DesignerHeader />
      <InvoiceDesigner />
    </div>
  )
}

