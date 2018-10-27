import React from 'react';
import { connect } from 'react-redux';
import lifecycle from 'react-pure-lifecycle';
import Board from './board.js';
import { startGame } from '../redux/actions';
import { newTetriminos } from '../redux/actions';
import Menu from './menu.js';

const methods = {
    componentDidMount(props) {
    } 
};


function Game(props) {
    const squares = props.gameStatus === 'IDLE' || props.gameStatus === undefined ? props.emptyGrid : props.currentTetriminos.shape;
    const color = props.currentColor;
    console.log(squares);
    
    function Start() {
        props.startGame();
        setInterval(() => {
            props.newTetriminos(props.currentTetriminos, props.nextTetriminos)
        }, 2000);
    }
    
    
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
                <div className='menu'>console.log(squares);
                    <Menu 
                        onClick={Start}
                        newTetriminos={props.newTetriminos}
                        currentTetriminos={props.currentTetriminos}
                        nextTetriminos={props.nextTetriminos}
                    />
                </div>
                <ol> {/* TODO */} </ol>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
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

// Game =  lifecycle(methods)(Game);
export default connect(mapStateToProps, mapActionsToProps)(lifecycle(methods)(Game));
