import * as React from "react";

import { createStyles, withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import OrderingEnabledProvider from "@/services/backend/components/OrderingEnabledProvider";

import Authenticate from "@/components/Authenticate";
import AppPageContainer from "@/components/SubPageContainer";

import OrdersList from "./components/OrdersList";

const styles = createStyles({
  root: {
    width: "100%",
    height: "100%"
  }
});

type Props = StyleProps<typeof styles>;
const BaristaPage: React.SFC<Props> = ({ classes }) => (
  <Authenticate role="barista">
    <AppPageContainer title="Barista">
      <OrdersList className={classes.root} />
    </AppPageContainer>
  </Authenticate>
);
export default withStyles(styles)(BaristaPage);
