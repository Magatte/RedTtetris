import React from 'react';
import { connect } from 'react-redux';
import Board from './board.js';
import { startGame } from '../redux/actions';
import { newTetriminos } from '../redux/actions';

function Game(props) {
    
    console.log(props);

    props.startGame();
    const squares = props.activeTetriminos;
    var pos = {x: 1, y: 4};
    console.log(props);

    return (
        <div className='game'>
            <div className='game-board'>
                <Board 
                    squares={squares}
                    start={{x: 0, y: 4}}
                    pos={pos}
                    status={props.gameStatus}
                    /* TODO : add tetriminos to get the shape */
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

const mapActionsToProps = () => ({
    startGame: startGame,
    newTetriminos: newTetriminos
});

export default connect(mapStateToProps, mapActionsToProps)(Game);