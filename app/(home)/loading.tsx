import { LoadingGrid } from "@/components/loading-grid"

export default function Loading() {
  return (
		<main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="mb-12 space-y-6">
				<div className="h-14 bg-muted rounded-lg animate-pulse" />
				<div className="flex flex-col sm:flex-row gap-4">
					<div className="h-12 w-full sm:w-[200px] bg-muted rounded animate-pulse" />
					<div className="h-12 w-full sm:w-[160px] bg-muted rounded animate-pulse" />
					<div className="h-12 w-full sm:w-[140px] bg-muted rounded animate-pulse" />
				</div>
				<div className="h-6 bg-muted rounded w-64 animate-pulse" />
			</div>
			<LoadingGrid />
		</main>
	)
}