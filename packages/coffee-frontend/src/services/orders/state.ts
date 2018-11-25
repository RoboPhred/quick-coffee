import { OrderedItem } from "coffee-types";

export interface OrdersServiceState {
  isLoading: boolean;
  errorMessage: string | null;
  orders: OrderedItem[] | null;
}

export const defaultOrdersServiceState: OrdersServiceState = Object.freeze({
  isLoading: false,
  errorMessage: null,
  orders: null
});
