import React from 'react';

function Square(props) {
    return (
        <div 
            className='square'
            onChange={() => props.onClick()}
            style={{backgroundColor: props.color}}
        >
            {/* {props.value} */}
        </div>
    );
}
const style = {
    background: '#51B2E8'
};

export default Square;