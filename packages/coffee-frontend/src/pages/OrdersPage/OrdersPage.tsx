import * as React from "react";

import { createStyles, withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";

import OrdersSource from "@/services/orders/components/OrdersSource";

import Authenticate from "@/components/Authenticate";
import RootPageContainer from "@/components/RootPageContainer";
import LoadingPageContent from "@/components/LoadingPageContent";

import OrderListItem from "./components/OrderListItem";

const styles = createStyles({
  ordersList: {
    width: "100%",
    height: "100%",
    overflow: "auto"
  }
});

type Props = StyleProps<typeof styles>;
const OrdersPage: React.SFC<Props> = ({ classes }) => (
  <Authenticate>
    <OrdersSource>
      {({ isLoading, orders }) => (
        <RootPageContainer title="Orders">
          {isLoading && <LoadingPageContent />}
          {orders && (
            <List className={classes.ordersList}>
              {orders.map(order => (
                <OrderListItem key={order.id} item={order} />
              ))}
            </List>
          )}
        </RootPageContainer>
      )}
    </OrdersSource>
  </Authenticate>
);
export default withStyles(styles)(OrdersPage);
