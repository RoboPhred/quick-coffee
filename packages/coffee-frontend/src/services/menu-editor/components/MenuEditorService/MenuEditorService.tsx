import * as React from "react";
import { connect } from "react-redux";

import { InventoryItem } from "coffee-types";

import mapStateToProps, { StateProps } from "./state-props";
import mapDispatchToProps, { DispatchProps } from "./dispatch-props";

export interface MenuEditorProps {
  children(props: MenuEditorRenderProps): React.ReactNode;
}

export interface MenuEditorRenderProps {
  isLoading: boolean;
  items: MenuEditorItem[];
}

export interface MenuEditorItem extends InventoryItem {
  editItem(): void;
  deleteItem(): void;
}

type Props = MenuEditorProps & StateProps & DispatchProps;
class MenuEditorService extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    props.refreshMenu();
  }

  render() {
    const { isLoading, items, deleteMenuItem, pushUrl, children } = this.props;

    const editorItems = items.map(item => ({
      ...item,
      editItem: () => {
        pushUrl(`/barista/edit-menu/item/${item.id}`);
      },
      deleteItem: deleteMenuItem.bind(null, item.id)
    }));

    return children({ isLoading, items: editorItems });
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuEditorService);
