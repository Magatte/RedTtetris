import {
    DATA_FROM_SOCKET,
    SEND_START_GAME,
    PAUSE_GAME,
    UNPAUSE_GAME,
    STOP_GAME,
    GAME_OVER,
    SEND_LOGIN_ROOM,
    MANAGE_PIECES_STOCK,
    NEW_PIECES_FROM_SOCKET,
    GET_GAMES_LIST,
    GET_PLAYER_STATUS,
    SEND_SPECTRE,
    RECEIVE_NEW_SPECTRE,
    SEND_FREEZE_LINE,
    FREEZE_LINE,
    START_GAME
} from "../actions";


export default function socketMiddleware(socket) {
    return ({ dispatch, getState }) => {

        socket.on('freezeLine', data => {
            const action = {
                type: FREEZE_LINE
            }
            console.log('I WANT TO FREEZE');
            dispatch(action);
        });
        
        socket.on('getNewPieces', (newPieces, room) => {
            const action = {
                type: NEW_PIECES_FROM_SOCKET,
                newPieces: newPieces,
                room
            }
            console.log('New Pieces From Socket', newPieces);
            return dispatch(action);
        });

        return next => (action) => {

            if (!socket) {
                socket.emit('connection', 'hello je suis connecte');
                return;
            }

            socket.on('start', (data) => {
                console.log('dans start', data)
            });

            socket.on('status', (data) => {
                const action = {
                    type: DATA_FROM_SOCKET,
                    data
                }
                return next(action);
            });


            const {
                type,
                room,
                user
            } = action;

            switch (type) {
                case SEND_START_GAME: {
                    const data = {
                        status: START_GAME,
                        room
                    }
                    socket.emit('gameStatus', data);
                    break;
                }
                case PAUSE_GAME: {
                    const data = {
                        type,
                    }
                    socket.emit('gameStatus', data);
                    break;
                }
                case UNPAUSE_GAME:
                case SEND_LOGIN_ROOM: {
                    socket.emit('userData', action.login, action.room)
                    break;
                }
                case MANAGE_PIECES_STOCK: {
                    // When a user pieces stock is under 6 he sends a request to the server to get new pieces
                    console.log('ACTION REQUEST SHAPE', action);
                    if (action.piecesStock.length <= 5) {
                        socket.emit('resquestShape', action.room);
                    }
                    break;
                }
                case GET_GAMES_LIST: {
                    socket.emit('getGamesList');
                    socket.on('GamesList', (data) => {
                        action = { ...action, games: data };
                        return next(action);
                    });
                    break;
                }
                case GET_PLAYER_STATUS: {
                    socket.on('playerStatus', (data) => {
                        action = { ...action, data };
                        return next(action);

                    });
                    break;
                }
                case GAME_OVER: {
                    const data = {
                        status: 'GAME_OVER',
                        room
                    }
                    socket.emit('gameStatus', data);
                    break;
                }
                case STOP_GAME: {
                    const data = {
                        status: 'STOP_GAME',
                        room: user.room,
                        login: user.login
                    }
                    socket.emit('gameStatus', data);
                    break;
                }
                case SEND_SPECTRE: {
                    const data = {};
                    socket.emit('sendSpectre', action.spectre, action.room, action.login);
                    socket.on('receiveSpectres', (room, allSpectres) => {
                        const action = {
                            type: RECEIVE_NEW_SPECTRE,
                            room,
                            allSpectres
                        }
                        return next(action);
                    });
                    break;
                }
                case SEND_FREEZE_LINE: {
                    socket.emit('sendFreezeLine', action.room, action.login);
                    break;
                }
                default:
            }
            return next(action);
        }
    }
}