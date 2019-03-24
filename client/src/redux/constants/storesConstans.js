export const userInitalState = {
    room:"",
    login:"",
    status:"",
    score: 0
}

export default {
    miniTetriminos: {
        straight: {
            shape: [
                [0,0,0,0],
                [1,1,1,1],
                [0,0,0,0]
            ]
        },
        square: {
            shape: [
                [0,0,0,0],
                [0,2,2,0],
                [0,2,2,0]
            ]
        },
        tee: {
            shape: [
                [0,0,0,0],
                [0,3,0,0],
                [3,3,3,0]
            ]
        },
        leftGun: {
            shape: [
                [0,0,0,0],
                [0,0,4,0],
                [4,4,4,0]
            ]
        },
        rightGun: {
            shape: [
                [0,0,0,0],
                [5,0,0,0],
                [5,5,5,0]
            ]
        },
        leftSnake: {
            shape: [
                [0,0,0,0],
                [6,6,0,0],
                [0,6,6,0]
            ]
        },
        rightSnake: {
            shape: [
                [0,0,0,0],
                [0,7,7,0],
                [7,7,0,0]
            ]
        }
    }
};