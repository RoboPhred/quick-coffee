import * as React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import CircularProgress from "@material-ui/core/CircularProgress";

import FavoritesProvider from "@/services/backend/components/FavoritesProvider";

import AppPageContainer from "@/components/AppPageContainer";
import ErrorDisplay from "@/components/ErrorDisplay";

const FavoritesPage: React.SFC = () => (
  <FavoritesProvider>
    {({ isLoading, favorites, errorMessage }) => (
      <AppPageContainer title="Favorites">
        {isLoading && <CircularProgress />}
        {errorMessage && <ErrorDisplay errorMessage={errorMessage} />}
        {favorites && (
          <List>
            {favorites.map(favorite => (
              <ListItem key={favorite.id}>
                <ListItemText
                  primary={favorite.favoriteName}
                  secondary={favorite.itemName}
                />
              </ListItem>
            ))}
          </List>
        )}
      </AppPageContainer>
    )}
  </FavoritesProvider>
);
export default FavoritesPage;
