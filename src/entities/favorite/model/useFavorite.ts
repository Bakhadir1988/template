"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { toggleFavorite } from "./favoriteSlice";

export const useFavorite = (id: string) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorite.items);
  const loadingItems = useAppSelector((state) => state.favorite.loadingItems);
  const error = useAppSelector((state) => state.favorite.error);

  const isFavorite = favorites.some((item) => item.id === id);
  const isLoading = loadingItems[id];

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(id));
  };

  return {
    isFavorite,
    toggleFavorite: handleToggleFavorite,
    isLoading,
    error,
  };
};
