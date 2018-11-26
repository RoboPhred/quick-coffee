import { takeLatest, call, put } from "redux-saga/effects";

import { REFRESH_MENU, RefreshMenuAction } from "../actions/refresh-menu";
import {
  receiveMenuBegin,
  receiveMenuSuccess,
  receiveMenuError
} from "../actions/receive-menu";

import { getItems } from "../api";

export default function* refreshMenuSaga() {
  yield takeLatest(REFRESH_MENU, onRefreshMenu);
}

function* onRefreshMenu(action: RefreshMenuAction) {
  yield put(receiveMenuBegin());

  try {
    const items = yield call(getItems);
    yield put(receiveMenuSuccess(items));
  } catch (e) {
    yield put(receiveMenuError(e.message));
  }
}
