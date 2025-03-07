import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RevenueChart } from "@/components/analytics/revenue-chart"
import { InvoiceStatusChart } from "@/components/analytics/invoice-status-chart"
import { ClientGrowthChart } from "@/components/analytics/client-growth-chart"
import { TopClients } from "@/components/analytics/top-clients"
import { PaymentMethodsChart } from "@/components/analytics/payment-methods-chart"
import { Suspense } from "react"
import { AnalyticsSkeleton } from "@/components/analytics/analytics-skeleton"

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 w-full border-b bg-background px-4 h-14 flex items-center">
        <h1 className="text-xl font-semibold">Analytics</h1>
      </header>

      <div className="p-4 md:p-8 space-y-6">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue for the current year</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <Suspense fallback={<AnalyticsSkeleton />}>
                    <RevenueChart />
                  </Suspense>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Invoice Status</CardTitle>
                  <CardDescription>Distribution by status</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <Suspense fallback={<AnalyticsSkeleton />}>
                    <InvoiceStatusChart />
                  </Suspense>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Top Clients</CardTitle>
                  <CardDescription>By revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<AnalyticsSkeleton />}>
                    <TopClients />
                  </Suspense>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Distribution by method</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px]">
                  <Suspense fallback={<AnalyticsSkeleton />}>
                    <PaymentMethodsChart />
                  </Suspense>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Client Growth</CardTitle>
                  <CardDescription>New clients over time</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px]">
                  <Suspense fallback={<AnalyticsSkeleton />}>
                    <ClientGrowthChart />
                  </Suspense>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
                <CardDescription>Detailed revenue breakdown</CardDescription>
              </CardHeader>
              <CardContent className="h-[500px]">
                <Suspense fallback={<AnalyticsSkeleton />}>
                  <RevenueChart detailed />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="clients">
            <Card>
              <CardHeader>
                <CardTitle>Client Analysis</CardTitle>
                <CardDescription>Client growth and revenue contribution</CardDescription>
              </CardHeader>
              <CardContent className="h-[500px]">
                <Suspense fallback={<AnalyticsSkeleton />}>
                  <ClientGrowthChart detailed />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Analysis</CardTitle>
                <CardDescription>Invoice status and payment trends</CardDescription>
              </CardHeader>
              <CardContent className="h-[500px]">
                <Suspense fallback={<AnalyticsSkeleton />}>
                  <InvoiceStatusChart detailed />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

