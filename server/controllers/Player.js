export default class Player {

    constructor( login, room ){

        this.login = login
        this.rooms = room
    }

    addRoom(room){
        
        return this.rooms.push(room)
    }
    getRooms(){

        return this.rooms
    }

}
