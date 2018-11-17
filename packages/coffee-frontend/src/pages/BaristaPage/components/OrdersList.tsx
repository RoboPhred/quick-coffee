import * as React from "react";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";

import BaristaOrdersSource from "@/services/barista/components/BaristaOrdersSource";

import LoadingPageContent from "@/components/LoadingPageContent";

import OrderListItem from "./OrderListItem";

export interface OrdersListProps {
  className?: string;
}

const styles = (theme: Theme) =>
  createStyles({
    list: {
      overflow: "auto",
      width: "100%",
      height: "100%"
    },
    listItem: {
      margin: theme.spacing.unit
    }
  });
type Props = OrdersListProps & StyleProps<ReturnType<typeof styles>>;
const OrdersList: React.SFC<Props> = ({ className, classes }) => (
  <BaristaOrdersSource>
    {({ isLoading, orders }) => (
      <div className={className}>
        {isLoading && <LoadingPageContent />}
        {orders && (
          <List className={classes.list}>
            {orders.map(order => (
              <OrderListItem
                className={classes.listItem}
                order={order}
                key={order.id}
              />
            ))}
          </List>
        )}
      </div>
    )}
  </BaristaOrdersSource>
);
export default withStyles(styles)(OrdersList);
