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
import Spectres from './spectres.js';
import history from '../history';
const { initialGrid } = gameConstants;


const methods = {
    componentDidMount(props) {
        props.getPlayerStatus();
    },
    componentDidUpdate(prevProps, prevState) {
        //console.log('PREVPROPS',prevProps)
        //console.log('PREVSTATEj',prevState)

        //const actualRoomName = prevProps.user.room
        const gamePieces = prevProps.rooms.find(room => room.name === prevProps.user.room);
        /*const actualRoomData = prevProps.rooms.find(room => room.name === actualRoomName)
        const oldRoomData = prevState.rooms.find(room => room.name === actualRoomName)

        let actualRoomLength = 0
        let oldRoomLenght = 0
        if(actualRoomData)
            actualRoomLength = actualRoomData.spectres.length
        if(actualRoomData)
            oldRoomLenght = actualRoomData.spectres.length
        if(actualRoomLength !== oldRoomLenght)*/

        if (!prevProps.activeTetriminos.isPlace && prevProps.gameStatus === 'PLAYING') {
            prevProps.gameOver(prevProps.user.room);
        }

        if (prevProps.status === 'START_GAME' && prevProps.status !== prevState.status)
            prevProps.loadGame(prevProps.user.room, gamePieces.piecesStock)

        if (prevProps.status === 'STOP_GAME')
            history.push('/')
    }
};


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
                    action={() => stopGame(user)}
                >
                    QUIT
                </AwesomeButton>
            </p>
        </div>
    );
}

const Game = (props) => {

    if (!props.user.login)
        history.push('/')

    let square = null;

    if (props.gameStatus === 'IDLE')
        square = initialGrid;
    else {
        square = props.activeTetriminos.newGrid;
        let oldPos = props.currentTetriminos.oldPos;
        let pos = props.currentTetriminos.pos;
        for (let i = 0; i < 4; i++) {
            square[oldPos[i].x][oldPos[i].y] = 0;
        }
        props.currentTetriminos.ghost = getGhost(pos, square);
    }

    return (
        <div id='game'>
            {props.gameStatus === 'GAME_OVER' && gameOverlay(props.user, props.restart, props.stopGame)}
            <div className='game-info'>
                <div id='spectres'>
                    <Spectres
                        user={props.user}
                        gameData={props.gameData}
                    />
                </div>
            </div>
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
            <div className='game-info'>
                <div id='menu'>
                    <Menu
                        goToHome={() => { history.push('/') }}
                        pauseTitle={props.gameStatus === 'PAUSED' ? 'UNPAUSE' : 'PAUSE'}
                        sendStart={props.gameStatus === 'IDLE' && props.sendStart}
                        pauseGame={props.gameStatus === 'PAUSED' ? props.unpauseGame : props.pauseGame}
                        stopGame={props.stopGame}
                        user={props.user}
                        gameStatus={props.gameStatus}
                        gameData={props.gameData}
                        launchGame={props.launchGame}
                        time={props.time}
                    />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    const gameData = state.games.rooms.find(room => room.name === state.user.room)
    return {
        gameStatus: state.gameStatus,
        activeTetriminos: state.activeTetriminos,
        currentTetriminos: state.currentTetriminos,
        currentColor: state.currentTetriminos.color,
        nextTetriminos: state.nextTetriminos,
        user: state.user,
        status: state.socket.status,
        rooms: state.games.rooms,
        time: state.time,
        gameData
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        launchGame: bindActionCreators(launchGame, dispatch),
        loadGame: bindActionCreators(loadGame, dispatch),
        pauseGame: bindActionCreators(pauseGame, dispatch),
        unpauseGame: bindActionCreators(unpauseGame, dispatch),
        gameOver: bindActionCreators(gameOver, dispatch),
        stopGame: bindActionCreators(stopGame, dispatch),
        restart: bindActionCreators(restart, dispatch),
        getPlayerStatus: bindActionCreators(getPlayerStatus, dispatch)
    }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle(methods)
)(Game);
