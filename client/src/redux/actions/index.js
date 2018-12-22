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
export const SEND_LOGIN_ROOM = 'SEND_LOGIN_ROOM'
export const GET_GAMES_LIST = 'GET_GAMES_LIST'
export const GET_PLAYER_STATUS = 'GET_PLAYER_STATUS'
export const MANAGE_PIECES_STOCK = 'MANAGE_PIECES_STOCK'


export const managePiecesStock =(room,piecesStock) => {
    return {
        type:MANAGE_PIECES_STOCK,
        room,
        piecesStock
    }
}

export const newTetriminos = (currentTetriminos, nextTetriminos, nextRandNb) => {
    const { shapeTypes } = gameConstants;
    //const nextRandNb = Math.floor(Math.random() * (7 - 0)) + 0; // Math.Random return a number between 0 (included) and 1 (excluded)
    const nextShape = shapeTypes[nextRandNb];

    return {
        type: NEW_TETRIMINOS,
        currentTetriminos,
        nextTetriminos,
        nextShape
    };
};

export const startGame = (room, curRandNb, nextRandNb) => {
    const { shapeTypes } = gameConstants;
    //const curRandNb = Math.floor(Math.random() * (7 - 0)) + 0; // Math.Random return a number between 0 (included) and 1 (excluded)
    //const nextRandNb = Math.floor(Math.random() * (7 - 0)) + 0; // Math.Random return a number between 0 (included) and 1 (excluded)
    const currentShape = shapeTypes[curRandNb];
    const nextShape = shapeTypes[nextRandNb];
    return {
        type: START_GAME,
        currentShape,
        nextShape,
        room
    }
};

export const getPlayerStatus = () =>{
    return{
        type:GET_PLAYER_STATUS
    }
}

export const sendLoginRoom = (login, room) => {
    return {
        type: SEND_LOGIN_ROOM,
        login,
        room

    }
}

export const getGamesList = (l) => {

    return {
        type: GET_GAMES_LIST,
    }
}

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
