// https://leetcode.com/problems/n-queens/
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  const results = [];

  helper([], n, results);

  return getFormattedResults(results, n);
};

function helper(partialSolution, n, result) {
  if (isAttacking(partialSolution)) {
    return;
  }

  if (partialSolution.length === n) {
    result.push(partialSolution.slice(0));
    return;
  }

  for (let i = 0; i < n; i++) {
    partialSolution.push(i);
    helper(partialSolution, n, result);
    partialSolution.pop();
  }
}

function isAttacking(placements) {
  // Last value is the newRow and newCol
  let newRow = placements.length - 1;
  let newCol = placements[newRow];
  for (let row = 0; row < newRow; row++) {
    let col = placements[row];
    if (newCol === col) {
      return true;
    }
    if (Math.abs(newRow - row) === Math.abs(newCol - col)) {
      return true;
    }
  }
  return false;
}

function getFormattedResults(results, n) {
  return results.reduce((acc, result) => {
    const formattedResult = result.map(v => {
      const string = [];
      for (let i = 0; i < n; i++) {
        if (i !== v) {
          string.push(".");
        } else {
          string.push("Q");
        }
      }
      return string.join("");
    });
    acc.push(formattedResult);
    return acc;
  }, []);
}

console.log(solveNQueens(4));
