/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const result = [];
  helper(nums, 0, [], result);
  return result;
};

function helper(nums, start, path, result) {
  if (path.length === nums.length) {
    result.push([...path]);
    return;
  }

  for (let i = start; i < nums.length; i++) {
    path.push(nums[i]);
    swap(nums, start, i);
    helper(nums, start + 1, path, result);
    swap(nums, i, start);
    path.pop();
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(permute([1, 2, 3]));
