import React from 'react';
import Square from './square.js';

function Board(props) {

    function renderSquare(x, y, key) {
        return (
            <Square
                key={key}
                value={props.pos.x - 1}
                color= {x === props.pos.x - 1 && y === props.pos.y ? '#51B2E8' : '#fff'}
                onChange={() => this.showTetriminos(x, y)}
            />
        );
    };

    function createBoard() {
        const b = props.squares;

        console.log(typeof b);
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