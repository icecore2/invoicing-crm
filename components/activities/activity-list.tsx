import { getActivities } from "@/lib/data"
import { formatDateWithTime } from "@/lib/utils"
import Link from "next/link"
import {
  FileText,
  Users,
  CreditCard,
  Bell,
  Settings,
  CheckCircle,
  AlertCircle,
  PlusCircle,
  Trash2,
  Edit,
  Mail,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ActivityListProps {
  type: "all" | "invoices" | "clients" | "payments" | "system"
}

export async function ActivityList({ type }: ActivityListProps) {
  const activities = await getActivities()

  // Filter activities based on type
  const filteredActivities = type === "all" ? activities : activities.filter((activity) => activity.type === type)

  if (filteredActivities.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No activities found</div>
  }

  const getActivityIcon = (activity: any) => {
    switch (activity.type) {
      case "invoices":
        return activity.action === "created" ? (
          <PlusCircle className="h-5 w-5" />
        ) : activity.action === "updated" ? (
          <Edit className="h-5 w-5" />
        ) : activity.action === "deleted" ? (
          <Trash2 className="h-5 w-5" />
        ) : activity.action === "sent" ? (
          <Mail className="h-5 w-5" />
        ) : activity.action === "paid" ? (
          <CheckCircle className="h-5 w-5" />
        ) : activity.action === "overdue" ? (
          <AlertCircle className="h-5 w-5" />
        ) : (
          <FileText className="h-5 w-5" />
        )
      case "clients":
        return activity.action === "created" ? (
          <PlusCircle className="h-5 w-5" />
        ) : activity.action === "updated" ? (
          <Edit className="h-5 w-5" />
        ) : activity.action === "deleted" ? (
          <Trash2 className="h-5 w-5" />
        ) : (
          <Users className="h-5 w-5" />
        )
      case "payments":
        return activity.action === "completed" ? (
          <CheckCircle className="h-5 w-5" />
        ) : activity.action === "failed" ? (
          <AlertCircle className="h-5 w-5" />
        ) : activity.action === "refunded" ? (
          <CreditCard className="h-5 w-5" />
        ) : (
          <CreditCard className="h-5 w-5" />
        )
      case "system":
        return <Settings className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getActivityColor = (activity: any) => {
    switch (activity.type) {
      case "invoices":
        return "bg-blue-500/10 text-blue-500"
      case "clients":
        return "bg-green-500/10 text-green-500"
      case "payments":
        return "bg-purple-500/10 text-purple-500"
      case "system":
        return "bg-orange-500/10 text-orange-500"
      default:
        return "bg-gray-500/10 text-gray-500"
    }
  }

  const getActivityBadge = (activity: any) => {
    switch (activity.action) {
      case "created":
      case "completed":
        return <Badge variant="success">Success</Badge>
      case "updated":
      case "sent":
        return <Badge variant="outline">Info</Badge>
      case "deleted":
      case "failed":
        return <Badge variant="destructive">Error</Badge>
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>
      case "paid":
        return <Badge variant="success">Paid</Badge>
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {filteredActivities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg border">
          <div className={`rounded-full p-2 ${getActivityColor(activity)}`}>{getActivityIcon(activity)}</div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <Link href={activity.link} className="text-sm font-medium hover:underline truncate">
                {activity.title}
              </Link>
              {getActivityBadge(activity)}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
            <p className="text-xs text-muted-foreground mt-2">{formatDateWithTime(activity.timestamp)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

