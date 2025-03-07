"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function EmailInvoiceDialog({ invoiceId }: { invoiceId: string }) {
  const [open, setOpen] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const { toast } = useToast()

  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSending(true)

    // Simulate sending email
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSending(false)
    setOpen(false)
    toast({
      title: "Email Sent",
      description: `Invoice ${invoiceId} has been sent to the client.`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <Mail className="h-4 w-4 mr-2" />
          Send Email
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Invoice {invoiceId}</DialogTitle>
          <DialogDescription>Send this invoice to your client via email.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSend}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="to" className="text-right">
                To
              </Label>
              <Input id="to" defaultValue="john@example.com" className="col-span-3" required />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Subject
              </Label>
              <Input
                id="subject"
                defaultValue={`Invoice ${invoiceId} from Your Company`}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="message" className="text-right pt-2">
                Message
              </Label>
              <Textarea
                id="message"
                className="col-span-3"
                defaultValue={`Dear Client,\n\nPlease find attached invoice ${invoiceId} for your recent services.\n\nPayment is due within 14 days.\n\nThank you for your business.\n\nRegards,\nYour Company`}
                rows={6}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cc" className="text-right">
                CC
              </Label>
              <Input id="cc" className="col-span-3" placeholder="Optional" />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSending}>
              {isSending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Invoice"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

