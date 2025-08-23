'use client';

import { filterAuctionItems, sortAuctionItems } from '@/lib/auction-utils';
import { AuctionItem, SearchFilters } from '@/types/auction';
import { useMemo, useState } from 'react';
import { AuctionGrid } from './auction-grid';
import { SearchFilters as SearchFiltersComponent } from './search-filters';
import { useAuction } from '@/context/auction-context';

export const ActionsList = ({items}: {items: AuctionItem[]}) => {
	const {favorites} = useAuction();
	const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: "all",
    minPrice: 0,
    maxPrice: 1000000,
    status: "all",
    sortBy: "title",
    sortOrder: "asc",
  })


  const priceRange = items.reduce(
    (acc, item) => ({
      min: Math.min(acc.min, item.estimatedValue),
      max: Math.max(acc.max, item.estimatedValue),
    }),
    { min: Number.POSITIVE_INFINITY, max: 0 },
  )

  if (filters.minPrice === 0 && filters.maxPrice === 1000000 && items.length > 0) {
    setFilters((prev) => ({
      ...prev,
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
    }))
  }

  const filteredItems = filterAuctionItems(items, filters, favorites)

  const sortedItems = useMemo(() => {
		return sortAuctionItems(filteredItems, filters.sortBy, filters.sortOrder)
	},[filteredItems, filters.sortBy, filters.sortOrder])

	return (
		<>
			<div className="mb-12">
				<SearchFiltersComponent
					items={items}
					filters={filters}
					onFiltersChange={setFilters}
					resultCount={sortedItems.length}
				/>
			</div>
			<AuctionGrid items={sortedItems} />
		</>
	)
}