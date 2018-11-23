import knex from "../knex";

import { InventoryItem, ItemOption } from "coffee-types";

export default class MenuItem implements InventoryItem {
  static async findById(id: number): Promise<MenuItem | null> {
    const rows: any[] = await knex
      .select(["id", "name", "options"])
      .from("menu_items")
      .where({ id })
      .limit(1);
    if (rows.length !== 1) {
      return null;
    }
    const item = new MenuItem(rows[0]);
    return item;
  }

  static async getAll(): Promise<MenuItem[]> {
    const rows: any[] = await knex
      .select(["id", "name", "options"])
      .from("menu_items");
    return rows.map(row => new MenuItem(row));
  }

  id: number;
  name: string;
  options: ItemOption[];

  constructor(row: any) {
    this.id = row["id"];
    this.name = row["name"];
    this.options = JSON.parse(row["options"] || "null");
  }
}
