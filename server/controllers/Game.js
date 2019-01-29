export default class Game{
    constructor(name,master){
        this.name = name;
        this.master = master;
        this.players = [];
        this.pieces =[];
        this.spectres = []
        this.status= 0
    }
    setStatus(status){
        switch (status) {
            case "ready":
                this.status = 0
                break
            case "START_GAME":
                this.status = 1
                break
            case "paused":
                this.status = 2
                break
            case "finish":
                this.status = 3
                break
            default:
                break

        }

    }

    addSpectre( playerName, spectre ) {

        const playerIndex = this.spectres.findIndex( p => p.name === playerName )

        if ( playerIndex > -1 ) {

            this.spectres.splice(playerIndex, 1)
        }

        this.spectres.push({
            name:playerName,
            spectre
        })
    }

    getAllSpectres(){
        return this.spectres
    }

    addPlayer(player){
        this.players.push(player)
        return this.players
    }
    setTetriminos(){
        this.tetriminos.push()
    }

    getName(){
        return this.name
    }
    createNewPieces(nb){
        // this.pieces = this.pieces.splice(0, 0)
        for( let i = 0 ; i < nb ; i++){
            this.pieces.push(Math.floor(Math.random() * (7 - 0)) + 0)
        }
    }
    getPiece(){
        return this.pieces
    }

    addNewPiece(piece){
        this.pieces.push(piece)
    }

    removePiece(index, nb = 1){
        this.pieces.slice(index, nb)
    }
    getGameInfo(){
        return{
            name:this.name,
            master:this.master,
            players:this.players,
            pieces:this.pieces
        }
    }

}
