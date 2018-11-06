import * as React from "react";

import { InventoryItem } from "coffee-types";
import { getItem } from "../api";

export interface ItemProviderRenderProps {
  isLoading: boolean;
  errorMessage: string | null;
  item: InventoryItem | null;
}

export interface ItemProviderProps {
  itemId: string;
  children(props: ItemProviderRenderProps): React.ReactChild;
}

type Props = ItemProviderProps;
type State = ItemProviderRenderProps;
export default class ItemListProvider extends React.Component<Props, State> {
  private _unmounted: boolean = false;

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      errorMessage: null,
      item: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(oldProps: Props) {
    if (oldProps.itemId !== this.props.itemId) {
      this.setState({
        item: null
      });
      this.fetchData();
    }
  }

  componentWillUnmount() {
    this._unmounted = true;
  }

  render() {
    const { errorMessage, item, isLoading } = this.state;
    const { children } = this.props;
    return React.Children.only(children({ errorMessage, item, isLoading }));
  }

  async fetchData() {
    this.setState({ isLoading: true });

    try {
      const result = await getItem(this.props.itemId);

      if (this._unmounted) {
        return;
      }

      this.setState({
        isLoading: false,
        item: result,
        errorMessage: null
      });
    } catch {
      if (this._unmounted) {
        return;
      }

      this.setState({
        isLoading: false,
        item: null,
        errorMessage: "An error occurred"
      });
    }
  }
}
