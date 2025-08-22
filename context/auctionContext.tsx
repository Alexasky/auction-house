'use client';

import { createContext, useContext, ReactNode } from "react";
import { useFavorites } from '@/hooks/use-favorites';

interface AuctionContextType {
	favorites: number[];
	toggleFavorite: (itemId: number) => void;

}

const AuctionContext = createContext<AuctionContextType>({
	favorites: [],
  toggleFavorite: () => {}
});

export function AuctionProvider({ children }: { children: ReactNode }) {
	const { favorites, toggleFavorite } = useFavorites();

  return (
    <AuctionContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </AuctionContext.Provider>
  );
}

export function useAuction() {
  const ctx = useContext(AuctionContext);
  if (!ctx) {
    throw new Error("useAuction must be used inside AuctionProvider");
  }
  return ctx;
}