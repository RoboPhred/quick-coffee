import { takeEvery } from "redux-saga";
import { call, put } from "redux-saga/effects";

import {
  ADD_FAVORITE,
  AddFavoriteAction,
  addFavoriteSuccess
} from "../actions/add-favorite";

import { addFavorite } from "../api";
import { FavoriteItem } from "coffee-types";

export default function* addFavoriteSaga() {
  yield takeEvery(ADD_FAVORITE, onAddFavorite);
}

function* onAddFavorite(action: AddFavoriteAction) {
  const { favorite } = action.payload;

  const newFavorite: FavoriteItem = yield call(addFavorite, favorite);
  // TODO: On error, tell user.

  yield put(addFavoriteSuccess(newFavorite));
}
