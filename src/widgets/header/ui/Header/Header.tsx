"use client";

import Link from "next/link";
import { FavoriteInfo } from "@/entities/favorite/ui/FavoriteInfo/FavoriteInfo";
import { CartInfo } from "@/entities/cart/ui/CartInfo/CartInfo";
import { CompareInfo } from "@/entities/compare/ui/CompareInfo/CompareInfo";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">Logo</Link>
        </div>

        <nav className={styles.nav}>
          <Link href="/favorites" className={styles.navItem}>
            <FavoriteInfo />
          </Link>
          <Link href="/cart" className={styles.navItem}>
            <CartInfo />
          </Link>
          <Link href="/compare" className={styles.navItem}>
            <CompareInfo />
          </Link>
        </nav>
      </div>
    </header>
  );
};
