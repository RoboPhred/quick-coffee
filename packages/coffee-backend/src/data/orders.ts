import uuidV4 from "uuid/v4";

import { OrderedItem, PostOrderRequest } from "coffee-types";
import { getItem } from "./items";
import { User } from "./users";

// Temp data storage, replace with db.
const orders = new Map<string, OrderedItem[]>();

export async function getOrdersByUser(user: User): Promise<OrderedItem[]> {
  return orders.get(user.username) || [];
}

export async function getAllOrders(): Promise<OrderedItem[]> {
  const allOrders: OrderedItem[] = [];
  for (const userOrders of orders.values()) {
    allOrders.push(...userOrders);
  }
  return allOrders;
}

export async function addOrder(
  order: PostOrderRequest["order"],
  user: User
): Promise<OrderedItem> {
  const item = await getItem(order.itemId);

  const isoNow = new Date().toISOString();

  const orderItem: OrderedItem = {
    ...order,
    id: uuidV4(),
    orderCreatorUsername: user.username,
    orderDate: isoNow,
    itemName: item.name,
    status: "pending",
    statusChangeDate: isoNow
  };

  let userOrders = orders.get(user.username);
  if (!userOrders) {
    userOrders = [];
    orders.set(user.username, userOrders);
  }
  userOrders.push(orderItem);

  return orderItem;
}
