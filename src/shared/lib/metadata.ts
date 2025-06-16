import { Metadata } from "next";

export interface MetaData {
  seo_title: string;
  seo_description: string;
  h1: string;
  title?: string;
  description?: string;
}

export function generateMetaData(meta: MetaData): Metadata {
  return {
    title: meta?.seo_title || "Наши услуги",
    description:
      meta?.seo_description || "Ознакомьтесь с нашими услугами и сервисами",
  };
}
