import React from 'react';
import Square from './square.js';
import gameConstants from '../redux/constants/gameConstants.js';
const { shapeTypes, colors } = gameConstants;

const Board = (props) => {

    const { user } = props
    //console.log('props dans Board', props)
    const setNewPosition = (arr) => {
        let pos = props.pos;
        let oldPos = props.oldPos;
        let ghost = props.ghost;
        let oldGhost = props.oldGhost;

        if (!pos || !oldPos)
            return ;
        for (let i = 0; i < 4; i++) {
            arr[oldGhost[i].x][oldGhost[i].y] = 0;
            arr[oldPos[i].x][oldPos[i].y] = 0;
        }
        for (let i = 0; i < 4; i++) {
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
            <div className='status'>{props.status}</div>
            <div className='status'>
                <h1>Salut {user.login} {user.status
                    ? <p>tu es le  {user.status} de cette partie</p>:null}
                </h1>
            </div>
            <div>
                {createBoard()}
            </div>
        </div>
    );
  };

export default Board;
