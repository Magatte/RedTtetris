import React from 'react';
import Board from './board.js';

class Game extends React.Component {
    render() {
        return (
            <div className='game'>
                <div className='game-board'>
                    <Board />
                </div>
                <div className='game-info'>
                    <div>{/* TODO */}</div>
                    <ol> {/* TODO */} </ol>
                </div>
            </div>
        );
    };
};

export default Game;