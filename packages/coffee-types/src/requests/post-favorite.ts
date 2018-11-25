import { FavoriteItem, OrderOptions } from "../types";

export interface PostFavoriteRequest {
  favorite: FavoriteRequestItem;
}
export interface FavoriteRequestItem {
  itemId: number;
  favoriteName: string;
  options: OrderOptions;
}
export interface PostFavoriteResponse {
  favorite: FavoriteItem;
}
