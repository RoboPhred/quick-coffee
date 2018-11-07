import * as React from "react";

import OrdersProvider from "@/services/backend/components/OrdersProvider";

import CircularProgress from "@material-ui/core/CircularProgress";

import List from "@material-ui/core/List";

import AppPageContainer from "@/components/AppPageContainer";

import OrderListItem from "./components/OrderListItem";

const OrdersPage: React.SFC = () => (
  <OrdersProvider>
    {({ isLoading, orders }) => (
      <AppPageContainer title="Orders">
        {isLoading && <CircularProgress />}
        {orders && (
          <List>
            {orders.map(order => (
              <OrderListItem key={order.id} item={order} />
            ))}
          </List>
        )}
      </AppPageContainer>
    )}
  </OrdersProvider>
);
export default OrdersPage;
