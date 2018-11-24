import * as React from "react";

import { RouteComponentProps } from "react-router-dom";

import { autobind } from "core-decorators";
import { OrderRequestItem } from "coffee-types";

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import ItemSource, {
  ItemSourceRenderProps
} from "@/services/menu/components/ItemSource";
import OrderingEnabledProvider from "@/services/backend/components/OrderingEnabledProvider";

import PageNotFound from "@/pages/PageNotFound";

import Authenticate from "@/components/Authenticate";

import PageContainer from "@/components/PageContainer";
import ErrorDisplay from "@/components/ErrorDisplay";
import LoadingPageContent from "@/components/LoadingPageContent";

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
    const itemId = Number(match.params.item);
    if (isNaN(itemId)) {
      return <PageNotFound />;
    }

    return (
      <OrderingEnabledProvider>
        {({ isLoading, isOrderingEnabled }) => {
          if (isLoading) {
            return <LoadingPageContent />;
          }

          if (!isOrderingEnabled) {
            return <Typography variant="h6">Coffee shop is closed.</Typography>;
          }

          return (
            <Authenticate>
              <ItemSource itemId={itemId}>
                {props => (
                  <PageContainer title="Order" variant="subpage">
                    {this._renderContent(props)}
                  </PageContainer>
                )}
              </ItemSource>
            </Authenticate>
          );
        }}
      </OrderingEnabledProvider>
    );
  }

  private _renderContent(props: ItemSourceRenderProps) {
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
