import * as React from "react";
import { connect } from "react-redux";

import { InventoryItem } from "coffee-types";

import { AppState } from "@/state";

import { refreshMenu } from "../actions/refresh-menu";

export interface ItemListSourceRenderProps {
  isLoading: boolean;
  errorMessage: string | null;
  items: InventoryItem[] | null;
}

export interface ItemListSourceProps {
  children(props: ItemListSourceRenderProps): React.ReactNode;
}

const mapStateToProps = (state: AppState) => ({
  isLoading: state.services.menu.isLoading,
  errorMessage: state.services.menu.errorMessage,
  itemsById: state.services.menu.itemsById,
  itemIds: state.services.menu.itemIds
});
type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
  refreshMenu
};
type DispatchProps = typeof mapDispatchToProps;

type Props = ItemListSourceProps & StateProps & DispatchProps;
class ItemListSource extends React.Component<Props> {
  componentDidMount() {
    this.props.refreshMenu();
  }

  render() {
    const {
      errorMessage,
      itemsById,
      itemIds,
      isLoading,
      children
    } = this.props;

    const items =
      itemsById && itemIds ? itemIds.map(key => itemsById[key]) : null;

    return children({ errorMessage, items, isLoading });
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemListSource);
