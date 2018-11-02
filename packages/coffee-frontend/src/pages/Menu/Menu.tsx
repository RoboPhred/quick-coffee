import * as React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";

import InventoryProvider from "@/services/inventory/components/InventoryProvider";

import AppPageContainer from "@/components/AppPageContainer";

import MenuItem from "./components/MenuItem";

const Menu: React.SFC = () => (
  <AppPageContainer title="Menu">
    <InventoryProvider>
      {({ isLoading, error, items }) => (
        <React.Fragment>
          {isLoading && <CircularProgress />}
          {error && error.message}
          {items && (
            <List>
              {items.map(item => (
                <MenuItem item={item} />
              ))}
            </List>
          )}
        </React.Fragment>
      )}
    </InventoryProvider>
  </AppPageContainer>
);
export default Menu;
