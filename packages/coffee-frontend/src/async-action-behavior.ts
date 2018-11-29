import { put } from "redux-saga/effects";
import { push } from "connected-react-router";

export interface AsyncActionBehavior {
  success?: {
    redirect?: string;
  };
  error?: (message: string) => void;
}

export function* handleAsyncResultSaga(
  errorMessage: string | null,
  asyncAction: { meta?: { asyncBehavior?: AsyncActionBehavior } }
) {
  if (!asyncAction) {
    return;
  }
  if (!asyncAction.meta) {
    return;
  }
  if (!asyncAction.meta.asyncBehavior) {
    return;
  }

  const behavior = asyncAction.meta.asyncBehavior;
  if (!errorMessage) {
    if (behavior.success && behavior.success.redirect) {
      yield put(push(behavior.success.redirect));
    }
  } else {
    if (behavior.error) {
      behavior.error(errorMessage);
    }
  }
}
