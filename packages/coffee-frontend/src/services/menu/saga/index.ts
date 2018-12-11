import { fork } from "redux-saga/effects";

import addMenuItemSaga from "./add-menu-item";
import deleteMenuItemSaga from "./delete-menu-item";
import refreshMenuSaga from "./refresh-menu";

export default function* menuSaga() {
  yield fork(addMenuItemSaga);
  yield fork(deleteMenuItemSaga);
  yield fork(refreshMenuSaga);
}
