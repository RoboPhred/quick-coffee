import * as React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import FavoritesSource from "@/services/favorites/components/FavoritesSource";

import Authenticate from "@/components/Authenticate";
import AppPageContainer from "@/components/AppPageContainer";
import LoadingPageContent from "@/components/LoadingPageContent";
import ErrorDisplay from "@/components/ErrorDisplay";

const FavoritesPage: React.SFC = () => (
  <Authenticate>
    <FavoritesSource>
      {({ isLoading, favorites, errorMessage }) => (
        <AppPageContainer title="Favorites" navigation>
          {isLoading && <LoadingPageContent />}
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
