export default class Games {

    constructor() {
        this.list =[]
    }

    getAllDataList() {
        return this.list
    }

    getGameData(name) {
        return this.list.find(game => game.getName() === name)
    }

    getNameList() {
        return this.list.map((game) =>{
            return game.getName()
        })
    }

    addGame(name) {
        this.list.push(name)
    }

    removeGame(name) {
        const index = this.list.findIndex(game => game.getName() === name)
        this.list.slice(index, 1)
    }
}
