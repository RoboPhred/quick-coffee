import * as React from "react";

import Typography from "@material-ui/core/Typography";

import OrderingEnabledProvider from "@/services/backend/components/OrderingEnabledProvider";

import Authenticate from "@/components/Authenticate";
import AppPageContainer from "@/components/AppPageContainer";
import BaristaOrdersSource from "@/services/barista/components/BaristaOrdersSource";

const BaristaPage: React.SFC = () => (
  <Authenticate role="barista">
    <AppPageContainer title="Barista">
      <Typography variant="body1">
        Store is{" "}
        <OrderingEnabledProvider>
          {({ isOrderingEnabled }) => (isOrderingEnabled ? "Open" : "Closed")}
        </OrderingEnabledProvider>
      </Typography>
      <div>
        <BaristaOrdersSource>
          {({ orders }) => <pre>{JSON.stringify(orders, null, 2)}</pre>}
        </BaristaOrdersSource>
      </div>
    </AppPageContainer>
  </Authenticate>
);
export default BaristaPage;
