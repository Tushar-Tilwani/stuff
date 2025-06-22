const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  return quickSelect(nums, k);
};

function quickSelect(nums, k, start = 0, end = nums.length - 1) {
  const pivotIndex = start;
  const pivotValue = nums[pivotIndex];
  swap(nums, start, pivotIndex);

  let left = start;
  let right = end;
  let middle = start + 1;
  while (middle <= right) {
    if (pivotValue > nums[middle]) {
      swap(nums, right, middle);
      right--;
    } else if (pivotValue < nums[middle]) {
      left++;
      swap(nums, left, middle);
      middle++;
    } else {
      middle++;
    }
  }
  swap(nums, left, start);

  if (k - 1 > right) {
    return quickSelect(nums, k, right + 1, end);
  }

  if (k - 1 < left) {
    return quickSelect(nums, k, start, left - 1);
  }
//   console.log(pivotValue, nums, left, right, k - 1);
  return pivotValue;
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(quickSelect([2, 7, 2, 2, 2, 2, 5, 8, 1], 9));
