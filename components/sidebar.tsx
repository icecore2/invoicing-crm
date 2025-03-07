"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "@/components/sidebar-provider"
import {
  BarChart,
  FileText,
  Home,
  Menu,
  PanelLeftClose,
  Settings,
  UserRound,
  Users,
  FileSpreadsheet,
  Wallet,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NavItemProps {
  path: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  expanded: boolean
}

function NavItem({ path, icon: Icon, title, expanded }: NavItemProps) {
  const pathname = usePathname()
  const isActive = pathname === path

  return (
    <Link
      href={path}
      className={cn(
        "flex items-center py-2 px-3 rounded-lg gap-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary/10 text-primary hover:bg-primary/10"
          : "text-muted-foreground hover:text-foreground hover:bg-muted",
      )}
    >
      <Icon className="h-4 w-4" />
      {expanded && <span>{title}</span>}
    </Link>
  )
}

export function Sidebar() {
  const { expanded, toggleSidebar } = useSidebar()

  return (
    <div
      className={cn(
        "border-r bg-background transition-all duration-300 h-screen relative group",
        expanded ? "w-64" : "w-14",
      )}
    >
      <div className="flex items-center justify-between h-14 px-3 border-b">
        {expanded ? (
          <Link href="/" className="font-semibold text-lg">
            InvoiceHub
          </Link>
        ) : (
          <span className="w-8 h-8 flex items-center justify-center rounded-md bg-primary/10">
            <FileText className="h-4 w-4 text-primary" />
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={toggleSidebar}
          title={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {expanded ? <PanelLeftClose className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex flex-col gap-1 p-2">
        <NavItem path="/" icon={Home} title="Dashboard" expanded={expanded} />
        <NavItem path="/clients" icon={Users} title="Clients" expanded={expanded} />
        <NavItem path="/invoices" icon={FileText} title="Invoices" expanded={expanded} />
        <NavItem path="/analytics" icon={BarChart} title="Analytics" expanded={expanded} />
        <NavItem path="/payments" icon={Wallet} title="Payments" expanded={expanded} />
        <NavItem path="/activities" icon={FileSpreadsheet} title="Activities" expanded={expanded} />
      </div>

      <div className="absolute bottom-4 w-full px-2">
        <NavItem path="/settings" icon={Settings} title="Settings" expanded={expanded} />
        <div className={cn("mt-2 flex items-center gap-2 px-3 py-2 rounded-lg", expanded && "bg-muted")}>
          <div className="w-8 h-8 rounded-full bg-muted-foreground/20 flex items-center justify-center">
            <UserRound className="h-4 w-4 text-muted-foreground" />
          </div>
          {expanded && <div className="truncate text-sm font-medium">Admin User</div>}
        </div>
      </div>
    </div>
  )
}

