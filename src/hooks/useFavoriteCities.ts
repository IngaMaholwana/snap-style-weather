import { useState, useEffect } from "react";
import { FavoriteCity } from "@/types/weather";

const STORAGE_KEY = "favorite-cities";

export const useFavoriteCities = () => {
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const addFavorite = (city: FavoriteCity) => {
    const updated = [...favorites, city];
    setFavorites(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const removeFavorite = (cityName: string) => {
    const updated = favorites.filter((c) => c.name !== cityName);
    setFavorites(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const isFavorite = (cityName: string) => {
    return favorites.some((c) => c.name === cityName);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
};
