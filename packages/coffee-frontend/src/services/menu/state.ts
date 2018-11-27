import { InventoryItem } from "coffee-types";

export interface MenuState {
  isLoading: boolean;
  errorMessage: string | null;
  itemsById: Record<number, InventoryItem> | null;
  itemIds: number[] | null;
}
export const defaultMenuState: MenuState = Object.freeze({
  isLoading: false,
  errorMessage: null,
  itemsById: null,
  itemIds: null
});
