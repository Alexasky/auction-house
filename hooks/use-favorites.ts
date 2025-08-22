import { useEffect, useState } from 'react';


export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const toggleFavorite = (itemId: number) => {
    setFavorites((prev) => {
      let updated;
      if (prev.includes(itemId)) {
        updated = prev.filter((id) => id !== itemId);
      } else {
        updated = [...prev, itemId];
      }
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  return { favorites, toggleFavorite };
}