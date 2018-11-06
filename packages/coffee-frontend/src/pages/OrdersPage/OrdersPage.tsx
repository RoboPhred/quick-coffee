import * as React from "react";

import OrdersProvider from "@/services/backend/components/OrdersProvider";

import CircularProgress from "@material-ui/core/CircularProgress";

import AppPageContainer from "@/components/AppPageContainer";

const OrdersPage: React.SFC = () => (
  <OrdersProvider>
    {({ isLoading, orders }) => (
      <AppPageContainer title="Orders">
        {isLoading && <CircularProgress />}
        {orders && JSON.stringify(orders, null, 2)}
      </AppPageContainer>
    )}
  </OrdersProvider>
);
export default OrdersPage;
