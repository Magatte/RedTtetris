import React from 'react';
import { connect } from 'react-redux';
import lifecycle from 'react-pure-lifecycle';
import { bindActionCreators, compose } from 'redux';
import Board from './board.js';
import { loadGame, getGhost } from '../utils/gamePlay.js';
import { pauseGame, unpauseGame, gameOver } from '../redux/actions';
import gameConstants from '../redux/constants/gameConstants';
import Menu from './menu.js';
const { initialGrid } = gameConstants;


const methods = {
    componentDidUpdate({ activeTetriminos, gameStatus, gameOver }) {
        if (!activeTetriminos.isPlace && gameStatus === 'PLAYING')
            gameOver();
    }
};

// BUGS
// left snake bug
// latency for ghost
const Game = (props) => {
    let square = null;
    let ghost = null;
    if (props.gameStatus === 'IDLE')
        square = initialGrid;
    else {
        square = props.activeTetriminos.newGrid;
        props.currentTetriminos.ghost = getGhost(props.currentTetriminos.pos, square);
    }

    return (
        <div id='game'>
            {props.gameStatus === 'GAME_OVER' && <div className='game-overlay'>GAME OVER</div>}
            <Board 
                squares={square}
                name={props.currentTetriminos.name}
                pos={props.currentTetriminos.pos}
                oldPos={props.currentTetriminos.oldPos}
                status={props.gameStatus}
                ghost={props.currentTetriminos.ghost}
                oldGhost={props.currentTetriminos.oldGhost}
                initialPos={props.currentTetriminos.initialPos}
                isPlace={props.activeTetriminos.isPlace}
            />
            <div id='game-info'>
                <div id='menu'>
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
        unpauseGame: bindActionCreators(unpauseGame, dispatch),
        gameOver: bindActionCreators(gameOver, dispatch)
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle(methods)
)(Game);