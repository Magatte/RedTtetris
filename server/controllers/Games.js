export default class Games{

    constructor(){
        this.list =[]
    }

    getAllDataList(){
        return this.list
    }
    getGameData(name){
        return this.list.find(game => game.getName() === name)
    }
    getNameList(){
        return this.list.map((game) =>{
            return {
                name: game.getName(),
                piecesStock: game.getPiece()
            }
        })
    }

    addGame(name){
        this.list.push(name)
    }

    removeGame(name){
        const index = this.list.findIndex(game => game.getName() === name)
        this.list.slice(index, 1)
    }
}
