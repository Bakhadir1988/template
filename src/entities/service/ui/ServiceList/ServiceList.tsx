"use client";

import { FC, useEffect } from "react";
import { useAppDispatch } from "@/shared/lib/hooks";
import { ServiceCard } from "../ServiceCard/ServiceCard";
import { fetchFavorites } from "@/entities/favorite/model/favoriteSlice";
import styles from "./ServiceList.module.css";

interface Service {
  item_id: string;
  title: string;
  text: string;
  url: string;
  announce: {
    text: string;
    image: string;
  };
}

interface ServiceListProps {
  services: Service[];
}

export const ServiceList: FC<ServiceListProps> = ({ services }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  if (!services.length) {
    return <div className={styles.empty}>Нет доступных услуг</div>;
  }

  return (
    <div className={styles.list}>
      {services.map((service) => (
        <ServiceCard
          key={service.item_id}
          service={{
            id: service.item_id,
            name: service.title,
            description: service.text,
            image: `https://dev.nmcms.ru/resources/catalog/images/${service.announce.image}`,
            price: 0,
            slug: service.url,
          }}
        />
      ))}
    </div>
  );
};
