function getMazePath(maze) {
  const MAX_ROWS = maze.length;
  const MAX_COLS = maze[0].length;
  if (maze[0][0] !== 0 || maze[MAX_ROWS - 1][MAX_COLS - 1] !== 0) {
    // Short circuit if start or end is null;
    return null;
  }

  if (MAX_COLS === 1 && MAX_COLS === 1) {
    return [0, 0];
  }

  const start = [0, 0];
  const end = [MAX_ROWS - 1, MAX_COLS - 1];

  const visited = new Array(MAX_ROWS).fill(null).map(() => new Array(MAX_COLS).fill(false));
  const parent = new Array(MAX_ROWS).fill(null).map(() => new Array(MAX_COLS).fill(null));

  bfs(start, end, maze, visited, parent);

  return getPath(end, parent);
}

function bfs(start, end, maze, visited, parent) {
  const QUEUE = [start];
  const [sRow, sCol] = start;
  const [eRow, eCol] = end;
  visited[sRow][sCol] = true;

  while (QUEUE.length > 0) {
    const cNode = QUEUE.pop();
    const neighbors = getNeighbors(maze, cNode);
    for (const [nRow, nCol] of neighbors) {
      if (visited[nRow][nCol]) {
        continue;
      }
      visited[nRow][nCol] = true;
      parent[nRow][nCol] = cNode;
      if (nRow === eRow && nCol === eCol) {
        // Found End node. No need to continue BFS
        return;
      }
      QUEUE.push([nRow, nCol]);
    }
  }
}

function getNeighbors(maze, node) {
  const MAX_ROWS = maze.length;
  const MAX_COLS = maze[0].length;
  const [row, col] = node;
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];

  return directions.reduce((acc, [rowDir, colDir]) => {
    const nRow = row + rowDir;
    const nCol = col + colDir;
    if (nRow >= 0 && nRow < MAX_ROWS && nCol >= 0 && nCol < MAX_COLS && maze[nRow][nCol] === 0) {
      acc.push([nRow, nCol]);
    }
    return acc;
  }, []);
}
function getPath(end, parent) {
  const result = [end];
  let [row, col] = end;
  if (parent[row][col] === null) {
    return null;
  }
  while (parent[row][col] !== null) {
    const node = parent[row][col];
    result.push(node);
    [row, col] = node;
  }
  return result.reverse();
}
const maze2 = [[0, 0, 1, 0, 0]];
// Test case 2
console.log("Test case 2:");
console.log("Expected path: null");
console.log("Actual path:", getMazePath(maze2));
console.log("");
