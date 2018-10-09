import { createStore } from 'redux';
import gameReducers from '../reducers/index';

const store = createStore(gameReducers);

export default store;