export default class Player{
    constructor(login, room){
        this.login = login
        this.rooms = [room]
    }

    addRoom(room){
        return this.rooms.push(room)
    }
    getRooms(){
        return this.rooms
    }
    removeRoom(name){
        const index = this.rooms.findIndex(game => game === name)
        if(index > -1){
            this.rooms.splice(index, 1)
        }
    }
}
