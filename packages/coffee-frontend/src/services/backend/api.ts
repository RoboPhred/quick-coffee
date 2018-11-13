import { InventoryItem, ListInventoryItem } from "coffee-types";
import { authFetch } from "../auth/api";

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

export async function apiFetch(
  method: string,
  path: string,
  body?: any,
  headers?: Record<string, string>
): Promise<any> {
  if (path[0] !== "/") {
    path = "/" + path;
  }

  const init: RequestInit = {
    method,
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-cache",
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers
    })
  };

  const response = await fetch(`${process.env.COFFEE_ENDPOINT}${path}`, init);
  if (response.status < 200 || response.status > 299) {
    const error: ApiError = new Error(
      `${response.status}: ${response.statusText}`
    ) as any;
    error.code = response.status;
    throw error;
  }

  try {
    return await response.json();
  } catch {
    throw new Error("Invalid response body.");
  }
}

// Would usually extend Error here, but cannot rely on object.setPrototypeOf to work.
export interface ApiError {
  code: number;
  message: string;
}
