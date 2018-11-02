import * as React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";

import InventoryProvider from "@/services/inventory/components/InventoryProvider";

import AppPageContainer from "@/components/AppPageContainer";

import MenuItem from "./components/MenuItem";

const Menu: React.SFC = () => (
  <InventoryProvider>
    {({ isLoading, error, items }) => (
      <AppPageContainer title="Menu">
        {isLoading && <CircularProgress />}
        {error && error.message}
        {items && (
          <List>
            {items.map(item => (
              <MenuItem item={item} />
            ))}
          </List>
        )}
      </AppPageContainer>
    )}
  </InventoryProvider>
);
export default Menu;
