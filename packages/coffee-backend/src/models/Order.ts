import knex from "../knex";

import { OrderedItem, OrderStatus } from "coffee-types";

const TABLE_NAME = "user_orders";

function createSelect() {
  return knex
    .select([
      "user_orders.id",
      "user_orders.user_id",
      "users.username",
      "user_orders.menu_item_id",
      "menu_items.name",
      "user_orders.options",
      "user_orders.created_at",
      "user_orders.status",
      "user_orders.status_updated_at"
    ])
    .from(TABLE_NAME)
    .join("users", "user_orders.user_id", "=", "users.id")
    .join("menu_items", "user_orders.menu_item_id", "=", "menu_items.id");
}

export default class Order implements OrderedItem {
  static async getAll(): Promise<Order[]> {
    const rows: any[] = await createSelect();

    return rows.map(row => new Order(row));
  }

  static async getByUserId(userId: number): Promise<Order[]> {
    const rows: any[] = await createSelect().where({ user_id: userId });
    return rows.map(row => new Order(row));
  }

  static async getById(id: number): Promise<Order | null> {
    const rows: any[] = await createSelect()
      .where({ "user_orders.id": id })
      .limit(1);
    if (rows.length !== 1) {
      return null;
    }
    return new Order(rows[0]);
  }

  static async setStatus(
    id: number,
    status: OrderStatus
  ): Promise<Order | null> {
    const rows: any[] = await knex(TABLE_NAME)
      .update({ status })
      .where({ "user_orders.id": id });
    if (rows.length === 0) {
      return null;
    }
    return Order.getById(id);
  }

  static async create(
    userId: number,
    itemId: number,
    itemOptions: Record<string, number | string | boolean>
  ): Promise<Order | null> {
    const isoNow = new Date().toISOString();
    const rows: any[] = await knex(TABLE_NAME).insert({
      user_id: userId,
      menu_item_id: itemId,
      options: JSON.stringify(itemOptions || null),
      status: "pending",
      status_updated_at: isoNow,
      created_at: isoNow
    });
    if (rows.length !== 1) {
      return null;
    }
    return Order.getById(rows[0]);
  }

  static async delete(orderId: string, userId?: string): Promise<boolean> {
    const affectedRows = await knex(TABLE_NAME)
      .delete()
      .where({ id: orderId, user_id: userId });
    return affectedRows != 0;
  }

  id: number;
  itemId: number;
  itemName: string;
  orderCreatorUsername: string;
  orderDate: string;
  status: OrderStatus;
  statusChangeDate: string;
  options: Record<string, number | string | boolean>;

  constructor(row: any) {
    this.id = row["id"];
    this.itemId = row["menu_item_id"];
    this.itemName = row["name"];
    this.orderCreatorUsername = row["username"];
    this.orderDate = row["created_at"];
    this.status = row["status"];
    this.statusChangeDate = row["status_updated_at"];
    this.options = JSON.parse(row["options"] || "null");
  }
}
