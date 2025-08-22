'use client';

import type { AuctionItem } from "@/types/auction"
import { AuctionItemCard } from "./auction-item-card"
import { Search } from 'lucide-react'


interface AuctionGridProps {
  items: AuctionItem[]
}

export function AuctionGrid({ items }: AuctionGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
          <Search size={32}/>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No items found</h3>
        <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {items.map((item) => (
        <AuctionItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}
