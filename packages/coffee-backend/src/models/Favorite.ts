import knex from "../knex";

import { FavoriteItem } from "coffee-types";

export default class Favorite implements FavoriteItem {
  static async getByUserId(userId: number): Promise<Favorite[]> {
    const rows: any[] = await knex
      .select(["id", "name", "menu_item_id", "menu_items.name"])
      .from("user_favorites")
      .where({ user_id: userId })
      .join("menu_items", "user_favorites.menu_item_id", "=", "menu_items.id");
    return rows.map(row => new Favorite(row));
  }

  static async getById(id: number): Promise<Favorite | null> {
    const rows: any[] = await knex
      .select(["id", "name", "menu_item_id", "menu_items.name"])
      .from("user_favorites")
      .where({ id })
      .limit(1)
      .join("menu_items", "user_favorites.menu_item_id", "=", "menu_items.id");
    if (rows.length !== 1) {
      return null;
    }
    return new Favorite(rows[0]);
  }

  static async create(
    userId: number,
    itemId: number,
    favoriteName: string
  ): Promise<Favorite | null> {
    const rows: any[] = await knex("user_favorites")
      .insert({
        user_id: userId,
        menu_item_id: itemId,
        name: favoriteName
      })
      .join("menu_items", "user_favorites.menu_item_id", "=", "menu_items.id");
    if (rows.length !== 1) {
      return null;
    }
    return Favorite.getById(rows[0]);
  }

  static async delete(favoriteId: string, userId?: string): Promise<boolean> {
    const affectedRows = await knex("user_favorites")
      .delete()
      .where({ id: favoriteId, user_id: userId });
    return affectedRows != 0;
  }

  id: number;
  favoriteName: string;
  itemId: number;
  itemName: string;

  constructor(row: any) {
    this.id = row["id"];
    this.favoriteName = row["name"];
    this.itemId = row["menu_item_id"];
    this.itemName = row["menu_items.name"];
  }
}
