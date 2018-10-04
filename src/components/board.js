import React from 'react';
import Square from './square.js';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(20).fill(null).map(()=>Array(10).fill(null)),
            tetriminos: Array(4).fill(null),
            start: {x: 0, y: 4},
            pos: {x: 1, y: 4},
        };
    };

    showTetriminos(x, y) {
        const squares = this.state.squares.slice(); // Make copy of squares
        squares[x][y] = (x === this.state.pos.x - 1 && y === this.state.pos.y ? '#51B2E8' : '#fff');
        this.setState({
            squares: squares, // Set the new square
        });
    };

    renderSquare(x, y) {
        return (
            <Square
                value={this.state.pos.x -1}
                color= {x === this.state.pos.x - 1 && y === this.state.pos.y ? '#51B2E8' : '#fff'}
                onChange={() => this.showTetriminos(x, y)}
                // color= {x === this.state.pos.x && y === this.state.pos.y ? '#51B2E8' : '#fff'} 
            />
        );
    };

    createBoard() {
        const b = new Array(20).fill(null).map(() => Array(10).fill(null));

        const board = b.map((row, j) => {
            return (
                <div className='board-row'>
                    {row.map((curr, i) => {return this.renderSquare(j, i)})}
                </div>
            );
        });
        return board;
    };

    componentDidMount() {
        this.interval = setInterval(() => 
            this.setState({ pos: {x: (this.state.pos.x % 20) + 1, y: 4}}),
            1000
        );
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const status = 'Player 1';
    
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