import React from 'react';
import { connect } from 'react-redux';
import lifecycle from 'react-pure-lifecycle';
import Board from './board.js';
import { startGame } from '../redux/actions';
import { newTetriminos } from '../redux/actions';
import Menu from './menu.js';

const methods = {
    componentDidUpdate(props) {
        if (props.gameStatus === 'PLAYING') {
            setInterval(() => {
                props.newTetriminos(props.currentTetriminos, props.nextTetriminos)
            }, 2000);
        }
    } 
 }

function Game(props) {

    const squares = props.gameStatus === 'IDLE' || props.gameStatus === undefined ? props.emptyGrid : props.currentTetriminos.shape;
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
                <div className='menu'>
                    <Menu 
                        onClick={props.startGame}
                        newTetriminos={props.newTetriminos}
                        currentTetriminos={props.currentTetriminos}
                        nextTetriminos={props.nextTetriminos}
                    />
                </div>
                <ol> {/* TODO */} </ol>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    console.log(state);
    return {
        gameStatus: state.gameStatus,
        emptyGrid: state.activeTetriminos,
        currentTetriminos: state.currentTetriminos,
        currentColor: state.currentTetriminos.color,
        nextTetriminos: state.nextTetriminos,
    }
};

const mapActionsToProps = {
    startGame,
    newTetriminos,
};

Game =  lifecycle(methods)(Game);
export default connect(mapStateToProps, mapActionsToProps)(Game);
