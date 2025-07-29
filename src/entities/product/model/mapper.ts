import { CatalogItemDto } from "@/shared/api/catalogApi";
import { Product } from "./types";

export function mapCatalogItemToProduct(dto: CatalogItemDto): Product {
  return {
    item_id: dto.item_id,
    title: dto.title,
    price: dto.price,
    imgs: Array.isArray(dto.imgs) ? dto.imgs : dto.imgs ? [dto.imgs] : [],
    chars: dto.chars,
  };
}
