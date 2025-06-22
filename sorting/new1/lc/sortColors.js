/**
 * @param {number[]} arr
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const sortColors = function (arr) {
  let left = -1;
  let right = arr.length;
  let middle = 0;
  while (middle < right) {
    if (arr[middle] === 0) {
      left++;
      swap(arr, middle, left);
      middle++;
      continue;
    }

    if (arr[middle] === 2) {
      right--;
      swap(arr, middle, right);

      continue;
    }

    middle++;
  }

  return arr;
};

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}
