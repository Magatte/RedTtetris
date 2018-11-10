import React from 'react';
import Square from './square.js';

function Board(props) {
    
    function setNewPosition(arr) {
        let pos = props.pos;
        let offsetX = props.offsetX;
        let offsetY = props.offsetY;

        if (!pos)
            return ;
        for (let i = 0; i < 4; i++) {
            arr[pos[i].x][pos[i].y] = 0;
        }
        for (let i = 0; i < 4; i++) {
            arr[pos[i].x][pos[i].y] = 1
        }
        // arr = arr.map((row, i) => {
        //     row.map((sq, j) => {
        //         if (sq === 1) {
        //             sq = 0;
        //         }
        //         arr[i + props.posX][j + props.posY] = 1
        //         arr[i][j] = 0;
        //         return sq;
        //     });
        //     return row;
        // })
        console.log(arr);
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

        setNewPosition(b);
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