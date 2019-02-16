import gameConstants from '../constants/gameConstants';
export const START_GAME = 'START_GAME';
export const SEND_START_GAME = 'SEND_START_GAME';
export const STOP_GAME = 'STOP_GAME';
export const RESTART = 'RESTART';
export const PAUSE_GAME = 'PAUSE_GAME';
export const UNPAUSE_GAME = 'UNPAUSE_GAME';
export const GAME_OVER = 'GAME_OVER';
export const SEND_LOGIN_ROOM = 'SEND_LOGIN_ROOM';
export const GET_PLAYER_STATUS = 'GET_PLAYER_STATUS';
export const GET_GAMES_LIST = 'GET_GAME_LIST';
export const NEW_TETRIMINOS = 'NEW_TETRIMINOS';
export const MOVE_DOWN = 'MOVE_DOWN';
export const MOVE_RIGHT = 'MOVE_RIGHT';
export const MOVE_LEFT = 'MOVE_LEFT';
export const ROTATE_TETRIMINOS = 'ROTATE_TETRIMINOS';
export const LAST_MOVE = 'LAST_MOVE';
export const HARD_DROP = 'HARD_DROP';
export const CLEAR_LINE = 'CLEAR_LINE';
export const SEND_FREEZE_LINE = 'SEND_FREEZE_LINE';
export const FREEZE_LINE = 'FREEZE_LINE';
export const MANAGE_PIECES_STOCK = 'MANAGE_PIECES_STOCK';
export const NEW_PIECES_FROM_SOCKET = 'NEW_PIECES_FROM_SOCKET';
export const SEND_SPECTRE = 'SEND_SPECTRE';
export const RECEIVE_NEW_SPECTRE = 'RECEIVE_NEW_SPECTRE';
export const DATA_FROM_SOCKET = 'DATA_FROM_SOCKET';


export const startGame = (room, curRandNb, nextRandNb) => {

    const { shapeTypes } = gameConstants;
    const currentShape = shapeTypes[curRandNb];
    const nextShape = shapeTypes[nextRandNb];

    return {
        type: START_GAME,
        currentShape,
        nextShape,
        room
    }
};

export const sendStartGame = (room) => {
    console.log('dans SEND_START_GAME ', room)
    return {
        type: SEND_START_GAME,
        room
    }
};

export const stopGame = () => {
    return {
        type: STOP_GAME
    }
};

// export const restart = () => {
//     return {
//         type: RESTART
//     }
// };

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

export const sendLoginRoom = (login, room) => {
    return {
        type: SEND_LOGIN_ROOM,
        login,
        room
    }
};

export const getPlayerStatus = () => {
    return {
        type: GET_PLAYER_STATUS
    }
};

export const getGamesList = (l) => {

    return {
        type: GET_GAMES_LIST,
    }
};

export const newTetriminos = (currentTetriminos, nextTetriminos, nextRandNb) => {
    const { shapeTypes } = gameConstants;
    const nextShape = shapeTypes[nextRandNb];

    return {
        type: NEW_TETRIMINOS,
        currentTetriminos,
        nextTetriminos,
        nextRandNb,
        nextShape
    };
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

export const setLastMove = () => {
    return {
        type: LAST_MOVE
    }
};

export const hardDrop = () => {
    return {
        type: HARD_DROP
    }
};

export const clearLine = () => {
    return {
        type: CLEAR_LINE
    }
};

export const sendFreezeLine = (room, login) => {
    return {
        type: SEND_FREEZE_LINE,
        room,
        login
    }
};

export const freezeLine = () => {
    return {
        type: FREEZE_LINE
    }
};

export const managePiecesStock = (room, piecesStock) => {
    return {
        type: MANAGE_PIECES_STOCK,
        room,
        piecesStock
    }
};

export const sendSpectre = (spectre, room, login) => {
    return {
        type: SEND_SPECTRE,
        spectre,
        room,
        login
    }
};