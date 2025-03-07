import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStatsLoading } from "@/components/dashboard/dashboard-stats-loading"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { OverviewLoading } from "@/components/dashboard/overview-loading"
import { Overview } from "@/components/dashboard/overview"
import { RecentInvoicesLoading } from "@/components/dashboard/recent-invoices-loading"
import { RecentInvoices } from "@/components/dashboard/recent-invoices"

export default function Dashboard() {
  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Suspense fallback={<DashboardStatsLoading />}>
            <DashboardStats />
          </Suspense>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>View your revenue and invoice trends over time.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <Suspense fallback={<OverviewLoading />}>
                <Overview />
              </Suspense>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>Your latest invoice activity.</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<RecentInvoicesLoading />}>
                <RecentInvoices />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

