"use client"

import { Button } from "@/components/ui/button"
import { Palette } from "lucide-react"
import Link from "next/link"

interface ApplyTemplateButtonProps {
  invoiceId: string
}

export function ApplyTemplateButton({ invoiceId }: ApplyTemplateButtonProps) {
  return (
    <Button variant="outline" size="sm" asChild>
      <Link href={`/invoices/${invoiceId}/apply-template`}>
        <Palette className="h-4 w-4 mr-2" />
        Apply Template
      </Link>
    </Button>
  )
}

