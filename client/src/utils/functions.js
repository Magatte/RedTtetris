export const rotateTetriminos = (cx, cy, x, y) => {
    const radians = (Math.PI / 180) * 90,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = Math.round((cos * (x - cx)) + (sin * (y - cy)) + cx),
        ny = Math.round((cos * (y - cy)) - (sin * (x - cx)) + cy);
    return [nx, ny];
}

export const getNewGrid = (grid, currentTetriminos) => {
    let newGrid = grid.map((row, i, arr) => {
        row.map((sq, j) => {
            if (currentTetriminos.shape[i][j] === 1)
                arr[i][j] = 1;
            return arr[i][j];
        });
        return row;
    });    
    console.log('NEW GRID');
    console.log(newGrid);
    return newGrid;
}