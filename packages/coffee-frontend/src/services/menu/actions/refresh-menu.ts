export const REFRESH_MENU = "refresh-menu";
export const refreshMenu = () => ({
  type: REFRESH_MENU as typeof REFRESH_MENU
});
export type RefreshMenuAction = ReturnType<typeof refreshMenu>;
