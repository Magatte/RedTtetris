import { createStore, applyMiddleware, compose } from 'redux';
import gameReducers from '../reducers/index';
import thunkMiddleware from 'redux-thunk';

const middlewares = applyMiddleware(thunkMiddleware);

const store = createStore(
    gameReducers,
    compose(middlewares, window.devToolsExtension && window.devToolsExtension())
);

export default store;