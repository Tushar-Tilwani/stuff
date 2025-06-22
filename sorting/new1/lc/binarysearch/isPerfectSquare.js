/**
 * @param {number} num
 * @return {boolean}
 */
const isPerfectSquare = function (num) {
  let start = 1;
  let end = num;
  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    const midVal = mid * mid;
    if (midVal === num) {
      return true;
    }

    if (num < midVal) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return false;
};
