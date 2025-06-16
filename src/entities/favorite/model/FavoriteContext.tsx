"use client";

import { createContext, useContext, ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { toggleFavorite, fetchFavorites } from "./favoriteSlice";

interface FavoriteContextType {
  items: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
  }>;
  totalCost: number;
  totalQuantity: number;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  loadingItems: Record<string, boolean>;
  error: string | null;
}

interface FavoriteProviderProps {
  children: ReactNode;
}

const FavoriteContext = createContext<FavoriteContextType | null>(null);

export const FavoriteProvider = ({ children }: FavoriteProviderProps) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.favorite.items);
  const totalCost = useAppSelector((state) => state.favorite.totalCost);
  const totalQuantity = useAppSelector((state) => state.favorite.totalQuantity);
  const loadingItems = useAppSelector((state) => state.favorite.loadingItems);
  const error = useAppSelector((state) => state.favorite.error);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleToggleFavorite = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  const isFavorite = (id: string) => items.some((item) => item.id === id);

  return (
    <FavoriteContext.Provider
      value={{
        items,
        totalCost,
        totalQuantity,
        toggleFavorite: handleToggleFavorite,
        isFavorite,
        loadingItems,
        error,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavoriteContext = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavoriteContext must be used within FavoriteProvider");
  }
  return context;
};
