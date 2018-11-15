import React from 'react';
import Square from './square.js';
import {checkIndexValue} from '../redux/reducers/index'
function Board(props) {

    const canPlacePiece =(arr) =>{
        let pos = props.pos;
        let oldPos = props.oldPos;

        for (let i = 0; i < 4; i++) {
            if(arr[oldPos[i].x][oldPos[i].y] !== 0){
                return false
            }
        }
        return true
    }

    function setNewPosition(arr) {
        let pos = props.pos;
        let oldPos = props.oldPos;


        if (!pos || !oldPos )
            return ;
        for (let i = 0; i < 4; i++) {
            arr[oldPos[i].x][oldPos[i].y] = 0;
        }

        for (let i = 0; i < 4; i++) {
            arr[pos[i].x][pos[i].y] = 1
        }


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
