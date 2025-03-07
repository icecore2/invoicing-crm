"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { formatCurrency } from "@/lib/utils"
import { useEffect, useState } from "react"

export function TopClients() {
  const [clients, setClients] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching top clients data
    async function fetchData() {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 700))

        const mockData = [
          { id: "1", name: "John Smith", revenue: 12500, invoices: 5 },
          { id: "2", name: "Sarah Johnson", revenue: 8700, invoices: 3 },
          { id: "3", name: "Michael Brown", revenue: 6200, invoices: 4 },
          { id: "4", name: "Emily Davis", revenue: 5400, invoices: 2 },
          { id: "5", name: "David Wilson", revenue: 4800, invoices: 3 },
        ]

        setClients(mockData)
      } catch (error) {
        console.error("Failed to fetch top clients data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <div className="h-[250px] flex items-center justify-center">Loading client data...</div>
  }

  return (
    <div className="space-y-4">
      {clients.map((client) => (
        <div key={client.id} className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary/10 text-primary">
                {client.name
                  .split(" ")
                  .map((name: string) => name[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-sm font-medium">{client.name}</p>
              <p className="text-xs text-muted-foreground">{client.invoices} invoices</p>
            </div>
          </div>
          <div className="text-sm font-medium">{formatCurrency(client.revenue)}</div>
        </div>
      ))}
    </div>
  )
}

