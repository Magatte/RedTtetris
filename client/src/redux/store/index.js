import { createStore, applyMiddleware, compose } from 'redux';
import gameReducers from '../reducers/index';
import thunkMiddleware from 'redux-thunk';
import socketMiddleware from '../middleware/socketMiddleware';

const middlewares = applyMiddleware(thunkMiddleware, socketMiddleware);

const store = createStore(
    gameReducers,
    compose(middlewares, window.devToolsExtension && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;