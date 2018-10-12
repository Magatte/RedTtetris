import React from 'react';
import { connect } from 'react-redux';
import Board from './board.js';
import { startGame } from '../redux/actions';
import { newTetriminos } from '../redux/actions';

function Game(props) {
    
    console.log(props);

    const squares = Array(20).fill(null).map(()=>Array(10).fill(null));
    var pos = {x: 1, y: 4};

    function showTetriminos() {
        pos.x = pos.x % 20 + 1;
        return pos;
    }

    setInterval(showTetriminos, 1000);

    return (
        <div className='game'>
            <div className='game-board'>
                <Board 
                    squares={squares}
                    tetriminos={Array(4).fill(null)}
                    start={{x: 0, y: 4}}
                    pos={pos}
                />
            </div>
            <div className='game-info'>
                <div>{/* TODO */}</div>
                <ol> {/* TODO */} </ol>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return state;
};

const mapActionsToProps = {
    startGame: startGame,
    newTetriminos: newTetriminos
};

export default connect(mapStateToProps, mapActionsToProps)(Game);