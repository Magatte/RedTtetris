import React from 'react';
import Board from './board.js';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return { squares: state.squares };
}

function ConnectedGame(props) {
    
    // const squares = Array(20).fill(null).map(()=>Array(10).fill(null));
    // var pos = {x: 1, y: 4};

    // function showTetriminos() {
    //     pos.x = pos.x % 20 + 1;
    //     return pos;
    // }

    // setInterval(showTetriminos, 1000);

    return (
        <div className='game'>
            <div className='game-board'>
                <Board 
                    squares={squares}
                    tetriminos={Array(4).fill(null)}
                    start={{x: 0, y: 4}}
                    pos={pos}
                />
            </div>
            <div className='game-info'>
                <div>{/* TODO */}</div>
                <ol> {/* TODO */} </ol>
            </div>
        </div>
    );
};

const Game = connect(mapStateToProps)(ConnectedGame);

export default Game;