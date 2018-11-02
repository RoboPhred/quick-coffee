import * as React from "react";

import { isOrderingEnabled } from "../api";

export interface InventoryProviderRenderProps {
  isLoading: boolean;
  isOrderingEnabled: boolean | null;
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
      isOrderingEnabled: null
    };
  }

  componentDidMount() {
    // TODO: Update on a timer.
    this.fetchData();
  }

  render() {
    const { isOrderingEnabled, isLoading } = this.state;
    const { children } = this.props;
    return React.Children.only(children({ isOrderingEnabled, isLoading }));
  }

  async fetchData() {
    this.setState({ isLoading: true });

    try {
      const enabled = await isOrderingEnabled();
      this.setState({
        isLoading: false,
        isOrderingEnabled: enabled
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        isOrderingEnabled: null
      });
    }
  }
}
