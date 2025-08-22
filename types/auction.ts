export interface AuctionItem {
  id: number
  title: string
  description: string
  category: string
  estimatedValue: number
  imageUrl: string
  auctionHouse: string
  endDate: string
  status: "upcoming" | "live" | "ended"
}

export interface SearchFilters {
  query: string
  category: string
  minPrice: number
  maxPrice: number
  status: string
  sortBy: "title" | "estimatedValue" | "endDate"
  sortOrder: "asc" | "desc",
  favoritesOnly?: boolean;
}
