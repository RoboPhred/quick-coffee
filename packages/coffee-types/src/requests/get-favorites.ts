import { FavoriteItem } from "../types/favorite";

export interface GetFavoritesRequest {}
export interface GetFavoritesResponse {
  favorites: FavoriteItem[];
}
