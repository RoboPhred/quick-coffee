import {
  PostOrderRequest,
  OrderedItem,
  PostOrderResponse,
  GetOrdersResponse,
  OrderRequestItem
} from "coffee-types";

import { authFetch } from "@/services/auth/api";

export async function addOrder(order: OrderRequestItem): Promise<OrderedItem> {
  const request: PostOrderRequest = {
    order
  };
  const response: PostOrderResponse = await authFetch(
    "POST",
    `/orders`,
    request
  );
  return response.order;
}

export async function getOrders(): Promise<OrderedItem[]> {
  const response: GetOrdersResponse = await authFetch("GET", "/orders");
  return response.orders;
}
