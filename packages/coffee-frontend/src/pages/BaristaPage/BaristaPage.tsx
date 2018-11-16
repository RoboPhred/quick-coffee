import * as React from "react";

import Typography from "@material-ui/core/Typography";

import OrderingEnabledProvider from "@/services/backend/components/OrderingEnabledProvider";

import Authenticate from "@/components/Authenticate";
import AppPageContainer from "@/components/AppPageContainer";

const BaristaPage: React.SFC = () => (
  <Authenticate role="barista">
    <AppPageContainer title="Barista">
      <Typography variant="body1">
        Store is{" "}
        <OrderingEnabledProvider>
          {({ isOrderingEnabled }) => (isOrderingEnabled ? "Open" : "Closed")}
        </OrderingEnabledProvider>
      </Typography>
    </AppPageContainer>
  </Authenticate>
);
export default BaristaPage;
