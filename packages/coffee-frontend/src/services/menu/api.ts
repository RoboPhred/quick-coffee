import {
  InventoryItem,
  PostMenuItemRequest,
  InventoryItemRequest,
  PostMenuItemResponse
} from "coffee-types";

import { apiFetch } from "@/services/backend/api";
import { authFetch } from "@/services/auth/api";

export async function getItems(): Promise<InventoryItem[]> {
  const result = await apiFetch("GET", "/items");
  return result;
}

export async function getItem(itemId: number): Promise<InventoryItem> {
  const result = await apiFetch("GET", `/items/${itemId}`);
  return result;
}

export async function createItem(
  item: InventoryItemRequest
): Promise<InventoryItem> {
  const request: PostMenuItemRequest = {
    item
  };
  const result: PostMenuItemResponse = await authFetch(
    "POST",
    "/barista/menu-items",
    request
  );
  return result.item;
}

export async function deleteItem(itemId: number): Promise<void> {
  await authFetch("DELETE", `/barista/menu-items/${itemId}`);
}
