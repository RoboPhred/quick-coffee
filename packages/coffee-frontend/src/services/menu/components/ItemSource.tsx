import * as React from "react";
import { connect } from "react-redux";

import { InventoryItem } from "coffee-types";
import { AppState } from "@/state";

import { refreshMenu } from "../actions/refresh-menu";

export interface ItemSourceRenderProps {
  isLoading: boolean;
  errorMessage: string | null;
  item: InventoryItem | null;
}

export interface ItemSourceProps {
  itemId: number;
  children(props: ItemSourceRenderProps): React.ReactNode;
}

const mapStateToProps = (state: AppState) => ({
  isLoading: state.services.menu.isLoading,
  errorMessage: state.services.menu.errorMessage,
  itemsById: state.services.menu.itemsById
});
type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
  refreshMenu
};
type DispatchProps = typeof mapDispatchToProps;

type Props = ItemSourceProps & StateProps & DispatchProps;
class ItemSource extends React.Component<Props> {
  componentDidMount() {
    this.props.refreshMenu();
  }

  render() {
    const { errorMessage, itemId, itemsById, isLoading } = this.props;
    const item = itemsById ? itemsById[itemId] : null;
    return this.props.children({ errorMessage, item, isLoading });
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemSource);
