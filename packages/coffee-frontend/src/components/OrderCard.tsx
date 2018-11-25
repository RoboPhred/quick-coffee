import * as React from "react";

import { OrderedItem, InventoryItem } from "coffee-types";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

import ItemOrderOptions from "@/components/ItemOrderOptions";

export interface OrderListItemProps {
  className?: string;
  order: OrderedItem;
  actions?: React.ReactNode;
}

type Props = OrderListItemProps;
const OrderCard: React.SFC<Props> = ({ className, actions, order }) => (
  <Card className={className}>
    <CardContent>
      <Typography color="textSecondary">
        {order.orderCreatorUsername}
      </Typography>
      <Typography variant="h6">{order.itemName}</Typography>
      {order.options && (
        <ItemOrderOptions itemId={order.itemId} options={order.options} />
      )}
    </CardContent>
    {actions && <CardActions>{actions}</CardActions>}
  </Card>
);
export default OrderCard;

function isNullOrEmpty(x: any): boolean {
  return x == null || x === "";
}

function orderOptionKeys(order: OrderedItem): string[] {
  return Object.keys(order.options).filter(
    optionId => !isNullOrEmpty(order.options[optionId])
  );
}

function itemOptionName(item: InventoryItem | null, optionKey: string) {
  if (item == null || item.options == null) {
    return optionKey;
  }
  for (const option of item.options) {
    if (option.id === optionKey) {
      return option.name;
    }
  }
  return optionKey;
}

function itemOptionValue(value: any) {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  return value;
}
