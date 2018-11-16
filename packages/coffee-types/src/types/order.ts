export interface OrderedItem {
  id: string;
  itemId: string;
  itemName: string;
  orderedDate: string;
  status: "pending" | "in-progress" | "ready";
  statusChangeDate: string;
}
