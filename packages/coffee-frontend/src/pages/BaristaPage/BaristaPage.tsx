import * as React from "react";

import Authenticate from "@/components/Authenticate";

import Routes from "./routes";

const BaristaPage: React.SFC = () => (
  <Authenticate role="barista">
    <Routes />
  </Authenticate>
);
export default BaristaPage;
