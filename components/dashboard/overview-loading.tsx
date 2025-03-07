import { Skeleton } from "@/components/ui/skeleton"

export function OverviewLoading() {
  return (
    <div className="w-full h-[350px] flex items-center justify-center">
      <Skeleton className="w-full h-full" />
    </div>
  )
}

