import React from 'react';
import { connect } from 'react-redux';
import Board from './board.js';
import { startGame } from '../redux/actions';
import { newTetriminos } from '../redux/actions';

function Game(props) {
    
    props.startGame();
    console.log(props.current);
    const squares = props.grid;
    const color = props.currentColor;

    return (
        <div className='game'>
            <div className='game-board'>
                <Board 
                    squares={squares}
                    status={props.gameStatus}
                    color={color}
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
        current: state.currentTetriminos
    }
};

const mapActionsToProps = {
    startGame: startGame,
    newTetriminos: newTetriminos
};

export default connect(mapStateToProps, mapActionsToProps)(Game);