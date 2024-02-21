/**
 * @param {number[]} arr
 * @return {number}
 */
const peakIndexInMountainArray = function (arr) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    const mid = Math.floor((end - start) / 2) + start;
    if (arr[mid] > arr[mid + 1] && arr[mid] > arr[mid - 1]) {
      return arr[mid];
    }
    if (arr[mid] > arr[mid + 1]) {
      // Mid on right side
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return -1;
};
