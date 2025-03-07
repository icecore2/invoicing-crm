"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "@/components/ui/chart"
import { getInvoiceCountsByStatus } from "@/lib/data"
import { useEffect, useState } from "react"

interface InvoiceStatusChartProps {
  detailed?: boolean
}

export function InvoiceStatusChart({ detailed = false }: InvoiceStatusChartProps) {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const counts = await getInvoiceCountsByStatus()
        const chartData = Object.entries(counts).map(([name, value]) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          value,
        }))
        setData(chartData)
      } catch (error) {
        console.error("Failed to fetch invoice status data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <div className="h-full flex items-center justify-center">Loading invoice data...</div>
  }

  const COLORS = ["#4ADE80", "#F87171", "#FACC15", "#60A5FA", "#A78BFA"]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={detailed ? 150 : 80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="flex flex-col">
                    <span className="font-medium">{payload[0].name}</span>
                    <span className="text-sm text-muted-foreground">Count: {payload[0].value}</span>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

