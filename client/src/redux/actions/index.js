import gameConstants from '../constants/gameConstants';

export const START_GAME = 'START_GAME';
export const STOP_GAME = 'STOP_GAME';
export const PAUSE_GAME = 'PAUSE_GAME';
export const UNPAUSE_GAME = 'UNPAUSE_GAME';
export const GAME_OVER = 'GAME_OVER';
export const CLEAR_LINE = 'CLEAR_LINE';
export const FREEZE_LINE = 'FREEZE_LINE';
export const MOVE_DOWN = 'MOVE_DOWN';
export const MOVE_RIGHT = 'MOVE_RIGHT';
export const MOVE_LEFT = 'MOVE_LEFT';
export const ROTATE_TETRIMINOS = 'ROTATE_TETRIMINOS';
export const NEW_TETRIMINOS = 'NEW_TETRIMINOS';

export const newTetriminos = (currentTetriminos, newTetriminos) => {
    const { shapeTypes } = gameConstants;
    const newRandNb = Math.floor(Math.random() * (7 - 0)) + 0; // Math.Random return a number between 0 (included) and 1 (excluded)
    const newShape = shapeTypes[newRandNb];

    return {
        type: NEW_TETRIMINOS,
        currentTetriminos,
        color: currentTetriminos.color,
        newTetriminos,
        newShape
    };
};

export const startGame = () => {

};

export const stopGame = () => {

};

export const pauseGame = () => {

};

export const unpauseGame = () => {

};

export const gameOver = () => {

};

export const clearLine = () => {

};

export const freezeLine = () => {

};

export const moveDown = () => {

};

export const moveRight = () => {

};

export const moveLeft = () => {

};