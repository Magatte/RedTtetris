import React from 'react';
import { connect } from 'react-redux';
import lifecycle from 'react-pure-lifecycle';
import { bindActionCreators, compose } from 'redux';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-bojack.css';
import Board from './board.js';
import {
    loadGame,
    restart,
    getGhost,
    launchGame
} from '../utils/gamePlay.js';
import {
    pauseGame,
    unpauseGame,
    gameOver,
    stopGame,
    getPlayerStatus,
} from '../redux/actions';
import gameConstants from '../redux/constants/gameConstants';
import Menu from './menu.js';
import history from '../history';
const { initialGrid } = gameConstants;


const methods = {
    componentDidMount(props) {
        props.getPlayerStatus()
    },
    componentDidUpdate(prevProps, prevState) {
        // const gamePieces = prevProps.rooms.find(room => room.name === prevProps.user.room);

        if (!prevProps.activeTetriminos.isPlace && prevProps.gameStatus === 'PLAYING')
            prevProps.gameOver();

        if(prevProps.status === 'START_GAME' && prevProps.status !== prevState.status)
            prevProps.loadGame(prevProps.user.room);
    }
};

// BUGS
// left snake bug
// latency for ghost

const gameOverlay = (user, restart, stopGame) => {
    return (
        <div className='game-overlay'>
            <p> GAME OVER </p>
            <p id='overlay-buttons'>
                <AwesomeButton
                    className='restart'
                    type='primary'
                    size='medium'
                    action={() => restart()}
                >
                    RESTART
                </AwesomeButton>
                <AwesomeButton
                    className='restart'
                    type='primary'
                    size='medium'
                    action={() => stopGame(user.room, user.name)}
                >
                    QUIT
                </AwesomeButton>
            </p>
        </div>
    );
}

const Game = (props) => {

    let square = null;

    if (props.gameStatus === 'IDLE')
        square = initialGrid;
    else {
        square = props.activeTetriminos.newGrid;
        props.currentTetriminos.ghost = getGhost(props.currentTetriminos.pos, square);
    }
    const gameData = props.rooms.find(room => room.name === props.user.room)

    return (
        <div id='game'>
            { props.gameStatus === 'GAME_OVER' && gameOverlay(props.user, props.restart, props.stopGame) }
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
                user={props.user}
            />
            <div id='game-info'>
                <div id='menu'>
                    <Menu
                        goToHome={()=>{history.push('/')} }
                        pauseTitle={props.gameStatus === 'PAUSED' ? 'UNPAUSE' : 'PAUSE'}
                        sendStart={props.gameStatus === 'IDLE' && props.sendStart }
                        pauseGame={props.gameStatus === 'PAUSED' ? props.unpauseGame : props.pauseGame}
                        user={props.user}
                        gameStatus={props.gameStatus}
                        gameData={gameData}
                        launchGame={props.launchGame}
                    />
                </div>
                <ol> {/* TODO */} </ol>
            </div>
        </div>
    );
}

const mapStateToProps = state => {

    return {
        gameStatus        : state.gameStatus,
        activeTetriminos  : state.activeTetriminos,
        currentTetriminos : state.currentTetriminos,
        currentColor      : state.currentTetriminos.color,
        nextTetriminos    : state.nextTetriminos,
        user              : state.user,
        status            : state.socket.status,
        rooms             : state.games.rooms,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        launchGame      : bindActionCreators(launchGame, dispatch),
        loadGame        : bindActionCreators(loadGame, dispatch),
        pauseGame       : bindActionCreators(pauseGame, dispatch),
        unpauseGame     : bindActionCreators(unpauseGame, dispatch),
        gameOver        : bindActionCreators(gameOver, dispatch),
        stopGame        : bindActionCreators(stopGame, dispatch),
        restart         : bindActionCreators(restart, dispatch),
        getPlayerStatus : bindActionCreators(getPlayerStatus, dispatch)
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle(methods)
)(Game);
