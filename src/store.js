import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import logger from 'redux-logger'

const reducers = {};

const store = createStore(
    (state={}) => state,
    applyMiddleware(thunk, logger)
);

export const injectReducer = (key, reducer) => {
    reducers[key] = reducer;
    store.replaceReducer(combineReducers(reducers));
    return reducer;
};

export default store;
