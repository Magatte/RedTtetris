"use strict";

var _Player = _interopRequireDefault(require("./controllers/Player"));

var _Games = _interopRequireDefault(require("./controllers/Games"));

var _Game = _interopRequireDefault(require("./controllers/Game"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = require('express')();

var http = require('http').Server(app);

var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '../client/public/index.html');
});
var games = new _Games["default"]();
var gameTest = new _Game["default"]('test', 'me');
var gameTest2 = new _Game["default"]('test2', 'you');
var gamesList = games.getNameList();
games.addGame(gameTest);
games.addGame(gameTest2);
io.on('connection', function (socket) {
  console.log('a user connected', socket.id);
  socket.emit('start', 'Un utilisateur est connecté');
  socket.on('getGamesList', function () {
    gamesList = games.getNameList();
    socket.emit('GamesList', gamesList);
  });
  socket.emit('newPlayer', function (data) {
    console.log('newPlayer', data);
  });
  socket.on('userData', function (login, room) {
    gamesList = games.getNameList();
    socket.join(room);
    var gameExist = gamesList.find(function (element) {
      return element.name === room;
    });

    if (gameExist) {
      var gameData = games.getGameData(room);
      var newPieces = gameData.getPiece();
      gameData.addPlayer(login);
      var allSpectres = gameData.getAllSpectres();
      console.log('createGame players', gameData.getPlayersNb());
      io.to(room).emit('receiveSpectres', room, allSpectres);
      socket.emit('playerStatus', {
        name: room,
        status: 'follower',
        login: login,
        newPieces: newPieces,
        spectres: allSpectres
      });
    } else {
      var createGame = new _Game["default"](room, login);
      createGame.addPlayer(login, true);
      console.log('createGame players', createGame.getPlayersNb());
      createGame.createNewPieces(7);
      createGame.setStatus('ready');
      createGame.addSpectre(login, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      var nvxPlayer = new _Player["default"](login, createGame);
      games.addGame(createGame);

      var _newPieces = createGame.getPiece();

      gamesList = games.getNameList();
      socket.emit('playerStatus', {
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

    socket.emit('GamesList', games.getNameList());
  });
  socket.on('gameStatus', function (data) {
    console.log('**********************$cdata dans gameStatus', data);
    games.udpdateData(data.room, 'status', data.status, data.login);
    io.to(data.room).emit('status', data.status);

    if (data.status === 'STOP_GAME') {
      socket.emit('GamesList', games.getNameList());
    }
  });
  socket.on('resquestShape', function (room) {
    var roomData = games.getGameData(room);
    roomData.createNewPieces(7);
    var newCreatedPieces = roomData.getPiece();
    io.to(room).emit('getNewPieces', newCreatedPieces, room);
  });
  socket.on('sendSpectre', function (spectre, room, login) {
    var gameExist = gamesList.find(function (element) {
      return element.name === room;
    });

    if (gameExist) {
      var gameData = games.getGameData(room);
      console.log('room', room);
      console.log('GameData', gameData);
      console.log('login', login);
      console.log('spectre', spectre);
      gameData.addSpectre(login, spectre);
      var allSpectre = gameData.getAllSpectres();
      io.to(room).emit('receiveSpectres', room, allSpectre);
    }
  });
});
http.listen(8000, function () {
  console.log('listening on *:3000');
});