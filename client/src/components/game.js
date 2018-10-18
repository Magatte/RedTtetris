import React from 'react';
import { connect } from 'react-redux';
import Board from './board.js';
import { startGame } from '../redux/actions';
import { newTetriminos } from '../redux/actions';
import Menu from './menu.js';

function Game(props) {
    
    const squares = props.gameStatus == 'IDLE' || props.gameStatus == undefined ? props.emptyGrid : props.currentTetriminos.shape;
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
                <div className='startGame'>
                    <Menu 
                        onClick={props.startGame}
                        />
                </div>
                <ol> {/* TODO */} </ol>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        gameStatus: state.gameStatus,
        emptyGrid: state.activeTetriminos,
        currentTetriminos: state.currentTetriminos,
        currentColor: state.currentTetriminos.color
    }
};

const mapActionsToProps = {
    startGame,
    newTetriminos,
};

export default connect(mapStateToProps, mapActionsToProps)(Game);