import createSagaMiddleware from "redux-saga";

function* saga(): any {}

const sagaMiddleware = createSagaMiddleware();

export default sagaMiddleware;

export function runSaga() {
  sagaMiddleware.run(saga);
}
