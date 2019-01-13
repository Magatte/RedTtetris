import { createStore, applyMiddleware, compose } from 'redux';
import gameReducers from '../reducers/index';
import socketMiddleware from '../middleware/socketMiddleware';
import thunkMiddleware from 'redux-thunk';
import io from 'socket.io-client'

export const socket = io.connect('http://localhost:8000');

const middlewares = applyMiddleware(thunkMiddleware, socketMiddleware(socket));

const store = createStore(
    gameReducers,
    compose(middlewares, window.devToolsExtension && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;