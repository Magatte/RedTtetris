import React from 'react';
import { connect } from 'react-redux';
import lifecycle from 'react-pure-lifecycle';
import { bindActionCreators } from 'redux';
import Board from './board.js';
import { loadGame } from '../utils/functions.js';
import { pauseGame, unpauseGame } from '../redux/actions';
import Menu from './menu.js';
import { getNewGrid } from '../utils/functions.js';

const methods = {
    componentDidMount(props) {
    } 
};


const Game = (props) => {
    // const squares = props.gameStatus === 'IDLE' || props.gameStatus === undefined ? props.activeTetriminos : getNewGrid(props.activeTetriminos, props.currentTetriminos);
    
    const switchAction = () => {
        console.log('Switch');
        if (props.gameStatus === 'PLAYING') {
            props.pauseGame();
            return 
        }
        return props.unpauseGame();
    }

    return (
        <div className='game'>
            <div className='game-board'>
                <Board 
                    squares={props.activeTetriminos}
                    pos={props.currentTetriminos.pos}
                    oldPos={props.currentTetriminos.oldPos}
                    status={props.gameStatus}
                    color={props.currentColor}
                    /* TODO : add tetriminos to get the shape */
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

// Game =  lifecycle(methods)(Game);
export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(methods)(Game));