import knex from "../knex";

import { FavoriteItem, OrderOptions } from "coffee-types";

const TABLE_NAME = "user_favorites";

function createSelect() {
  return knex
    .select([
      "user_favorites.id",
      "user_favorites.name AS favorite_name",
      "user_favorites.menu_item_id",
      "user_favorites.options",
      "menu_items.name AS item_name"
    ])
    .from(TABLE_NAME)
    .join("menu_items", "user_favorites.menu_item_id", "=", "menu_items.id");
}

export default class Favorite implements FavoriteItem {
  static async getByUserId(userId: number): Promise<Favorite[]> {
    const rows: any[] = await createSelect().where({ user_id: userId });
    return rows.map(row => new Favorite(row));
  }

  static async getById(id: number): Promise<Favorite | null> {
    const rows: any[] = await createSelect()
      .where({ "user_favorites.id": id })
      .limit(1);
    if (rows.length !== 1) {
      return null;
    }
    return new Favorite(rows[0]);
  }

  static async create(
    userId: number,
    itemId: number,
    favoriteName: string,
    options: OrderOptions
  ): Promise<Favorite | null> {
    const rows: any[] = await knex(TABLE_NAME).insert({
      user_id: userId,
      menu_item_id: itemId,
      name: favoriteName,
      options: JSON.stringify(options)
    });
    if (rows.length !== 1) {
      return null;
    }
    return Favorite.getById(rows[0]);
  }

  static async delete(favoriteId: number, userId?: number): Promise<boolean> {
    const affectedRows = await knex(TABLE_NAME)
      .delete()
      .where({ id: favoriteId, user_id: userId });
    return affectedRows != 0;
  }

  id: number;
  favoriteName: string;
  itemId: number;
  itemName: string;
  options: OrderOptions;

  constructor(row: any) {
    this.id = row["id"];
    this.favoriteName = row["favorite_name"];
    this.itemId = row["menu_item_id"];
    this.itemName = row["item_name"];
    this.options = JSON.parse(row["options"] || "null");
  }
}
