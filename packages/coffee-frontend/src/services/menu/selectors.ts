import { AppState } from "@/state";

export const menuItemsLoadingSelector = (state: AppState) =>
  state.services.menu.isLoading;
export const menuItemsSelector = (state: AppState) =>
  state.services.menu.itemsById;
export const menuItemIdsSelector = (state: AppState) =>
  state.services.menu.itemIds;

export const menuItemsListSelector = (state: AppState) => {
  if (menuItemsLoadingSelector(state)) {
    return [];
  }

  const ids = menuItemIdsSelector(state);
  const items = menuItemsSelector(state);
  if (!ids || !items) {
    return [];
  }

  return ids.map(id => items[id]);
};
