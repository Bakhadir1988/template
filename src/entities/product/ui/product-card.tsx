import React from "react";
import type { Product } from "../model/types";
import styles from "./product-card.module.scss";
import Image from "next/image";

export const ProductCard = ({ item }: { item: Product }) => {
  return (
    <div className={styles.root}>
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.imgs[0]}`}
        width={200}
        height={240}
        alt={item.title}
        priority
      />
      <h3>{item.title}</h3>
      <div>Цена: {item.price} ₽</div>
      <ul>
        {item.chars.class && <li>Класс: {item.chars.class}</li>}
        {item.chars.type && <li>Тип: {item.chars.type}</li>}
        {item.chars.vendor && <li>Производитель: {item.chars.vendor}</li>}
        {item.chars.density && <li>Плотность: {item.chars.density}</li>}
        {item.chars.alcohol && <li>Алкоголь: {item.chars.alcohol}</li>}
        {item.chars.test_string && <li>Тест: {item.chars.test_string}</li>}
      </ul>
    </div>
  );
};
