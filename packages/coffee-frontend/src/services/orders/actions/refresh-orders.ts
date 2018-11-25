export const REFRESH_ORDERS = "refresh-orders";
export const refreshOrders = () => ({
  type: REFRESH_ORDERS as typeof REFRESH_ORDERS
});
export type RefreshOrdersAction = ReturnType<typeof refreshOrders>;
