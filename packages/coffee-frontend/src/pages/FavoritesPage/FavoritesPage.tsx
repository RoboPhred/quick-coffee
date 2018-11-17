import * as React from "react";

import { FavoriteItem } from "coffee-types";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import FavoritesSource from "@/services/favorites/components/FavoritesSource";

import Authenticate from "@/components/Authenticate";
import AppPageContainer from "@/components/AppPageContainer";
import LoadingPageContent from "@/components/LoadingPageContent";
import ErrorDisplay from "@/components/ErrorDisplay";

export default class FavoritesPage extends React.Component {
  render() {
    return (
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
                        onClick={this._orderItem.bind(this, favorite)}
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
  }

  private _orderItem(item: FavoriteItem) {
    // TODO: Navigate to order page and prepopulate with favorite data.
  }
}
