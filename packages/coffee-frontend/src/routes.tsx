import * as React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import OrderingEnabledProvider from "@/services/backend/components/OrderingEnabledProvider";

import AppLoading from "./pages/AppLoading";
import Menu from "./pages/Menu";
import PageNotFound from "./pages/PageNotFound";
import OrderingDisabled from "./pages/OrderingDisabled";
import OrderFormPage from "./pages/OrderFormPage";
import OrdersPage from "./pages/OrdersPage";

const Routes: React.SFC = () => (
  <OrderingEnabledProvider>
    {({ isOrderingEnabled }) => {
      if (isOrderingEnabled === null) {
        return <AppLoading />;
      }
      if (isOrderingEnabled === false) {
        return <OrderingDisabled />;
      }

      return (
        <Switch>
          <Redirect path="/" exact to="/menu" />
          <Route path="/menu" exact component={Menu} />
          <Route path="/order-item/:item" exact component={OrderFormPage} />
          <Route path="/orders" exact component={OrdersPage} />
          {/* Keep this component last.  It is a catch-all that displays the 404 page. */}
          <Route component={PageNotFound} />
        </Switch>
      );
    }}
  </OrderingEnabledProvider>
);
export default Routes;
