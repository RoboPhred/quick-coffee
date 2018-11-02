import * as React from "react";

import { Route, Switch } from "react-router-dom";

import Menu from "@/pages/Menu";

const Routes: React.SFC = () => (
  <Switch>
    <Route path="/" exact component={Menu} />
  </Switch>
);
export default Routes;
