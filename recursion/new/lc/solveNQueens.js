/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  const result = [];
  helper(n, [], result);
  return result.reduce(resultReducer, []);
};

function helper(n, slate, result) {
  // Backtracking case
  if (!isValid(slate)) {
    return;
  }
  if (slate.length === n) {
    result.push(slate.slice(0));
    return;
  }

  for (let i = 0; i < n; i++) {
    slate.push(i);
    helper(n, slate, result);
    slate.pop();
  }
}

function isValid(slate) {
  const lastRow = slate.length - 1;
  const lastCol = slate[lastRow];
  for (let row = 0; row < slate.length - 1; row++) {
    const col = slate[row];

    if (lastCol === col) {
      return false;
    }

    if (Math.abs(lastRow - row) === Math.abs(lastCol - col)) {
      return false;
    }
  }

  return true;
}

function resultReducer(acc, placements) {
  const result = [];
  // n is always equal to result
  const n = placements.length;
  for (const placement of placements) {
    const row = [];
    for (let i = 0; i < n; i++) {
      if (placement === i) {
        row.push("Q");
      } else {
        row.push(".");
      }
    }
    result.push(row.join(""));
  }
  acc.push(result);
  return acc;
}

console.log(solveNQueens(4));
