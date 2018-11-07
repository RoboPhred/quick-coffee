import * as React from "react";

import { OrderedItem } from "coffee-types";
import { getOrders } from "../api";

export interface OrdersProviderRenderProps {
  isLoading: boolean;
  errorMessage: string | null;
  orders: OrderedItem[] | null;
}

export interface OrdersProviderProps {
  children(props: OrdersProviderRenderProps): React.ReactChild;
}

type Props = OrdersProviderProps;
type State = OrdersProviderRenderProps;
export default class OrdersProvider extends React.Component<Props, State> {
  private _unmounted: boolean = false;

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      errorMessage: null,
      orders: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    this._unmounted = true;
  }

  render() {
    const { errorMessage, orders, isLoading } = this.state;
    const { children } = this.props;
    return React.Children.only(children({ errorMessage, orders, isLoading }));
  }

  async fetchData() {
    this.setState({ isLoading: true });

    try {
      const result = await getOrders();

      if (this._unmounted) {
        return;
      }

      this.setState({
        isLoading: false,
        orders: result
      });
    } catch {
      if (this._unmounted) {
        return;
      }

      this.setState({
        isLoading: false,
        orders: null,
        errorMessage: "An error occurred"
      });
    }
  }
}
