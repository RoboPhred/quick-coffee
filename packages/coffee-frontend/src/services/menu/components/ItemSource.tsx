import * as React from "react";

import { InventoryItem } from "coffee-types";

import { getItem } from "../api";

export interface ItemSourceRenderProps {
  isLoading: boolean;
  errorMessage: string | null;
  item: InventoryItem | null;
}

export interface ItemSourceProps {
  itemId: string;
  children(props: ItemSourceRenderProps): React.ReactNode;
}

type Props = ItemSourceProps;
type State = ItemSourceRenderProps;
export default class ItemSource extends React.Component<Props, State> {
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
    return this.props.children({ errorMessage, item, isLoading });
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
    } catch (e) {
      if (this._unmounted) {
        return;
      }

      this.setState({
        isLoading: false,
        item: null,
        errorMessage: e.message
      });
    }
  }
}
