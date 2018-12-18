import knex from "../knex";

import { InventoryItem, ItemOption } from "coffee-types";

const TABLE_NAME = "menu_items";
const UPDATE_KEYS: ("name" | "options")[] = ["name", "options"];

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

  static async update(
    id: number,
    item: Partial<Omit<InventoryItem, "id">>
  ): Promise<MenuItem | null> {
    const update: any = {};
    for (const key of Object.keys(item)) {
      const value = (item as any)[key];
      switch (key) {
        case "name":
          update.name = value;
          break;
        case "options":
          update.options = JSON.stringify(value);
          break;
        default:
          throw new Error(`Unknown MenuItem property "${key}".`);
      }
    }

    const rows: any[] = await knex(TABLE_NAME)
      .update(update)
      .where({ "menu_items.id": id });

    if (rows.length !== 1) {
      return null;
    }
    return MenuItem.getById(id)!;
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
