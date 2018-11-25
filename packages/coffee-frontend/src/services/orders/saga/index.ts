import { fork } from "redux-saga/effects";

import addOrderSaga from "./add-order";
import refreshOrdersSaga from "./refresh-orders";

export default function* ordersServiceSaga() {
  yield fork(addOrderSaga);
  yield fork(refreshOrdersSaga);
}
