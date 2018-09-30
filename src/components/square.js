import React from 'react';

function Square(props) {
    return (
        <button 
            className='square'
            onClick={() => props.onClick()}
            style={{backgroundColor: props.color}}
        >
            {props.value}
        </button>
    );
}
const style = {
    background: '#51B2E8'
};
export default Square;