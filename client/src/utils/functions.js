import { startGame, newTetriminos, rotate, moveDown, moveLeft, moveRight } from '../redux/actions/index.js';

export const moveTetriminos = (direction) => (
    function (dispatch, getState) {
        const { gameStatus, activeTetriminos, currentTetriminos, nextTetriminos } = getState();
        let state = getState();
        let edge = null;
        
        if (gameStatus === 'PAUSED' || gameStatus === 'GAME_OVER' )
            return ;

        edge = checkCollision(activeTetriminos, currentTetriminos.pos)
        if (edge.xb === false && state.lastMove) {
            state.lastMove = false;
            return dispatch(newTetriminos(currentTetriminos, nextTetriminos));
        }

        switch(direction) {
            case 'down':
                if (edge.xb === true)
                    dispatch(moveDown());
                else
                    state.lastMove = true;
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
                if (edge.xt && edge.xb && edge.yl && edge.yr)
                    dispatch(rotate())
                break;
            default:
                return ;
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

export const getNewGrid = (grid, currentTetriminos) => {
    let newGrid = grid.map((row, i, arr) => {
        row.map((sq, j) => {
            if (currentTetriminos.shape[i][j] === 1)
                arr[i][j] = 1;
            return arr[i][j];
        });
        return row;
    });    
    return newGrid;
}

export const loadGame = () => {
    console.log('About to start the game...');
    return (dispatch, getState) => {
        let state = getState();
        state.lastMove = false;
        dispatch(startGame());
        const handleMove = (e) => {
            e.preventDefault();
            switch(e.keyCode) {
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

export const checkCollision = (arr, pos) => {
    let edge = {xt: true, xb: true, yl: true, yr: true};
    
    for (let i = 0; i < 4; i++) {
        let pointX = {x:pos[i].x + 1, y:pos[i].y};
        let pointYl = {x:pos[i].x, y:pos[i].y - 1};
        let pointYr = {x:pos[i].x, y:pos[i].y + 1};

        // For each point of my tetriminos I check if the next square is out of bound or if it is occupied and not a point of the current tetriminos
        if (pos[i].x <= 0)
            edge.xt = false;
        else if (pos[i].x >= 19 || (arr[pos[i].x + 1][pos[i].y] === 1 && !pos.some(element => {return JSON.stringify(element) === JSON.stringify(pointX)})))
            edge.xb = false;
        else if (pos[i].y <= 0 || (arr[pos[i].x][pos[i].y - 1] === 1 && !pos.some(element => {return JSON.stringify(element) === JSON.stringify(pointYl)})))
            edge.yl = false;
        else if (pos[i].y >= 9 || (arr[pos[i].x][pos[i].y + 1] === 1 && !pos.some(element => {return JSON.stringify(element) === JSON.stringify(pointYr)})))
            edge.yr = false;
    }
    return edge;
}

export const dropTetriminos = (dispatch, getState) => {
    const { gameStatus } = getState();

    if (gameStatus !== 'PAUSED' && gameStatus !== 'GAME_OVER') {
        dispatch(moveTetriminos('down'));
    }
}