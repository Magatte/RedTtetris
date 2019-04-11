import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store/index';
import Game from './components/game.js';
import Home from './components/home';
import { Router, Route, Switch } from "react-router-dom";
import history from './history';
import './index.css';
// import io from 'socket.io-client';

//export const history = createBrowserHistory();

const game = () => <Game/>
const home = () => <Home/>

ReactDOM.render(
    <Provider store={store}>
        <Router  history={ history }>
            <Switch>
                <Route path="/" exact component={home} />
                <Route path="/:login"  component={game} />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);