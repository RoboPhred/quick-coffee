import { applyMiddleware, compose, createStore } from "redux";

import { routerMiddleware } from "connected-react-router";

import { defaultAppState } from "./state";

import reducer from "./reducer";

import sagaMiddleware, { runSaga } from "./saga";

import history from "../history";

const storeComposer =
  (process.env.NODE_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(
  reducer,
  defaultAppState,
  storeComposer(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
);
export default store;

// Start the saga after it is linked to the store.
runSaga();
