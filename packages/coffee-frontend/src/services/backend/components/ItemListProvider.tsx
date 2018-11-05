import * as React from "react";

import gql from "graphql-tag";

import { InventoryItem } from "coffee-types";

import client from "../client";

const QUERY_ITEMS = gql`
  {
    items {
      id
      name
      description
    }
  }
`;
interface QueryItemsResult {
  items: InventoryItem[];
}

export interface InventoryProviderRenderProps {
  isLoading: boolean;
  errorMessage: string | null;
  items: QueryItemsResult["items"] | null;
}

export interface InventoryProviderProps {
  children(props: InventoryProviderRenderProps): React.ReactChild;
}

type Props = InventoryProviderProps;
type State = InventoryProviderRenderProps;
export default class ItemListProvider extends React.Component<Props, State> {
  private _unmounted: boolean = false;

  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: false,
      errorMessage: null,
      items: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    this._unmounted = true;
  }

  render() {
    const { errorMessage, items, isLoading } = this.state;
    const { children } = this.props;
    return React.Children.only(children({ errorMessage, items, isLoading }));
  }

  async fetchData() {
    this.setState({ isLoading: true });

    try {
      const result = await client.query<QueryItemsResult>({
        query: QUERY_ITEMS
      });

      if (this._unmounted) {
        return;
      }

      this.setState({
        isLoading: false,
        items: result.data.items
      });
    } catch {
      if (this._unmounted) {
        return;
      }

      this.setState({
        isLoading: false,
        items: null,
        errorMessage: "An error occurred"
      });
    }
  }
}
