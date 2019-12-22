/*
 * Complete the function below.
 */
function find_minimum_number_of_moves(rows, cols, start_row, start_col, end_row, end_col) {
    // Write your code here.
    const [visited, parent, distance] = initializeParentVistedDistance(rows, cols);
    bfs(rows, cols, start_row, start_col, end_row, end_col, visited, parent, distance);
    return distance[end_row][end_col];
}


function bfs(maxRow, maxCol, start_row, start_col, end_row, end_col, visited, parent, distance) {
    const queue = [[start_row, start_col]];
    distance[start_row][start_col] = 0;

    while (queue.length > 0) {
        const [cRow, cCol] = queue.shift();

        for (const [nRow, nCol] of getNeighbours(cRow, cCol, maxRow, maxCol)) {
            // console.log(nRow, nCol, visited[nRow][nCol]);

            if (visited[nRow][nCol] === -1) {

                visited[nRow][nCol] = 1;
                parent[nRow][nCol] = [cRow, cCol];
                distance[nRow][nCol] = distance[cRow][cCol] + 1;
                queue.push([nRow, nCol]);

            }
        }
    }
}

function initializeParentVistedDistance(rows, cols) {
    const visited = [];
    const parent = [];
    const distance = [];
    for (let i = 0; i < rows; i++) {
        visited[i] = [];
        parent[i] = [];
        distance[i] = [];
        for (let j = 0; j < cols; j++) {
            visited[i][j] = -1;
            distance[i][j] = -1;
            parent[i][j] = null;

        }
    }
    return [visited, parent, distance];
}


function getNeighbours(row, col, rowMax, colMax, rowMin = -1, colMin = -1) {
    const neighbours = [];

    if (row + 2 < rowMax) {

        if (colMin < col - 1) {
            neighbours.push([row + 2, col - 1]);
        }

        if (col + 1 < colMax) {
            neighbours.push([row + 2, col + 1]);
        }

    }

    if (rowMin < row - 2) {

        if (colMin < col - 1) {
            neighbours.push([row - 2, col - 1]);
        }

        if (col + 1 < colMax) {
            neighbours.push([row - 2, col + 1]);
        }

    }


    if (col + 2 < colMax) {

        if (rowMin < row - 1) {
            neighbours.push([row - 1, col + 2]);
        }

        if (row + 1 < rowMax) {
            neighbours.push([row + 1, col + 2]);
        }

    }

    if (colMin < col - 2) {

        if (rowMin < row - 1) {
            neighbours.push([row - 1, col - 2]);
        }

        if (row + 1 < rowMax) {
            neighbours.push([row + 1, col - 2]);
        }

    }

    return neighbours;
}


/*

rows = 5

cols = 5

start_row = 0

start_col = 0

end_row = 4

end_col = 1

*/

/*
3
8
0
6
1
5
*/

console.log(find_minimum_number_of_moves(3, 8, 0, 6, 1, 5));

console.log(find_minimum_number_of_moves(5, 5, 0, 0, 4, 1));
