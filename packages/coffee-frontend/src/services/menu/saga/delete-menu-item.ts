import { takeEvery, call, put } from "redux-saga/effects";

import { handleAsyncResultSaga } from "@/async-action-behavior";

import {
  DELETE_MENU_ITEM,
  deleteMenuItemSuccess,
  DeleteMenuItemAction
} from "../actions/delete-menu-item";

import { deleteItem } from "../api";

export default function* addMenuItemSaga() {
  yield takeEvery(DELETE_MENU_ITEM, onDeleteMenuItem);
}

function* onDeleteMenuItem(action: DeleteMenuItemAction) {
  const { itemId } = action.payload;
  try {
    yield call(deleteItem, action.payload.itemId);
    yield put(deleteMenuItemSuccess(itemId));
    yield handleAsyncResultSaga(null, action);
  } catch (e) {
    yield handleAsyncResultSaga(e.message, action);
    // TODO: Report error
  }
}
