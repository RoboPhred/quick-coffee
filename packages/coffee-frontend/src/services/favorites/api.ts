import {
  FavoriteItem,
  GetFavoritesResponse,
  PostFavoriteRequest,
  PostFavoriteResponse,
  DeleteFavoriteResponse
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

export async function deleteFavorite(favoriteId: number): Promise<boolean> {
  const response: DeleteFavoriteResponse = await authFetch(
    "DELETE",
    `/favorites/${favoriteId}`
  );
  return response.status === "ok";
}
