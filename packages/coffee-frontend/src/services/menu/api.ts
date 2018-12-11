import {
  InventoryItem,
  PostMenuItemRequest,
  InventoryItemRequest,
  PostMenuItemResponse,
  PatchMenuItemRequest,
  PatchMenuItemResponse
} from "coffee-types";

import { pick } from "lodash-es";

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

export async function updateItem(item: InventoryItem): Promise<InventoryItem> {
  const request: PatchMenuItemRequest = {
    item: pick(item, ["name", "description", "options"])
  };
  const response: PatchMenuItemResponse = await authFetch(
    "PATCH",
    `/barista/menu-items/${item.id}`,
    request
  );
  return response.item;
}

export async function deleteItem(itemId: number): Promise<void> {
  await authFetch("DELETE", `/barista/menu-items/${itemId}`);
}
