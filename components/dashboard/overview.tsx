"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"
import { getDashboardStats } from "@/lib/data"
import { useEffect, useState } from "react"

type ChartData = {
  name: string
  revenue: number
  pending: number
}[]

export function Overview() {
  const [data, setData] = useState<ChartData>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const stats = await getDashboardStats()
        setData(stats.revenueByMonth)
      } catch (error) {
        console.error("Failed to fetch chart data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <div className="h-[350px] flex items-center justify-center">Loading chart data...</div>
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Revenue</span>
                      <span className="font-bold text-muted-foreground">${payload[0].value}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Pending</span>
                      <span className="font-bold text-muted-foreground">${payload[1].value}</span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Legend />
        <Area type="monotone" dataKey="revenue" stroke="#4ADE80" fillOpacity={0.3} fill="#4ADE80" strokeWidth={2} />
        <Area type="monotone" dataKey="pending" stroke="#F87171" fillOpacity={0.3} fill="#F87171" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

