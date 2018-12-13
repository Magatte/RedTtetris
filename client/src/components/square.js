import React from 'react';

const Square = (props) => {

    const tetriminoStyle = {
        backgroundColor: props.value === 8 ? 'white' : props.color,
        borderStyle: props.value > 0 ? 'solid' : '',
        borderSize: props.value > 0 ? '2px' : '',
        borderColor: 'black',
        borderCollapse: 'collapsed'
    };

    return (
        <div 
            className='square'
            style={tetriminoStyle}
        >
            {/* {props.value} */}
        </div>
    );
}

export default Square;