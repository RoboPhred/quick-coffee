import createSagaMiddleware from "redux-saga";
import { fork } from "redux-saga/effects";

import favoritesServiceSaga from "@/services/favorites/saga";

function* saga(): any {
  yield fork(favoritesServiceSaga);
}

const sagaMiddleware = createSagaMiddleware();

export default sagaMiddleware;

export function runSaga() {
  sagaMiddleware.run(saga);
}
