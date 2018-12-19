import * as React from "react";
import { connect } from "react-redux";

import { autobind } from "core-decorators";

import { MenuItemEditorServiceProps } from "./props";

import mapStateToProps, { StateProps } from "./state-props";
import mapDispatchToProps, { DispatchProps } from "./dispatch-props";
import { InventoryItem } from "coffee-types";

type Props = MenuItemEditorServiceProps & StateProps & DispatchProps;
interface State {
  isSaving: boolean;
  item: InventoryItem | null;
}

class MenuItemEditorService extends React.Component<Props, State> {
  private _mounted: boolean = false;

  constructor(props: Props) {
    super(props);

    props.refreshMenu();

    this.state = {
      item: null,
      isSaving: false
    };
  }

  componentDidMount() {
    this._mounted = true;
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  componentWillUpdate(props: Props) {
    if (props.itemId !== this.props.itemId) {
      this.setState({
        item: null
      });
    }

    if (!this.state.item && props.item) {
      this.setState({
        item: props.item
      });
    }
  }

  render() {
    const { isLoading, children } = this.props;
    const { item, isSaving } = this.state;

    return children({
      isLoading,
      isSaving,
      item,
      onChange: this._onChange,
      onSave: this._onSave
    });
  }

  @autobind()
  private _onChange(item: InventoryItem) {
    this.setState({
      item
    });
  }

  @autobind()
  private _onSave() {
    const { item } = this.state;

    if (!item) {
      return;
    }

    this.setState({
      isSaving: true
    });

    const onUpdateCompleted = (errorMessage?: string) => {
      if (!this._mounted) {
        return;
      }

      // TODO report error.

      this.setState({ isSaving: false });
    };

    this.props.updateMenuItem(item, {
      error: onUpdateCompleted,
      success: onUpdateCompleted
    });
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItemEditorService);
