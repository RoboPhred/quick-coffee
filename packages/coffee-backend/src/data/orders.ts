import uuidV4 from "uuid/v4";

import { ListOrderedItem, OrderedItem, PostOrderRequest } from "coffee-types";
import { getItem } from "./items";

// Temp data storage, replace with db.
const orders: OrderedItem[] = [];

export async function getOrders(): Promise<ListOrderedItem[]> {
  return orders.map(x => ({
    id: x.id,
    itemId: x.itemId,
    itemName: x.itemName,
    dateOrdered: x.dateOrdered,
    status: x.status
  }));
}

export async function addOrder(
  order: PostOrderRequest["order"]
): Promise<OrderedItem> {
  const item = await getItem(order.itemId);

  const orderItem: OrderedItem = {
    ...order,
    id: uuidV4(),
    dateOrdered: new Date().toISOString(),
    itemName: item.name,
    status: "pending"
  };
  orders.push(orderItem);

  return orderItem;
}
