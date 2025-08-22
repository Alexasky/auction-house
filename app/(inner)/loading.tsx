
export default function Loading() {
  return (
		<main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="animate-pulse space-y-8">
					<div className="h-12 w-48 bg-muted rounded" />
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
						<div className="aspect-square bg-muted rounded-lg" />
						<div className="space-y-6">
							<div className="h-10 bg-muted rounded w-3/4" />
							<div className="h-6 bg-muted rounded w-1/2" />
							<div className="h-20 bg-muted rounded" />
							<div className="h-40 bg-muted rounded" />
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}