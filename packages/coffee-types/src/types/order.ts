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

export type OrderStatus =
  | "pending"
  | "in-progress"
  | "waiting-delivery"
  | "delivered";

export type OrderOptions = Record<string, string | number | boolean>;
