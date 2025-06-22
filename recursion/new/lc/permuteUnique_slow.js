/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  const result = new Map();
  helper(nums, 0, [], result);
  return Array.from(result.values());
};

function helper(nums, startIndex, path, result) {
  if (startIndex === nums.length) {
    result.set(path.join(), [...path]);
    return;
  }

  for (let i = startIndex; i < nums.length; i++) {
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
