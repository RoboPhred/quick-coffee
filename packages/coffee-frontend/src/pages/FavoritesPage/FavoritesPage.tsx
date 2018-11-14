import * as React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import CircularProgress from "@material-ui/core/CircularProgress";

import Authenticate from "@/services/auth/components/Authenticate";
import FavoritesSource from "@/services/favorites/components/FavoritesSource";

import AppPageContainer from "@/components/AppPageContainer";
import ErrorDisplay from "@/components/ErrorDisplay";

const FavoritesPage: React.SFC = () => (
  <Authenticate>
    <FavoritesSource>
      {({ isLoading, favorites, errorMessage }) => (
        <AppPageContainer title="Favorites" navigation>
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
  </Authenticate>
);
export default FavoritesPage;
