import { AppState } from "@/state";

import {
  menuItemsLoadingSelector,
  menuItemsSelector
} from "@/services/menu/selectors";

import { MenuItemEditorServiceProps } from "./props";

const itemSelector = (state: AppState, props: MenuItemEditorServiceProps) => {
  const { itemId } = props;
  const items = menuItemsSelector(state);

  if (!items || !items[itemId]) {
    return null;
  }
  return items[itemId];
};

const mapStateToProps = (
  state: AppState,
  props: MenuItemEditorServiceProps
) => ({
  isLoading: menuItemsLoadingSelector(state),
  item: itemSelector(state, props)
});
export default mapStateToProps;
export type StateProps = ReturnType<typeof mapStateToProps>;
