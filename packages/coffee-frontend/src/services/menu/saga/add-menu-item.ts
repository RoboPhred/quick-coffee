import { takeEvery, call, put } from "redux-saga/effects";

import { handleAsyncResultSaga } from "@/async-action-behavior";

import {
  ADD_MENU_ITEM,
  addMenuItemSuccess,
  AddMenuItemAction
} from "../actions/add-menu-item";

import { createItem } from "../api";

export default function* addMenuItemSaga() {
  yield takeEvery(ADD_MENU_ITEM, onAddMenuItem);
}

function* onAddMenuItem(action: AddMenuItemAction) {
  try {
    const item = yield call(createItem, action.payload.item);
    yield put(addMenuItemSuccess(item));
    yield handleAsyncResultSaga(null, action);
  } catch (e) {
    yield handleAsyncResultSaga(e.message, action);
    // TODO: Report error
  }
}
