import { OrderedItem } from "coffee-types";
import { authFetch } from "../auth/api";

export async function getBaristaOrders(): Promise<OrderedItem[]> {
  const orderResponse = await authFetch("GET", "/barista/orders");
  return orderResponse.orders;
}
