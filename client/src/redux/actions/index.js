import gameConstants from '../constants/gameConstants';
import store from '../store/index'
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

export const newTetriminos = (currentTetriminos, nextTetriminos) => {
    const { shapeTypes } = gameConstants;
    const nextRandNb = Math.floor(Math.random() * (7 - 0)) + 0; // Math.Random return a number between 0 (included) and 1 (excluded)
    const nextShape = shapeTypes[nextRandNb];

    return {
        type: NEW_TETRIMINOS,
        // currentTetriminos,
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

export const moveTetriminos = (direction) => (
    function (dispatch, getState) {
        const { gameStatus, currentTetriminos, nextTetriminos } = getState();
        let nextMove = false;

        nextMove = checkCollision( currentTetriminos.shape, currentTetriminos.pos)
        
        if (nextMove === 'dropped')
            return dispatch(newTetriminos(currentTetriminos, nextTetriminos))
        
        if (gameStatus === 'PAUSED' || gameStatus === 'GAME_OVER' )
            return ;

        switch(direction) {
            case 'down':
                if (nextMove !== 'dropped')
                    dispatch(moveDown());
                break ;
            case 'right':
                if (nextMove !== 'rightEdge')
                    dispatch(moveRight());
                break ;
            case 'left':
                if (nextMove !== 'leftEdge')
                    dispatch(moveLeft());
                break ;
            default:
                return ;
        }
    }
);

export const loadGame = () => {
    console.log('About to start the game...');
    return (dispatch, getState) => {
        dispatch(startGame());
        const handleMove = (e) => {
            e.preventDefault();
            switch(e.keyCode) {
                case 37:
                    dispatch(moveTetriminos('left'));
                    break ;
                case 39:
                    dispatch(moveTetriminos('right'));
                    break ;
                case 40:
                    dispatch(moveTetriminos('down'));
                    break ;
                default:
                    break ;
            }
        }
        // function handleRotation(e) {
        //     e.preventDefault();
        //     switch(e.keyCode) {
        //         case 38:
        //             dispatch(rotateTetriminos());
        //             break ;
        //         default:
        //             break ;
        //     }
        // }
        setInterval(() => {
            dropTetriminos(dispatch, getState);
        }, 1000);
        window.addEventListener('keydown', handleMove);
        // window.addEventListener('keydown', handleRotation);
    }
};

const checkCollision = (arr, pos) => {
    for (let i = 0; i < 4; i++) {
        // if (arr[pos[i].x][pos[i].y] !== 0)
        //     return false;
        if (pos[i].x >= 19)
            return 'dropped'
        else if (pos[i].y <= 0)
            return 'leftEdge';
        else if (pos[i].y >= 9)
            return 'rightEdge'
    }
    return true;
}

const dropTetriminos = (dispatch, getState) => {
    const { gameStatus, currentTetriminos, nextTetriminos } = getState();

    if (gameStatus !== 'PAUSED' && gameStatus !== 'GAME_OVER') {
        dispatch(moveTetriminos('down'));
    }
}