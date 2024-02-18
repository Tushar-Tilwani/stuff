/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
const search = function (arr, target) {
  let start = 0;
  let end = arr.length - 1;
  while (start < end) {
    const mid = Math.floor((end - start) / 2) + start;
    if (arr[mid] === target) {
      return mid;
    }

    if (target < arr[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }

  return -1;
};
