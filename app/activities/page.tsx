import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActivityList } from "@/components/activities/activity-list"
import { Suspense } from "react"
import { ActivityListSkeleton } from "@/components/activities/activity-list-skeleton"

export default function ActivitiesPage() {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 w-full border-b bg-background px-4 h-14 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Activities</h1>
      </header>

      <div className="p-4 md:p-8 pt-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search activities..." className="pl-8 w-full" />
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value="all">
                  <DropdownMenuRadioItem value="all">All Activities</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="invoice">Invoices</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="client">Clients</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="payment">Payments</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-5 w-full max-w-md">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <Card className="p-4">
              <Suspense fallback={<ActivityListSkeleton />}>
                <ActivityList type="all" />
              </Suspense>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="mt-4">
            <Card className="p-4">
              <Suspense fallback={<ActivityListSkeleton />}>
                <ActivityList type="invoices" />
              </Suspense>
            </Card>
          </TabsContent>

          <TabsContent value="clients" className="mt-4">
            <Card className="p-4">
              <Suspense fallback={<ActivityListSkeleton />}>
                <ActivityList type="clients" />
              </Suspense>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="mt-4">
            <Card className="p-4">
              <Suspense fallback={<ActivityListSkeleton />}>
                <ActivityList type="payments" />
              </Suspense>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="mt-4">
            <Card className="p-4">
              <Suspense fallback={<ActivityListSkeleton />}>
                <ActivityList type="system" />
              </Suspense>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

