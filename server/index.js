import Player from "./controllers/Player";
import Games from"./controllers/Games" ;
import Game from "./controllers/Game";

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res) {
    res.sendFile(__dirname + '../client/public/index.html');
});

let games = new Games();
let gameTest = new Game('test','me');
games.addGame(gameTest);
let gamesList = games.getNameList();

io.on('connection', function(socket){
    console.log('a user connected', socket.id);
    socket.emit('start', 'Un utilisateur est connecté');

    socket.emit('GamesList', gamesList)

    socket.emit('newPlayer', (data) => {
        console.log('newPlayer', data);
    });

    socket.on('launch', (data) => {
        console.log('data', data);
    }); 

    socket.on('userData', (login, room) => {
        console.log('Login', login);
        console.log('Room', room);
        gamesList = games.getNameList();
        socket.join(room);
        
        const gameExist = gamesList.find(element => element === room);
        
        if (gameExist) {
            const gameData = games.getGameData(room);
            const newPieces = gameData.getPiece();
            socket.emit('playerStatus', {
                game:room,
                status:'follower',
                login,
                newPieces
            });
        } else {
           let createGame = new Game(room, login);
            createGame.addPlayer(login);
            createGame.createNewPieces(7);
            createGame.setStatus('ready');
            const nvxPlayer = new Player(login, createGame);

            games.addGame(createGame);
            const newPieces = createGame.getPiece();
            gamesList = games.getNameList();
            socket.emit('playerStatus', {
                game:room,
                status:'master',
                login,
                newPieces
            });
        }
    });

    socket.on('gameStatus', (data) => {
        console.log('game has been launch => ' , data, data.type === 'START_GAME')

        /*if(data.type === 'START_GAME'){
            console.log('------------------------------------')
            console.log('gameees', games)
            const linkedRoom = games.getGameData(data.room)
            console.log('linkedRoom', linkedRoom)
            console.log('newPIECES', newPieces)
            io.to(data.room).emit('pieces',newPieces)
        }*/
        //io.to(data.room).emit('launch',newPieces)
    });

    socket.on('resquestShape', (room) => {
        console.log('le user ' + room + ' veut une nouvelle pièece')
        const roomData = games.getGameData(room)
        console.log('^^^^^^^^^^^^ roomData', roomData)
        roomData.createNewPieces(7)
        const newCreatedPieces = roomData.getPiece()
        console.log('^^^^^^^^^^^^ newCreatedPieces', newCreatedPieces)
        socket.emit('getNewPieces', newCreatedPieces )
    });
});

http.listen(8000, function() {
    console.log('listening on *:8000');
});