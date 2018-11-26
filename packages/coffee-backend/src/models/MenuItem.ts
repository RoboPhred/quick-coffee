import knex from "../knex";

import { InventoryItem, ItemOption } from "coffee-types";

const TABLE_NAME = "menu_items";

function createSelect() {
  return knex
    .select(["menu_items.id", "menu_items.name", "menu_items.options"])
    .from(TABLE_NAME);
}

export default class MenuItem implements InventoryItem {
  static async getById(id: number): Promise<MenuItem | null> {
    const rows: any[] = await createSelect()
      .where({ id })
      .limit(1);
    if (rows.length !== 1) {
      return null;
    }
    const item = new MenuItem(rows[0]);
    return item;
  }

  static async getAll(): Promise<MenuItem[]> {
    const rows: any[] = await createSelect();
    return rows.map(row => new MenuItem(row));
  }

  static async create(
    name: string,
    description?: string
  ): Promise<MenuItem | null> {
    const rows: any[] = await knex(TABLE_NAME).insert({
      name,
      description: description || null
    });
    if (rows.length !== 1) {
      return null;
    }
    return MenuItem.getById(rows[0]);
  }

  static async delete(id: number): Promise<boolean> {
    const affectedRows = await knex(TABLE_NAME)
      .delete()
      .where({ id });
    return affectedRows != 0;
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
