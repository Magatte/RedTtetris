const getRandomInt = ( max ) =>{
    return Math.floor(Math.random() * Math.floor(max));
}

console.log(getRandomInt(9));

export default class Game {

    constructor(name,master){
        this.name = name;
        this.master = master;
        this.players = [];
        this.pieces =[];
        this.spectres = []
        this.status = 0
    }

    addPlayer(login, master = false){
        if(master){
            this.createNewPieces(7)
            this.setStatus('ready')
        }
        this.players.push(login)
        this.addSpectre(login, [0,0,0,0,0,0,0,0,0,0])
    }

    setStatus( status ){

        switch ( status ) {
            case "ready":
            case "GAME_OVER":
                this.status = 0
                break
            case "START_GAME":
                this.status = 1
                break
            case "paused":
                this.status = 2
                break
            case "STOP_GAME":
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

  /*  addPlayer(player){

        this.players.push(player)

        return this.players
    }*/

    setTetriminos(){

        this.tetriminos.push()
    }

    getName(){

        return this.name
    }

    getStatus(){

        return this.status
    }

    getPlayersNb(){

        return this.players.length
    }

    setNewMaster( login ){

        if( login === this.master ){
            if ( this.players.length === 0 ){
                this.master = null
            } else {
                this.master = this.players[getRandomInt(this.players.length)]
            }
        }
    }

    deleteUser( login ){
        const index = this.players.findIndex( p => p === login)

        if( index !== -1 ){
            this.players.splice(index, 1)
            this.setNewMaster(login)
        }
    }

    createNewPieces( nb ){
        this.pieces = this.pieces.splice(0, 0)

        for( let i = 0 ; i < nb ; i++){

            this.pieces.push(Math.floor(Math.random() * (7 - 0)) + 0)
        }
    }

    getPiece(){

        return this.pieces
    }

    addNewPiece( piece ){

        this.pieces.push(piece)
    }

    removePiece( index, nb = 1 ){

        this.pieces.slice(index, nb)
    }

    getGameInfo(){

        return{
            name:this.name,
            master:this.master,
            players:this.players,
            pieces:this.pieces,
            spectres:this.spectres,
            status:this.status
        }
    }
    getPlayersNb(){
        return this.players.length
    }
    getDefaultGame(status){
        const login = this.players.length === 1 ? this.players[0] : ''

        return {
            name: this.name,
            status: status,
            login: login,
            newPieces: this.getPiece(),
            spectres: [{
                name: login,
                spectre: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }]
        }
    }

}
