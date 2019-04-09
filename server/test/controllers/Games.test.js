import assert from 'assert';
import Games from '../../controllers/Games'
import Game from '../../controllers/Game'
import { expect } from 'chai';

const gamesListInstance = new Games()
const oneGameInstance1 = new Game('Graziella', false)
const oneGameInstance2 = new Game('Magatte', false)

describe('***Games controller***', ()=>{
    it('addGame', ()=>{
        gamesListInstance.addGame(oneGameInstance1)
        gamesListInstance.addGame(oneGameInstance2)
        const list = gamesListInstance.getAllDataList()
        expect(list).to.be.an('array').to.have.lengthOf(2);
    });
    it('getAllDataList', ()=>{
        const list = gamesListInstance.getAllDataList()
        expect(list).to.be.an('array').to.have.lengthOf(2);
    });
    it('getGameData', ()=>{
        const list = gamesListInstance.getGameData('Graziella')
        expect(list).to.deep.equal(oneGameInstance1);
    });
    it('getNameList', ()=>{
        const list = gamesListInstance.getNameList('Graziella')
        expect(list).to.deep.equal([
            {
                name:'Graziella',
                piecesStock:[]
            },
            {
                name:'Magatte',
                piecesStock:[]
            }
        ]);
    });
    it('removeGame', ()=>{
        gamesListInstance.removeGame('Magatte')
        const list = gamesListInstance.getAllDataList()
        expect(list).to.be.an('array').to.have.lengthOf(1);
    });
    it('removeGame', ()=>{
        gamesListInstance.removeGame('grazi')
        const list = gamesListInstance.getAllDataList()
        expect(list).to.be.an('array').to.have.lengthOf(1);
    });
});