/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const result = [];
  dfs(n, 0, 0, [], result);
  return result;
};

function dfs(n, left, right, partial, result) {
  if (left === right && left === n) {
    result.push(partial.join(""));
    return;
  }
  if (right > left || left > n || right > n) {
    return;
  }

  partial.push("(");
  dfs(n, left + 1, right, partial, result);
  partial.pop();

  partial.push(")");
  dfs(n, left, right + 1, partial, result);
  partial.pop();
}
