import * as React from "react";

import { OrderedItem, InventoryItem } from "coffee-types";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

import ItemSource from "@/services/menu/components/ItemSource";

export interface OrderListItemProps {
  className?: string;
  order: OrderedItem;
}

type Props = OrderListItemProps;
const OrderListItem: React.SFC<Props> = ({ className, order }) => (
  <ItemSource itemId={order.itemId}>
    {({ item }) => (
      <Card className={className}>
        <CardContent>
          <Typography color="textSecondary">
            {order.orderCreatorUsername}
          </Typography>
          <Typography variant="h6">{order.itemName}</Typography>
          <table>
            <tbody>
              {orderOptionKeys(order).map(optionId => (
                <tr key={optionId}>
                  <td>
                    <Typography variant="body1">
                      {itemOptionName(item, optionId)}
                    </Typography>
                  </td>
                  <td>
                    <Typography variant="body2">
                      {itemOptionValue(order.options[optionId])}
                    </Typography>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
        <CardActions>
          <Button>Complete Order</Button>
        </CardActions>
      </Card>
    )}
  </ItemSource>
);
export default OrderListItem;

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
