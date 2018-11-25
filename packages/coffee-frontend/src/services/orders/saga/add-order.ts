import { takeEvery, call, put } from "redux-saga/effects";

import { OrderedItem } from "coffee-types";

import {
  ADD_ORDER,
  AddOrderAction,
  addOrderSuccess
} from "../actions/add-order";

import { addOrder } from "../api";

export default function* addFavoriteSaga() {
  yield takeEvery(ADD_ORDER, onAddFavorite);
}

function* onAddFavorite(action: AddOrderAction) {
  const { order } = action.payload;

  const newOrder: OrderedItem = yield call(addOrder, order);
  // TODO: On error, tell user.

  yield put(addOrderSuccess(newOrder));
}
