/**
 * @param {number[]} arr
 * @return {boolean}
 */
const validMountainArray = function (arr) {
  if (arr.length < 3) {
    return false;
  }
  let left = 0;
  while (arr[left] < arr[left + 1]) {
    left++;
  }

  let right = arr.length - 1;
  while (arr[right] < arr[right - 1]) {
    right--;
  }

  return left === right && left !== 0 && left !== arr.length - 1;
};
