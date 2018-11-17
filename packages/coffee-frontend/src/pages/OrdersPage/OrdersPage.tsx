import * as React from "react";

import List from "@material-ui/core/List";

import OrdersSource from "@/services/orders/components/OrdersSource";

import Authenticate from "@/components/Authenticate";
import RootPageContainer from "@/components/RootPageContainer";
import LoadingPageContent from "@/components/LoadingPageContent";

import OrderListItem from "./components/OrderListItem";

const OrdersPage: React.SFC = () => (
  <Authenticate>
    <OrdersSource>
      {({ isLoading, orders }) => (
        <RootPageContainer title="Orders">
          {isLoading && <LoadingPageContent />}
          {orders && (
            <List>
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
export default OrdersPage;
