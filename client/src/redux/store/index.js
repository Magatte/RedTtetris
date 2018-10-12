import { createStore } from 'redux';
import gameReducers from '../reducers/index';

const store = createStore(
    gameReducers,
    window.devToolsExtension && window.devToolsExtension()
);

export default store;