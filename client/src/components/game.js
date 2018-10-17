import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from './board.js';
import { startGame } from '../redux/actions';
import { newTetriminos } from '../redux/actions';
import store from '../redux/store/index.js';

function Game(props) {
    
    // console.log('SALUT');
    function start() {
        props.startGame();
    }

    console.log(props.currentTetriminos);
    const squares = props.currentTetriminos !== undefined ? props.currentTetriminos : props.grid;
    const color = props.currentColor;

    return (
        <div className='game'>
            <div className='game-board'>
                <Board 
                    squares={squares}
                    status={props.gameStatus}
                    color={color}
                    onClick={start}
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
        currentTetriminos: state.currentTetriminos.shape,
        currentColor: state.currentTetriminos.color
    }
};

const mapActionsToProps = {
    startGame: startGame,
    newTetriminos: newTetriminos
};

export default connect(mapStateToProps, mapActionsToProps)(Game);