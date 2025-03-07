import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

// Sample data
const clients = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    company: "Smith Web Design",
    phone: "+1 (555) 123-4567",
    totalBilled: 1250,
    activeProjects: 2,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    company: "Johnson & Co",
    phone: "+1 (555) 987-6543",
    totalBilled: 3200,
    activeProjects: 1,
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@example.com",
    company: "Brown Enterprises",
    phone: "+1 (555) 456-7890",
    totalBilled: 850,
    activeProjects: 0,
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    company: "Davis Marketing",
    phone: "+1 (555) 789-0123",
    totalBilled: 2400,
    activeProjects: 3,
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david@example.com",
    company: "Wilson Tech",
    phone: "+1 (555) 321-6540",
    totalBilled: 1600,
    activeProjects: 1,
  },
  {
    id: "6",
    name: "Lisa Taylor",
    email: "lisa@example.com",
    company: "Taylor Designs",
    phone: "+1 (555) 654-3210",
    totalBilled: 900,
    activeProjects: 0,
  },
  {
    id: "7",
    name: "Robert Miller",
    email: "robert@example.com",
    company: "Miller Consulting",
    phone: "+1 (555) 987-1234",
    totalBilled: 1800,
    activeProjects: 2,
  },
  {
    id: "8",
    name: "Jennifer White",
    email: "jennifer@example.com",
    company: "White Industries",
    phone: "+1 (555) 543-2109",
    totalBilled: 3000,
    activeProjects: 1,
  },
]

export default function ClientsPage() {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 w-full border-b bg-background px-4 h-14 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Clients</h1>
        <Link href="/clients/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Client
          </Button>
        </Link>
      </header>

      <div className="p-4 md:p-8 pt-6 space-y-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search clients..." className="pl-8 w-full" />
        </div>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Company</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden lg:table-cell">Phone</TableHead>
                <TableHead className="hidden lg:table-cell">Projects</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {client.name
                            .split(" ")
                            .map((name) => name[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Link href={`/clients/${client.id}`} className="font-medium hover:underline">
                          {client.name}
                        </Link>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{client.company}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Link href={`mailto:${client.email}`} className="text-primary hover:underline">
                      {client.email}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{client.phone}</TableCell>
                  <TableCell className="hidden lg:table-cell">{client.activeProjects}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/clients/${client.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  )
}

