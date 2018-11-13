import * as React from "react";

import { RouteComponentProps } from "react-router-dom";

import { autobind } from "core-decorators";
import { OrderRequestItem } from "coffee-types";

import CircularProgress from "@material-ui/core/CircularProgress";

import ItemProvider, {
  ItemProviderRenderProps
} from "@/services/backend/components/ItemProvider";

import AppPageContainer from "@/components/AppPageContainer";
import ErrorDisplay from "@/components/ErrorDisplay";

import OrderForm from "./components/OrderForm";
import OrderingDisplay from "./components/OrderingDisplay";

import { addOrder } from "@/services/orders/api";

export type OrderFormProps = RouteComponentProps<{ item: string }>;
type Props = OrderFormProps;
interface State {
  isOrdering: boolean;
  errorMessage: string | null;
}
class OrderFormPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isOrdering: false,
      errorMessage: null
    };
  }

  render() {
    const { match } = this.props;
    return (
      <ItemProvider itemId={match.params.item}>
        {props => (
          <AppPageContainer title="Order" subPage>
            {this._renderContent(props)}
          </AppPageContainer>
        )}
      </ItemProvider>
    );
  }

  private _renderContent(props: ItemProviderRenderProps) {
    const { isLoading, errorMessage: itemErrorMessage, item } = props;
    const { isOrdering, errorMessage } = this.state;

    if (isOrdering) {
      return <OrderingDisplay />;
    }

    if (isLoading || !item) {
      return <CircularProgress />;
    }

    if (errorMessage || itemErrorMessage) {
      return (
        <ErrorDisplay errorMessage={errorMessage || itemErrorMessage || ""} />
      );
    }

    return <OrderForm item={item} onOrder={this._onOrder} />;
  }

  @autobind()
  private async _onOrder(order: OrderRequestItem) {
    this.setState({
      isOrdering: true
    });

    try {
      await addOrder({ order });
      const { history } = this.props;
      history.push("/orders");
    } catch {
      this.setState({
        isOrdering: false,
        errorMessage: "Order failed."
      });
    }
  }
}

export default OrderFormPage;
