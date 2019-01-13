"use strict";

var _Player = require("./controllers/Player");

var _Player2 = _interopRequireDefault(_Player);

var _Games = require("./controllers/Games");

var _Games2 = _interopRequireDefault(_Games);

var _Game = require("./controllers/Game");

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '../client/public/index.html');
});

var games = new _Games2.default();
var gameTest = new _Game2.default('test', 'me');
games.addGame(gameTest);
var gamesList = games.getNameList();

io.on('connection', function (socket) {
    console.log('a user connected', socket.id);
    socket.emit('start', 'Un utilisateur est connecté');

    socket.emit('GamesList', gamesList);

    socket.emit('newPlayer', function (data) {
        console.log('newPlayer', data);
    });

    socket.on('launch', function (data) {
        console.log('data', data);
    });

    socket.on('userData', function (login, room) {
        console.log('Login', login);
        console.log('Room', room);
        gamesList = games.getNameList();
        socket.join(room);

        var gameExist = gamesList.find(function (element) {
            return element === room;
        });

        if (gameExist) {
            var gameData = games.getGameData(room);
            var newPieces = gameData.getPiece();
            socket.emit('playerStatus', {
                game: room,
                status: 'follower',
                login: login,
                newPieces: newPieces
            });
        } else {
            var createGame = new _Game2.default(room, login);
            createGame.addPlayer(login);
            createGame.createNewPieces(7);
            createGame.setStatus('ready');
            var nvxPlayer = new _Player2.default(login, createGame);

            games.addGame(createGame);
            var _newPieces = createGame.getPiece();
            gamesList = games.getNameList();
            socket.emit('playerStatus', {
                game: room,
                status: 'master',
                login: login,
                newPieces: _newPieces
            });
        }
    });

    socket.on('gameStatus', function (data) {
        console.log('game has been launch => ', data, data.type === 'START_GAME');

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

    socket.on('resquestShape', function (room) {
        console.log('le user ' + room + ' veut une nouvelle pièece');
        var roomData = games.getGameData(room);
        console.log('^^^^^^^^^^^^ roomData', roomData);
        roomData.createNewPieces(7);
        var newCreatedPieces = roomData.getPiece();
        console.log('^^^^^^^^^^^^ newCreatedPieces', newCreatedPieces);
        socket.emit('getNewPieces', newCreatedPieces);
    });
});

http.listen(8000, function () {
    console.log('listening on *:3000');
});