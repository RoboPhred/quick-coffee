import { FavoriteItem } from "../types/favorite";

export interface PostFavoriteRequest {
  favorite: FavoriteRequestItem;
}
export interface FavoriteRequestItem {
  itemId: string;
  favoriteName: string;
  options: Record<string, string | number | boolean>;
}
export interface PostFavoriteResponse {
  favorite: FavoriteItem;
}
