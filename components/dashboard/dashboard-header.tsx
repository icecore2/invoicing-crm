"use client"

import type React from "react"

import { Bell, Check, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSidebar } from "@/components/sidebar-provider"
import Link from "next/link"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

// Sample notifications data
const initialNotifications = [
  {
    id: "1",
    title: "Invoice #INV-001 has been paid",
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    link: "/invoices/INV-001",
  },
  {
    id: "2",
    title: "New client has been added",
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    link: "/clients/2",
  },
  {
    id: "3",
    title: "You have 3 overdue invoices",
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    link: "/invoices?status=overdue",
  },
]

export function DashboardHeader() {
  const { expanded } = useSidebar()
  const [notifications, setNotifications] = useState(initialNotifications)
  const [notificationOpen, setNotificationOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAsRead = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
    } else {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
    }
  }

  return (
    <header className={`sticky top-0 z-10 w-full border-b bg-background px-4 h-14 flex items-center justify-between`}>
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <DropdownMenu open={notificationOpen} onOpenChange={setNotificationOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 text-[10px]"
                  variant="default"
                >
                  {unreadCount}
                </Badge>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="flex items-center justify-between px-4 py-2">
              <DropdownMenuLabel className="py-0">Notifications</DropdownMenuLabel>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={handleMarkAllAsRead}>
                  Mark all as read
                </Button>
              )}
            </div>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <div className="text-center py-4 text-sm text-muted-foreground">No notifications</div>
            ) : (
              notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className="p-0 focus:bg-transparent"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Link
                    href={notification.link}
                    className={`flex items-start justify-between w-full px-4 py-3 hover:bg-muted ${notification.read ? "opacity-70" : ""}`}
                    onClick={() => {
                      setNotificationOpen(false)
                      if (!notification.read) {
                        setNotifications(
                          notifications.map((n) => (n.id === notification.id ? { ...n, read: true } : n)),
                        )
                      }
                    }}
                  >
                    <div className="space-y-1">
                      <p className={`text-sm ${notification.read ? "font-normal" : "font-medium"}`}>
                        {notification.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{formatTimestamp(notification.timestamp)}</p>
                    </div>
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 rounded-full"
                        onClick={(e) => handleMarkAsRead(notification.id, e)}
                        title="Mark as read"
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                    )}
                  </Link>
                </DropdownMenuItem>
              ))
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="justify-center text-sm py-2 cursor-pointer">
              <Link href="/activities">View all notifications</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Create New
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/invoices/new">New Invoice</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/clients/new">New Client</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

