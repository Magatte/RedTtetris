import { combineReducers } from 'redux';
import _ from 'lodash';
import gameConstants from '../constants/gameConstants.js';
import * as actions from '../actions/index.js';
import { rotateTetriminos, getNewGrid } from '../../utils/functions.js';

const { tetriminos, initialGrid } = gameConstants;

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
            let currentTetriminos = tetriminos[action.currentShape];
            return getNewGrid(initialGrid, currentTetriminos); // TODO a new cleared grid
        case actions.NEW_TETRIMINOS:
            // Every time we get a new tetriminos we actualise the grid
            //return getNewGrid(initialGrid, action.currentTetriminos, actio.color);
            return getNewGrid(state, action.nextTetriminos);
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
    switch(action.type) {
        case actions.START_GAME:
            return {
                shape: tetriminos[action.currentShape].shape,
                name: action.currentShape,
                color: tetriminos[action.currentShape].color,
                pos: tetriminos[action.currentShape].pos,
                initialPos: tetriminos[action.currentShape].initialPos
            };
        case actions.NEW_TETRIMINOS:
            let nextTetri = action.nextTetriminos;
            let initialPos = tetriminos[nextTetri.name].initialPos;
            nextTetri.pos = _.merge(nextTetri.pos, initialPos);
            return nextTetri;
        case actions.MOVE_DOWN:
            state.oldPos = _.merge([state.oldPos], state.pos);
            state.pos = state.pos.map(c => {
                c.x++;
                return c;
            });
            return { ...state, oldPos: state.oldPos, pos: state.pos };
        case actions.MOVE_LEFT:
            state.oldPos = _.merge([state.oldPos], state.pos);
            state.pos = state.pos.map(c => {
                c.y--;
                return c;
            });
            return { ...state, oldPos: state.oldPos, pos: state.pos };
        case actions.MOVE_RIGHT:
            state.oldPos = _.merge([state.oldPos], state.pos);
            state.pos = state.pos.map(c => {
                c.y++;
                return c;
            });
            return { ...state, oldPos: state.oldPos, pos: state.pos };
        case actions.ROTATE_TETRIMINOS:
            const cx = state.pos[2].x;
            const cy = state.pos[2].y;

            state.oldPos = _.merge([state.oldPos], state.pos);
            state.pos = state.pos.map((c, i) => {
                const newCoods = rotateTetriminos(cx,cy, c.x, c.y);
                c.x = newCoods[0];
                c.y = newCoods[1];
                return c;
            })
            return { ...state, pos:state.pos};
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