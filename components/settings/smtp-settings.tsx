"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, Loader2, MailCheck } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SmtpSettings() {
  const [isTesting, setIsTesting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [testEmail, setTestEmail] = useState("")
  const [testResult, setTestResult] = useState<null | { success: boolean; message: string }>(null)
  const { toast } = useToast()

  const handleTestConnection = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsTesting(true)
    setTestResult(null)

    // Simulate testing SMTP connection
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsTesting(false)
    setTestResult({
      success: true,
      message: "SMTP connection successful! Test email has been sent.",
    })
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)

    // Simulate saving settings
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSaving(false)
    toast({
      title: "Settings Saved",
      description: "Your SMTP settings have been saved successfully.",
    })
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>SMTP Configuration</CardTitle>
          <CardDescription>Configure your SMTP settings to send invoices and notifications via email.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="host">SMTP Host</Label>
              <Input id="host" placeholder="smtp.example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="port">SMTP Port</Label>
              <Input id="port" placeholder="587" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="your-email@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from-email">From Email</Label>
              <Input id="from-email" placeholder="invoices@yourbusiness.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="from-name">From Name</Label>
              <Input id="from-name" placeholder="Your Business Name" />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Switch id="use-ssl" />
            <Label htmlFor="use-ssl">Use SSL/TLS</Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 items-start sm:flex-row sm:justify-between sm:space-y-0">
          <Button onClick={handleSaveSettings} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Settings"
            )}
          </Button>

          <form onSubmit={handleTestConnection} className="w-full sm:w-auto">
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
              <Input
                placeholder="test@example.com"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                required
              />
              <Button type="submit" variant="outline" disabled={isTesting}>
                {isTesting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <MailCheck className="mr-2 h-4 w-4" />
                    Test Connection
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardFooter>
      </Card>

      {testResult && (
        <Alert variant={testResult.success ? "default" : "destructive"}>
          {testResult.success ? <MailCheck className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <AlertTitle>{testResult.success ? "Connection Successful" : "Connection Failed"}</AlertTitle>
          <AlertDescription>{testResult.message}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Default Email Templates</CardTitle>
          <CardDescription>Configure the default email templates for sending invoices.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="invoice-subject">Invoice Email Subject</Label>
            <Input
              id="invoice-subject"
              placeholder="Invoice {invoice_number} from {company_name}"
              defaultValue="Invoice {invoice_number} from {company_name}"
            />
            <p className="text-xs text-muted-foreground">
              Available variables: {"{invoice_number}"}, {"{company_name}"}, {"{client_name}"}, {"{invoice_amount}"},{" "}
              {"{due_date}"}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="invoice-body">Invoice Email Body</Label>
            <textarea
              id="invoice-body"
              className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Dear {client_name},

Please find attached invoice {invoice_number} for {invoice_amount}.

The payment is due on {due_date}.

Thank you for your business.

Regards,
{company_name}"
              defaultValue="Dear {client_name},

Please find attached invoice {invoice_number} for {invoice_amount}.

The payment is due on {due_date}.

Thank you for your business.

Regards,
{company_name}"
            />
            <p className="text-xs text-muted-foreground">
              Available variables: {"{invoice_number}"}, {"{company_name}"}, {"{client_name}"}, {"{invoice_amount}"},{" "}
              {"{due_date}"}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Templates</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

