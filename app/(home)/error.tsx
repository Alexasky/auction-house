'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
		<div className="min-h-[calc(100vh-15rem)] bg-background flex items-center justify-center p-4">
			<div className="text-center max-w-md mx-auto">
				<div className="w-20 h-20 mx-auto mb-8 rounded-full bg-destructive/10 flex items-center justify-center">
					<svg className="w-10 h-10 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
						/>
					</svg>
				</div>
				<h2 className="font-serif text-2xl font-semibold text-foreground mb-4 text-balance">
					Unable to load auction data
				</h2>
				<p className="text-muted-foreground leading-relaxed mb-4">{error.message}</p>
				<button
					onClick={() => reset()}
					className="px-4 py-2 rounded bg-destructive text-white hover:bg-destructive/80 cursor-pointer"
				>
					Try Again
				</button>
			</div>
		</div>
  )
}