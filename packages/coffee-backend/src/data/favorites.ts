import uuidV4 from "uuid/v4";

import { FavoriteItem, FavoriteRequestItem } from "coffee-types";
import { getItem, ItemNotFoundError } from "./items";
import { User } from "./users";

// TODO: Use real db
const favorites = new Map<string, FavoriteItem[]>();

export async function getFavorites(user: User): Promise<FavoriteItem[]> {
  return favorites.get(user.username) || [];
}

export async function addFavorite(
  favorite: FavoriteRequestItem,
  user: User
): Promise<FavoriteItem> {
  const item = await getItem(favorite.itemId);
  const newFavorite: FavoriteItem = {
    ...favorite,
    id: uuidV4(),
    itemName: item.name
  };
  const userFavorites = getOrCreateFavorites(user);
  userFavorites.push(newFavorite);
  return newFavorite;
}

export async function removeFavorite(
  favoriteId: string,
  user: User
): Promise<boolean> {
  const userFavorites = getOrCreateFavorites(user);
  const index = userFavorites.findIndex(x => x.id === favoriteId);
  if (index === -1) {
    return false;
  }
  userFavorites.splice(index, 1);
  return true;
}

function getOrCreateFavorites(user: User) {
  let userFavorites = favorites.get(user.username);
  if (!userFavorites) {
    userFavorites = [];
    favorites.set(user.username, userFavorites);
  }
  return userFavorites;
}
