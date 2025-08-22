import { Card, CardContent } from "@/components/ui/card"

export const LoadingGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <Card key={index} className="animate-pulse">
          <CardContent className="p-0">
            {/* Image */}
            <div className="aspect-square bg-muted rounded-t-lg" />

            {/* Content */}
            <div className="p-5 space-y-3">
              {/* Title */}
              <div className="h-6 bg-muted rounded w-3/4" />

              {/* Category */}
              <div className="h-4 bg-muted rounded w-1/2" />

              {/* Price */}
              <div className="h-6 bg-muted rounded w-2/3" />

              {/* Details */}
              <div className="space-y-2 pt-2">
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-3/4" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}