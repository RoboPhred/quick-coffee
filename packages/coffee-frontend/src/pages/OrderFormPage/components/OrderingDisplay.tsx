import * as React from "react";

import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const OrderingDisplay: React.SFC = ({}) => (
  <div>
    <Typography variant="h6">Placing Order</Typography>
    <CircularProgress />
  </div>
);
export default OrderingDisplay;
