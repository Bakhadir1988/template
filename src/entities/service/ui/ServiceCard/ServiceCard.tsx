"use client";

import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { FavoriteButton } from "@/entities/favorite";
import styles from "./ServiceCard.module.css";
import { Service } from "@/entities/service/model/serviceSlice";

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export const ServiceCard: FC<ServiceCardProps> = ({ service, className }) => {
  const { item_id, title, text, announce, url } = service;

  return (
    <Link
      href={`/services/${url}`}
      className={`${styles.card} ${className || ""}`}
    >
      <FavoriteButton id={item_id} className={styles.favoriteButton} />
      <div className={styles.imageWrapper}>
        <Image
          src={`https://dev.nmcms.ru/resources/catalog/images/${announce.image}`}
          alt={title}
          width={300}
          height={200}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{text}</p>
      </div>
    </Link>
  );
};
