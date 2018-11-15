import { combineReducers } from 'redux';
import gameConstants from '../constants/gameConstants.js';
import * as actions from '../actions/index.js';

const { initialGrid, tetriminos } = gameConstants;

const gameStatus = (state = 'IDLE', action) => {
    switch(action.type) {
        case actions.START_GAME:
            return 'PLAYING';
        case actions.PAUSE_GAME:
            return 'PAUSED';
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

const activeTetriminos = (state = initialGrid, action) => {
    switch(action.type) {
        case actions.START_GAME:
            return state; // TODO a new cleared grid
        case actions.NEW_TETRIMINOS:
            return initialGrid;
        default:
            return state;
    }
};

const nextTetriminos = (state = {}, action) => {
    switch(action.type) {
        case actions.START_GAME:
        case actions.NEW_TETRIMINOS:
            return {
                shape: tetriminos[action.nextShape].shape,
                name: action.nextShape,
                color: tetriminos[action.nextShape].color,
                pos: tetriminos[action.nextShape].pos
            };
        default:
            return state;
    }
};

const currentTetriminos = (state = {}, action) => {
    state.offsetX = state.offsetX && state.offsetX < 19 ? state.offsetX : 0;
    state.offsetY = state.offsetY && state.offsetY < 9 && state.offsetY >= 0 ? state.offsetY : (state.offsetY >= 9 ? 8 : 0);

    switch(action.type) {
        case actions.START_GAME:
            return {
                shape: tetriminos[action.currentShape].shape,
                name: action.currentShape,
                color: tetriminos[action.currentShape].color,
                pos: tetriminos[action.currentShape].pos
            };
        case actions.NEW_TETRIMINOS:
            return Object.assign({}, action.nextTetriminos);
        case actions.MOVE_DOWN:
            state.oldPos = [{x:state.pos[0].x, y:state.pos[0].y}, {x:state.pos[1].x, y:state.pos[1].y}, {x:state.pos[2].x, y:state.pos[2].y}, {x:state.pos[3].x, y:state.pos[3].y}]
            state.offsetX++;
            for (let i = 0; i < 4; i++) {
                state.pos[i].x++;
            }
            return { ...state, oldPos: state.oldPos, pos: state.pos };
        case actions.MOVE_LEFT:
            state.oldPos = [{x:state.pos[0].x, y:state.pos[0].y}, {x:state.pos[1].x, y:state.pos[1].y}, {x:state.pos[2].x, y:state.pos[2].y}, {x:state.pos[3].x, y:state.pos[3].y}]
            state.offsetY--;
            for (let i = 0; i < 4; i++) {
                state.pos[i].y--;

            }
            return { ...state, oldPos: state.oldPos, pos: state.pos };
        case actions.MOVE_RIGHT:
            state.oldPos = [{x:state.pos[0].x, y:state.pos[0].y}, {x:state.pos[1].x, y:state.pos[1].y}, {x:state.pos[2].x, y:state.pos[2].y}, {x:state.pos[3].x, y:state.pos[3].y}]
            state.offsetY++;
            for (let i = 0; i < 4; i++) {
                state.pos[i].y++;
            }
            return { ...state, oldPos: state.oldPos, pos: state.pos };
        case actions.ROTATE_TETRIMINOS:
            return { ...state, shape: action.rotatedTetriminos };
        default:
            return state;
    }
};

const gameReducers = combineReducers({
    gameStatus,
    activeTetriminos,
    nextTetriminos,
    currentTetriminos
}); // CombineReducers put all these reducers into a single namespace

export default gameReducers;
