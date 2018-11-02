import * as React from "react";

import { InventoryItem } from "../types";
import { getInventory } from "../api";

export interface InventoryProviderRenderProps {
  isLoading: boolean;
  error: Error | null;
  items: InventoryItem[] | null;
}

export interface InventoryProviderProps {
  children(props: InventoryProviderRenderProps): React.ReactChild;
}

type Props = InventoryProviderProps;
type State = InventoryProviderRenderProps;
export default class InventoryProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      error: null,
      items: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { error, items, isLoading } = this.state;
    const { children } = this.props;
    return React.Children.only(children({ error, items, isLoading }));
  }

  async fetchData() {
    this.setState({ isLoading: true });

    try {
      const items = await getInventory();
      this.setState({
        isLoading: false,
        error: null,
        items
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        error,
        items: null
      });
    }
  }
}
