import * as React from "react";

import { RouteComponentProps } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";

import ItemProvider from "@/services/backend/components/ItemProvider";

import AppPageContainer from "@/components/AppPageContainer";
import ErrorDisplay from "@/components/ErrorDisplay";

import OrderForm from "./components/OrderForm";

export type OrderFormProps = RouteComponentProps<{ item: string }>;
type Props = OrderFormProps;
class OrderFormPage extends React.Component<Props> {
  render() {
    const { match } = this.props;
    return (
      <ItemProvider itemId={match.params.item}>
        {({ isLoading, errorMessage, item }) => (
          <AppPageContainer title="Order">
            {isLoading && <CircularProgress />}
            {errorMessage && <ErrorDisplay errorMessage={errorMessage} />}
            {item && !errorMessage && <OrderForm item={item} />}
          </AppPageContainer>
        )}
      </ItemProvider>
    );
  }
}

export default OrderFormPage;
