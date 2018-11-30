import React from 'react';
import { connect } from 'react-redux';
import lifecycle from 'react-pure-lifecycle';
import { bindActionCreators } from 'redux';
import Board from './board.js';
import { loadGame } from '../utils/gamePlay.js';
import { pauseGame, unpauseGame } from '../redux/actions';
import Menu from './menu.js';


const methods = {
    componentDidMount(props) {
    }
};

const Game = (props) => {
    
    return (
        <div className='game'>
            <div className='game-board'>
                <Board 
                    squares={props.activeTetriminos.newGrid}
                    name={props.currentTetriminos.name}
                    pos={props.currentTetriminos.pos}
                    oldPos={props.currentTetriminos.oldPos}
                    status={props.gameStatus}
                    ghost={props.activeTetriminos.ghost}
                    oldGhost={props.activeTetriminos.oldGhost}
                />
            </div>
            <div className='game-info'>
                <div className='menu'>
                    <Menu 
                        pauseTitle={props.gameStatus === 'PAUSED' ? 'UNPAUSE' : 'PAUSE'}
                        loadGame={props.loadGame}
                        pauseGame={props.gameStatus === 'PAUSED' ? props.unpauseGame : props.pauseGame}
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
        activeTetriminos: state.activeTetriminos,
        currentTetriminos: state.currentTetriminos,
        currentColor: state.currentTetriminos.color,
        nextTetriminos: state.nextTetriminos,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadGame: bindActionCreators(loadGame, dispatch),
        pauseGame: bindActionCreators(pauseGame, dispatch),
        unpauseGame: bindActionCreators(unpauseGame, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(methods)(Game));