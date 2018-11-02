import * as React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const AppLoading: React.SFC = () => (
  <div>
    <Typography variant="h6">Loading</Typography>
    <CircularProgress />
  </div>
);
export default AppLoading;
