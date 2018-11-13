import * as React from "react";

import { OrderedItem } from "coffee-types";
import { getOrders } from "../api";

export interface OrdersSourceRenderProps {
  isLoading: boolean;
  errorMessage: string | null;
  orders: OrderedItem[] | null;
}

export interface OrdersSourceProps {
  children(props: OrdersSourceRenderProps): React.ReactChild;
}

type Props = OrdersSourceProps;
type State = OrdersSourceRenderProps;
export default class OrdersSource extends React.Component<Props, State> {
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
    } catch (e) {
      if (this._unmounted) {
        return;
      }

      this.setState({
        isLoading: false,
        orders: null,
        errorMessage: e.message
      });
    }
  }
}
