/**
 * Source: Revolver
 *
 * Lets us dispatch async actions by adding a `promise` property to the action creator.
 * The types are created with the asyncType function, which returns an object containing all three states (initial/success/fail)
 * It also fills the role of redux-thunk, allowing you to return functions from action creators to get dispatch/getState.
 *
 * Usage:
 *
  import { asyncType } from 'scripts/redux/middleware/asyncMiddleware';
  const TEST = asyncType('redux/TEST');

  export const reducer = (state, action) => {
    switch (action.type) {
      case TEST.INITIAL:
        return { ...state, status: 'loading' };
      case TEST.SUCCESS:
        return { ...state, status: 'success' };
      case TEST.FAIL:
        return { ...state, status: 'fail' };
    }
  }

  export function testActionCreator() {
    return {
      types: TEST,
      promise: client => client.get('/url')
    };
  }
 */
import ErrorHandler from 'utils/ErrorHandler';

export const asyncType = (type) => ({
  INITIAL: type,
  SUCCESS: `${type}_SUCCESS`,
  FAIL: `${type}_FAIL`,
});

export default function asyncMiddleware(client) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') return action(dispatch, getState, client);

    const { promise, types, ...rest } = action;
    if (!promise) return next(action);

    if (typeof types !== 'object') throw new Error(`Async middleware error: 'promise' found in action creator, but 'types' property is invalid.`);

    const promiseObj = promise(client);

    next({ ...rest, type: types.INITIAL, promise: promiseObj });

    return promiseObj
      .then(result =>
        next({ ...rest, result, type: types.SUCCESS, promise: promiseObj })
      )
      .catch(error => {
        if (!error.response) ErrorHandler.trace('MIDDLEWARE ERROR:', error);
        return next({ ...rest, error, type: types.FAIL, promise: promiseObj });
      });
  };
}