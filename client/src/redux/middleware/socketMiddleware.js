import {
    DATA_FROM_SOCKET,
    SEND_START_GAME,
    PAUSE_GAME,
    UNPAUSE_GAME,
    SEND_LOGIN_ROOM,
    MANAGE_PIECES_STOCK,
    NEW_PIECES_FROM_SOCKET,
    GET_GAMES_LIST,
    GET_PLAYER_STATUS,
    SEND_SPECTRE,
    RECEIVE_NEW_SPECTRE,
    SEND_FREEZE_LINE,
    FREEZE_LINE
} from "../actions";


export default function socketMiddleware(socket) {
    return ({ dispatch, getState }) => next => (action) => {

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

        socket.on('freezeLine', data => {
            console.log('DATA', data);
            const action = {
                type: FREEZE_LINE
            }
            return next(action);
        });

        const {
            type,
            room
        } = action;

        switch (type) {
            case SEND_START_GAME: {
                const data = {
                    type,
                    room
                }
                socket.emit('gameStatus', data);
                break ;
            }
            case PAUSE_GAME: {
                const data = {
                    type,
                }
                socket.emit('gameStatus', data);
                break ;
            }
            case UNPAUSE_GAME:
            case SEND_LOGIN_ROOM: {
                socket.emit('userData', action.login, action.room)
                break ;
            }
            case MANAGE_PIECES_STOCK: {
                // When a user pieces stock is under 6 he sends a request to the server to get new pieces
                socket.on('getNewPieces', (newPieces, room) => {
                    console.log('NEW PIECES', newPieces);
                    const action = {
                        type: NEW_PIECES_FROM_SOCKET,
                        newPieces: newPieces,
                        room
                    }
                    return next(action);
                });
                if (action.piecesStock.length < 5) {
                    socket.emit('resquestShape', action.room);
                }
                break ;
            }
            case GET_GAMES_LIST: {
                socket.on('GamesList', (data) => {
                    action = { ...action, games: data };
                    return next(action);
                });
                break ;
            }
            case GET_PLAYER_STATUS: {
                socket.on('playerStatus', (data) => {
                    console.log('playerStatus', data)
                    action = { ...action, data };

                    return next(action);

                });
                break ;
            }
            case SEND_SPECTRE: {
                socket.emit('sendSpectre', action.spectre, action.room, action.login);
                socket.on('receiveSpectres', (room, allSpectres) => {
                    const action = {
                        type: RECEIVE_NEW_SPECTRE,
                        room,
                        allSpectres
                    }
                    return next(action);
                });
                break ;
            }
            case SEND_FREEZE_LINE: {
                socket.emit('sendFreezeLine', action.room, action.login);
                break ;
            }
            default:
        }
        return next(action);
    }
}
