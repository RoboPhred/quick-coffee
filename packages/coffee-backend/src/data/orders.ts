import uuidV4 from "uuid/v4";

import { OrderedItem, OrderStatus, PostOrderRequest } from "coffee-types";
import { getItem } from "./items";
import { User } from "./users";

// Temp data storage, replace with db.
const orders: OrderedItem[] = [];

export async function getOrderById(orderId: string) {}

export async function getOrdersByUser(user: User): Promise<OrderedItem[]> {
  const userOrders: OrderedItem[] = [];

  for (const order of orders) {
    if (order.orderCreatorUsername === user.username) {
      userOrders.push(order);
    }
  }

  return userOrders;
}

export async function getAllOrders(): Promise<OrderedItem[]> {
  return orders;
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

  orders.push(orderItem);

  return orderItem;
}

export async function updateStatus(orderId: string, status: OrderStatus) {
  const idx = orders.findIndex(order => order.id === orderId);
  if (idx === -1) {
    throw new OrderNotFoundError();
  }

  orders[idx] = {
    ...orders[idx],
    status,
    statusChangeDate: new Date().toISOString()
  };
}

export class OrderNotFoundError extends Error {
  constructor() {
    super("Order Not Found");
    Object.setPrototypeOf(this, OrderNotFoundError.prototype);
  }
}
