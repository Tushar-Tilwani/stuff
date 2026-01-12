function updateMatrix(mat: number[][]): number[][] {
  const result: number[][] = new Array(mat.length).fill(null).map(() => new Array(mat[0].length).fill(-1));
  const QUEUE: [number, number][] = [];
  const visited = new Array(mat.length).fill(null).map(() => new Array(mat[0].length).fill(false));

  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[0].length; j++) {
      if (mat[i][j] === 0) {
        visited[i][j] = true;
        result[i][j] = 0;
        QUEUE.push([i, j]);
      }
    }
  }

  if (QUEUE.length === 0) {
    // no zeros in mat.
    return result;
  }
  let dist = 0;
  while (QUEUE.length > 0) {
    const length = QUEUE.length;

    for (let i = 0; i < length; i++) {
      const [row, col] = QUEUE.shift() as [number, number];
      result[row][col] = dist;
      const neighbors = getNeighbors([row, col], mat, visited);
      for (const [nRow, nCol] of neighbors) {
        if (visited[nRow][nCol]) {
          continue;
        }

        visited[nRow][nCol] = true;
        QUEUE.push([nRow, nCol]);
      }
    }
    // console.log(QUEUE);
    dist += 1;
  }

  return result;
}

function getNeighbors([row, col]: [number, number], mat: number[][], visited: number[][]) {
  const result = [];
  if (row + 1 < mat.length && !visited[row + 1][col]) {
    result.push([row + 1, col]);
  }

  if (col + 1 < mat[0].length && !visited[row][col + 1]) {
    result.push([row, col + 1]);
  }

  if (row - 1 >= 0 && !visited[row - 1][col]) {
    result.push([row - 1, col]);
  }

  if (col - 1 >= 0 && !visited[row][col - 1]) {
    result.push([row, col - 1]);
  }

  return result;
}
