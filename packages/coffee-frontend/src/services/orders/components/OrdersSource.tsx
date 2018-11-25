import * as React from "react";
import { connect } from "react-redux";

import { OrderedItem } from "coffee-types";

import { AppState } from "@/state";

import { refreshOrders } from "../actions/refresh-orders";

export interface OrdersSourceRenderProps {
  isLoading: boolean;
  errorMessage: string | null;
  orders: OrderedItem[] | null;
}

export interface OrdersSourceProps {
  children(props: OrdersSourceRenderProps): React.ReactChild;
}

const mapStateToProps = (state: AppState) => ({
  isLoading: state.services.orders.isLoading,
  errorMessage: state.services.orders.errorMessage,
  orders: state.services.orders.orders
});
type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
  refreshOrders
};
type DispatchProps = typeof mapDispatchToProps;

type Props = OrdersSourceProps & StateProps & DispatchProps;
class OrdersSource extends React.Component<Props> {
  componentDidMount() {
    const { refreshOrders } = this.props;
    refreshOrders();
  }

  render() {
    const { errorMessage, orders, isLoading, children } = this.props;
    return React.Children.only(children({ errorMessage, orders, isLoading }));
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersSource);
