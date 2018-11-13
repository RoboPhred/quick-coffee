import {
  FavoriteItem,
  GetFavoritesResponse,
  PostFavoriteRequest,
  PostFavoriteResponse
} from "coffee-types";

import { authFetch } from "@/services/auth/api";

export async function getFavorites(): Promise<FavoriteItem[]> {
  const response: GetFavoritesResponse = await authFetch("GET", "/favorites");
  return response.favorites;
}

export async function addFavorite(
  request: PostFavoriteRequest
): Promise<FavoriteItem> {
  const response: PostFavoriteResponse = await authFetch(
    "POST",
    "/favorites",
    request
  );
  return response.favorite;
}
