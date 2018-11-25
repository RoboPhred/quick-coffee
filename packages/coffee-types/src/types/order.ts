export interface OrderedItem {
  id: number;
  itemId: number;
  itemName: string;
  orderCreatorUsername: string;
  orderDate: string;
  status: OrderStatus;
  statusChangeDate: string;
  options: OrderOptions;
}

export type OrderStatus = "pending" | "in-progress" | "completed";

export type OrderOptions = Record<string, string | number | boolean>;
