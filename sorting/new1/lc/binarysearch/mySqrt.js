


/**
 * @param {number} x
 * @return {number}
 */
const mySqrt = function (x) {
  let start = 1;
  let end = x;
  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    const midVal = mid * mid;
    if (midVal < x) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return end;
};
