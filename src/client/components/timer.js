import React from 'react';

// const startTimer = () => {
//     setInterval(() => {
//         tick();
//     }, 1000);
// }

// const pauseTimer = () => {

// }

// const stopTimer = () => {

// }

const Timer = (props) => {
    return (
        <div className='menu-board'>
            {/* <h3>Time</h3> */}
            <h3>{props.time}</h3>
        </div>
    );
}

export default Timer;