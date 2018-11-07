import uuidV4 from "uuid/v4";

import { FavoriteItem, FavoriteRequestItem } from "coffee-types";
import { getItem, ItemNotFoundError } from "./items";

// TODO: Use real db
const favorites: FavoriteItem[] = [];

export async function getFavorites(): Promise<FavoriteItem[]> {
  return favorites;
}

export async function addFavorite(
  favorite: FavoriteRequestItem
): Promise<FavoriteItem> {
  const item = await getItem(favorite.itemId);
  const newFavorite: FavoriteItem = {
    ...favorite,
    id: uuidV4(),
    itemName: item.name
  };
  return newFavorite;
}

export async function removeFavorite(favoriteId: string): Promise<boolean> {
  const index = favorites.findIndex(x => x.id === favoriteId);
  if (index === -1) {
    return false;
  }
  favorites.splice(index, 1);
  return true;
}
