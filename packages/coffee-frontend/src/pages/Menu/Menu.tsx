import * as React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";

import ItemListProvider from "@/services/backend/components/ItemListProvider";

import AppPageContainer from "@/components/AppPageContainer";

import MenuItem from "./components/MenuItem";

const Menu: React.SFC = () => (
  <ItemListProvider>
    {({ isLoading, errorMessage, items }) => (
      <AppPageContainer title="Menu">
        {isLoading && <CircularProgress />}
        {errorMessage}
        {items && (
          <List>
            {items.map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
          </List>
        )}
      </AppPageContainer>
    )}
  </ItemListProvider>
);
export default Menu;
