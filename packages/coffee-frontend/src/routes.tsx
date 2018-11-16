import * as React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import PageNotFound from "./pages/PageNotFound";
import OrderFormPage from "./pages/OrderFormPage";
import OrdersPage from "./pages/OrdersPage";
import FavoritesPage from "./pages/FavoritesPage";

const Routes: React.SFC = () => (
  <Switch>
    <Redirect path="/" exact to="/menu" />
    <Route path="/login" exact component={LoginPage} />
    <Route path="/menu" exact component={MenuPage} />
    <Route path="/orders" exact component={OrdersPage} />
    <Route path="/favorites" exact component={FavoritesPage} />
    <Route path="/order-item/:item" exact component={OrderFormPage} />
    {/* Keep this component last.  It is a catch-all that displays the 404 page. */}
    <Route component={PageNotFound} />
  </Switch>
);
export default Routes;
