import React from 'react';

const Menu = (props) => {
    return (
        <div className='start'>
            <button
                onClick={() => props.loadGame()}
            >
                START
            </button>
            <button 
                onClick={() => props.pauseGame()}
            >
                {props.pauseTitle}
            </button>
        </div>
    );
}

export default Menu;