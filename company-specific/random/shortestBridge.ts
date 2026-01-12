type ParentType = ([number, number] | null)[][];
function shortestBridge(grid: number[][]): number {
  const MAX_ROW = grid.length;
  const MAX_COL = grid[0].length;
  const parent: ParentType = Array.from({ length: MAX_ROW }, () => Array.from({ length: MAX_COL }, () => null));
  const visited = Array.from({ length: MAX_ROW }, () => Array.from({ length: MAX_COL }, () => false));

  const oneIndices: [number, number][] = [];
  for (let i = 0; i < MAX_ROW; i++) {
    for (let j = 0; j < MAX_COL; j++) {
      if (grid[i][j] === 1) {
        oneIndices.push([i, j]);
      }
    }
  }
  if (oneIndices.length < 2) {
    // not possible
    return -1;
  }

  // BFS
  let numOfOneFound = 0;
  const source = oneIndices[0]; // can be anything
  const QUEUE = [source];
  const [sRow, sCol] = source;
  visited[sRow][sCol] = true;

  while (QUEUE.length > 0) {
    const [row, col] = QUEUE.shift()!;
    if (grid[row][col] === 1) {
      numOfOneFound += 1;
    }
    if (numOfOneFound === oneIndices.length) {
      break;
    }
    const neigbors = getNeighbors([row, col], grid);
    for (const [nRow, nCol] of neigbors) {
      if (visited[nRow][nCol]) {
        continue;
      }
      parent[nRow][nCol] = [row, col];
      visited[nRow][nCol] = true;
      QUEUE.push([nRow, nCol]);
    }
    // Make sure 1 are visited first
    QUEUE.sort(([row1, col1], [row2, col2]) => {
      return grid[row2][col2] - grid[row1][col1];
    });
  }
  const zeroVisited = new Set<string>();
  for (const oneIndex of oneIndices) {
    findParentPath(oneIndex, grid, parent, zeroVisited);
  }

  console.log(zeroVisited);
  return zeroVisited.size;
}

function findParentPath(
  [dRow, dCol]: [number, number],
  grid: number[][],
  parent: ParentType,
  zeroVisited: Set<string>
) {
  if (parent[dRow][dCol] === null) {
    return;
  }
  if (grid[dRow][dCol] === 0) {
    zeroVisited.add([dRow, dCol].join());
  }
  findParentPath(parent[dRow][dCol], grid, parent, zeroVisited);
  return;
}

function getNeighbors([row, col]: [number, number], grid: number[][]) {
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  return directions.reduce((acc, [rDir, cDir]) => {
    const nRow = row + rDir;
    const nCol = col + cDir;
    if (nRow >= 0 && nRow < grid.length && nCol >= 0 && nCol < grid[0].length) {
      acc.push([nRow, nCol]);
    }
    return acc;
  }, [] as [number, number][]);
}