/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const result = [];
  helper(nums, 0, [], result);
  return result;
};

function helper(nums, index, path, result) {
  if (nums.length === index) {
    result.push(path.slice(0));
    return;
  }

  for (let i = index; i < nums.length; i++) {
    swap(nums, index, i);
    path.push(nums[index]);
    helper(nums, index + 1, path, result);
    path.pop();
    swap(nums, i, index);
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(permute([1, 2, 3]));
