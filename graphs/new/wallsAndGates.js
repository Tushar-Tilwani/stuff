const INF = 2147483647;
/**
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
 */
var wallsAndGates = function (rooms) {
  const MAX_ROW = rooms.length;
  const MAX_COL = rooms[0].length;
  const QUEUE = [];
  // Initialize QUEUE
  for (let i = 0; i < MAX_ROW; i++) {
    for (let j = 0; j < MAX_COL; j++) {
      if (rooms[i][j] === 0) {
        QUEUE.push([i, j]);
      }
    }
  }
  let dist = 1;
  while (QUEUE.length > 0) {
    const length = QUEUE.length;
    for (let i = 0; i < length; i++) {
      const [row, col] = QUEUE.shift();
      const neighbours = getNeigbors(rooms, row, col, MAX_ROW, MAX_COL);
      for (const [nRow, nCol] of neighbours) {
        rooms[nRow][nCol] = dist;
        QUEUE.push([nRow, nCol]);
      }
    }
    dist++;
  }

  return rooms;
};

function getNeigbors(rooms, i, j, MAX_ROW, MAX_COL) {
  const result = [];
  if (i + 1 < MAX_ROW && rooms[i + 1][j] === INF) {
    result.push([i + 1, j]);
  }

  if (j + 1 < MAX_COL && rooms[i][j + 1] === INF) {
    result.push([i, j + 1]);
  }

  if (i - 1 >= 0 && rooms[i - 1][j] === INF) {
    result.push([i - 1, j]);
  }

  if (j - 1 >= 0 && rooms[i][j - 1] === INF) {
    result.push([i, j - 1]);
  }
  return result;
}
