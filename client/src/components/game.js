import React from 'react';
import { connect } from 'react-redux';
import Board from './board.js';
import { startGame } from '../redux/actions';
import { newTetriminos } from '../redux/actions';

function Game(props) {
    
    console.log(props);

    const squares = props.startGame();
    const myBoard = newTetriminos(squares.currentShape, squares.nextShape);
    var pos = {x: 1, y: 4};
    console.log(squares);

    return (
        <div className='game'>
            <div className='game-board'>
                <Board 
                    squares={myBoard}
                    start={{x: 0, y: 4}}
                    pos={pos}
                    status={props.gameStatus}
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