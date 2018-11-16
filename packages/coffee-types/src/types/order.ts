export interface OrderedItem {
  id: string;
  itemId: string;
  itemName: string;
  orderDate: string;
  status: "pending" | "in-progress" | "ready";
  statusChangeDate: string;
}
