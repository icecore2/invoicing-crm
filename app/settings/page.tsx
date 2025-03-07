import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SmtpSettings } from "@/components/settings/smtp-settings"
import { ProfileSettings } from "@/components/settings/profile-settings"
import { CompanySettings } from "@/components/settings/company-settings"
import { InvoiceSettings } from "@/components/settings/invoice-settings"
import { GoogleDriveSettings } from "@/components/settings/google-drive-settings"

export default function SettingsPage() {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 w-full border-b bg-background px-4 h-14 flex items-center">
        <h1 className="text-xl font-semibold">Settings</h1>
      </header>

      <div className="p-4 md:p-8 space-y-6">
        <Tabs defaultValue="profile">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="smtp">Email (SMTP)</TabsTrigger>
            <TabsTrigger value="drive">Google Drive</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>

          <TabsContent value="company">
            <CompanySettings />
          </TabsContent>

          <TabsContent value="invoices">
            <InvoiceSettings />
          </TabsContent>

          <TabsContent value="smtp">
            <SmtpSettings />
          </TabsContent>

          <TabsContent value="drive">
            <GoogleDriveSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

