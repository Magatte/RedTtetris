import { combineReducers } from 'redux';
import gameConstants from '../constants/gameConstants.js';
import * as actions from '../actions/index.js';

const { initialGrid, tetriminos, newLine } = gameConstants;

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
                pos: tetriminos[action.nextShape].pos,
                ghost: tetriminos[action.nextShape].ghost
            };
        default:
            return state;
    }
};

const currentTetriminos = (state = {}, action) => {
    state.offsetX = state.offsetX && state.offsetX < 19 ? state.offsetX : 0;
    state.offsetY = state.offsetY && state.offsetY < 9 && state.offsetY >= 0 ? state.offsetY : (state.offsetY >= 9 ? 8 : 0);

    let {ghost, shape} = state

    switch(action.type) {
        case actions.START_GAME:
            return {
                shape: tetriminos[action.currentShape].shape,
                name: action.currentShape,
                color: tetriminos[action.currentShape].color,
                pos: tetriminos[action.currentShape].pos,
                ghost: tetriminos[action.nextShape].ghost
            };
        case actions.NEW_TETRIMINOS:
            let nextTetri = action.nextTetriminos;
            let initialPos = tetriminos[nextTetri.name].initialPos;
            if(shape !== undefined){
                shape = checkArray(shape)
            }
            nextTetri.pos = [ {x:initialPos[0].x, y:initialPos[0].y}, {x:initialPos[1].x, y:initialPos[1].y}, {x:initialPos[2].x, y:initialPos[2].y}, {x:initialPos[3].x, y:initialPos[3].y} ];
            ghost = getGhost(state.pos, shape)

            return { ...nextTetri , ghost:ghost, shape:shape};
        case actions.MOVE_DOWN:
            state.oldPos = [{x:state.pos[0].x, y:state.pos[0].y}, {x:state.pos[1].x, y:state.pos[1].y}, {x:state.pos[2].x, y:state.pos[2].y}, {x:state.pos[3].x, y:state.pos[3].y}]
            state.offsetX++;


            for (let i = 0; i < 4; i++) {
                state.pos[i].x++;
            }
            ghost = getGhost(state.pos, shape)
            return { ...state, oldPos: state.oldPos, pos: state.pos, ghost:ghost};
        case actions.MOVE_LEFT:
            state.oldPos = [{x:state.pos[0].x, y:state.pos[0].y}, {x:state.pos[1].x, y:state.pos[1].y}, {x:state.pos[2].x, y:state.pos[2].y}, {x:state.pos[3].x, y:state.pos[3].y}]
            state.offsetY--;
            for (let i = 0; i < 4; i++) {
                state.pos[i].y--;

            }
            ghost = getGhost(state.pos, shape)
            return { ...state, oldPos: state.oldPos, pos: state.pos, ghost:ghost};

        case actions.MOVE_RIGHT:
            state.oldPos = [{x:state.pos[0].x, y:state.pos[0].y}, {x:state.pos[1].x, y:state.pos[1].y}, {x:state.pos[2].x, y:state.pos[2].y}, {x:state.pos[3].x, y:state.pos[3].y}]
            state.offsetY++;
            for (let i = 0; i < 4; i++) {
                state.pos[i].y++;
            }
            ghost = getGhost(state.pos, shape)
            return { ...state, oldPos: state.oldPos, pos: state.pos, ghost:ghost};

        case actions.ROTATE_TETRIMINOS:
            const cx = state.pos[2].x;
            const cy = state.pos[2].y;

            for (let i = 0 ; i < 4 ; i++) {
                state.oldPos[i].x = state.pos[i].x
                state.oldPos[i].y = state.pos[i].y
            }
            for (let i = 0 ; i < 4 ; i++) {
                const newCoods = rotateTetriminos(cx,cy, state.pos[i].x, state.pos[i].y)
                state.pos[i].x = newCoods[0];
                state.pos[i].y = newCoods[1];
            }
            ghost = getGhost(state.pos, shape)
            return { ...state, pos:state.pos,ghost:ghost, shape:shape };
        case actions.HARD_DROP:

            state.oldPos = [{x:state.pos[0].x, y:state.pos[0].y}, {x:state.pos[1].x, y:state.pos[1].y}, {x:state.pos[2].x, y:state.pos[2].y}, {x:state.pos[3].x, y:state.pos[3].y}]
            state.pos = [{x:ghost[0].x, y:ghost[0].y}, {x:ghost[1].x, y:ghost[1].y}, {x:ghost[2].x, y:ghost[2].y}, {x:ghost[3].x, y:ghost[3].y}]

            return { ...state, pos:state.pos, oldPos:state.oldPos};
                default:
                    return state;
    }
};


const checkLinesIsFull = (lines) =>{

    for(let i = 0; i < 10 ; i++){
        if(lines[i] === 0 || lines[i] === 8){
            return false
        }
    }
    return true
}

const checkArray = (array) =>{

    let linesIndexToDelete=[]

    for(let i = 0; i < 20 ; i++){
        if(checkLinesIsFull(array[i])){
            linesIndexToDelete.push(i)
        }
    }
    if(linesIndexToDelete.length !== 0){
       for( let i = linesIndexToDelete.length -1 ; i >= 0; i--){
           array.splice(linesIndexToDelete[i], 1)
       }

       console.log('array.lehght before',array.length , array )
       for (let line = array.length ; line < 20 ; line++ ){
           array.unshift( newLine)
       }
        console.log('array.lehght after',array.length , array )


    }
    return array


}
const checkPiece = (arr, pos, diff) => {
    let edge = {x: true, yl: true, yr: true};
    for (let i = 0; i < 4; i++) {
        // if (arr[pos[i].x][pos[i].y] !== 0)
        //     return false;
        let pointX = {x:pos[i].x + diff, y:pos[i].y};
        let pointYl = {x:pos[i].x, y:pos[i].y - diff};
        let pointYr = {x:pos[i].x, y:pos[i].y + diff};
        // For each point of my tetriminos I check if the next square is out of bound or if it is occupied and not a point of the current tetriminos
        if (pos[i].x >= 19 || (arr[pos[i].x + 1][pos[i].y] === 1 && !pos.some(element => {return JSON.stringify(element) === JSON.stringify(pointX)})))
            edge.x = false;
        else if (pos[i].y <= 0 || (arr[pos[i].x][pos[i].y - 1] === 1 && !pos.some(element => {return JSON.stringify(element) === JSON.stringify(pointYl)})))
            edge.yl = false;
        else if (pos[i].y >= 9 || (arr[pos[i].x][pos[i].y + 1] === 1 && !pos.some(element => {return JSON.stringify(element) === JSON.stringify(pointYr)})))
            edge.yr = false;
    }
    return edge;
}

const checkPlace = (tmpPos, arr, diff) => {

    for (let i = 0; i < 4; i++) {
        // Bien checker que la valeur est différent de 8 et ne fais pas partie du tetriminos( utiliser le checkCollision de Magatte)
        if (arr[tmpPos[i].x + diff][tmpPos[i].y] == 1 && checkPiece(arr, tmpPos, diff) ) {
            return false
        }
    }
    return true
}

const getGhost = (pos, arr) =>{

    let canPlace = false
    let realDiff = null
    for( let i = 0 ; i < 20; i++){
      for(let j = 0 ; j < 10 ; j++){
          if( arr[i][j] === 8){
          arr[i][j] = 0
        }
      }
    }
    const allYCoord = pos.reduce((acc, cur) => {
      acc.push(cur.x)
      return acc
    }, [])

    const maxValue = Math.max(...allYCoord)

    const diff = 19 - maxValue

    const ghost = []
    for (let i = 0; i < 4; i++) {
       ghost.push(Object.assign({}, pos[i]))
    }
    for (let i = diff; i > -1; i--) {
      if (checkPlace(pos, arr, i)) {
        canPlace = true
        realDiff = i
        break
      }
    }

    if (canPlace) {
      for (let i = 0; i < 4; i++) {
        if(arr[pos[i].x + realDiff][pos[i].y] === 0){
            arr[pos[i].x + realDiff][pos[i].y] = 8
        }
      }
    }


    for (let i = 0; i < 4; i++) {
        ghost[i].x  = ghost[i].x + realDiff
    }

    return ghost
}

const rotateTetriminos = (cx, cy, x, y) =>{
    const radians = (Math.PI / 180) * 90,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = Math.round((cos * (x - cx)) + (sin * (y - cy)) + cx),
        ny = Math.round((cos * (y - cy)) - (sin * (x - cx)) + cy);
    return [nx, ny];
}

const gameReducers = combineReducers({
    gameStatus,
    activeTetriminos,
    nextTetriminos,
    currentTetriminos
}); // CombineReducers put all these reducers into a single namespace

export default gameReducers;
