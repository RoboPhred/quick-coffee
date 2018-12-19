import { takeEvery, call, put } from "redux-saga/effects";

import { updateItem } from "../api";

import { handleAsyncResultSaga } from "@/async-action-behavior";

import {
  UPDATE_MENU_ITEM,
  UpdateMenuItemAction,
  updateMenuItemSuccess
} from "../actions/update-menu-item";

export default function* updateMenuItemSaga() {
  yield takeEvery(UPDATE_MENU_ITEM, onUpdateMenuItem);
}

function* onUpdateMenuItem(action: UpdateMenuItemAction) {
  const { item } = action.payload;
  try {
    yield call(updateItem, item);
    yield put(updateMenuItemSuccess(item));
    yield handleAsyncResultSaga(null, action);
  } catch (e) {
    yield handleAsyncResultSaga(e.message, action);
  }
}
