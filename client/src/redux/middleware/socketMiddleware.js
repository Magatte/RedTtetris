import { GET_GAMES_LIST, GET_PLAYER_STATUS } from "../actions";


export default function socketMiddleware(socket) {
    if (!socket)
        socket.emit('connection', 'hello je suis connecte')
    //console.log('SOCKET', socket)
    socket.on('start', (data) => {
        console.log('dans start', data)
    })

    socket.emit('launch', 'hello', (data) => {

        //console.log('data lal lal', data)
    });
    return ({ dispatch }) => next => (action) => {
        console.log('action', action)
        const {
            type,
            room
        } = action;

        switch (type) {
            case 'START_GAME': {
                console.log('room', action)
                const data = {
                    type,
                    room
                }
                socket.emit('gameStatus', data)
                break;
            }
            case 'UNPAUSE_GAME':
            case 'PAUSE_GAME': {
                console.log('room', action)
                const data = {
                    type,
                    //action.gameName,
                }
                socket.emit('gameStatus', data)
                break;
            }
            case 'SEND_LOGIN_ROOM': {
                socket.emit('userData', action.login, action.room)
                break;
            }
            case 'NEW_TETRIMINOS': {
                if (action.leftPieces === 5) {

                    socket.emit('resquestShape', action.room)
                    socket.on('getNewPieces', data => {

                        action = { ...action, newPieces: data }

                        return next(action)

                    })
                }
                break;
            }
            case GET_GAMES_LIST: {
                socket.on('GamesList', (data) => {

                    action = { ...action, games: data }

                    return next(action)

                })
                break;
            }
            case GET_PLAYER_STATUS: {
                socket.on('playerStatus', (data) => {
                    //aaconsole.log('playerStatus', data)

                    action = { ...action, data }

                    /*console.log('playerStatus', data)
                    console.log('playerStatus newPieces', data.newPieces)
                    console.log('playerStatus action', action)*/
                    return next(action)

                })
                break;
            }
            default:
                break;

        }
        return next(action)

    }
}