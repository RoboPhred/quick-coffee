import { FavoriteItem } from "../types/favorite";

export interface PostFavoriteRequest {
  favorite: FavoriteRequestItem;
}
export interface FavoriteRequestItem {
  itemId: string;
  favoriteName: string;
}
export interface PostFavoriteResponse {
  favorite: FavoriteItem;
}
