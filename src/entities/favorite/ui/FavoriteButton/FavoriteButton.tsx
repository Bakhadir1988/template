"use client";

import { FC } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { toggleFavorite } from "@/entities/favorite/model/favoriteSlice";
import styles from "./FavoriteButton.module.css";

interface FavoriteButtonProps {
  id: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const FavoriteButton: FC<FavoriteButtonProps> = ({
  id,
  className,
  onClick,
}) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorite.items);
  const isFavorite = favorites.some((item) => item.id === id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(id));
    onClick?.(e);
  };

  return (
    <button
      className={`${styles.favorite} ${className || ""}`}
      onClick={handleClick}
      aria-label={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
};
