import * as React from "react";

import { autobind } from "core-decorators";

import gql from "graphql-tag";

import client from "../client";

export interface OrderingEnabledProviderRenderProps {
  isLoading: boolean;
  isOrderingEnabled: boolean | null;
  errorMessage: string | null;
}

export interface OrderingEnabledProviderProps {
  children(props: OrderingEnabledProviderRenderProps): React.ReactChild;
}

const QUERY_OPEN = gql`
  {
    open
  }
`;
type QueryOpenResult = {
  open: boolean;
};

const POLLING_INTERVAL = 5000;

type Props = OrderingEnabledProviderProps;
type State = OrderingEnabledProviderRenderProps;
export default class OrderingEnabledProvider extends React.Component<
  Props,
  State
> {
  private _pollTimer: any;
  private _unmounted = false;

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      isOrderingEnabled: null,
      errorMessage: null
    };
  }

  componentDidMount() {
    this._fetchAndPoll();
  }

  componentWillUnmount() {
    if (this._pollTimer) {
      clearTimeout(this._pollTimer);
      this._pollTimer = null;
    }
    this._unmounted = true;
  }

  render() {
    const { isOrderingEnabled, errorMessage, isLoading } = this.state;
    const { children } = this.props;
    return React.Children.only(
      children({ isOrderingEnabled, errorMessage, isLoading })
    );
  }

  @autobind()
  private async _fetchAndPoll() {
    this._pollTimer = null;
    await this._fetchData();
    if (!this._unmounted) {
      this._pollTimer = setTimeout(this._fetchAndPoll, POLLING_INTERVAL);
    }
  }

  private async _fetchData() {
    this.setState({ isLoading: true });

    try {
      const result = await client.query<QueryOpenResult>({
        query: QUERY_OPEN,
        fetchPolicy: "no-cache"
      });

      if (this._unmounted) {
        return;
      }

      this.setState({
        isLoading: false,
        isOrderingEnabled: result.data.open,
        errorMessage: null
      });
    } catch {
      if (this._unmounted) {
        return;
      }

      this.setState({
        isLoading: false,
        isOrderingEnabled: null,
        // No idea what the error format is, and we probably
        //  dont want to show error details to the user anyway.
        errorMessage: "An error occurred"
      });
    }
  }
}
