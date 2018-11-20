import * as React from "react";

import { OrderedItem } from "coffee-types";

import { getBaristaOrders } from "../api";

export interface BaristaOrdersSourceRenderProps {
  isLoading: boolean;
  errorMessage: string | null;
  orders: OrderedItem[] | null;
}

export interface BaristaOrdersSourceProps {
  children(props: BaristaOrdersSourceRenderProps): React.ReactNode;
}

type Props = BaristaOrdersSourceProps;
type State = BaristaOrdersSourceRenderProps;
export default class BaristaOrdersSource extends React.Component<Props, State> {
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
    return this.props.children({ errorMessage, orders, isLoading });
  }

  async fetchData() {
    this.setState({ isLoading: true });

    try {
      const result = await getBaristaOrders();

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
