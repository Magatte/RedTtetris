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
    };
};

function activeTetriminos(state = initialGrid, action) {
    switch(action.type) {
        case actions.START_GAME:
            return state; // TODO a new cleared grid
        case actions.NEW_TETRIMINOS:
            return initialGrid;
        default:
            return state;
    };
};

function newTetriminos(state = {}, action) {
    switch(action.type) {
        case actions.START_GAME:
        case actions.NEW_TETRIMINOS:
        default:
    };
};

function handleTetriminos(state = {}, action) {
    switch(action.type) {
        case actions.START_GAME:
        case actions.NEW_TETRIMINOS:
        case actions.MOVE_DOWN:
        case actions.MOVE_LEFT:
        case actions.MOVE_RIGHT:
        case actions.ROTATE_TETRIMINOS:
        default:
    };
};

const gameReducers = combineReducers({
    gameStatus,
    activeTetriminos,
    newTetriminos,
    handleTetriminos
}); // CombineReducers put all these reducers into a single namespace

export default gameReducers;