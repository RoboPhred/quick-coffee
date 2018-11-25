import { InventoryItem } from "coffee-types";

import { apiFetch } from "@/services/backend/api";

export async function getItems(): Promise<InventoryItem[]> {
  const result = await apiFetch("GET", "/items");
  return result;
}

export async function getItem(itemId: number): Promise<InventoryItem> {
  const result = await apiFetch("GET", `/items/${itemId}`);
  return result;
}
