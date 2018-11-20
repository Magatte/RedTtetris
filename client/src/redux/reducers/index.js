import { combineReducers } from 'redux';
import _ from 'lodash';
import gameConstants from '../constants/gameConstants.js';
import * as actions from '../actions/index.js';

const { tetriminos } = gameConstants;
let { initialGrid } = gameConstants;

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
            initialGrid = getNewGrid(initialGrid, action.currentTetriminos);
            return initialGrid; // Every time we get a new tetriminos we actualise the grid
            //return getNewGrid(initialGrid, action.currentTetriminos, actio.color);
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
            let nextTetri = action.nextTetriminos;
            let initialPos = tetriminos[nextTetri.name].initialPos;
            nextTetri.pos = [ {x:initialPos[0].x, y:initialPos[0].y}, {x:initialPos[1].x, y:initialPos[1].y}, {x:initialPos[2].x, y:initialPos[2].y}, {x:initialPos[3].x, y:initialPos[3].y} ];
            console.log(nextTetri);
            return { ...nextTetri };
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
            const cx = state.pos[2].x;
            const cy = state.pos[2].y;

            // state.oldPos = [{x:state.pos[0].x, y:state.pos[0].y}, {x:state.pos[1].x, y:state.pos[1].y}, {x:state.pos[2].x, y:state.pos[2].y}, {x:state.pos[3].x, y:state.pos[3].y}]

            for (let i = 0 ; i < 4 ; i++) {
                state.oldPos[i].x = state.pos[i].x
                state.oldPos[i].y = state.pos[i].y
            }
            for (let i = 0 ; i < 4 ; i++) {
                const newCoods = rotateTetriminos(cx,cy, state.pos[i].x, state.pos[i].y)
                state.pos[i].x = newCoods[0];
                state.pos[i].y = newCoods[1];
            }
            //return { ...state, shape: action.rotatedTetriminos };
            return { ...state, pos:state.pos};
        default:
            return state;
    }
};

const rotateTetriminos = (cx, cy, x, y) =>{
    const radians = (Math.PI / 180) * 90,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = Math.round((cos * (x - cx)) + (sin * (y - cy)) + cx),
        ny = Math.round((cos * (y - cy)) - (sin * (x - cx)) + cy);
    return [nx, ny];
}

const getNewGrid = (grid, currentTetriminos) => {
    let newGrid = _.merge(grid, currentTetriminos.shape);
    console.log(newGrid);
    return newGrid;
}

const gameReducers = combineReducers({
    gameStatus,
    activeTetriminos,
    nextTetriminos,
    currentTetriminos
}); // CombineReducers put all these reducers into a single namespace

export default gameReducers;