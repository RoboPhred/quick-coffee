import { takeEvery } from "redux-saga";
import { call, put } from "redux-saga/effects";

import {
  DELETE_FAVORITE,
  DeleteFavoriteAction,
  deleteFavoriteSuccess
} from "../actions/delete-favorite";

import { deleteFavorite } from "../api";

export default function* deleteFavoriteSaga() {
  yield takeEvery(DELETE_FAVORITE, onDeleteFavorite);
}

function* onDeleteFavorite(action: DeleteFavoriteAction) {
  const { favoriteId } = action.payload;

  yield call(deleteFavorite, favoriteId);
  // TODO: On error, tell user.

  yield put(deleteFavoriteSuccess(favoriteId));
}
