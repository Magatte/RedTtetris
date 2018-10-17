import React from 'react';

function Square(props) {
    return (
        <div 
            className='square'
            // onChange={() => props.onChange()}
            style={{backgroundColor: props.color}}
        >
            {/* {props.value} */}
        </div>
    );
}

export default Square;