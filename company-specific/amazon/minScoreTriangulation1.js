/**
 * @param {number[]} values
 * @return {number}
 */
var minScoreTriangulation = function (values) {
  const memo = new Map();
  function dfs(i, j) {
    const key = [i, j].join();
    if (memo.has(key)) {
      return memo.get(key);
    }
    let result = Infinity;

    for (let k = i + 1; k < j; k++) {
      const temp = values[i] * values[k] * values[j] + dfs(i, k) + dfs(k, j);
      result = Math.min(result, temp);
    }

    if (!isFinite(result)) {
      memo.set(key, 0);
    } else {
      memo.set(key, result);
    }

    return memo.get(key);
  }

  return dfs(0, values.length - 1);
};
