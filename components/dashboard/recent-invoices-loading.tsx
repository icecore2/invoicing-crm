import { Skeleton } from "@/components/ui/skeleton"

export function RecentInvoicesLoading() {
  return (
    <div className="space-y-8">
      {Array.from({ length: 5 }).map((_, i) => (
        <div className="flex items-center" key={i}>
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="ml-4 space-y-1">
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
          <div className="ml-auto text-right">
            <Skeleton className="h-4 w-[60px] ml-auto" />
            <Skeleton className="h-5 w-[70px] mt-1 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  )
}

