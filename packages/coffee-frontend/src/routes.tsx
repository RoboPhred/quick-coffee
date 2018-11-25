import * as React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import PageNotFound from "./pages/PageNotFound";
import OrderFormPage from "./pages/OrderFormPage";
import OrdersPage from "./pages/OrdersPage";
import FavoritesPage from "./pages/FavoritesPage";

import BaristaEditMenuPage from "./pages/BaristaEditMenuPage";
import BaristaPendingOrdersPage from "./pages/BaristaPendingOrdersPage";
import BaristaCompletedOrdersPage from "./pages/BaristaCompletedOrdersPage";

const Routes: React.SFC = () => (
  <Switch>
    <Redirect path="/" exact to="/menu" />
    <Route path="/login" exact component={LoginPage} />
    <Route path="/menu" exact component={MenuPage} />
    <Route path="/orders" exact component={OrdersPage} />
    <Route path="/favorites" exact component={FavoritesPage} />
    <Route path="/order-item/:item" exact component={OrderFormPage} />

    <Redirect from="/barista" exact to="/barista/orders" />
    <Route path="/barista/edit-menu" exact component={BaristaEditMenuPage} />
    <Route
      path="/barista/pending-orders"
      exact
      component={BaristaPendingOrdersPage}
    />
    <Route
      path="/barista/completed-orders"
      exact
      component={BaristaCompletedOrdersPage}
    />

    {/* Keep this component last.  It is a catch-all that displays the 404 page. */}
    <Route component={PageNotFound} />
  </Switch>
);
export default Routes;
