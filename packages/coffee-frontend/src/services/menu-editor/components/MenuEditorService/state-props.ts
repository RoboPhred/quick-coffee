import { AppState } from "@/state";

import {
  menuItemsLoadingSelector,
  menuItemsListSelector
} from "@/services/menu/selectors";

const mapStateToProps = (state: AppState) => ({
  isLoading: menuItemsLoadingSelector(state),
  items: menuItemsListSelector(state)
});
export default mapStateToProps;
export type StateProps = ReturnType<typeof mapStateToProps>;
