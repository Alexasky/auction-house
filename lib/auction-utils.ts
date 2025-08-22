import type { AuctionItem, SearchFilters } from "@/types/auction"


export function filterAuctionItems(items: AuctionItem[], filters: SearchFilters, favorites: number[]): AuctionItem[] {  
  return items.filter((item) => {
    // Text search
    if (
      filters.query &&
      !item.title.toLowerCase().includes(filters.query.toLowerCase()) &&
      !item.description.toLowerCase().includes(filters.query.toLowerCase())
    ) {
      return false
    }

    // Category filter
    if (filters.category && filters.category !== "all" && item.category !== filters.category) {
      return false
    }

    // Price range filter
    if (item.estimatedValue < filters.minPrice || item.estimatedValue > filters.maxPrice) {
      return false
    }

    // Status filter
    if (filters.status && filters.status !== "all" && item.status !== filters.status) {
      return false
    }

    if (filters.favoritesOnly && !favorites.includes(item.id)) return false;

    return true
  })
}

export function sortAuctionItems(
  items: AuctionItem[],
  sortBy: SearchFilters["sortBy"],
  sortOrder: SearchFilters["sortOrder"],
): AuctionItem[] {
  return [...items].sort((a, b) => {
    let comparison = 0

    switch (sortBy) {
      case "title":
        comparison = a.title.localeCompare(b.title)
        break
      case "estimatedValue":
        comparison = a.estimatedValue - b.estimatedValue
        break
      case "endDate":
        comparison = new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
        break
    }

    return sortOrder === "desc" ? -comparison : comparison
  })
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function getUniqueCategories(items: AuctionItem[]): string[] {
  const categories = items.map((item) => item.category)
  return Array.from(new Set(categories)).sort()
}
