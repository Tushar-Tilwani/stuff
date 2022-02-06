/*
 * Complete the function below.
 */
function how_many_BSTs(n) {
  return helper(n, []);
}

function helper(n, memo) {
  if (isFinite(memo[n])) {
    return memo[n];
  }
  if (n <= 1) {
    memo[n] = 1;
    return memo[n];
  }

  if (n === 2) {
    memo[n] = 2;
    return memo[n];
  }

  let result = 0;
  for (let i = 0; i < n; i++) {
    result += helper(i, memo) * helper(n - i - 1, memo);
  }

  memo[n] = result;

  return memo[n];
}
console.log(how_many_BSTs(5));
