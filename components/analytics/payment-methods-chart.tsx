"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "@/components/ui/chart"
import { useEffect, useState } from "react"

export function PaymentMethodsChart() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching payment methods data
    async function fetchData() {
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 600))

        const mockData = [
          { name: "Credit Card", value: 65 },
          { name: "Bank Transfer", value: 25 },
          { name: "PayPal", value: 10 },
        ]

        setData(mockData)
      } catch (error) {
        console.error("Failed to fetch payment methods data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <div className="h-full flex items-center justify-center">Loading payment data...</div>
  }

  const COLORS = ["#60A5FA", "#4ADE80", "#FACC15"]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
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
                    <span className="text-sm text-muted-foreground">{payload[0].value}% of payments</span>
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

