import React from 'react';
import Button from './utils.js';

function Menu(props) {
    return (
        <div className='start'>
            <button
                onClick={() => props.onClick()}
            >
                START
            </button>
            <button 
                onClick={() => props.newTetriminos(props.currentTetriminos, props.nextTetriminos)}
            >
                CHANGE
            </button>
        </div>
    );
}

export default Menu;