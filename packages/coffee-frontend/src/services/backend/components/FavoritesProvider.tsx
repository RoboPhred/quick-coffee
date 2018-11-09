import * as React from "react";

import { FavoriteItem } from "coffee-types";
import { getFavorites } from "../api";

export interface FavoritesProviderRenderProps {
  isLoading: boolean;
  errorMessage: string | null;
  favorites: FavoriteItem[] | null;
}

export interface FavoritesProviderProps {
  children(props: FavoritesProviderRenderProps): React.ReactChild;
}

type Props = FavoritesProviderProps;
type State = FavoritesProviderRenderProps;
export default class FavoritesProvider extends React.Component<Props, State> {
  private _unmounted: boolean = false;

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      errorMessage: null,
      favorites: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    this._unmounted = true;
  }

  render() {
    const { errorMessage, favorites, isLoading } = this.state;
    const { children } = this.props;
    return React.Children.only(
      children({ errorMessage, favorites, isLoading })
    );
  }

  async fetchData() {
    this.setState({ isLoading: true });

    try {
      const result = await getFavorites();

      if (this._unmounted) {
        return;
      }

      this.setState({
        isLoading: false,
        favorites: result
      });
    } catch {
      if (this._unmounted) {
        return;
      }

      this.setState({
        isLoading: false,
        favorites: null,
        errorMessage: "An error occurred"
      });
    }
  }
}
