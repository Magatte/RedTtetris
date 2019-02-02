import Player from "./controllers/Player";
import Games from"./controllers/Games" ;
import Game from "./controllers/Game";

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var monitorio = require('monitor.io');


io.use(monitorio({ port: 9000 }));
// monitor.io started on port 8001
app.get('/', function(req, res){
    res.sendFile(__dirname + '../client/public/index.html');
});
let games = new Games()
let gameTest = new Game('test','me')
let gameTest2 = new Game('test2','you')
games.addGame(gameTest)
games.addGame(gameTest2)
let gamesList = games.getNameList()

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
    socket.monitor('timeConnected', new Date(Date.now()).toLocaleString());
    socket.emit('start', 'Un utilisateur est connecté')

    socket.emit('GamesList', gamesList)

    socket.emit('newPlayer', (data) => {
        console.log('newPlayer', data)

    })
    socket.on('userData', (login, room) => {

        socket.monitor('userData', JSON.stringify({login: login, room: room}));
        gamesList = games.getNameList()
        //console.log('gameees', games)
        socket.join(room)
        const gameExist = gamesList.find(element => element.name === room)
        if (gameExist) {
            
            const gameData = games.getGameData(room)
            const newPieces = gameData.getPiece()
            gameData.addSpectre(login,[0,0,0,0,0,0,0,0,0,0])
            const allSpectres = gameData.getAllSpectres()
            io.to(room).emit('receiveSpectres', room, allSpectres )
            socket.emit('playerStatus', {
                name:room,
                status:'follower',
                login,
                newPieces,
                spectres:allSpectres
            })

        } else {

            let createGame = new Game(room, login)
            createGame.addPlayer(login)
            createGame.createNewPieces(7)
            createGame.setStatus('ready')
            createGame.addSpectre(login,[0,0,0,0,0,0,0,0,0,0])

            const nvxPlayer = new Player(login, createGame)

            games.addGame(createGame)
            const newPieces = createGame.getPiece()
            gamesList = games.getNameList()
            socket.emit('playerStatus', {
                name:room,
                status:'master',
                login,
                newPieces,
                spectres:[{
                    name:login,
                    spectre:[0,0,0,0,0,0,0,0,0,0]
                }]
            })

        }
    })

    socket.on('gameStatus', (data) => {

        io.to(data.room).emit('status','START_GAME')
    })

    socket.on('resquestShape', (room) => {

        // const roomData = games.getGameData(room)
        // roomData.createNewPieces(1)
        // const newCreatedPieces = roomData.getPiece()
        const newPieces = [];
        for (let i = 0; i < 3; i++)
            newPieces.push(Math.floor(Math.random() * (7 - 0)) + 0);
        console.log('NEW PIECES', newPieces);
        io.to(room).emit('getNewPieces', newPieces, room )
    })

    socket.on('sendSpectre', (spectre,room, login) =>{

        const gameExist = gamesList.find(element =>element.name === room)

        if(gameExist){
            const gameData = games.getGameData(room)
            gameData.addSpectre(login, spectre)
            const allSpectre = gameData.getAllSpectres()

            io.to(room).emit('receiveSpectres', room,allSpectre )

        }
    })
});

server.listen(8000, function(){
    console.log('listening on *:8000');
});
