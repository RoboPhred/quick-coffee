import {
  InventoryItem,
  ListInventoryItem,
  PostOrderRequest,
  PostOrderResponse,
  GetOrdersResponse,
  OrderedItem,
  FavoriteRequestItem,
  PostFavoriteRequest,
  FavoriteItem,
  PostFavoriteResponse,
  GetFavoritesResponse
} from "coffee-types";

export async function getIsOpen(): Promise<boolean> {
  const result = await apiFetch("GET", "/open");
  return result.open;
}

export async function getItems(): Promise<ListInventoryItem[]> {
  const result = await apiFetch("GET", "/items");
  return result;
}

export async function getItem(itemId: string): Promise<InventoryItem> {
  if (typeof itemId !== "string" || itemId === "") {
    throw new Error("Invalid item id.");
  }

  const result = await apiFetch("GET", `/items/${itemId}`);
  return result;
}

export async function addOrder(
  request: PostOrderRequest
): Promise<OrderedItem> {
  if (!request || typeof request !== "object") {
    throw new Error("Invalid order.");
  }

  const response: PostOrderResponse = await apiFetch(
    "POST",
    `/orders`,
    request
  );
  return response.order;
}

export async function getOrders(): Promise<OrderedItem[]> {
  const response: GetOrdersResponse = await apiFetch("GET", "/orders");
  return response.orders;
}

export async function getFavorites(): Promise<FavoriteItem[]> {
  const response: GetFavoritesResponse = await apiFetch("GET", "/favorites");
  return response.favorites;
}

export async function addFavorite(
  request: PostFavoriteRequest
): Promise<FavoriteItem> {
  const response: PostFavoriteResponse = await apiFetch(
    "POST",
    "/favorites",
    request
  );
  return response.favorite;
}

async function apiFetch(
  method: string,
  path: string,
  body?: any
): Promise<any> {
  if (path[0] !== "/") {
    path = "/" + path;
  }

  const init: RequestInit = {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json"
    }),
    cache: "no-cache"
  };

  const response = await fetch(`${process.env.COFFEE_ENDPOINT}${path}`, init);
  if (response.status < 200 || response.status > 299) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  try {
    return await response.json();
  } catch {
    throw new Error("Invalid response body.");
  }
}
