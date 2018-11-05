import * as React from "react";

import { Route, Switch } from "react-router-dom";

import OrderingEnabledProvider from "@/services/backend/components/OrderingEnabledProvider";

import AppLoading from "./pages/AppLoading";
import Menu from "./pages/Menu";
import PageNotFound from "./pages/PageNotFound";
import OrderingDisabled from "./pages/OrderingDisabled";
import OrderForm from "./pages/OrderForm";

const Routes: React.SFC = () => (
  <OrderingEnabledProvider>
    {({ isOrderingEnabled }) => (
      <Switch>
        {isOrderingEnabled === null && <Route component={AppLoading} />}
        {/* If ordering is disabled, force the user into an ordering disabled page. */}
        {isOrderingEnabled === false && <Route component={OrderingDisabled} />}
        <Route path="/" exact component={Menu} />Y
        <Route path="/order-item/:item" exact component={OrderForm} />
        {/* Keep this component last.  It is a catch-all that displays the 404 page. */}
        <Route component={PageNotFound} />
      </Switch>
    )}
  </OrderingEnabledProvider>
);
export default Routes;
