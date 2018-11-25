import { takeLatest, put, call } from "redux-saga/effects";

import { REFRESH_ORDERS, RefreshOrdersAction } from "../actions/refresh-orders";
import {
  receiveOrdersBegin,
  receiveOrdersSuccess,
  receiveOrdersError
} from "../actions/receive-orders";

import { getOrders } from "../api";

export default function* refreshFavoritesSaga() {
  yield takeLatest(REFRESH_ORDERS, onRefreshFavorites);
}

function* onRefreshFavorites(action: RefreshOrdersAction) {
  yield put(receiveOrdersBegin());

  try {
    const orders = yield call(getOrders);
    yield put(receiveOrdersSuccess(orders));
  } catch (e) {
    // TODO: Inform user of error.
    yield put(receiveOrdersError(e.message));
  }
}
