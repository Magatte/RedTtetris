import React from 'react';
import { connect } from 'react-redux';
import lifecycle from 'react-pure-lifecycle';
import Board from './board.js';
import { loadGame, pauseGame, unpauseGame } from '../redux/actions';
import Menu from './menu.js';
import { bindActionCreators } from 'redux';

const methods = {
    componentDidMount(props) {
    } 
};


function Game(props) {
    const squares = props.gameStatus === 'IDLE' || props.gameStatus === undefined ? props.emptyGrid : props.currentTetriminos.shape;
    
    function switchAction() {
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
                    squares={squares}
                    pos={props.currentTetriminos.pos}
                    offsetX={props.currentTetriminos.offsetX}
                    offsetY={props.currentTetriminos.offsetY}
                    status={props.gameStatus}
                    color={props.currentColor}
                    /* TODO : add tetriminos to get the shape */
                />
            </div>
            <div className='game-info'>
                <div className='menu'>console.log(squares);
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
        emptyGrid: state.activeTetriminos,
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