import * as React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

import List from "@material-ui/core/List";

import OrdersSource from "@/services/orders/components/OrdersSource";

import AppPageContainer from "@/components/AppPageContainer";

import OrderListItem from "./components/OrderListItem";

const OrdersPage: React.SFC = () => (
  <OrdersSource>
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
  </OrdersSource>
);
export default OrdersPage;
