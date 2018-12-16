import * as React from "react";

import { OrderedItem } from "coffee-types";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";

import BaristaOrdersSource from "@/services/barista/components/BaristaOrdersSource";

import Authenticate from "@/components/Authenticate";
import PageContainer from "@/components/PageContainer";
import LoadingPageContent from "@/components/LoadingPageContent";

import OrderCard from "@/components/OrderCard";

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
type Props = StyleProps<typeof styles>;
const CompletedOrdersPage: React.SFC<Props> = ({ classes }) => (
  <Authenticate role="barista">
    <BaristaOrdersSource>
      {({ isLoading, orders }) => (
        <PageContainer title="Completed Orders" variant="barista">
          {isLoading && <LoadingPageContent />}
          {orders && (
            <List className={classes.list}>
              {orders.filter(isCompletedOrder).map(order => (
                <OrderCard
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
  </Authenticate>
);
export default withStyles(styles)(CompletedOrdersPage);

function isCompletedOrder(order: OrderedItem): boolean {
  return order.status === "completed";
}
