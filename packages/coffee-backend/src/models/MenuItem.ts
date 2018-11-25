import knex from "../knex";

import { InventoryItem, ItemOption } from "coffee-types";

const TABLE_NAME = "menu_items";

function createSelect() {
  return knex
    .select(["menu_items.id", "menu_items.name", "menu_items.options"])
    .from(TABLE_NAME);
}

export default class MenuItem implements InventoryItem {
  static async findById(id: number): Promise<MenuItem | null> {
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

  id: number;
  name: string;
  options: ItemOption[];

  constructor(row: any) {
    this.id = row["id"];
    this.name = row["name"];
    this.options = JSON.parse(row["options"] || "null");
  }
}
