"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Upload } from "lucide-react"

export function CompanySettings() {
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate saving
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSaving(false)
    toast({
      title: "Company Settings Updated",
      description: "Your company settings have been saved successfully.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Information</CardTitle>
        <CardDescription>Update your company details that will appear on invoices and other documents.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Company Logo" />
            <AvatarFallback>CO</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center space-y-2 sm:items-start">
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Upload Logo
            </Button>
            <p className="text-xs text-muted-foreground">JPG, PNG or SVG. Max 2MB.</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="company-name">Company Name</Label>
          <Input id="company-name" defaultValue="Your Business Name" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="tax-id">Tax ID / VAT Number</Label>
            <Input id="tax-id" defaultValue="123456789" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="registration-number">Registration Number</Label>
            <Input id="registration-number" defaultValue="AB12345" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address-line1">Address Line 1</Label>
          <Input id="address-line1" defaultValue="123 Business St" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address-line2">Address Line 2</Label>
          <Input id="address-line2" defaultValue="Suite 101" />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" defaultValue="New York" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state-province">State / Province</Label>
            <Input id="state-province" defaultValue="NY" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postal-code">Postal Code</Label>
            <Input id="postal-code" defaultValue="10001" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <select
            id="country"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            defaultValue="US"
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
          </select>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" defaultValue="+1 (555) 123-4567" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input id="website" defaultValue="https://yourbusiness.com" />
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
            "Save Changes"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

