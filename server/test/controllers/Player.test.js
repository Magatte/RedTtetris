import assert from 'assert';
import Player from '../../controllers/Player'
import Game from '../../controllers/Game'
import { expect } from 'chai';

const playerInstance = new Player( 'ghippoda','Graziella')

describe('***Player***', ()=>{
    it('addRoom', ()=>{
        playerInstance.addRoom('Magatte')
        const rooms = playerInstance.getRooms()
        expect(rooms).to.be.an('array').to.have.lengthOf(2);
    });
    it('getRooms', ()=>{
        const rooms = playerInstance.getRooms()
        expect(rooms).to.be.an('array').to.have.lengthOf(2);
    });
    it('try to removeGame who do not exist', ()=>{
        playerInstance.removeRoom('grazi')
        const list = playerInstance.getRooms()
        expect(list).to.be.an('array').to.have.lengthOf(2);
    });
    it('removeGame', ()=>{
        playerInstance.removeRoom('Magatte')
        const list = playerInstance.getRooms()
        expect(list).to.be.an('array').to.have.lengthOf(1);
    });
});