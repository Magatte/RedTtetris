import React from 'react';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/themes/theme-bojack.css';
import gameConstants from '../redux/constants/gameConstants'
import storesConstants from '../redux/constants/storesConstans';
import Square from './square.js';
const { shapeTypes, colors } = gameConstants;
const { miniTetriminos } = storesConstants;

const PreviewNextTetriminos = (props) => {
    if (props.piecesStock === undefined)
        return null

    const renderSquare = (squares, x, y, key) => {
        return (
            <Square
                key={key}
                color={colors[squares[x][y]]}
                value={squares[x][y]}
            />
        );
    }

    const createBoard = (squares) => {
        const board = squares.map((row, j) => {
            let rowKey = j;
            return (
                <div className='menu-board-row' key={rowKey}>
                    {row.map((curr, i) => {
                        let squareKey = rowKey * 4 + i;
                        return renderSquare(squares, j, i, squareKey);
                    })}
                </div>
            );
        });
        return board;
    };

    return (
        <div>
            {
                props.piecesStock.map((tetriNumber, index) => {
                    let name = shapeTypes[tetriNumber];
                    let miniTetri = miniTetriminos[name].shape;
                    return (
                        index < 3
                        &&
                        <div className='menu-board' key={index}>
                            <div>
                                {createBoard(miniTetri)}
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

const UserScore = (props) => {
    return (
        <div id= 'score' >
            <h3> Score </h3>
            <h3> { props.score } </h3>
        </div>
    );
}

const Menu = (props) => {

    if(props.gameData && props.gameData.spectres) {
        const spectres = [...props.gameData];
    }

    return (
        <div className='start'>

            {props.user.status === 'master' &&
                <div className='menu-button'>
                    <AwesomeButton
                        type="primary"
                        size="medium"
                        action={() => props.launchGame && props.launchGame(props.user.room)}
                    >
                        START
                    </AwesomeButton>
                </div>
            }

            <div className='menu-button'>
                <AwesomeButton
                    type="primary"
                    size="medium"
                    action={() => props.pauseGame()}
                >
                    {props.pauseTitle}
                </AwesomeButton>
            </div>

            <div className='menu-button'>
                <AwesomeButton
                    type="primary"
                    size="medium"
                    action={() => {
                        props.stopGame(props.user);
                        return props.goToHome();
                    }}
                >
                    QUIT
                </AwesomeButton>
            </div>

            {
                props.gameStatus !== 'IDLE'
                && <PreviewNextTetriminos piecesStock={props.user.piecesStock} />
            }

            {
                props.gameStatus !== 'IDLE'
                && <UserScore score={props.user.score} />
            }
            
        </div>
    );
}

export default Menu;
