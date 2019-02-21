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
                    let key = index;
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

const DisplaySpectre = (props) => {
    if (props.spectres.length === -1)
        return null

    const displayAllSpectres = props.spectres.map((data, key) => {
        return (
            <div key={key} style={{ marginLeft: 'auto', marginRight: 'auto', width: '100px', marginTop: '5%' }}>
                {data.name}<br />
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start', height: '120px', width: '100px', border: '1px solid red' }}>
                    {data.spectre.map((col, key) => {
                        const height = (col / 20) * 100
                        return (
                            <div key={key} style={{ backgroundColor: 'red', width: '10px', height: height + '%' }}></div>
                        )
                    })
                    }
                </div>
            </div>
        )
    });

    return (
        <div>
            {displayAllSpectres}
        </div>
    );
}

const Menu = (props) => {

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

            <div className='home-button'>
                <AwesomeButton
                    type="primary"
                    size="medium"
                    action={() => props.goToHome()}
                >
                    HOME
                </AwesomeButton>
            </div>

            {
                props.gameStatus === 'PLAYING'
                && <PreviewNextTetriminos piecesStock={props.user.piecesStock} />
            }
            {
                props.gameData && props.gameData.spectres
                && <DisplaySpectre
                    spectres={props.gameData.spectres}
                    userName={props.user.name}
                />
            }

        </div>
    );
}

export default Menu;
