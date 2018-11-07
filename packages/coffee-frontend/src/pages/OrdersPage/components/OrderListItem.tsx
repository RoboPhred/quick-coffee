import * as React from "react";
import { OrderedItem } from "coffee-types";

import moment from "moment";

import { createStyles, withStyles } from "@material-ui/core/styles";

import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

export interface OrderItemOverviewProps {
  item: OrderedItem;
}

const styles = createStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  right: {
    alignSelf: "center"
  }
});

type Props = OrderItemOverviewProps & StyleProps<typeof styles>;
const OrderListItem: React.SFC<Props> = ({ classes, item }) => {
  const date = moment(item.dateOrdered);
  return (
    <ListItem className={classes.root}>
      <div>
        <Typography variant="h6">{item.itemName}</Typography>
        <Typography variant="caption">
          {date.format("MMM Do YYYY, h:mm a")}
        </Typography>
      </div>
      <div className={classes.right}>{item.status}</div>
    </ListItem>
  );
};
export default withStyles(styles)(OrderListItem);
