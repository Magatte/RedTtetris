import React from 'react';
import Square from './square.js';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(20).fill(null).map(()=>Array(10).fill(null)),
            start: {x: 0, y: 4},
            pos: {x: 0, y: 4},
            xIsNext: true
        };
    };

    handleClick(x, y) {
        const squares = this.state.squares.slice(); // Make copy of squares
        squares[x][y] = this.state.xIsNext ? 'X' : 'O'; 
        this.setState({
            squares: squares, // Set the new square
            xIsNext: !this.state.xIsNext // Set the next player
        });
    }

    renderSquare(x, y) {
        return (
            <Square 
                value={this.state.squares}
                onClick={() => this.handleClick(x, y)}
                color={x == this.state.pos.x && y == this.state.pos.y ? '#51B2E8' : '#fff'}  
            />
        );
    }

    createBoard() {
        const b = new Array(20).fill(null).map(() => Array(10).fill(null));

        const board = b.map((row, j, a) => {
            return (
                <div className='board-row'>
                    {row.map((curr, i, arr) => {return this.renderSquare(j, i)})}
                </div>
            );
        });
        return board;
    }

    render() {
        const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    
        return (
            <div>
                <div className='status'>{status}</div>
                <div>
                    {this.createBoard()}
                </div>
            </div>
        );
    };
};

export default Board;