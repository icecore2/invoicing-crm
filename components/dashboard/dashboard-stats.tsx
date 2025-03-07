import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { calculatePercentageChange, formatCurrency } from "@/lib/utils"
import { ArrowUp, ArrowDown, CheckCircle, Clock, DollarSign, Users } from "lucide-react"
import { getDashboardStats } from "@/lib/data"

export async function DashboardStats() {
  const stats = await getDashboardStats()

  const revenueChange = calculatePercentageChange(stats.totalRevenue, stats.previousMonthRevenue)

  const isRevenueUp = revenueChange > 0

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            <span className={isRevenueUp ? "text-emerald-500 flex items-center" : "text-red-500 flex items-center"}>
              {isRevenueUp ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
              {Math.abs(revenueChange).toFixed(1)}%
            </span>
            <span>from last month</span>
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{stats.paidInvoices}</div>
          <p className="text-xs text-muted-foreground mt-1">in the last 30 days</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.pendingAmount)}</div>
          <p className="text-xs text-muted-foreground mt-1">{stats.pendingInvoices} invoices pending</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Clients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{stats.newClients}</div>
          <p className="text-xs text-muted-foreground mt-1">{stats.totalClients} active clients</p>
        </CardContent>
      </Card>
    </>
  )
}

