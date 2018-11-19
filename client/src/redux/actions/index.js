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
export const ROTATE = 'ROTATE';
export const ROTATE_TETRIMINOS = 'ROTATE_TETRIMINOS';
export const HARD_DROP = 'HARD_DROP';
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

export const rotate = () => {
    return {
        type: ROTATE_TETRIMINOS
    }
};

export const hardDrop = () =>{
    return {
        type: HARD_DROP
    }
}

export const moveTetriminos = (direction) => (
    function (dispatch, getState) {
        const { gameStatus, currentTetriminos, nextTetriminos } = getState();
        let edge = null;

        edge = checkCollision( currentTetriminos.shape, currentTetriminos.pos)
        if (edge.x === false)
            return dispatch(newTetriminos(currentTetriminos, nextTetriminos))

        if (gameStatus === 'PAUSED' || gameStatus === 'GAME_OVER'  )
            return ;

        switch(direction) {
            case 'down':
                if (edge.x === true)
                    dispatch(moveDown());
                break ;
            case 'right':
                if (edge.yr === true)
                    dispatch(moveRight());
                break ;
            case 'left':
                if (edge.yl === true)
                    dispatch(moveLeft());
                break ;
            case 'rotate':
                if(currentTetriminos.name === 'square'){
                    return ;
                }
                dispatch(rotate())
                break;
            case 'drop':
                dispatch(hardDrop())
                break;
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
            console.log('code', e.keyCode)
            switch(e.keyCode) {
                case 32:
                    dispatch(moveTetriminos('drop'));
                    break ;
                case 37:
                    dispatch(moveTetriminos('left'));
                    break ;
                case 38:
                    dispatch(moveTetriminos('rotate'));
                    break;
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
        setInterval(() => {
            dropTetriminos(dispatch, getState);
        }, 1000);
        //     {props.title}
        // </AwesomeButton>
        window.addEventListener('keydown', handleMove);
    }
};

const checkCollision = (arr, pos) => {
    let edge = {x: true, yl: true, yr: true};
    for (let i = 0; i < 4; i++) {
        // if (arr[pos[i].x][pos[i].y] !== 0)
        //     return false;
        let pointX = {x:pos[i].x + 1, y:pos[i].y};
        let pointYl = {x:pos[i].x, y:pos[i].y - 1};
        let pointYr = {x:pos[i].x, y:pos[i].y + 1};
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

const dropTetriminos = (dispatch, getState) => {
    const { gameStatus, currentTetriminos, nextTetriminos } = getState();

    if (gameStatus !== 'PAUSED' && gameStatus !== 'GAME_OVER') {
        dispatch(moveTetriminos('down'));
    }
}
