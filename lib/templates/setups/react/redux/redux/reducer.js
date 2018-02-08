import { combineReducers } from 'redux';

import users from './modules/users';

const combinedReducers = combineReducers({
    users
});

export default function(state, action) {
    return combinedReducers(state, action);
}
