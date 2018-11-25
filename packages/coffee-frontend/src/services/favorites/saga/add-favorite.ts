import { takeEvery, call, put } from "redux-saga/effects";

import { FavoriteItem } from "coffee-types";

import {
  ADD_FAVORITE,
  AddFavoriteAction,
  addFavoriteSuccess
} from "../actions/add-favorite";

import { addFavorite } from "../api";

export default function* addFavoriteSaga() {
  yield takeEvery(ADD_FAVORITE, onAddFavorite);
}

function* onAddFavorite(action: AddFavoriteAction) {
  const { favorite } = action.payload;

  const newFavorite: FavoriteItem = yield call(addFavorite, favorite);
  // TODO: On error, tell user.

  yield put(addFavoriteSuccess(newFavorite));
}
