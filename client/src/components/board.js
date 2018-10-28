import React from 'react';
import Square from './square.js';

function Board(props) {

    // function setNewPosition(arr) {
        
    // }

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

        // b = setNewPosition(b);
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