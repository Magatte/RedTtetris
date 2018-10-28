import React from 'react';
import Square from './square.js';

function Board(props) {

    function setPosition(arr, x, y, val) {
        if (val === 1) {
            if (props.currentTetriminos.posX !== undefined && props.currentTetriminos.posX !== null)
                x = x + props.currentTetriminos.posX;
            if (props.currentTetriminos.posY !== undefined && props.currentTetriminos.posY !== null)
                y = y + props.currentTetriminos.posY;
        }
        return {x: x, y: y};
    }

    function renderSquare(x, y, key) {
        return (
            <Square
                key={key}
                color= { props.squares[x][y] === 1 ? props.color : '#fff' }
            />
        );
    };

    function createBoard() {
        const b = props.squares;

        const board = b.map((row, j) => {
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
            <div>
                {createBoard()}
            </div>
        </div>
    );

};

export default Board;