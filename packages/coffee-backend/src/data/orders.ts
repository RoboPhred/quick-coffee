import uuidV4 from "uuid/v4";

import { ListOrderedItem, OrderedItem, PostOrderRequest } from "coffee-types";

// Temp data storage, replace with db.
const orders: OrderedItem[] = [];

export async function getOrders(): Promise<ListOrderedItem[]> {
  return orders.map(x => ({
    id: x.id,
    itemId: x.itemId,
    itemName: x.itemName
  }));
}

export async function addOrder(
  order: PostOrderRequest["order"]
): Promise<OrderedItem> {
  const orderItem: OrderedItem = {
    ...order,
    id: uuidV4()
  };
  orders.push(orderItem);
  return orderItem;
}
