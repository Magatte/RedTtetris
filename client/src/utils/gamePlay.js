import _ from 'lodash';
import { startGame, stopGame, newTetriminos, rotate, moveDown, moveLeft, moveRight, lastMove, hardDrop } from '../redux/actions/index.js';
import gameConstants from '../redux/constants/gameConstants.js';
import store from '../redux/store/index';
// import {asset, NativeModules} from 'react-360';

const { shapeTypes, newLine } = gameConstants;
// const {AudioModule} = NativeModules;
const deleteSound = new Audio('../sounds/delete.mp3');


export const loadGame = () => {
    console.log('About to start the game...');
    return (dispatch, getState) => {
        dispatch(startGame());
        const handleMove = (e) => {
            e.preventDefault();
            switch (e.keyCode) {
                case 37:
                    dispatch(moveTetriminos('left'));
                    break;
                case 38:
                    dispatch(moveTetriminos('rotate'));
                    break;
                case 39:
                    dispatch(moveTetriminos('right'));
                    break;
                case 40:
                    dispatch(moveTetriminos('down'));
                    break;
                case 32:
                    dispatch(moveTetriminos('drop'));
                    break;
                default:
                    ;
            }
        };
        setInterval(() => {
            dropTetriminos(dispatch, getState);
        }, 500);
        window.addEventListener('keydown', handleMove);
    }
};

export const dropTetriminos = (dispatch, getState) => {
    const { gameStatus } = getState();

    if (gameStatus !== 'PAUSED' && gameStatus !== 'GAME_OVER' && gameStatus !== 'IDLE')
        dispatch(moveTetriminos('down'));
}

export const restart = () => {
    return (dispatch) => {
        dispatch(stopGame());
        dispatch(loadGame());
    }
};

export const getNewGrid = (grid, currentTetriminos) => {
    let index = shapeTypes.indexOf(currentTetriminos.name) + 1;
    let newGrid = grid.map((row, i, arr) => {
        row.map((sq, j) => {
            if (currentTetriminos.shape[i][j] === index)
                arr[i][j] = index;
            return sq;
        });
        return row;
    });
    return newGrid;
}

export const moveTetriminos = (direction) => (
    (dispatch, getState) => {
        const { gameStatus, activeTetriminos, currentTetriminos, nextTetriminos } = getState();
        let state = getState();
        let edge = {};

        if (gameStatus === 'PAUSED' || gameStatus === 'GAME_OVER')
            return;

        edge = checkCollision(activeTetriminos.newGrid, currentTetriminos.pos)
        if (edge.xb === false && state.lastMove) {
            deleteLine(activeTetriminos.newGrid);
            return dispatch(newTetriminos(currentTetriminos, nextTetriminos));
        }

        switch (direction) {
            case 'down':
                if (edge.xb === false)
                    dispatch(lastMove());
                else if (edge.xb === true)
                    dispatch(moveDown());
                break;
            case 'right':
                if (edge.yr === true)
                    dispatch(moveRight());
                break;
            case 'left':
                if (edge.yl === true)
                    dispatch(moveLeft());
                break;
            case 'rotate':
                if (currentTetriminos.name === 'square')
                    return;
                if (edge.xt && edge.xb && edge.yl && edge.yr)
                    dispatch(rotate());
                break;
            case 'drop':
                dispatch(hardDrop());
                break;
            default:
                return;
        }
    }
);

export const rotateTetriminos = (cx, cy, x, y) => {
    const radians = (Math.PI / 180) * 90,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = Math.round((cos * (x - cx)) + (sin * (y - cy)) + cx),
        ny = Math.round((cos * (y - cy)) - (sin * (x - cx)) + cy);
    return [nx, ny];
}

export const checkCollision = (arr, pos) => {
    let edge = { xt: true, xb: true, yl: true, yr: true };

    for (let i = 0; i < 4; i++) {
        let pointX = { x: pos[i].x + 1, y: pos[i].y };
        let pointYl = { x: pos[i].x, y: pos[i].y - 1 };
        let pointYr = { x: pos[i].x, y: pos[i].y + 1 };

        // For each point of my tetriminos I check if the next square is out of bound or if it is occupied and not a point of the current tetriminos
        if (pos[i].x <= 0)
            edge.xt = false;
        if (pos[i].x >= 19 || (arr[pos[i].x + 1][pos[i].y] !== 0 && arr[pos[i].x + 1][pos[i].y] !== 8 && !pos.some(element => { return JSON.stringify(element) === JSON.stringify(pointX) })))
            edge.xb = false;
        if (pos[i].y <= 0 || (arr[pos[i].x][pos[i].y - 1] !== 0 && !pos.some(element => { return JSON.stringify(element) === JSON.stringify(pointYl) })))
            edge.yl = false;
        if (pos[i].y >= 9 || (arr[pos[i].x][pos[i].y + 1] !== 0 && !pos.some(element => { return JSON.stringify(element) === JSON.stringify(pointYr) })))
            edge.yr = false;
    }
    return edge;
}

export const cling = (lineToDelete) => {
    let line = [...lineToDelete];
    console.log(line);
    for (let i = 0; i < 1000; i++) {
        if (i % 2 === 0)
            lineToDelete = newLine;
        else
            lineToDelete = line;
    }
    return line;
}

export const isLineDone = (gridLine) => {
    for (let i = 0; i < 10; i++) {
        if (gridLine[i] === 0)
            return false;
    }
    return true;
}

export const deleteLine = (grid) => {
    grid = grid.map((row, i) => {
        if (isLineDone(row) === true) {
            grid.splice(i, 1);
            grid.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            deleteSound.play();
        }
        return row;
    });
    return grid;
}

const isCollision = (arr, tmpPos) => {
    let edge = {};
    edge = checkCollision(arr, tmpPos);
    if (edge.xb === false)
        return true;
    return false;
}

export const getGhost = (pos, arr) => {
    let tmpPos = _.cloneDeep(pos);
    for (let i = pos[0].x; i < 20; i++) {
        if (isCollision(arr, tmpPos))
            return tmpPos;
        for (let i = 0; i < 4; i++)
            tmpPos[i].x++
    }
    return tmpPos;
}