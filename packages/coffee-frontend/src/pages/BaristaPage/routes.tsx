import * as React from "react";

import { Switch, Route, Redirect } from "react-router";

import PageNotFound from "@/pages/PageNotFound";

import EditMenuPage from "./pages/EditMenuPage";
import PendingOrdersPage from "./pages/PendingOrdersPage";
import PendingDeliveriesPage from "./pages/PendingDeliveriesPage";

const Router: React.SFC = () => (
  <Switch>
    <Redirect from="/barista" exact to="/barista/orders" />
    <Route path="/barista/edit-menu" exact component={EditMenuPage} />
    <Route path="/barista/orders" exact component={PendingOrdersPage} />
    <Route path="/barista/deliveries" exact component={PendingDeliveriesPage} />
    <Route component={PageNotFound} />
  </Switch>
);
export default Router;
