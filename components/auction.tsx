'use client';

import {Calendar, Clock, Heart, MapPin, Tag} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Separator } from '@radix-ui/react-separator';
import Image from 'next/image';
import { AuctionItem } from '@/types/auction';
import { formatDate, formatPrice } from '@/lib/auction-utils';
import { Badge } from './ui/badge';
import { useState } from 'react';
import { getStatusColor, getStatusText } from '@/lib/auction-helpers';
import { useAuction } from '@/context/auctionContext';

export const Auction = ({item}: {item: AuctionItem} ) => {
  const { favorites, toggleFavorite } = useAuction();
  const isFavorited = favorites.includes(item.id);
	const [imgSrc, setImgSrc] = useState(item.imageUrl || "/placeholder.svg")

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-4">
				<div className="flex-1">
					<h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance leading-tight">
						{item.title}
					</h1>
					<div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">						
						<div className="flex items-center gap-2">
							<Tag className="w-4 h-4" />
							<span className="capitalize font-medium">{item.category}</span>
						</div>
						<div className="flex items-center gap-2">
							<MapPin className="w-4 h-4" />
							<span className="font-medium">{item.auctionHouse}</span>
						</div>
					</div>
				</div>

				<div className="flex items-center gap-3">
					<div className="flex flex-col sm:flex-row gap-3">
						<Button
							variant="outline"
							onClick={() => toggleFavorite(item.id)}
							className="flex-1  focus-visible-ring cursor-pointer"
						>
							<Heart className={`w-4 h-4 mr-2 ${isFavorited ? "fill-current text-primary" : ""}`} />
							{isFavorited ? "Favorited" : "Add to Favorites"}
						</Button>
					</div>
					<Badge className={`${getStatusColor(item.status)} text-sm py-1 px-3`}>{getStatusText(item.status)}</Badge>
				</div>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
				<div className="space-y-6">
					<div className="aspect-square overflow-hidden rounded-lg border border-border bg-card">
						<Image
							src={imgSrc}
							alt={item.title}
							width={600}
							height={600}
							className="w-full h-full object-cover"
							onError={() => setImgSrc("/placeholder.svg")}
						/>
					</div>					
				</div>

				<div className="space-y-8">
					<Card>
						<CardContent className="p-8 py-6">
							<div className="space-y-6">
								<div>
									<p className="text-sm font-medium text-muted-foreground mb-2">Estimated Value</p>
									<p className="font-serif text-4xl font-bold text-primary">{formatPrice(item.estimatedValue)}</p>
								</div>

								<Separator />

								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
									<div className="flex items-center gap-3">
										<Calendar className="w-5 h-5 text-muted-foreground" />
										<div>
											<p className="text-sm font-medium text-muted-foreground">End Date</p>
											<p className="font-medium text-foreground">{formatDate(item.endDate)}</p>
										</div>
									</div>

									<div className="flex items-center gap-3">
										<Clock className="w-5 h-5 text-muted-foreground" />
										<div>
											<p className="text-sm font-medium text-muted-foreground">Status</p>
											<p className="font-medium text-foreground capitalize">{item.status}</p>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-8 py-6">
							<h3 className="font-serif text-xl font-semibold mb-4">Description</h3>
							<p className="text-muted-foreground leading-relaxed text-base">
								{item.description || "No description available for this item."}
							</p>
						</CardContent>
					</Card>

					<Card>
						<CardContent className="p-8 py-6">
							<h3 className="font-serif text-xl font-semibold mb-4">Auction House</h3>
							<div className="flex items-center gap-4">
								<div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
									<MapPin className="w-8 h-8 text-muted-foreground" />
								</div>
								<div>
									<p className="font-semibold text-lg text-foreground">{item.auctionHouse}</p>
									<p className="text-muted-foreground">Premier Auction House</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</main>
  )
}