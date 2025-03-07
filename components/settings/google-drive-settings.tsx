"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, CloudIcon as CloudCheck, CloudOff } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function GoogleDriveSettings() {
  const [isSaving, setIsSaving] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(false)
  const [clientId, setClientId] = useState("")
  const [clientSecret, setClientSecret] = useState("")
  const [redirectUri, setRedirectUri] = useState("http://localhost:3000/api/auth/google/callback")
  const [folderId, setFolderId] = useState("")
  const { toast } = useToast()

  const handleConnect = async () => {
    if (!clientId || !clientSecret) {
      toast({
        title: "Missing Credentials",
        description: "Please enter your Google API Client ID and Client Secret.",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)

    // Simulate connecting to Google Drive API
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsConnected(true)
      toast({
        title: "Connected to Google Drive",
        description: "Your account has been successfully connected to Google Drive.",
      })
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Google Drive. Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate saving settings
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Settings Saved",
        description: "Your Google Drive integration settings have been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDisconnect = async () => {
    // Simulate disconnecting from Google Drive
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsConnected(false)
      setAutoSaveEnabled(false)
      toast({
        title: "Disconnected from Google Drive",
        description: "Your account has been disconnected from Google Drive.",
      })
    } catch (error) {
      toast({
        title: "Disconnect Failed",
        description: "Failed to disconnect from Google Drive. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Google Drive Integration</CardTitle>
          <CardDescription>
            Connect your Google Drive account to automatically save invoices and documents.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="client-id">Google API Client ID</Label>
            <Input
              id="client-id"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="Your Google API Client ID"
            />
            <p className="text-xs text-muted-foreground">You can get this from the Google Cloud Console.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="client-secret">Google API Client Secret</Label>
            <Input
              id="client-secret"
              type="password"
              value={clientSecret}
              onChange={(e) => setClientSecret(e.target.value)}
              placeholder="Your Google API Client Secret"
            />
            <p className="text-xs text-muted-foreground">Keep this secret secure. Never share it with anyone.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="redirect-uri">Redirect URI</Label>
            <Input
              id="redirect-uri"
              value={redirectUri}
              onChange={(e) => setRedirectUri(e.target.value)}
              placeholder="http://localhost:3000/api/auth/google/callback"
            />
            <p className="text-xs text-muted-foreground">
              This must match the redirect URI configured in your Google Cloud Console.
            </p>
          </div>

          {isConnected && (
            <div className="space-y-2">
              <Label htmlFor="folder-id">Google Drive Folder ID (Optional)</Label>
              <Input
                id="folder-id"
                value={folderId}
                onChange={(e) => setFolderId(e.target.value)}
                placeholder="Folder ID for storing invoices"
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to save files in the root of your Google Drive.
              </p>
            </div>
          )}

          {isConnected && (
            <div className="flex items-center space-x-2 pt-2">
              <Switch id="auto-save" checked={autoSaveEnabled} onCheckedChange={setAutoSaveEnabled} />
              <Label htmlFor="auto-save">Automatically save invoices to Google Drive</Label>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {isConnected ? (
            <>
              <Button variant="outline" onClick={handleDisconnect}>
                <CloudOff className="mr-2 h-4 w-4" />
                Disconnect
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Settings"
                )}
              </Button>
            </>
          ) : (
            <Button onClick={handleConnect} disabled={isConnecting}>
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <CloudCheck className="mr-2 h-4 w-4" />
                  Connect to Google Drive
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>

      {isConnected && (
        <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
          <CloudCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle>Connected to Google Drive</AlertTitle>
          <AlertDescription>
            Your account is connected to Google Drive.{" "}
            {autoSaveEnabled
              ? "Invoices will be automatically saved to your Google Drive."
              : "Enable auto-save to automatically save invoices to your Google Drive."}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}

