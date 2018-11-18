import * as React from "react";

import { OrderedItem } from "coffee-types";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";

import BaristaOrdersSource from "@/services/barista/components/BaristaOrdersSource";

import PageContainer from "@/components/PageContainer";
import LoadingPageContent from "@/components/LoadingPageContent";

import OrderListItem from "@/components/OrderListItem";

const styles = (theme: Theme) =>
  createStyles({
    list: {
      width: "100%",
      height: "100%",
      overflow: "auto"
    },
    listItem: {
      margin: theme.spacing.unit
    }
  });
type Props = StyleProps<ReturnType<typeof styles>>;
const PendingOrdersPage: React.SFC<Props> = ({ classes }) => (
  <BaristaOrdersSource>
    {({ isLoading, orders }) => (
      <PageContainer title="Deliveries" variant="barista">
        {isLoading && <LoadingPageContent />}
        {orders && (
          <List className={classes.list}>
            {orders.filter(isPendingDelivery).map(order => (
              <OrderListItem
                className={classes.listItem}
                order={order}
                key={order.id}
              />
            ))}
          </List>
        )}
      </PageContainer>
    )}
  </BaristaOrdersSource>
);
export default withStyles(styles)(PendingOrdersPage);

function isPendingDelivery(order: OrderedItem): boolean {
  return order.status === "waiting-delivery";
}
