//const Game = require('../controllers/Game.js')
import assert from 'assert';
import Game from '../../controllers/Game'
import { expect } from 'chai';

const instance = new Game('Graziella', false)


describe('test Game controllers', ()=>{
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

            instance.setStatus('STOP_GAME')
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
    });
    describe('get player Game', ()=>{
        it('should return player name', ()=>{
            const playerName = instance.getName()
            expect(playerName).to.equal('Graziella')
        });
    })
});
