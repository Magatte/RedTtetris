import React from 'react';
import Square from './square.js';
import gameConstants from '../redux/constants/gameConstants.js';
const { shapeTypes, colors } = gameConstants;

const Board = (props) => {

    const { user } = props
    
    const setNewPosition = (arr) => {
        let pos = props.pos;
        let oldPos = props.oldPos;
        let ghost = props.ghost;
        let oldGhost = props.oldGhost;

        if (!pos || !oldPos)
            return ;
        for (let i = 0; i < 4; i++) {
            arr[oldPos[i].x][oldPos[i].y] = 0;
            arr[oldGhost[i].x][oldGhost[i].y] = 0;
        }
        for (let i = 0; i < 4; i++) {
            console.log('GHOST', ghost);
            arr[ghost[i].x][ghost[i].y] = 8;
            arr[pos[i].x][pos[i].y] = shapeTypes.indexOf(props.name) + 1;
        }
    }

    const renderSquare = (x, y, key) => {

        return (
            <Square
                key={key}
                color={colors[props.squares[x][y]]}
                value={props.squares[x][y]}
            />
        );
    };

    const createBoard = () => {
        const squares = props.squares;

        if (props.isPlace)
            setNewPosition(squares);
        const board = squares.map((row, j) => {
            let rowKey = j;
            return (
                <div className='board-row' key={rowKey}>
                    {row.map((curr, i) => {
                        let squareKey = rowKey * 10 + i;
                        return renderSquare(j, i, squareKey);
                    })}
                </div>
            );
        });
        return board;
    };

    return (
        <div>
            <h2>
                Hello {user.login} 
                {user.status && <p>You're the {user.status} of this game</p>}
            </h2>
            <div className='status'>{props.status}</div>
            <div className="game-board">
                <div>
                    {createBoard()}
                </div>
            </div>
        </div>
    );
  };

export default Board;
