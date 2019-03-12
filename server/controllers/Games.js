export default class Games{

    constructor(){

        this.list =[]
    }

    getAllDataList(){

        return this.list
    }

    getGameData( name ){

        return this.list.find(game => game.getName() === name)
    }

    getNameList(){

        return this.list.map((game) =>{
            return {
                name        : game.getName(),
                piecesStock : game.getPiece(),
                status      : game.getStatus()
            }
        })
    }

    destroyGame(name){

        const index = this.list.findIndex(game => game.getName() === name)

        this.list.splice(index, 1)

    }

    udpdateData( name, dataName, data, login = null, id = null ){

        const index = this.list.findIndex(game => game.getName() === name)

        if(index !== -1){

            switch (dataName) {
                case 'status':
                    this.list[index].setStatus(data)
                default:
                    break
            }
            if(this.list[index].getStatus() === 3){

                if(id)
                    this.list[index].deleteUser(id)
                else
                    this.list[index].deleteUser(login)
            }
            if(!this.list[index].getPlayersNb()){

                this.destroyGame(name)
            }
        }

    }

    addGame( name ){

        this.list.push(name)
    }

    removeGame( name ){

        const index = this.list.findIndex(game => game.getName() === name)

        this.list.slice(index, 1)
    }
}
