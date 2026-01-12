/**
 * @param {number} n
 * @return {number}
 */
var minOperations = function (n) {
  return minOperations(n);
};

function minOperations(target) {
  if (target === 0) {
    return 0;
  }
  const closetPow = Math.round(Math.log2(target));
  return 1 + minOperations(Math.abs(target - Math.pow(2, closetPow)));
}
