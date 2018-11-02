import * as React from "react";

import { isOrderingEnabled } from "../api";

export interface OrderingEnabledProviderRenderProps {
  isLoading: boolean;
  isOrderingEnabled: boolean | null;
}

export interface OrderingEnabledProviderProps {
  children(props: OrderingEnabledProviderRenderProps): React.ReactChild;
}

type Props = OrderingEnabledProviderProps;
type State = OrderingEnabledProviderRenderProps;
export default class OrderingEnabledProvider extends React.Component<
  Props,
  State
> {
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
