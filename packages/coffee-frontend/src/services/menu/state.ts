import { InventoryItem } from "coffee-types";

export interface MenuState {
  isLoading: boolean;
  errorMessage: string | null;
  items: InventoryItem[] | null;
}
export const defaultMenuState: MenuState = Object.freeze({
  isLoading: false,
  errorMessage: null,
  items: null
});
