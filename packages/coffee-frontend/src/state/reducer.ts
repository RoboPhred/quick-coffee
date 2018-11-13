import { combineReducers } from "redux";

import reduceReducers from "reduce-reducers";

import { connectRouter } from "connected-react-router";

import history from "../history";

const reducer = reduceReducers(
  combineReducers({
    router: connectRouter(history)
  })
);
export default reducer;
