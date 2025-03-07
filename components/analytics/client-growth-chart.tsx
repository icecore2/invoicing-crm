"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"

interface ClientGrowthChartProps {
  detailed?: boolean
}

export function ClientGrowthChart({ detailed = false }: ClientGrowthChartProps) {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching client growth data
    async function fetchData() {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 500))

        const mockData = [
          { month: "Jan", clients: 10, active: 10 },
          { month: "Feb", clients: 12, active: 11 },
          { month: "Mar", clients: 15, active: 13 },
          { month: "Apr", clients: 18, active: 15 },
          { month: "May", clients: 20, active: 17 },
          { month: "Jun", clients: 22, active: 19 },
          { month: "Jul", clients: 25, active: 21 },
          { month: "Aug", clients: 28, active: 23 },
          { month: "Sep", clients: 30, active: 25 },
          { month: "Oct", clients: 32, active: 27 },
          { month: "Nov", clients: 33, active: 28 },
          { month: "Dec", clients: 34, active: 30 },
        ]

        setData(mockData)
      } catch (error) {
        console.error("Failed to fetch client growth data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <div className="h-full flex items-center justify-center">Loading client data...</div>
  }

  if (detailed) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Total</span>
                        <span className="font-bold text-muted-foreground">{payload[0].value}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">Active</span>
                        <span className="font-bold text-muted-foreground">{payload[1].value}</span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="clients"
            name="Total Clients"
            stroke="#60A5FA"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="active"
            name="Active Clients"
            stroke="#A78BFA"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">Clients</span>
                    <span className="font-bold text-muted-foreground">{payload[0].value}</span>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Area type="monotone" dataKey="clients" stroke="#60A5FA" fillOpacity={0.3} fill="#60A5FA" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

