"use client";

import { useFavoriteContext } from "../../model/FavoriteContext";
import styles from "./FavoriteInfo.module.css";

export const FavoriteInfo = () => {
  const { totalQuantity } = useFavoriteContext();

  return (
    <div className={styles.favoriteInfo}>
      <span className={styles.icon}>❤️</span>
      <span className={styles.quantity}>{totalQuantity}</span>
    </div>
  );
};
