/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  const result = [];
  helper(nums, 0, [], result);
  return result;
};

function helper(nums, startIndex, path, result) {
  if (startIndex === nums.length) {
    result.push([...path]);
    return;
  }

  const set = new Set();
  for (let i = startIndex; i < nums.length; i++) {
    if (set.has(nums[i])) {
      // Do not dispatch more calls for the same value
      continue;
    }
    set.add(nums[i]);
    path.push(nums[i]);
    swap(nums, startIndex, i);
    helper(nums, startIndex + 1, path, result);
    swap(nums, i, startIndex);
    path.pop();
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(permuteUnique([1, 1, 3]));
