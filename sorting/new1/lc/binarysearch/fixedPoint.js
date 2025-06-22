/**
 * @param {number[]} arr
 * @return {number}
 */
const fixedPoint = function (arr) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    if (mid <= arr[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return arr[start] === start ? start : -1;
};
