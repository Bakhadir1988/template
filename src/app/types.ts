import { FavoriteState } from "@/entities/favorite/model/favoriteSlice";
import { ServiceState } from "@/entities/service/model/serviceSlice";
import { CartState } from "@/entities/cart/model/cartSlice";
import { CompareState } from "@/entities/compare/model/compareSlice";

export interface RootState {
  favorite: FavoriteState;
  services: ServiceState;
  cart: CartState;
  compare: CompareState;
}
