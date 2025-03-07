"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export function InvoiceSettings() {
  const [isSaving, setIsSaving] = useState(false)
  const [autoSaveToGoogleDrive, setAutoSaveToGoogleDrive] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSaving(false)
    toast({
      title: "Invoice Settings Updated",
      description: "Your invoice settings have been saved successfully.",
    })
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Invoice Preferences</CardTitle>
          <CardDescription>Configure your default invoice settings and numbering format.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="invoice-prefix">Invoice Number Prefix</Label>
            <Input id="invoice-prefix" defaultValue="INV-" />
            <p className="text-xs text-muted-foreground">
              This prefix will be added to all invoice numbers (e.g., INV-00001).
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="next-number">Next Invoice Number</Label>
            <Input id="next-number" defaultValue="00001" />
            <p className="text-xs text-muted-foreground">
              This number will be used for the next invoice and will increment automatically.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="due-days">Default Payment Terms (days)</Label>
              <Input id="due-days" type="number" defaultValue="14" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
              <Input id="tax-rate" type="number" defaultValue="10" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="default-notes">Default Invoice Notes</Label>
            <textarea
              id="default-notes"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              defaultValue="Payment is due within the specified payment terms. Please include the invoice number with your payment."
              rows={6}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="auto-send" />
            <Label htmlFor="auto-send">Automatically send invoices when created</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="late-reminders" defaultChecked />
            <Label htmlFor="late-reminders">Send reminders for overdue invoices</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="auto-save-drive" checked={autoSaveToGoogleDrive} onCheckedChange={setAutoSaveToGoogleDrive} />
            <Label htmlFor="auto-save-drive">Automatically save invoices to Google Drive</Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Preferences"
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Configure the payment methods you accept for invoices.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="bank-transfer" defaultChecked />
            <Label htmlFor="bank-transfer">Bank Transfer</Label>
          </div>

          <div className="space-y-2 pl-6">
            <div className="space-y-2">
              <Label htmlFor="bank-name">Bank Name</Label>
              <Input id="bank-name" defaultValue="First National Bank" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="account-name">Account Name</Label>
                <Input id="account-name" defaultValue="Your Business Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account-number">Account Number</Label>
                <Input id="account-number" defaultValue="1234567890" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="routing-number">Routing Number</Label>
              <Input id="routing-number" defaultValue="987654321" />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <Switch id="credit-card" defaultChecked />
            <Label htmlFor="credit-card">Credit Card (Stripe)</Label>
          </div>

          <div className="space-y-2 pl-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="stripe-key">Stripe Public Key</Label>
                <Input id="stripe-key" defaultValue="pk_test_..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stripe-secret">Stripe Secret Key</Label>
                <Input id="stripe-secret" type="password" defaultValue="sk_test_..." />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <Switch id="paypal" />
            <Label htmlFor="paypal">PayPal</Label>
          </div>

          <div className="space-y-2 pl-6">
            <div className="space-y-2">
              <Label htmlFor="paypal-email">PayPal Email</Label>
              <Input id="paypal-email" defaultValue="" placeholder="your-paypal-email@example.com" />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Payment Methods"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

