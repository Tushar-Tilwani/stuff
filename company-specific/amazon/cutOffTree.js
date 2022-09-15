/**
 * @param {number[][]} forest
 * @return {number}
 */
var cutOffTree = function (forest) {
  const visited = new Array(forest.length)
    .fill()
    .map(() => new Array(forest[0].length).fill(false));
  const treeCount = getTreeCount(forest);
  const result = [Infinity];
  dfs(forest, 0, 0, visited, treeCount, 1, result);
  return isFinite(result[0]) ? result[0] : -1;
};

function dfs(forest, i, j, visited, minCount, count, result) {
  const neigbors = getNeigbors(forest, i, j, visited);
  if (neigbors.length === 0) {
    if (count >= minCount && count < result[0]) {
      result[0] = count;
    }
    return;
  }
  for (const [nRow, nCol] of neigbors) {
    visited[nRow][nCol] = true;
    dfs(forest, nRow, nCol, visited, minCount, count + 1, result);
    visited[nRow][nCol] = false;
  }
}

function getNeigbors(forest, i, j, visited) {
  const val = forest[i][j];
  const result = [];
  if (i + 1 < forest.length && checkNVal(forest, i + 1, j, visited, val)) {
    result.push([i + 1, j]);
  }

  if (i - 1 >= 0 && checkNVal(forest, i - 1, j, visited, val)) {
    result.push([i - 1, j]);
  }

  if (j + 1 < forest[0].length && checkNVal(forest, i, j + 1, visited, val)) {
    result.push([i, j + 1]);
  }

  if (j - 1 >= 0 && checkNVal(forest, i, j - 1, visited, val)) {
    result.push([i, j - 1]);
  }
  return result;
}

function checkNVal(forest, i, j, visited, val) {
  const nVal = forest[i][j];
  if (visited[i][j]) {
    return false;
  }
  if (nVal === 0) {
    return false;
  }
  if (nVal === 1) {
    return true;
  }

  return nVal > val;
}

function getMinGreatorNeighbor(forest, i, j) {
  const val = forest[i][j];
  let result = [];
  let currentVal = forest[i][j];
  if (i + 1 < forest.length) {
    const nVal = forest[i + 1][j];
    if (nVal !== 0 && nVal > val && nVal <= currentVal) {
      result = [i + 1, j];
      currentVal = nVal;
    }
  }

  if (i - 1 >= 0) {
    const nVal = forest[i - 1][j];
    if (nVal !== 0 && nVal > val && nVal <= currentVal) {
      result = [i - 1, j];
    }
  }

  if (j + 1 < forest[0].length) {
    const nVal = forest[i][j + 1];
    if (nVal !== 0 && nVal > val && nVal <= currentVal) {
      result = [i, j + 1];
    }
  }

  if (j - 1 >= 0) {
    const nVal = forest[i][j - 1];
    if (nVal !== 0 && nVal > val && nVal <= currentVal) {
      result = [i, j - 1];
    }
  }

  return result;
}

function getTreeCount(forest) {
  let count = 0;
  for (let i = 0; i < forest.length; i++) {
    for (let j = 0; j < forest[0].length; j++) {
      if (forest[i][j] > 1) {
        count++;
      }
    }
  }
  return count;
}
