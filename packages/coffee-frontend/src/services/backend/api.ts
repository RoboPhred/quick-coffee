import { InventoryItem, ListInventoryItem } from "coffee-types";

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
    })
  };
  const response = await fetch(`${process.env.COFFEE_ENDPOINT}${path}`, init);
  if (response.status !== 200) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  try {
    return await response.json();
  } catch {
    throw new Error("Invalid response body.");
  }
}
