export interface OrderedItem {
  id: string;
  itemId: string;
  itemName: string;
  orderCreatorUsername: string;
  orderDate: string;
  status: OrderStatus;
  statusChangeDate: string;
  options: Record<string, number | string | boolean>;
}

export type OrderStatus =
  | "pending"
  | "in-progress"
  | "waiting-delivery"
  | "delivered";
