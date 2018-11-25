import { OrderedItem, OrderStatus } from "coffee-types";

import { authFetch } from "../auth/api";

export async function getBaristaOrders(): Promise<OrderedItem[]> {
  const orderResponse = await authFetch("GET", "/barista/orders");
  return orderResponse.orders;
}

export async function setOrderStatus(orderId: number, status: OrderStatus) {
  await authFetch("PATCH", `/barista/orders/${orderId}`, {
    status
  });
}
