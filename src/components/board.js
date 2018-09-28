import React from 'react';
import Square from './square.js';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        };
    };

    handleClick(i) {
        const squares = this.state.squares.slice(); // Make copy of squares
        squares[i] = this.state.xIsNext ? 'X' : 'O'; 
        this.setState({
            squares: squares, // Set the new square
            xIsNext: !this.state.xIsNext // Set the next player
        });
    }

    renderSquare(i) {
        return (
            <Square 
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}    
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
                        {this.renderSquare(0)}
                        {this.renderSquare(1)}
                        {this.renderSquare(2)}
                    </div>
                    <div className='board-row'>
                        {this.renderSquare(3)}
                        {this.renderSquare(4)}
                        {this.renderSquare(5)}
                    </div>
                    <div className='board-row'>
                        {this.renderSquare(6)}
                        {this.renderSquare(7)}
                        {this.renderSquare(8)}
                    </div>
                </div>
            </div>
        );
    };
};

export default Board;