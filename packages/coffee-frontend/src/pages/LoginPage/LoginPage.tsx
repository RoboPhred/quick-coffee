import * as React from "react";

import { Redirect } from "react-router";

import Authenticate from "@/components/Authenticate";

const LoginPage: React.SFC = () => (
  <Authenticate>
    <Redirect to="/" />
  </Authenticate>
);
export default LoginPage;
