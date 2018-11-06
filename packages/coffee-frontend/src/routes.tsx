import * as React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import OrderingEnabledProvider from "@/services/backend/components/OrderingEnabledProvider";

import AppLoadingPage from "./pages/AppLoadingPage";
import MenuPage from "./pages/MenuPage";
import PageNotFound from "./pages/PageNotFound";
import OrderingDisabledPage from "./pages/OrderingDisabledPage";
import OrderFormPage from "./pages/OrderFormPage";
import OrdersPage from "./pages/OrdersPage";

const Routes: React.SFC = () => (
  <OrderingEnabledProvider>
    {({ isOrderingEnabled }) => {
      if (isOrderingEnabled === null) {
        return <AppLoadingPage />;
      }
      if (isOrderingEnabled === false) {
        return <OrderingDisabledPage />;
      }

      return (
        <Switch>
          <Redirect path="/" exact to="/menu" />
          <Route path="/menu" exact component={MenuPage} />
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
