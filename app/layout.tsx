import type React from "react"
import "@/styles/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SidebarProvider } from "@/components/sidebar-provider"
import { Sidebar } from "@/components/sidebar"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "InvoiceHub - Invoicing & CRM",
  description: "Manage clients, create invoices, and track your business growth",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  )
}



import './globals.css'