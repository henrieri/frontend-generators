import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import asyncMiddleware from './middleware/asyncMiddleware';
import reducer from './reducer';
import ApolloClient from 'core/ApolloClient';
import thunk from 'redux-thunk';

function createStore(client, data = {}) {

    const middleware = [
        asyncMiddleware(client),
        thunk
    ];


    // ------------------------------
    // Create store
    // ------------------------------

    let finalCreateStore;
    if (__DEVELOPMENT__ || __DEBUG__) {
        const { persistState } = require('redux-devtools');
        finalCreateStore = compose(
            applyMiddleware(...middleware),
            window.devToolsExtension ? window.devToolsExtension() : func => func,
            persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
        )(_createStore);
    } else {
        finalCreateStore = applyMiddleware(...middleware)(_createStore);
    }

    const store = finalCreateStore(reducer, data);


    // ------------------------------
    // HMR Support
    // ------------------------------

    if (__DEVELOPMENT__ && module.hot) {
        module.hot.accept('./reducer', () => {
            store.replaceReducer(reducer);
        });
    }

    return store;
}

const store = createStore(
    ApolloClient,
    window.__REDUX_INITIAL_STATE__ || {}
);

export default store;
