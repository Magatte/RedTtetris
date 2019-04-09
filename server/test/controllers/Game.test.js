//const Game = require('../controllers/Game.js')
import assert from 'assert';
import Game from '../../controllers/Game'
import { expect } from 'chai';

const instance = new Game('Graziella', false)


describe('***test Game controllers***', ()=>{
    it('should create Game basique info', ()=>{

    const testBasicInstance = instance.getGameInfo()

        expect(testBasicInstance).to.deep.equal({
            name:'Graziella',
            master : false,
            players : [],
            pieces : [],
            spectres : [],
            status : 0
        });
    });
    describe('test set status method', ()=>{
        it('should set status to 1', ()=>{

            instance.setStatus('START_GAME')
            let testSetStatus = instance.getGameInfo()

            expect(testSetStatus).to.deep.equal({
                name:'Graziella',
                master : false,
                players : [],
                pieces : [],
                spectres : [],
                status : 1
            });
        });
        it('should set status to 2', ()=>{

            instance.setStatus('paused')
            const testSetStatus = instance.getGameInfo()

            expect(testSetStatus).to.deep.equal({
                name:'Graziella',
                master : false,
                players : [],
                pieces : [],
                spectres : [],
                status : 2
            });
        });
        it('should set status to 3', ()=>{

            instance.setStatus('finish')
            const testSetStatus = instance.getGameInfo()

            expect(testSetStatus).to.deep.equal({
                name:'Graziella',
                master : false,
                players : [],
                pieces : [],
                spectres : [],
                status : 3
            });
        });
        it('should set status to 0', ()=>{
            instance.setStatus('ready')
            const testSetStatus = instance.getGameInfo()
            expect(testSetStatus).to.deep.equal({
                name:'Graziella',
                master : false,
                players : [],
                pieces : [],
                spectres : [],
                status : 0
            });
        });
        it('should set status to 0', ()=>{
            instance.setStatus('lol')
            const testSetStatus = instance.getGameInfo()
            expect(testSetStatus).to.deep.equal({
                name:'Graziella',
                master : false,
                players : [],
                pieces : [],
                spectres : [],
                status : 0
            });
        });
    });
  
    describe('get player Game', ()=>{
        it('should return game name', ()=>{
            const playerName = instance.getName()
            expect(playerName).to.equal('Graziella')
        });
    })
    describe('addPlayer', ()=>{
        it('should add player in array', ()=>{
            instance.addPlayer('Geoffrey')
            const playerArray = instance.getPlayers()
            const result = ['Geoffrey']
            expect(playerArray).to.be.an('array').has.deep.members(result)
        });
    })
    describe('getPlayer', ()=>{
        it('should return players array', ()=>{
            const playerArray = instance.getPlayers()
            const result = ['Geoffrey']
            expect(playerArray).to.be.an('array').has.deep.members(result)
        });
    })
    describe('getName', ()=>{
        it('should return players array', ()=>{
            const playerArray = instance.getName()
            const result = "Graziella"
            expect(playerArray).to.equal(result)
        });
    })
    describe('createNewPieces', ()=>{
        it('should return an array with new pieces', ()=>{
            const nb = 7
            instance.createNewPieces(7)
            const piecesArray = instance.getPiece() 
            expect(piecesArray).to.have.lengthOf(nb)
        });
    })
    describe('createNewPieces', ()=>{
        it('should return an array with less pieces', ()=>{
            const index = 0
            instance.removePiece(index)
            const piecesArray = instance.getPiece() 
            expect(piecesArray).to.have.lengthOf(6)
        });
        it('should return an arra with less pieces when nb pieces to delete in give', ()=>{
            const index = 0
            const nb = 2
            instance.removePiece(index, nb)
            const piecesArray = instance.getPiece() 
            expect(piecesArray).to.have.lengthOf(5)
        });
    });
    describe('addSpectre', ()=>{
        it('should add spectre of a new player', ()=>{
            instance.addSpectre('jojo', [0,2,3,0,2,5,1,0,6,2])
            const allSpectres = instance.getAllSpectres() 
            expect(allSpectres).to.have.lengthOf(1)
        });
    })
    describe('addSpectre', ()=>{
        it('should add spectre of existing player', ()=>{
            instance.addSpectre('jojo', [0,2,3,0,2,5,0,0,0,0])
            const allSpectres = instance.getAllSpectres() 
            expect(allSpectres).to.have.lengthOf(1)
        });
    })
    describe('getGameInfo', ()=>{
        it('should return object info', ()=>{
            const gameData = instance.getGameInfo()
            const pieces = instance.getPiece()
            const players = instance.getPlayers()
            const allSpectres = instance.getAllSpectres() 
            const result = {
                name:'Graziella',
                master : false,
                players : players,
                pieces : pieces,
                spectres : allSpectres,
                status : 0
            }
            expect(gameData).to.deep.equal(result)
        });
    })

});
