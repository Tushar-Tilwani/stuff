/**
 * @param {number[]} arr
 * @return {boolean}
 */
const validMountainArray = function (arr) {
  let prevIsIncreasing;
  let count = 0;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === arr[i - 1]) {
      return false;
    }
    const curIsIncreasing = arr[i] > arr[i - 1];
    if (prevIsIncreasing === undefined) {
      prevIsIncreasing = curIsIncreasing;
      continue;
    }

    if (prevIsIncreasing === false && curIsIncreasing === true) {
      return false;
    }

    if (prevIsIncreasing === true && curIsIncreasing === false) {
      count += 1;
      continue;
    }
  }
  return count == 1;
};
