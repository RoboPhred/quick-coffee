import { fork } from "redux-saga/effects";

import addFavoriteSaga from "./add-favorite";
import deleteFavoriteSaga from "./delete-favorite";
import refreshFavoritesSaga from "./refresh-favorites";

export default function* favoritesServiceSaga() {
  yield fork(addFavoriteSaga);
  yield fork(deleteFavoriteSaga);
  yield fork(refreshFavoritesSaga);
}
