import reduceReducers from "reduce-reducers";

import { connectRouter } from "connected-react-router";

import history from "../history";

import favoritesServiceReducer from "@/services/favorites/reducer";
import { AppState, defaultAppState } from "./state";

const routerReducer = connectRouter(history);

const reducer = reduceReducers<AppState>(
  (state = defaultAppState, action) => ({
    ...state,
    router: routerReducer(state.router, action as any)
  }),
  favoritesServiceReducer
);
export default reducer;
