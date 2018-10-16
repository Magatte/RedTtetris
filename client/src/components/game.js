import React from 'react';
import { connect } from 'react-redux';
import Board from './board.js';
import { startGame } from '../redux/actions';
import { newTetriminos } from '../redux/actions';
import store from '../redux/store/index.js';

function Game(props) {
    props.startGame();
    console.log(props.current);
    const squares = props.grid;
    // console.log(state.activeTetriminos);
    var pos = {x: 1, y: 4};
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
    return {
        grid: state.activeTetriminos,
        current: state.currentTetriminos.shape
    }
};

const mapActionsToProps = {
    startGame: startGame,
    newTetriminos: newTetriminos
};

export default connect(mapStateToProps, mapActionsToProps)(Game);