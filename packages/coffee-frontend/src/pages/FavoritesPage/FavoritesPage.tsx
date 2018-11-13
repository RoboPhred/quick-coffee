import * as React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import CircularProgress from "@material-ui/core/CircularProgress";

import FavoritesSource from "@/services/favorites/components/FavoritesSource";

import AppPageContainer from "@/components/AppPageContainer";
import ErrorDisplay from "@/components/ErrorDisplay";

const FavoritesPage: React.SFC = () => (
  <FavoritesSource>
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
  </FavoritesSource>
);
export default FavoritesPage;
