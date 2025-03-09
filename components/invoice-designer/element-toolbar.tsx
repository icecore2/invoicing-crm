"use client"

import { Button } from "@/components/ui/button"
import {
  Type,
  ImageIcon,
  Table,
  FileText,
  CreditCard,
  MapPin,
  Mail,
  Phone,
  User,
  Building,
  SplitSquareVertical,
  SquareStack,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ElementToolbarProps {
  onAddElement: (type: string) => void
}

export function ElementToolbar({ onAddElement }: ElementToolbarProps) {
  const basicElements = [
    { type: "text", label: "Text", icon: <Type className="h-4 w-4" /> },
    { type: "image", label: "Image", icon: <ImageIcon className="h-4 w-4" /> },
    { type: "table", label: "Table", icon: <Table className="h-4 w-4" /> },
    { type: "separator", label: "Separator", icon: <SplitSquareVertical className="h-4 w-4" /> },
  ]

  const invoiceElements = [
    { type: "header", label: "Invoice Header", icon: <FileText className="h-4 w-4" /> },
    { type: "billTo", label: "Client Info", icon: <User className="h-4 w-4" /> },
    { type: "items-table", label: "Line Items", icon: <SquareStack className="h-4 w-4" /> },
    { type: "payment", label: "Payment Info", icon: <CreditCard className="h-4 w-4" /> },
  ]

  const contactElements = [
    { type: "address", label: "Address", icon: <MapPin className="h-4 w-4" /> },
    { type: "email", label: "Email", icon: <Mail className="h-4 w-4" /> },
    { type: "phone", label: "Phone", icon: <Phone className="h-4 w-4" /> },
    { type: "company", label: "Company", icon: <Building className="h-4 w-4" /> },
  ]

  return (
    <div className="p-4">
      <Accordion type="single" collapsible defaultValue="basic">
        <AccordionItem value="basic">
          <AccordionTrigger className="py-2 text-sm font-medium">Basic Elements</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {basicElements.map((element) => (
                <Button
                  key={element.type}
                  variant="outline"
                  size="sm"
                  className="justify-start h-10"
                  onClick={() => onAddElement(element.type)}
                >
                  <div className="flex items-center gap-2">
                    {element.icon}
                    <span className="text-xs">{element.label}</span>
                  </div>
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="invoice">
          <AccordionTrigger className="py-2 text-sm font-medium">Invoice Elements</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {invoiceElements.map((element) => (
                <Button
                  key={element.type}
                  variant="outline"
                  size="sm"
                  className="justify-start h-10"
                  onClick={() => onAddElement(element.type)}
                >
                  <div className="flex items-center gap-2">
                    {element.icon}
                    <span className="text-xs">{element.label}</span>
                  </div>
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="contact">
          <AccordionTrigger className="py-2 text-sm font-medium">Contact Elements</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {contactElements.map((element) => (
                <Button
                  key={element.type}
                  variant="outline"
                  size="sm"
                  className="justify-start h-10"
                  onClick={() => onAddElement(element.type)}
                >
                  <div className="flex items-center gap-2">
                    {element.icon}
                    <span className="text-xs">{element.label}</span>
                  </div>
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Template Structure</h3>
        <p className="text-xs text-muted-foreground mb-2">
          Drag and drop elements to rearrange them. Click on an element to edit its properties.
        </p>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Use placeholders like &#123;&#123;invoice_number&#125;&#125; for dynamic content</p>
          <p>• Templates will be applied when creating new invoices</p>
          <p>• Save your template to reuse it across multiple invoices</p>
        </div>
      </div>
    </div>
  )
}

