import { combineReducers } from 'redux';
import _ from 'lodash';
import gameConstants from '../constants/gameConstants';
import * as actions from '../actions/index';
import { rotateTetriminos, getNewGrid } from '../../utils/gamePlay';

const { tetriminos, initialGrid } = gameConstants;

const gameStatus = (state = 'IDLE', action) => {
    switch (action.type) {
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

const activeTetriminos = (state = { newGrid: initialGrid }, action) => {
    switch (action.type) {
        case actions.START_GAME:
            let currentTetriminos = tetriminos[action.currentShape];
            currentTetriminos.name = action.currentShape;
            return { newGrid: getNewGrid(initialGrid, currentTetriminos) }; // TODO a new cleared grid
        case actions.NEW_TETRIMINOS:
            // Every time we get a new tetriminos we actualise the grid
            //return getNewGrid(initialGrid, action.currentTetriminos, actio.color);
            return { state, newGrid: getNewGrid(state.newGrid, action.nextTetriminos) };
        case actions.GAME_OVER:
            return state;
        default:
            return state;
    }
};

const nextTetriminos = (state = {}, action) => {
    switch (action.type) {
        case actions.START_GAME:
        case actions.NEW_TETRIMINOS:
            return {
                shape: tetriminos[action.nextShape].shape,
                name: action.nextShape,
                color: tetriminos[action.nextShape].color,
                pos: tetriminos[action.nextShape].pos,
                oldPos: tetriminos[action.nextShape].oldPos,
                ghost: tetriminos[action.nextShape].initialPos,
                oldGhost: tetriminos[action.nextShape].initialPos
            };
        default:
            return state;
    }
};

const currentTetriminos = (state = {}, action) => {
    let { ghost, pos, oldPos, name } = state

    state.offsetX = state.offsetX && state.offsetX < 19 ? state.offsetX : 0;
    state.offsetY = state.offsetY && state.offsetY < 9 && state.offsetY >= 0 ? state.offsetY : (state.offsetY >= 9 ? 8 : 0);

    switch (action.type) {
        case actions.START_GAME:
            return {
                shape: tetriminos[action.currentShape].shape,
                name: action.currentShape,
                pos: tetriminos[action.currentShape].pos,
                oldPos: tetriminos[action.currentShape].oldPos,
                initialPos: tetriminos[action.currentShape].initialPos,
                ghost: tetriminos[action.currentShape].ghost,
                oldGhost: tetriminos[action.currentShape].oldGhost
            };
        case actions.NEW_TETRIMINOS:
            let nextTetri = action.nextTetriminos;
            nextTetri.initialPos = tetriminos[nextTetri.name].initialPos;
            nextTetri.oldPos = _.cloneDeep(nextTetri.initialPos);
            nextTetri.pos = _.cloneDeep(nextTetri.initialPos);
            nextTetri.oldGhost = _.cloneDeep(nextTetri.initialPos);
            return nextTetri;
        case actions.MOVE_DOWN:
            oldPos = _.cloneDeep(pos);
            for (let i = 0; i < 4; i++)
                pos[i].x++;
            return { ...state, oldPos: oldPos, pos: pos };
        case actions.MOVE_LEFT:
            oldPos = _.cloneDeep(pos);
            for (let i = 0; i < 4; i++)
                pos[i].y--;
            return { ...state, oldPos: oldPos, pos: pos, oldGhost: ghost };
        case actions.MOVE_RIGHT:
            oldPos = _.cloneDeep(pos);
            for (let i = 0; i < 4; i++)
                pos[i].y++;
            return { ...state, oldPos: oldPos, pos: pos, oldGhost: ghost };
        case actions.ROTATE_TETRIMINOS:
            if (name !== 'square') {
                if (name === 'straight' && state.pos[0].x < 2)
                    return { ...state, pos: pos };
                const cx = pos[2].x;
                const cy = pos[2].y;

                state.oldPos = _.cloneDeep(state.pos);
                state.pos = state.pos.map((c, i) => {
                    const newCoods = rotateTetriminos(cx, cy, c.x, c.y);
                    c.x = newCoods[0];
                    c.y = newCoods[1];
                    return c;
                });
            }
            return { ...state, pos: state.pos, oldGhost: ghost };
        case actions.HARD_DROP:
            oldPos = _.cloneDeep(pos);
            pos = _.cloneDeep(ghost);

            return { ...state, pos: pos, oldPos: oldPos };
        default:
            return state;
    }
};

const lastMove = (state = false, action) => {
    switch (action.type) {
        case actions.LAST_MOVE:
            return true;
        default:
            return false;
    }
}

const gameReducers = combineReducers({
    gameStatus,
    activeTetriminos,
    nextTetriminos,
    currentTetriminos,
    lastMove
}); // CombineReducers put all these reducers into a single namespace

export default gameReducers;