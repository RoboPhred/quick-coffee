import * as React from "react";

import { InventoryItem } from "coffee-types";
import { getItems } from "../api";

export interface ItemListSourceRenderProps {
  isLoading: boolean;
  errorMessage: string | null;
  items: InventoryItem[] | null;
}

export interface ItemListSourceProps {
  children(props: ItemListSourceRenderProps): React.ReactChild;
}

type Props = ItemListSourceProps;
type State = ItemListSourceRenderProps;
export default class ItemListSource extends React.Component<Props, State> {
  private _unmounted: boolean = false;

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      errorMessage: null,
      items: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    this._unmounted = true;
  }

  render() {
    const { errorMessage, items, isLoading } = this.state;
    const { children } = this.props;
    return React.Children.only(children({ errorMessage, items, isLoading }));
  }

  async fetchData() {
    this.setState({ isLoading: true });

    try {
      const result = await getItems();

      if (this._unmounted) {
        return;
      }

      this.setState({
        isLoading: false,
        items: result
      });
    } catch (e) {
      if (this._unmounted) {
        return;
      }

      this.setState({
        isLoading: false,
        items: null,
        errorMessage: e.message
      });
    }
  }
}
