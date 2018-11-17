import * as React from "react";

import List from "@material-ui/core/List";

import ItemListSource from "@/services/menu/components/ItemListSource";

import AppPageContainer from "@/components/AppPageContainer";
import LoadingPageContent from "@/components/LoadingPageContent";
import ErrorDisplay from "@/components/ErrorDisplay";

import MenuItem from "./components/MenuItem";

const MenuPage: React.SFC = () => (
  <ItemListSource>
    {({ isLoading, errorMessage, items }) => (
      <AppPageContainer title="Menu" navigation>
        {isLoading && <LoadingPageContent />}
        {errorMessage && <ErrorDisplay errorMessage={errorMessage} />}
        {items && (
          <List>
            {items.map(item => (
              <MenuItem key={item.id} item={item} />
            ))}
          </List>
        )}
      </AppPageContainer>
    )}
  </ItemListSource>
);
export default MenuPage;
