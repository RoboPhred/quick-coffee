import {
  PostOrderRequest,
  OrderedItem,
  PostOrderResponse,
  GetOrdersResponse
} from "coffee-types";

import { authFetch } from "@/services/auth/api";

export async function addOrder(
  request: PostOrderRequest
): Promise<OrderedItem> {
  if (!request || typeof request !== "object") {
    throw new Error("Invalid order.");
  }

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
