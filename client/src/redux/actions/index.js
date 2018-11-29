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
export const ROTATE = 'ROTATE';
export const ROTATE_TETRIMINOS = 'ROTATE_TETRIMINOS';
export const HARD_DROP = 'HARD_DROP';
export const NEW_TETRIMINOS = 'NEW_TETRIMINOS';
export const LAST_MOVE = 'LAST_MOVE';

export const newTetriminos = (currentTetriminos, nextTetriminos) => {
    const { shapeTypes } = gameConstants;
    const nextRandNb = Math.floor(Math.random() * (7 - 0)) + 0; // Math.Random return a number between 0 (included) and 1 (excluded)
    const nextShape = shapeTypes[nextRandNb];

    return {
        type: NEW_TETRIMINOS,
        currentTetriminos,
        // color: currentTetriminos.color,
        nextTetriminos,
        nextShape
    };
};

export const startGame = () => {
    const { shapeTypes } = gameConstants;
    const curRandNb = Math.floor(Math.random() * (7 - 0)) + 0; // Math.Random return a number between 0 (included) and 1 (excluded)
    const nextRandNb = Math.floor(Math.random() * (7 - 0)) + 0; // Math.Random return a number between 0 (included) and 1 (excluded)
    const currentShape = shapeTypes[curRandNb];
    const nextShape = shapeTypes[nextRandNb];

    return {
        type: START_GAME,
        currentShape,
        nextShape
    }
};

export const stopGame = () => {
    return {
        type: STOP_GAME
    }
};

export const pauseGame = () => {
    return {
        type: PAUSE_GAME
    }
};

export const unpauseGame = () => {
    return {
        type: UNPAUSE_GAME
    }
};

export const gameOver = () => {
    return {
        type: GAME_OVER
    }
};

export const clearLine = () => {
    return {
        type: CLEAR_LINE
    }
};

export const freezeLine = () => {
    return {
        type: FREEZE_LINE
    }
};

export const moveDown = () => {

    return {
        type: MOVE_DOWN
    }
};

export const moveRight = () => {
    return {
        type: MOVE_RIGHT
    }
};

export const moveLeft = () => {
    return {
        type: MOVE_LEFT
    }
};

export const rotate = () => {
    return {
        type: ROTATE_TETRIMINOS
    }
};

export const lastMove = () => {
    return {
        type: LAST_MOVE
    }
};
export const hardDrop = () =>{
    return {
        type: HARD_DROP
    }
}