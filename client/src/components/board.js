import React from 'react';
import Square from './square.js';

const Board = (props) => {


  const setNewPosition = (arr) => {
    let pos = props.pos;
    let oldPos = props.oldPos;

    if (!pos || !oldPos) {
      return;
    }
    for (let i = 0; i < 4; i++) {
      arr[oldPos[i].x][oldPos[i].y] = 0;
    }
    for (let i = 0; i < 4; i++) {
      arr[pos[i].x][pos[i].y] = 1
    }
  }

    //getLowerPoint(pos, arr)


  const renderSquare = (x, y, key) => {
    let color = '#fff'
      switch (props.squares[x][y]) {
          case 1:
          color =  props.color;
          break;
        case 8:
            color =  '#A74ACC';
            break;
    }
    return (
      <Square
        key={key}
        color={color}
      />
    );
  };

  const createBoard = () => {
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
