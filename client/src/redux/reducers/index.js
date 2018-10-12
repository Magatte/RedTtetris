import { combineReducers } from 'redux';
import gameConstants from '../constants/gameConstants.js';
import * as actions from '../actions/index.js';

const { initialGrid, tetriminos } = gameConstants;

function gameStatus(state = 'IDLE', action) {
    switch(action.type) {
        case actions.START_GAME:
        case actions.UNPAUSE_GAME:
            return 'PLAYING';
        case actions.STOP_GAME:
            return 'PAUSED';
        case actions.GAME_OVER:
            return 'GAME_OVER';
        default:
            return state;
    }
};

function activeTetriminos(state = initialGrid, action) {
    switch(action.type) {
        case actions.START_GAME:
            return state; // TODO a new cleared grid
        case actions.NEW_TETRIMINOS:
            return initialGrid;
        default:
            return state;
    }
};

function nextTetriminos(state = {}, action) {
    switch(action.type) {
        case actions.START_GAME:
        case actions.NEW_TETRIMINOS:
            return {
                shape: tetriminos[action.nextShape],
                name: tetriminos.nextShape,
                color: tetriminos[action.nextShape].color
            };
        default:
            return state;
    }
};

function handleTetriminos(state = {}, action) {
    switch(action.type) {
        case actions.START_GAME:
            return {
                shape: tetriminos[action.curRandNb].shape,
                name: action.currentShape,
                color: tetriminos[action.currentShape].color,
            };
        case actions.NEW_TETRIMINOS:
            return Object.assign({}, action.nextTetriminos);
        case actions.MOVE_DOWN:
            return Object.assign({}, state);
        case actions.MOVE_LEFT:
            return Object.assign({}, state);
        case actions.MOVE_RIGHT:
            return Object.assign({}, state);
        case actions.ROTATE_TETRIMINOS:
            return Object.assign({}, state, {shape: action.rotatedTetriminos});
        default:
            return state;
    }
};

const gameReducers = combineReducers({
    gameStatus,
    activeTetriminos,
    nextTetriminos,
    handleTetriminos
}); // CombineReducers put all these reducers into a single namespace

export default gameReducers;