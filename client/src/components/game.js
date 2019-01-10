import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import lifecycle, { componentWillReceiveProps } from 'react-pure-lifecycle';
import { bindActionCreators, compose } from 'redux';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-bojack.css';
import Board from './board.js';
import { loadGame, restart, getGhost } from '../utils/gamePlay.js';
import { pauseGame, unpauseGame, gameOver, stopGame } from '../redux/actions';
import gameConstants from '../redux/constants/gameConstants';
import Menu from './menu.js';
const { initialGrid } = gameConstants;


const methods = {
    componentDidUpdate({ activeTetriminos, gameStatus, gameOver, loadGame, stopGame }) {
        if (!activeTetriminos.isPlace && gameStatus === 'PLAYING')
            gameOver();
        if (gameStatus === 'RESTART')
            stopGame();
    }
};

// BUGS
// left snake bug
// latency for ghost
const Game = (props) => {
    let square = null;
    let ghost = null;
    
    const restart = () => {
        props.restart();
        // props.loadGame();
    }

    if (props.gameStatus === 'IDLE')
        square = initialGrid;
    else {
        square = props.activeTetriminos.newGrid;
        props.currentTetriminos.ghost = getGhost(props.currentTetriminos.pos, square);
    }

    return (
        <div id='game'>
            {
                props.gameStatus === 'GAME_OVER' && 
                <div className='game-overlay'>
                    <p> GAME OVER </p>
                    <p id='overlay-buttons'>
                        <AwesomeButton
                            className='restart'
                            type='primary'
                            size='medium'
                            action={() => props.restart()}
                        >
                            RESTART
                        </AwesomeButton>
                        <AwesomeButton
                            className='restart'
                            type='primary'
                            size='medium'
                            action={() => props.stopGame()}
                        >
                            QUIT
                        </AwesomeButton>
                    </p>
                </div>
            }
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
                        loadGame={props.gameStatus === 'IDLE' && props.loadGame }
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
        gameOver: bindActionCreators(gameOver, dispatch),
        stopGame: bindActionCreators(stopGame, dispatch),
        restart: bindActionCreators(restart, dispatch)
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle(methods)
)(Game);