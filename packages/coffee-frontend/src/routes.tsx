import * as React from "react";

import { Route, Switch } from "react-router-dom";

import Menu from "./pages/Menu";
import PageNotFound from "./pages/PageNotFound";

const Routes: React.SFC = () => (
  <Switch>
    <Route path="/" exact component={Menu} />

    {/* 
    Keep this component last.  It is a catch-all and displays
    the 404 page
    */}
    <Route component={PageNotFound} />
  </Switch>
);
export default Routes;
