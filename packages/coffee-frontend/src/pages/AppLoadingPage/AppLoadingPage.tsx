import * as React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import AppPageContainer from "@/components/AppPageContainer";

const AppLoading: React.SFC = () => (
  <AppPageContainer>
    <Typography variant="h6">Loading</Typography>
    <CircularProgress />
  </AppPageContainer>
);
export default AppLoading;
