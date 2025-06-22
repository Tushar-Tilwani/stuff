/*
 * Complete the solver function below.
 *
 * The function accepts STRING_ARRAY dictionary as parameter.
 * and string array mat as input matrix.
 * The function returns the list of all possible words from dictionary
 * found in the matrix mat
 */

// Graph DFS solution

function boggle_solver(dictionary, mat) {
  // Write your code here
  const result = [];
  for (const word of dictionary) {
    for (let i = 0; i < mat.length; i++) {
      let isBreak = false;
      for (let j = 0; j < mat[0].length; j++) {
        if (helper(word, mat, 0, getVisited(mat), [[i, j]])) {
          result.push(word);
          isBreak = true;
          break;
        }
      }
      if (isBreak) {
        break;
      }
    }
  }
  return result;
}

function helper(word, mat, index, visited, neighbors) {
  if (index === word.length) {
    return true;
  }
  for (const [i, j] of neighbors) {
    // console.log(mat[i][j], word[index], visited);
    if (mat[i][j] === word[index] && !visited[i][j]) {
      visited[i][j] = true;
      if (helper(word, mat, index + 1, visited, getNeigbors(i, j, mat))) {
        return true;
      }
      visited[i][j] = false;
    }
  }

  return false;
}

function getVisited(mat) {
  const maxRow = mat.length;
  const maxCol = mat[0].length;
  const visited = [];
  for (let i = 0; i < maxRow; i++) {
    visited[i] = [];
    for (let j = 0; j < maxCol; j++) {
      visited[i].push(false);
    }
  }
  return visited;
}

function getNeigbors(row, col, mat) {
  const maxRow = mat.length;
  const maxCol = mat[0].length;
  const result = [];

  col - 1 >= 0 && result.push([row, col - 1]);
  col + 1 < maxCol && result.push([row, col + 1]);

  if (row - 1 >= 0) {
    col - 1 >= 0 && result.push([row - 1, col - 1]);
    result.push([row - 1, col]);
    col + 1 < maxCol && result.push([row - 1, col + 1]);
  }

  if (row + 1 < maxRow) {
    col - 1 >= 0 && result.push([row + 1, col - 1]);
    result.push([row + 1, col]);
    col + 1 < maxCol && result.push([row + 1, col + 1]);
  }
  return result;
}

const mat = ["bsh", "tee", "arh"];
const dict = ["bst", "heap", "tree"];

console.log(boggle_solver(dict, mat));
