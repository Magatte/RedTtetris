import { combineReducers } from 'redux';
import _ from 'lodash';
import gameConstants from '../constants/gameConstants';
import * as actions from '../actions/index';
import { rotateTetriminos, getNewGrid, getGhost } from '../../utils/gamePlay';

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
            currentTetriminos.name = action.currentShape;
            return getNewGrid(initialGrid, currentTetriminos); // TODO a new cleared grid
        case actions.NEW_TETRIMINOS:
            // Every time we get a new tetriminos we actualise the grid
            //return getNewGrid(initialGrid, action.currentTetriminos, actio.color);
            //return getNewGrid(initialGrid, action.currentTetriminos, actio.color);
            return getNewGrid(state, action.nextTetriminos);
        case actions.GAME_OVER:
            return state;
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
                pos: tetriminos[action.nextShape].pos,
                ghost: tetriminos[action.nextShape].ghost
            };
            default:
            return state;
        }
    };
    
const currentTetriminos = (state = {}, action) => {
    let {ghost, oldGhost, pos, oldPos, shape} = state
        
    state.offsetX = state.offsetX && state.offsetX < 19 ? state.offsetX : 0;
    state.offsetY = state.offsetY && state.offsetY < 9 && state.offsetY >= 0 ? state.offsetY : (state.offsetY >= 9 ? 8 : 0);
        
    switch(action.type) {
        case actions.START_GAME:
            return {
                shape: tetriminos[action.currentShape].shape,
                name: action.currentShape,
                color: tetriminos[action.currentShape].color,
                pos: tetriminos[action.currentShape].pos,
                initialPos: tetriminos[action.currentShape].initialPos,
                ghost: tetriminos[action.currentShape].ghost,
                oldGhost: tetriminos[action.currentShape].oldGhost
            };
        case actions.NEW_TETRIMINOS:
            let nextTetri = action.nextTetriminos;
            let initialPos = tetriminos[nextTetri.name].initialPos;
            nextTetri.pos = _.merge(nextTetri.pos, initialPos);
            nextTetri.ghost = getGhost(state.pos, shape);
            return nextTetri;
        case actions.MOVE_DOWN:
            oldPos = _.merge(state.oldPos, pos);
            pos = state.pos.map(c => {
                c.x++;
                return c;
            });
            ghost = getGhost(pos, shape);
            return { ...state, oldPos: oldPos, pos: pos, ghost: ghost, oldGhost: state.oldGhost };
        case actions.MOVE_LEFT:
            oldPos = _.merge(state.oldPos, pos);
            oldGhost = [...state.ghost];
            pos = state.pos.map(c => {
                c.y--;
                return c;
            });
            ghost = getGhost(pos, shape);
            return { ...state, oldPos: oldPos, pos: pos, ghost: ghost, oldGhost: oldGhost };
        case actions.MOVE_RIGHT:
            oldPos = _.merge(state.oldPos, pos);
            oldGhost = [...state.ghost];
            pos = pos.map(c => {
                c.y++;
                return c;
            });
            ghost = getGhost(pos, shape);
            return { ...state, oldPos: oldPos, pos: pos, ghost: ghost, oldGhost: oldGhost };
        case actions.ROTATE_TETRIMINOS:
            if (state.name !== 'square') {
                if (state.name === 'straight' && state.pos[0].x < 2)
                    return { ...state, pos:pos};
                const cx = state.pos[2].x;
                const cy = state.pos[2].y;
    
                state.oldPos = _.merge([state.oldPos], state.pos);
                state.pos = state.pos.map((c, i) => {
                    const newCoods = rotateTetriminos(cx,cy, c.x, c.y);
                    c.x = newCoods[0];
                    c.y = newCoods[1];
                    return c;
                });
            }
            ghost = getGhost(state.pos, shape);
            return { ...state, pos: state.pos, ghost: ghost };
        case actions.HARD_DROP:
            state.oldPos = _.merge([state.oldPos], state.pos);
            state.pos = _.merge([state.pos], state.ghost);

            return { ...state, pos:state.pos, oldPos:state.oldPos};
        default:
            return state;
    }
};

const lastMove = (state = false, action) => {
    switch(action.type) {
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