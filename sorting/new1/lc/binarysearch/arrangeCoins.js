/**
 * @param {number} n
 * @return {number}
 */
const arrangeCoins = function (n) {
  let start = 0;
  let end = n;

  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    const midVal = (mid * (mid + 1)) / 2;
    if (midVal <= n) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return end;
};
