/**
 * @param {number[][]} mat
 * @return {number[][]}
 */
var updateMatrix = function (mat) {
  const distArr = new Array(mat.length)
    .fill()
    .map(() => new Array(mat[0].length).fill(null));
  const visited = new Array(mat.length)
    .fill()
    .map(() => new Array(mat[0].length).fill(false));

  for (let row = 0; row < mat.length; row++) {
    for (let col = 0; col < mat[0].length; col++) {
      if (mat[row][col] === 0) {
        distArr[row][col] = 0;
      }
    }
  }

  for (let row = 0; row < mat.length; row++) {
    for (let col = 0; col < mat[0].length; col++) {
      if (distArr[row][col] !== null) {
        continue;
      }
      visited[row][col] = true;
      distArr[row][col] = dfs(mat, row, col, distArr, visited);
    }
  }

  for (let row = 0; row < mat.length; row++) {
    for (let col = 0; col < mat[0].length; col++) {
      if (mat[row][col] === 1)
        distArr[row][col] =
          Math.min(
            get(distArr, row - 1, col),
            get(distArr, row + 1, col),
            get(distArr, row, col + 1),
            get(distArr, row, col - 1)
          ) + 1;
    }
  }

  return distArr;
};

function get(arr, i, j) {
  return (arr[i] ?? [])[j] ?? Infinity;
}

function dfs(mat, row, col, distArr, visited) {
  if (distArr[row][col] !== null) {
    return distArr[row][col];
  }
  if (mat[row][col] === 0) {
    distArr[row][col] = 0;
    return 0;
  }
  const neighbors = getNeighbors(mat, row, col);
  const distances = [];
  for (const [nRow, nCol] of neighbors) {
    if (visited[nRow][nCol]) {
      if (distArr[nRow][nCol] !== null) {
        distances.push(distArr[nRow][nCol]);
      }
      continue;
    }
    visited[nRow][nCol] = true;
    distances.push(dfs(mat, nRow, nCol, distArr, visited));
  }
  // console.log(distances,row,col);
  distArr[row][col] = Math.min(...distances) + 1;
  return distArr[row][col];
}

function getNeighbors(mat, row, col) {
  const MAX_ROW = mat.length;
  const MAX_COL = mat[0].length;
  const neighbors = [];
  if (row + 1 < MAX_ROW) {
    neighbors.push([row + 1, col]);
  }

  if (row - 1 >= 0) {
    neighbors.push([row - 1, col]);
  }

  if (col + 1 < MAX_COL) {
    neighbors.push([row, col + 1]);
  }

  if (col - 1 >= 0) {
    neighbors.push([row, col - 1]);
  }

  return neighbors;
}
