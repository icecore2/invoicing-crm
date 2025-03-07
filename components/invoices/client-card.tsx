import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AtSign, MapPin, Phone, UserRound } from "lucide-react"
import Link from "next/link"

interface ClientCardProps {
  name: string
  email: string
  address: string
  phone: string
}

export function ClientCard({ name, email, address, phone }: ClientCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Client Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-start gap-2">
          <UserRound className="w-4 h-4 mt-0.5 text-muted-foreground" />
          <div>
            <p className="font-medium">{name}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <AtSign className="w-4 h-4 mt-0.5 text-muted-foreground" />
          <div>
            <Link href={`mailto:${email}`} className="text-primary hover:underline">
              {email}
            </Link>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Phone className="w-4 h-4 mt-0.5 text-muted-foreground" />
          <div>
            <p>{phone}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
          <div>
            <p className="whitespace-pre-line">{address}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

