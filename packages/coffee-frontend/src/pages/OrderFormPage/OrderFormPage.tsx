import * as React from "react";
import { connect } from "react-redux";

import { RouteComponentProps } from "react-router-dom";

import { parse as parseQuery, OutputParams } from "query-string";

import { autobind } from "core-decorators";
import { OrderRequestItem, OrderOptions, InventoryItem } from "coffee-types";

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

import { addOrder } from "@/services/orders/actions/add-order";

export type OrderFormProps = RouteComponentProps<{ item: string }>;

const mapDispatchToProps = {
  addOrder
};
type DispatchProps = typeof mapDispatchToProps;

type Props = OrderFormProps & DispatchProps;
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

    const { location } = this.props;
    const query = parseQuery(location.search);
    const defaultOptions = parseOptions(query, item);

    return (
      <OrderForm
        item={item}
        defaultOptions={defaultOptions}
        onOrder={this._onOrder}
      />
    );
  }

  @autobind()
  private async _onOrder(order: OrderRequestItem) {
    const { addOrder } = this.props;

    this.setState({
      isOrdering: true
    });

    try {
      await addOrder(order);
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

export default connect(
  null,
  mapDispatchToProps
)(OrderFormPage);

function parseOptions(
  queryOpts: OutputParams,
  item: InventoryItem
): OrderOptions {
  if (!item.options) {
    return {};
  }
  const options: OrderOptions = {};
  for (const option of item.options) {
    let value: any = queryOpts[`option-${option.id}`];
    if (value == null) {
      continue;
    }
    switch (option.type) {
      case "boolean":
        value = value !== "false";
        break;
      case "integer":
        value = parseInt(value, 10);
        break;
      case "select":
      case "text":
        break;
    }
    options[option.id] = value;
  }
  return options;
}
