export interface OrderedItem {
  id: string;
  itemId: string;
  itemName: string;
  orderCreatorUsername: string;
  orderDate: string;
  status: "pending" | "in-progress" | "ready";
  statusChangeDate: string;
  options: Record<string, number | string | boolean>;
}
