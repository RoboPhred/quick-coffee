import knex from "../knex";

import { FavoriteItem } from "coffee-types";

export default class Favorite implements FavoriteItem {
  static async getByUserId(userId: string): Promise<Favorite[]> {
    const rows: any[] = await knex
      .select(["id", "name", "menu_item_id", "menu_items.name"])
      .from("user_favorites")
      .where({ user_id: userId })
      .join("menu_items", "user_favorites.menu_item_id", "=", "menu_items.id");
    return rows.map(row => new Favorite(row));
  }

  static async create(
    userId: string,
    itemId: string,
    favoriteName: string
  ): Promise<Favorite> {
    const row = await knex("user_favorites")
      .insert(
        {
          user_id: userId,
          menu_item_id: itemId,
          name: favoriteName
        },
        ["id", "name", "menu_item_id", "menu_items.name"]
      )
      .join("menu_items", "user_favorites.menu_item_id", "=", "menu_items.id");
    return new Favorite(row);
  }

  static async delete(favoriteId: string, userId?: string): Promise<boolean> {
    const affectedRows = await knex("user_favorites")
      .delete()
      .where({ favoriteId, userId });
    return affectedRows != 0;
  }

  id: string;
  favoriteName: string;
  itemId: string;
  itemName: string;

  constructor(row: any) {
    this.id = row["id"];
    this.favoriteName = row["name"];
    this.itemId = row["menu_item_id"];
    this.itemName = row["menu_items.name"];
  }
}
