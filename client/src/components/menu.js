import React from 'react';
import Button from './utils.js';

function Menu(props) {
    return (
        <div className='start'>
            <Button
                onClick={props.onClick}
                title='START'
            />
            <button 
                onClick={() => props.changeTetriminos(props.currentTetriminos, props.nextTetriminos)}
            >
                CHANGE
            </button>
        </div>
    );
}

export default Menu;