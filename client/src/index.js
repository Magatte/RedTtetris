import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store/index';
import Game from './components/game.js';
import './index.css';
import io from 'socket.io-client';

export const socket = io.connect('http://localhost:8000');
socket.emit('connection')
socket.on('start', (data)=>{

    console.log('data', data)
});
ReactDOM.render(
    <Provider store={store}>
        <Game />
    </Provider>,
    document.getElementById('root')
);
