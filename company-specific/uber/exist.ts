// You struggled with this
// The only aha! moment is visited sandwich
function exist(board: string[][], word: string): boolean {
  const visited = Array.from({ length: board.length }, () => Array.from({ length: board[0].length }, () => false));

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      visited[i][j] = true;
      if (dfs([i, j], board, 0, word, visited)) {
        return true;
      }
      visited[i][j] = false;
    }
  }
  return false;
}

function dfs(
  [row, col]: [number, number],
  board: string[][],
  index: number,
  word: string,
  visited: boolean[][]
): boolean {
  if (board[row][col] !== word[index]) {
    return false;
  }
  if (index + 1 === word.length) {
    // here: board[row][col] === word[index]
    return true;
  }
  const neighbors = getNeighbors([row, col], board);
  for (const neighbor of neighbors) {
    const [nRow, nCol] = neighbor;
    if (visited[nRow][nCol]) {
      continue;
    }
    visited[nRow][nCol] = true;
    if (dfs(neighbor, board, index + 1, word, visited)) {
      return true;
    }
    visited[nRow][nCol] = false;
  }
  return false;
}

function getNeighbors([row, col]: [number, number], board: string[][]): [number, number][] {
  return [
    row + 1 < board.length ? [row + 1, col] : null,
    row - 1 >= 0 ? [row - 1, col] : null,
    col + 1 < board[0].length ? [row, col + 1] : null,
    col - 1 >= 0 ? [row, col - 1] : null,
  ].filter(Boolean) as [number, number][];
}
