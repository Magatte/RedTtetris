import React from 'react';

const getTimeFormat = (time) => {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor(time / 60);
    let S = time - (hours * 3600 + minutes * 60);
    
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (S < 10) {S = "0"+ S;}
    let H = hours == 0 ? "" : hours + ":";
    let M = minutes == 0 ? "" : minutes + ":";
    return (H + M + S);
}

const Timer = (props) => {
    return (
        <div id="timer">
            <h3> Time </h3>
            <h3>{getTimeFormat(props.time)}</h3>
        </div>
    );
}

export default Timer;