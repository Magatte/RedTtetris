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

    addGame(game){
        this.list.push(game)
    }

    removeGame(name){
        const index = this.list.findIndex(game => game.getName() === name)
        if(index > -1)
            this.list.splice(index, 1)
    }
}
