/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function (n, k) {
  const result = [];
  helper(n, k, 1, [], result);
  return result;
};

function helper(n, k, index, slate, result) {
  if (slate.length === k) {
    result.push(slate.slice(0));
    return;
  }
  if (index > n) {
    return;
  }

  slate.push(index);
  helper(n, k, index + 1, slate, result);
  slate.pop();

  helper(n, k, index + 1, slate, result);
}

console.log(combine(4, 2));
