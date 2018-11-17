import * as React from "react";

import { OrderedItem } from "coffee-types";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

export interface OrderListItemProps {
  className?: string;
  order: OrderedItem;
}

type Props = OrderListItemProps;
const OrderListItem: React.SFC<Props> = ({ className, order }) => (
  <Card className={className}>
    <CardContent>
      <Typography color="textSecondary">
        {order.orderCreatorUsername}
      </Typography>
      <Typography variant="h6">{order.itemName}</Typography>
      <pre>{JSON.stringify(order.options, null, 2)}</pre>
    </CardContent>
    <CardActions>
      <Button>Complete Order</Button>
    </CardActions>
  </Card>
);
export default OrderListItem;
