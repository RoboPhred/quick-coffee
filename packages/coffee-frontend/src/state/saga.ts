import createSagaMiddleware from "redux-saga";
import { fork } from "redux-saga/effects";

import favoritesServiceSaga from "@/services/favorites/saga";
import ordersServiceSaga from "@/services/orders/saga";

function* saga(): any {
  yield fork(favoritesServiceSaga);
  yield fork(ordersServiceSaga);
}

const sagaMiddleware = createSagaMiddleware();

export default sagaMiddleware;

export function runSaga() {
  sagaMiddleware.run(saga);
}
