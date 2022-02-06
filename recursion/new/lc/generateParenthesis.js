/**
 * @param {number} n
 * @return {string[]}
 */
function generateParenthesis(n) {
  const result = [];
  helper([], 2 * n, 0, result);
  return result;
}

function helper(slate, n, balance, result) {
  // backtracking case
  if (balance < 0 || slate.length > n) {
    return;
  }

  // base case
  if (balance === 0 && slate.length === n) {
    result.push(slate.join(""));
    return;
  }

  slate.push("(");
  helper(slate, n, balance + 1, result);
  slate.pop();

  slate.push(")");
  helper(slate, n, balance - 1, result);
  slate.pop();
}

console.log(generateParenthesis(3));
