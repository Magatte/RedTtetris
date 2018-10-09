import store from './store/index';
import { newTetriminos } from './actions/index';
import { startGame } from './actions/index';
import { stopGame } from './actions/index';
import { pauseGame } from './actions/index';
import { unpauseGame } from './actions/index';
import { gameOver } from './actions/index';
import { clearLine } from './actions/index';
import { freezeLine } from './actions/index';
import { moveDown } from './actions/index';
import { moveRight } from './actions/index';
import { moveLeft } from './actions/index';

window.store = store;