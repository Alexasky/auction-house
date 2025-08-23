'use client';

import type { AuctionItem } from "@/types/auction"
import { formatPrice, formatDate } from "@/lib/auction-utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Heart, MapPin, Tag } from "lucide-react"
import Link from 'next/link'
import LazyImage from './lazy-image'
import { getStatusColor, getStatusText } from '@/lib/auction-helpers';
import { Button } from './ui/button';
import { useAuction } from '@/context/auction-context';


interface AuctionItemCardProps {
  item: AuctionItem
}

export function AuctionItemCard({ item }: AuctionItemCardProps) {
  const { favorites, toggleFavorite } = useAuction();
  const isFavorited = favorites.includes(item.id);

  return (
    <Card
      className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border bg-card p-0"
    >
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <LazyImage
            src={item.imageUrl}
            alt={item.title} 
          />
          <div className="absolute top-3 left-3">
            <Badge className={`${getStatusColor(item.status)} font-medium`}>{getStatusText(item.status)}</Badge>
          </div>
          <Button
            variant='ghost'
            size={'icon'}
            className="shrink-0 focus-visible-ring bg-transparent absolute top-3 right-3 z-10 cursor-pointer"
            onClick={() => toggleFavorite(item.id)}
          >
            <Heart className={`w-5 h-5 ${isFavorited ? "fill-destructive text-transparent" : "fill-primary-foreground text-destructive"}`} />
          </Button>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-5 space-y-3">
          <Link href={`/auction/${item.id}`}>
            <h3 className="font-semibold text-lg text-card-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
          </Link>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Tag className="w-4 h-4" />
            <span className="capitalize">{item.category}</span>
          </div>          

          <div className="flex items-baseline gap-2">
            <span className="text-sm text-muted-foreground">Est. Value</span>
            <span className="text-xl font-bold text-primary">{formatPrice(item.estimatedValue)}</span>
          </div>

          <div className="space-y-2 pt-2 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{item.auctionHouse}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Ends {formatDate(item.endDate)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
