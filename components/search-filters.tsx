'use client';

import { useMemo, useState } from "react"
import type { AuctionItem, SearchFilters } from "@/types/auction"
import { getUniqueCategories } from "@/lib/auction-utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Search, X, SlidersHorizontal, ArrowUpDown, Heart } from "lucide-react"

interface SearchFiltersProps {
  items: AuctionItem[];
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  resultCount: number;
}

export function SearchFilters({ items, filters, onFiltersChange, resultCount }: SearchFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const categories = getUniqueCategories(items)

  const priceRange = useMemo(() => {
    const range = items.reduce(
      (acc, item) => ({
        min: Math.min(acc.min, item.estimatedValue),
        max: Math.max(acc.max, item.estimatedValue),
      }),
      { min: Number.POSITIVE_INFINITY, max: 0 },
    )
    return range;
  }, [items])

  const handleSearchChange = (query: string) => {
    onFiltersChange({ ...filters, query })
  }

  const handleCategoryChange = (category: string) => {
    onFiltersChange({ ...filters, category })
  }

  const handleStatusChange = (status: string) => {
    onFiltersChange({ ...filters, status })
  }

  const handlePriceRangeChange = (values: number[]) => {
    onFiltersChange({
      ...filters,
      minPrice: values[0],
      maxPrice: values[1],
    })
  }

  const handleFavoritesChange = () => {
    onFiltersChange({
      ...filters,
      favoritesOnly: !filters.favoritesOnly,
    });
  };

  const handleSortChange = (sortBy: SearchFilters['sortBy']) => {
    onFiltersChange({ ...filters, sortBy })
  }

  const handleSortOrderChange = () => {
    onFiltersChange({
      ...filters,
      sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      query: "",
      category: "all",
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      status: "all",
      sortBy: "title",
      sortOrder: "asc",
    })
  }

  const activeFilterCount = [
    filters.query,
    filters.category !== "all" ? filters.category : null,
    filters.status !== "all" ? filters.status : null,
    filters.minPrice !== priceRange.min || filters.maxPrice !== priceRange.max ? "price" : null,
  ].filter(Boolean).length

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          placeholder="Search auction items by title or description..."
          value={filters.query}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-12 pr-4 h-14 text-base bg-card border-2 focus-visible-ring"
        />
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4">
        {/* Category Filter */}
        <div className="w-full sm:w-auto">
          <Select value={filters.category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-[200px] h-12 focus-visible-ring">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  <span className="capitalize">{category}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-auto">
          <Select value={filters.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-full sm:w-[160px] h-12 focus-visible-ring">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="live">Live Now</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="ended">Ended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="relative h-9 focus-visible-ring bg-transparent w-full justify-start sm:w-auto sm:justify-center">
              <span>Price Filter</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-serif font-semibold text-lg">Price Range</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePriceRangeChange([priceRange.min, priceRange.max])}
                  className="focus-visible-ring"
                >
                  Reset
                </Button>
              </div>

              <div className="space-y-4">
                <Slider
                  value={[filters.minPrice, filters.maxPrice]}
                  onValueChange={handlePriceRangeChange}
                  max={priceRange.max}
                  min={priceRange.min}
                  step={1000}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="font-medium">${filters.minPrice.toLocaleString()}</span>
                  <span className="font-medium">${filters.maxPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button
          variant="outline"
          onClick={handleFavoritesChange}
          className="shrink-0 focus-visible-ring bg-transparent w-full justify-start sm:w-auto sm:justify-center"
          title='Favorite Filter'
        >
          <Heart className={`w-4 h-4 ${filters.favoritesOnly ? "fill-current text-primary" : ""}`} />
          Favorite Filter
        </Button>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full sm:w-[160px] h-12 focus-visible-ring">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="estimatedValue">Price</SelectItem>
              <SelectItem value="endDate">End Date</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={handleSortOrderChange}
            className="shrink-0focus-visible-ring bg-transparent"
            title={`Sort ${filters.sortOrder === "asc" ? "Descending" : "Ascending"}`}
          >
            <ArrowUpDown className="w-4 h-4" />
            {filters.sortOrder === "asc" ? "Descending" : "Ascending"}
          </Button>
        </div>       

        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-muted-foreground h-9 focus-visible-ring w-full sm:w-auto"
          >
            <X className="w-4 h-4" />
            Clear All
          </Button>
        )}
      </div>

      {activeFilterCount > 0 && (
        <div className="space-y-3">
          <span className="text-sm font-medium text-muted-foreground">Active filters:</span>
          <div className="flex flex-wrap items-center gap-2">
            {filters.query && (
              <Badge variant="secondary" className="gap-2 py-1 px-3">
                {`Search: "${filters.query}"`}
                <div onClick={() => handleSearchChange("")}>
                  <X className="w-3 h-3 cursor-pointer hover:text-destructive transition-colors" />
                </div>                
              </Badge>
            )}

            {filters.category !== "all" && (
              <Badge variant="secondary" className="gap-2 py-1 px-3 capitalize">
                {filters.category}
                <div onClick={() => handleCategoryChange("all")}>
                  <X className="w-3 h-3 cursor-pointer hover:text-destructive transition-colors"/>                 
                </div>
              </Badge>
            )}

            {filters.status !== "all" && (
              <Badge variant="secondary" className="gap-2 py-1 px-3 capitalize">
                {filters.status}
                <div onClick={() => handleStatusChange("all")}>
                  <X className="w-3 h-3 cursor-pointer hover:text-destructive transition-colors"/>
                </div>                
              </Badge>
            )}

            {(filters.minPrice !== priceRange.min || filters.maxPrice !== priceRange.max) && (
              <Badge variant="secondary" className="gap-2 py-1 px-3">
                ${filters.minPrice.toLocaleString()} - ${filters.maxPrice.toLocaleString()}
                <div onClick={() => handlePriceRangeChange([priceRange.min, priceRange.max])}>
                  <X className="w-3 h-3 cursor-pointer hover:text-destructive transition-colors"/>
                </div>
              </Badge>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
        <span className="text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{resultCount}</span> of{" "}
          <span className="font-semibold text-foreground">{items.length}</span> items
        </span>

        {filters.sortOrder === "desc" && (
          <span className="flex items-center gap-1 text-muted-foreground">
            <ArrowUpDown className="w-3 h-3" />
            Sorted descending
          </span>
        )}
      </div>
    </div>
  )
}
