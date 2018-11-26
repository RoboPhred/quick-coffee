import produce from "immer";

import { AnyAction } from "redux";

import { AppState, defaultAppState } from "@/state";

import {
  RECEIVE_ORDERS_BEGIN,
  RECEIVE_ORDERS_SUCCESS,
  ReceiveOrdersSuccessAction,
  RECEIVE_ORDERS_ERROR,
  ReceiveOrdersErrorAction
} from "./actions/receive-orders";
import { AddOrderSuccessAction, ADD_ORDER_SUCCESS } from "./actions/add-order";

export default function ordersServiceReducer(
  state: AppState = defaultAppState,
  action: AnyAction
): AppState {
  switch (action.type) {
    case RECEIVE_ORDERS_BEGIN: {
      return produce(state, draft => {
        draft.services.orders.isLoading = true;
      });
    }
    case RECEIVE_ORDERS_ERROR: {
      const recvAction = action as ReceiveOrdersErrorAction;
      return produce(state, draft => {
        draft.services.orders.isLoading = false;
        draft.services.orders.errorMessage = recvAction.payload.message;
      });
    }
    case RECEIVE_ORDERS_SUCCESS: {
      const recvAction = action as ReceiveOrdersSuccessAction;
      return produce(state, draft => {
        draft.services.orders.isLoading = false;
        draft.services.orders.errorMessage = null;
        draft.services.orders.orders = recvAction.payload.orders;
      });
    }
    case ADD_ORDER_SUCCESS: {
      const recvAction = action as AddOrderSuccessAction;
      return produce(state, draft => {
        draft.services.orders.orders = [
          ...(draft.services.orders.orders || []),
          recvAction.payload.order
        ];
      });
    }
  }

  return state;
}
