import React from 'react';
import Square from './square.js';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(3).fill(null).map(()=>Array(3).fill(null)),
            xIsNext: true
        };
    };

    handleClick(x, y) {
        const squares = this.state.squares.slice(); // Make copy of squares
        squares[x, y] = this.state.xIsNext ? 'X' : 'O'; 
        this.setState({
            squares: squares, // Set the new square
            xIsNext: !this.state.xIsNext // Set the next player
        });
    }

    renderSquare(x, y) {
        return (
            <Square 
                value={this.state.squares[x][y]}
                onClick={() => this.handleClick(x, y)}    
            />
        );
    }

    render() {
        const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

        return (
            <div>
                <div className='status'>{status}</div>
                <div>
                    <div className='board-row'>
                        {this.renderSquare(0, 0)}
                        {this.renderSquare(0, 1)}
                        {this.renderSquare(0, 2)}
                    </div>
                    <div className='board-row'>
                        {this.renderSquare(1, 0)}
                        {this.renderSquare(1, 1)}
                        {this.renderSquare(1, 2)}
                    </div>
                    <div className='board-row'>
                        {this.renderSquare(2, 0)}
                        {this.renderSquare(2, 1)}
                        {this.renderSquare(2, 2)}
                    </div>
                </div>
            </div>
        );
    };
};

export default Board;