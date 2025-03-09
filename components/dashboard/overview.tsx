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
import { getDashboardStats, getActivities, getRecentInvoices, getPayments } from "@/lib/data"
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
        // Fetch real data from multiple sources
        const [stats, activities, invoices, payments] = await Promise.all([
          getDashboardStats(),
          getActivities(),
          getRecentInvoices(100),
          getPayments(),
        ])

        // Process the data to create a more accurate chart
        // In a real app, this would be calculated from actual invoice and payment data
        const revenueByMonth = stats.revenueByMonth.map((month) => {
          // Find payments in this month to get actual revenue
          const monthName = month.name
          const paymentTotal = payments
            .filter(
              (p) =>
                p.status === "completed" && new Date(p.date).toLocaleString("en-US", { month: "short" }) === monthName,
            )
            .reduce((sum, p) => sum + p.amount, 0)

          // Find pending invoices for this month
          const pendingTotal = invoices
            .filter(
              (inv) =>
                inv.status === "pending" &&
                new Date(inv.date).toLocaleString("en-US", { month: "short" }) === monthName,
            )
            .reduce((sum, inv) => sum + inv.total, 0)

          return {
            name: monthName,
            revenue: paymentTotal > 0 ? paymentTotal : month.revenue, // Use actual payment data if available
            pending: pendingTotal > 0 ? pendingTotal : month.pending, // Use actual pending data if available
          }
        })

        setData(revenueByMonth)
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

