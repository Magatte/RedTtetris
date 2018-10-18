import React from 'react';
import { Button } from './utils.js';

function Menu(props) {
    return (
        <div className='startGame'>
            <Button
                onClick={props.onClick}
                title='START'
            />
        </div>
    );
}

export default Menu;