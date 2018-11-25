import { takeLatest, put, call } from "redux-saga/effects";

import {
  REFRESH_FAVORITES,
  RefreshFavoritesAction
} from "../actions/refresh-favorites";
import {
  receiveFavoritesBegin,
  receiveFavoritesSuccess,
  receiveFavoritesError
} from "../actions/receive-favorites";

import { getFavorites } from "../api";

export default function* refreshFavoritesSaga() {
  yield takeLatest(REFRESH_FAVORITES, onRefreshFavorites);
}

function* onRefreshFavorites(action: RefreshFavoritesAction) {
  yield put(receiveFavoritesBegin());

  try {
    const favorites = yield call(getFavorites);
    yield put(receiveFavoritesSuccess(favorites));
  } catch (e) {
    // TODO: Inform user of error.
    yield put(receiveFavoritesError(e.message));
  }
}
