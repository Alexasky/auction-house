'use client';

import { ArrowLeft, Info } from 'lucide-react';
import Link from 'next/link';

export default function Error({ error }: { error: Error }) {
  return (
		<div className="min-h-[calc(100vh-15rem)] bg-background flex items-center justify-center p-4">
			<div className="text-center max-w-md mx-auto">
				<div className="w-20 h-20 mx-auto mb-8 rounded-full bg-muted flex items-center justify-center">
					<Info className="w-10 h-10 text-muted-foreground" />
				</div>
				<h2 className="font-serif text-2xl font-semibold text-foreground mb-4 text-balance">
					{error ? "Error loading item" : "Item not found"}
				</h2>
				<p className="text-muted-foreground mb-8 leading-relaxed">
					{error.message || "The auction item you're looking for doesn't exist."}
				</p>
				<Link	href="/">
					<ArrowLeft className="w-4 h-4 mr-2" />
					Back to Auction House
				</Link>
			</div>
		</div>
  )
}