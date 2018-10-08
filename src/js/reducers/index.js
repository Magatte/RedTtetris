import { combineReducers } from 'react-redux';
import gameConstants from '../gameConstants.js';
import * as actions from '../actions/index.js';

const { initialGrid, tetriminos } = gameConstants;

function gameStatus(state = 'IDLE', action) {

}

function activeTetriminos(state = initialGrid, action) {

}

function nextTetriminos(state = {}, action) {

}

function handleTetriminos(state = {}, action) {

}

const gameReducers = {
    gameStatus,
    activeTetriminos,
    nextTetriminos,
    handleTetriminos
}

export default gameReducers;