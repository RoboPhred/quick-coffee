import { takeEvery, call, put } from "redux-saga/effects";

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

  try {
    yield call(deleteFavorite, favoriteId);
  } catch (e) {
    // TODO: On error, tell user.
    return;
  }

  yield put(deleteFavoriteSuccess(favoriteId));
}
