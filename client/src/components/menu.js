import React from 'react';

const Menu = (props) => {
    //console.log('props dans Menu', props)
    return (
        <div className='start'>
            {props.user.status === 'master'
                ?     <button
                    onClick={() => props.loadGame(props.user.room, props.piecesStock)}
                >
                    START
                </button>
                :null}

            <button
                onClick={() => props.pauseGame()}
            >
                {props.pauseTitle}
            </button>
            <button onClick={props.goToHome}>HOME</button>
        </div>
    );
}

export default Menu;
