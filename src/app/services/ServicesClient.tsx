"use client";

import { ServiceCard } from "@/entities/service";
import styles from "./ServicesClient.module.css";
import { Service } from "@/entities/service/model/serviceSlice";

interface ServicesClientProps {
  initialServices: Service[];
}

export const ServicesClient = ({ initialServices }: ServicesClientProps) => {
  return (
    <div className={styles.services}>
      {initialServices.map((service) => (
        <ServiceCard key={service.item_id} service={service} />
      ))}
    </div>
  );
};
