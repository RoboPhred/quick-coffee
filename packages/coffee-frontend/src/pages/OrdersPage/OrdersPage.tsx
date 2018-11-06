import * as React from "react";

import OrdersProvider from "@/services/backend/components/OrdersProvider";

import CircularProgress from "@material-ui/core/CircularProgress";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import AppPageContainer from "@/components/AppPageContainer";

const OrdersPage: React.SFC = () => (
  <OrdersProvider>
    {({ isLoading, orders }) => (
      <AppPageContainer title="Orders">
        {isLoading && <CircularProgress />}
        {orders && (
          <List>
            {orders.map(order => (
              <ListItem key={order.id}>
                <ListItemText>{order.itemName}</ListItemText>
              </ListItem>
            ))}
          </List>
        )}
      </AppPageContainer>
    )}
  </OrdersProvider>
);
export default OrdersPage;
