import { combineReducers } from 'redux';
import _ from 'lodash';
import gameConstants from '../constants/gameConstants';
import * as actions from '../actions/index';
import { rotateTetriminos, getNewGrid } from '../../utils/gamePlay';
import {userInitaleState} from "../constants/storesConstans";

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
            return 'IDLE';
        case actions.RESTART:
            return 'RESTART'
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
            let initial = Array(20).fill(0).map(() => Array(10).fill(0));
            return { newGrid: getNewGrid(initial, currentTetriminos), isPlace: true }; // TODO a new cleared grid
        case actions.NEW_TETRIMINOS:
            // Every time we get a new tetriminos we actualise the grid
            let pos = action.nextTetriminos.initialPos;
            let newGrid = state.newGrid;
            let isPlace = true;
            for (let i = 0; i < 4; i++) {
                if (newGrid[pos[i].x][pos[i].y] > 0)
                    isPlace = false;
            }
            newGrid = isPlace ? getNewGrid(state.newGrid, action.nextTetriminos) : state.newGrid;
            return { ...state, newGrid: newGrid, isPlace: isPlace };
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
                initialPos: tetriminos[action.nextShape].initialPos,
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
                    const [x, y] = rotateTetriminos(cx, cy, c.x, c.y);
                    c.x = x;
                    c.y = y;
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

const user = (state = userInitaleState, action) =>{
    switch(action.type) {
        case actions.SEND_LOGIN_ROOM:{
            const {login, room} = action
            return {login:login, room:room}
        }
        case actions.GET_PLAYER_STATUS:{
            if( action.data){
                return {...state, status:action.data.status, piecesStock:action.data.newPieces}

            }
            return state
        }
        default:
            return state;
    }

}

const games = (state = {rooms: []}, action) => {
    switch(action.type) {
        case actions.START_GAME: {
            const roomIndex = state.rooms.findIndex(room => room.name === action.room);
            if(roomIndex) {
                state.rooms[roomIndex].piecesStock.shift();
            }
            return state;
        }
        case actions.GET_GAMES_LIST: {
            return {rooms: action.games ? action.games : []};
        }
        case actions.GET_PLAYER_STATUS:
            if(action.data){
                if(!state.rooms.find(room => room.name === action.data.room)) {
                    const data =  {
                        name: action.data.name,
                        piecesStock: action.data.newPieces,
                        spectres:[...action.data.spectres]
                    }
                    // faire un find index puis remplacer les datas existantes par celle qui arrivent
                    return {...state, rooms:[...state.rooms,data]}
                }
                return state;
            }
            return state;
        case actions.MANAGE_PIECES_STOCK: {
            const roomIndex = state.rooms.findIndex(room => room.name === action.room)
            if(roomIndex) {
                state.rooms[roomIndex].piecesStock.shift()
            }
            // if(action.newPieces && roomIndex) {
            //     state.rooms[roomIndex].piecesStock = state.rooms[roomIndex].piecesStock.push(...action.newPieces);
            // }
            return state;
        }
        case actions.NEW_PIECES_FROM_SOCKET: {
            const roomIndex = state.rooms.findIndex(room => room.name === action.room)
            let chunk = state.rooms[roomIndex].piecesStock.slice(Math.max(state.rooms[roomIndex].piecesStock.length - 3, 0));
            if (chunk.every(e => action.newPieces.includes(e)))
                return state;
            if ( roomIndex ) {
                state.rooms[roomIndex].piecesStock.push(...action.newPieces);
            }
            return state;
        }
        case actions.RECEIVE_NEW_SPECTRE: {
            if(action.room) {
                const roomIndex = state.rooms.findIndex(room => room.name === action.room)
                if(roomIndex > -1){

                    state.rooms[roomIndex]['spectres'] = [...action.allSpectres]
                    return state
                }
            }
            return state
        }
        default:
            return state;
    }
}

const socket = (state = {status:""}, action) => {
    switch (action.type) {
        case actions.DATA_FROM_SOCKET:
            return {...state, status:action.data}
        default:
            return state;
    }
}

const gameReducers = combineReducers({
    gameStatus,
    activeTetriminos,
    nextTetriminos,
    currentTetriminos,
    lastMove,
    user,
    games,
    socket
}); // CombineReducers put all these reducers into a single namespace

export default gameReducers;
