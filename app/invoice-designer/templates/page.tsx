import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { getTemplates } from "@/lib/data"
import { Search, Plus } from "lucide-react"
import Link from "next/link"

export default async function TemplatesPage() {
  const templates = await getTemplates()

  return (
    <div className="flex flex-col">
      <header className="sticky top-0 z-10 w-full border-b bg-background px-4 h-14 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Invoice Templates</h1>
        <Link href="/invoice-designer/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </Button>
        </Link>
      </header>

      <div className="p-4 md:p-8 pt-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search templates..." className="pl-8 w-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden">
              <div className="relative aspect-[210/297] border-b">
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={template.thumbnail || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-base">{template.name}</CardTitle>
                <CardDescription className="text-xs">{template.description}</CardDescription>
              </CardHeader>
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Link href={`/invoice-designer/${template.id}`} className="flex-1">
                  <Button variant="outline" className="w-full text-xs h-8">
                    Edit
                  </Button>
                </Link>
                <Link href={`/invoices/new?template=${template.id}`} className="flex-1">
                  <Button className="w-full text-xs h-8">Use Template</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}

          <Link href="/invoice-designer/new">
            <Card className="overflow-hidden h-full cursor-pointer hover:border-primary transition-colors">
              <div className="flex items-center justify-center aspect-[210/297] border-b">
                <Plus className="h-10 w-10 text-muted-foreground" />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="text-base">Create New Template</CardTitle>
                <CardDescription className="text-xs">Design a custom invoice template</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

