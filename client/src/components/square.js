import React from 'react';

const Square = (props) => {
    return (
        <div 
            className='square'
            style={{backgroundColor: props.color}}
        >
            {props.value}
        </div>
    );
}

export default Square;