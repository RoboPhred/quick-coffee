import * as React from "react";

import List from "@material-ui/core/List";

import Authenticate from "@/services/auth/components/Authenticate";
import OrdersSource from "@/services/orders/components/OrdersSource";

import AppPageContainer from "@/components/AppPageContainer";
import LoadingPageContent from "@/components/LoadingPageContent";

import OrderListItem from "./components/OrderListItem";

const OrdersPage: React.SFC = () => (
  <Authenticate>
    <OrdersSource>
      {({ isLoading, orders }) => (
        <AppPageContainer title="Orders" navigation>
          {isLoading && <LoadingPageContent />}
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
  </Authenticate>
);
export default OrdersPage;
