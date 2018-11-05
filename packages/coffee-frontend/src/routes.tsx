import * as React from "react";

import { Route, Switch } from "react-router-dom";

import OrderingEnabledProvider from "@/services/backend/components/OrderingEnabledProvider";

import AppLoading from "./pages/AppLoading";
import Menu from "./pages/Menu";
import PageNotFound from "./pages/PageNotFound";
import OrderingDisabled from "./pages/OrderingDisabled";
import OrderFormPage from "./pages/OrderFormPage";

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
          <Route path="/" exact component={Menu} />
          <Route path="/order-item/:item" exact component={OrderFormPage} />
          {/* Keep this component last.  It is a catch-all that displays the 404 page. */}
          <Route component={PageNotFound} />
        </Switch>
      );
    }}
  </OrderingEnabledProvider>
);
export default Routes;
