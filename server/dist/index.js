"use strict";

var _Player = require("./controllers/Player");

var _Player2 = _interopRequireDefault(_Player);

var _Games = require("./controllers/Games");

var _Games2 = _interopRequireDefault(_Games);

var _Game = require("./controllers/Game");

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var monitorio = require('monitor.io');

io.use(monitorio({ port: 9000 }));
// monitor.io started on port 8001
app.get('/', function (req, res) {
    res.sendFile(__dirname + '../client/public/index.html');
});
var games = new _Games2.default();
var gameTest = new _Game2.default('test', 'me');
var gameTest2 = new _Game2.default('test2', 'you');
games.addGame(gameTest);
games.addGame(gameTest2);
var gamesList = games.getNameList();

io.on('connection', function (socket) {
    console.log('a user connected', socket.id);
    socket.monitor('timeConnected', new Date(Date.now()).toLocaleString());
    socket.emit('start', 'Un utilisateur est connecté');

    socket.emit('GamesList', games.getNameList());

    socket.emit('newPlayer', function (data) {
        console.log('newPlayer', data);
    });

    socket.on('userData', function (login, room) {

        socket.monitor('userData', JSON.stringify({ login: login, room: room }));
        gamesList = games.getNameList();

        socket.join(room);
        var gameExist = gamesList.find(function (element) {
            return element.name === room;
        });
        if (gameExist) {

            var gameData = games.getGameData(room);
            var newPieces = gameData.getPiece();
            gameData.addPlayer(login, socket.id);
            gameData.addSpectre(login, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
            var allSpectres = gameData.getAllSpectres();
            io.to(room).emit('receiveSpectres', room, allSpectres);
            socket.emit('playerStatus', {
                id: socket.id,
                name: room,
                status: 'follower',
                login: login,
                newPieces: newPieces,
                spectres: allSpectres
            });
        } else {

            var createGame = new _Game2.default(room, login);
            createGame.addPlayer(login, socket.id);
            createGame.createNewPieces(7);
            createGame.setStatus('ready');
            createGame.addSpectre(login, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

            var nvxPlayer = new _Player2.default(login, createGame);

            games.addGame(createGame);

            var _newPieces = createGame.getPiece();

            gamesList = games.getNameList();

            socket.emit('playerStatus', {
                id: socket.id,
                name: room,
                status: 'master',
                login: login,
                newPieces: _newPieces,
                spectres: [{
                    name: login,
                    spectre: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }]
            });
        }
    });

    socket.on('gameStatus', function (data) {
        socket.monitor('gameStatus', JSON.stringify(data));
        games.udpdateData(data.room, 'status', data.status, data.login, data.id);
        io.to(data.room).emit('status', 'START_GAME');
        if (data.status === 'STOP_GAME') {
            socket.emit('GamesList', games.getNameList());
        }
    });

    socket.on('resquestShape', function (room) {

        socket.monitor('requestingRoom', room);
        var roomData = games.getGameData(room);
        roomData.createNewPieces(3);
        var newCreatedPieces = roomData.getPiece();
        console.log("NEW PIECES", newCreatedPieces);
        io.to(room).emit('getNewPieces', newCreatedPieces, room);
    });

    socket.on('sendSpectre', function (spectre, room, login) {
        var gameExist = gamesList.find(function (element) {
            return element.name === room;
        });

        if (gameExist) {
            var gameData = games.getGameData(room);

            gameData.addSpectre(login, spectre);

            var allSpectre = gameData.getAllSpectres();

            io.to(room).emit('receiveSpectres', room, allSpectre);
        }
    });

    socket.on('sendFreezeLine', function (room, login) {
        socket.monitor('sendFreezeLine', JSON.stringify({ room: room, login: login }));
        var gameExist = gamesList.find(function (element) {
            return element.name === room;
        });
        if (gameExist) {
            var gameData = games.getGameData(room);

            var players = gameData.freezedPlayers(login);
            players.forEach(function (player) {
                io.to(player.id).emit('freezeLine', room);
            });
            //io.to(room).emit('freezeLine', room, 'FREEZE');
        }
    });

    // socket.on('stopGame', (room, login) => {
    //     const gameExist = gamesList.find(element => element.name === room);
    //     if (gameExist) {
    //         const gameData = games.getGameData(room);
    //         games.removeGame(room);
    //         console.log('GAME DATA', gameData);
    //     }
    // })
});

server.listen(8000, function () {
    console.log('listening on *:8000');
});