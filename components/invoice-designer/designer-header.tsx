"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Eye, Download, Loader2 } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export function DesignerHeader() {
  const [isSaving, setIsSaving] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [templateName, setTemplateName] = useState("New Invoice Template")
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate saving the template
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Template Saved",
        description: `Template "${templateName}" has been saved successfully.`,
      })

      setIsSaveDialogOpen(false)
    } catch (error) {
      toast({
        title: "Error Saving Template",
        description: "There was an error saving your template. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <header className="sticky top-0 z-10 w-full border-b bg-background px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/invoice-designer/templates">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to templates</span>
            </Button>
          </Link>
          <h1 className="text-xl font-semibold max-w-[200px] truncate">{templateName}</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setIsPreviewOpen(true)}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>

          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>

          <Button variant="default" size="sm" onClick={() => setIsSaveDialogOpen(true)}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
      </header>

      {/* Save Dialog */}
      <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Template</DialogTitle>
            <DialogDescription>Give your invoice template a name to save it for future use.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="e.g., Professional Invoice"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-description">Description (Optional)</Label>
              <Input id="template-description" placeholder="A brief description of this template" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Template
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Template Preview</DialogTitle>
            <DialogDescription>This is how your invoice will look when exported.</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="border rounded-md p-6 bg-white">
              {/* Preview content - would be populated with actual template elements */}
              <div className="flex justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold">Your Company Name</h2>
                  <p className="text-sm text-gray-600">123 Business Street</p>
                  <p className="text-sm text-gray-600">City, State, ZIP</p>
                  <p className="text-sm text-gray-600">contact@company.com</p>
                </div>
                <div className="text-right">
                  <h1 className="text-2xl font-bold text-gray-800">INVOICE</h1>
                  <p className="text-sm text-gray-600">#INV-12345</p>
                  <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</p>
                  <p className="text-sm text-gray-600">
                    Due: {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-gray-600 font-medium mb-2">Bill To:</h3>
                <p className="font-semibold">Client Name</p>
                <p className="text-sm text-gray-600">Client Company</p>
                <p className="text-sm text-gray-600">123 Client Street</p>
                <p className="text-sm text-gray-600">Client City, State, ZIP</p>
              </div>

              <table className="w-full mb-8">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Description</th>
                    <th className="text-right py-2">Quantity</th>
                    <th className="text-right py-2">Unit Price</th>
                    <th className="text-right py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Service Item 1</td>
                    <td className="text-right py-2">1</td>
                    <td className="text-right py-2">$100.00</td>
                    <td className="text-right py-2">$100.00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Service Item 2</td>
                    <td className="text-right py-2">2</td>
                    <td className="text-right py-2">$75.00</td>
                    <td className="text-right py-2">$150.00</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="text-right py-2 font-medium">
                      Subtotal:
                    </td>
                    <td className="text-right py-2">$250.00</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="text-right py-2 font-medium">
                      Tax (10%):
                    </td>
                    <td className="text-right py-2">$25.00</td>
                  </tr>
                  <tr>
                    <td colSpan={3} className="text-right py-2 font-bold">
                      Total:
                    </td>
                    <td className="text-right py-2 font-bold">$275.00</td>
                  </tr>
                </tfoot>
              </table>

              <div className="space-y-2">
                <h3 className="text-gray-600 font-medium">Notes:</h3>
                <p className="text-sm text-gray-600">Thank you for your business! Payment is due within 14 days.</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
              Close
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

