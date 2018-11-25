import * as React from "react";
import { connect } from "react-redux";

import { FavoriteItem } from "coffee-types";

import { AppState } from "@/state";

import { refreshFavorites } from "../actions/refresh-favorites";

export interface FavoritesSourceRenderProps {
  isLoading: boolean;
  errorMessage: string | null;
  favorites: FavoriteItem[] | null;
}

export interface FavoritesSourceProps {
  children(props: FavoritesSourceRenderProps): React.ReactNode;
}

const mapStateToProps = (state: AppState) => ({
  isLoading: state.services.favorites.isLoading,
  errorMessage: state.services.favorites.errorMessage,
  favorites: state.services.favorites.favorites
});
type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
  refreshFavorites
};
type DispatchProps = typeof mapDispatchToProps;

type Props = FavoritesSourceProps & StateProps & DispatchProps;
class FavoritesSource extends React.Component<Props> {
  componentDidMount() {
    const { refreshFavorites } = this.props;
    refreshFavorites();
  }

  render() {
    const { errorMessage, favorites, isLoading, children } = this.props;
    return children({ errorMessage, favorites, isLoading });
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritesSource);
