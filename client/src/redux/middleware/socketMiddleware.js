//import {GET_GAMES_LIST, GET_PLAYER_STATUS} from "../actions";


export default function socketMiddleware(socket){
    return ({dispatch}) => next =>(action) => {

        if(!socket){
            socket.emit('connection', 'hello je suis connecte')
        }
        socket.on('start', (data)=>{
            console.log('dans start', data)
        })

        socket.on('status', (data)=>{
            const action = {
                type:'DATA_FROM_SOCKET',
                data
            }
            return next(action)
        })

        const {
            type,
            room
        } = action ;

        switch(type){
            case 'START_GAME':{

                const data ={
                    type,
                    room
                }
                socket.emit('gameStatus', data)
                break;
            }
            case 'UNPAUSE_GAME':
            case 'PAUSE_GAME':{

                const data ={
                    type,
                }
                socket.emit('gameStatus', data)
                break;
            }
            case 'SEND_LOGIN_ROOM':{
                socket.emit('userData', action.login, action.room)
                break;
            }
            case 'MANAGE_PIECES_STOCK':{
                if(action.piecesStock === 5){

                    socket.emit('resquestShape', action.room)
                    socket.on('getNewPieces', data =>{

                        action = {...action, newPieces:data}

                        return next(action)

                    })
                }
                break;
            }
            case 'GET_GAMES_LIST':{
                socket.on('GamesList', (data)=>{

                    action = {...action, games:data}

                    return next(action)

                })
                break;
            }
            case 'GET_PLAYER_STATUS':{
                socket.on('playerStatus', (data)=>{

                    action = {...action, data}

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
