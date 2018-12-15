import { put } from "redux-saga/effects";
import { push } from "connected-react-router";

export interface AsyncActionOptions {
  redirect?: string;
}
export type AsyncSuccessAction = AsyncActionOptions | (() => void);
export type AsyncErrorAction = AsyncActionOptions | ((message: string) => void);

export interface AsyncActionBehavior {
  success?: AsyncSuccessAction;
  error?: AsyncErrorAction;
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
    if (behavior.success) {
      yield* invokeAsyncAction(behavior.success);
    }
  } else {
    if (behavior.error) {
      yield* invokeAsyncAction(behavior.error);
    }
  }
}

function* invokeAsyncAction(
  action: AsyncActionOptions | Function,
  ...args: any[]
) {
  if (typeof action === "function") {
    action(...args);
    return;
  }

  if (action.redirect) {
    yield put(push(action.redirect));
  }
}
