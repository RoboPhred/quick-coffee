import * as React from "react";

import { FavoriteItem } from "coffee-types";

import { Theme, createStyles, withStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";

import FavoritesSource from "@/services/favorites/components/FavoritesSource";

import Authenticate from "@/components/Authenticate";
import PageContainer from "@/components/PageContainer";
import LoadingPageContent from "@/components/LoadingPageContent";
import ErrorDisplay from "@/components/ErrorDisplay";

import FavoriteCard from "./components/FavoriteCard";

const styles = (theme: Theme) =>
  createStyles({
    list: {
      width: "100%",
      height: "100%",
      overflow: "auto"
    },
    listItem: {
      margin: theme.spacing.unit
    }
  });
type Props = StyleProps<ReturnType<typeof styles>>;
class FavoritesPage extends React.Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <Authenticate>
        <FavoritesSource>
          {({ isLoading, favorites, errorMessage }) => (
            <PageContainer title="Favorites" variant="app">
              {isLoading && <LoadingPageContent />}
              {errorMessage && <ErrorDisplay errorMessage={errorMessage} />}
              {favorites && (
                <List className={classes.list}>
                  {favorites.map(favorite => (
                    <FavoriteCard
                      key={favorite.id}
                      className={classes.listItem}
                      favorite={favorite}
                    />
                  ))}
                </List>
              )}
            </PageContainer>
          )}
        </FavoritesSource>
      </Authenticate>
    );
  }
}
export default withStyles(styles)(FavoritesPage);
