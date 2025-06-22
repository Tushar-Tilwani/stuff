/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute(nums) {
  const result = [];
  helper(nums, [], 0, result);
  return result;
}

function helper(nums, slate, index, result) {
  if (index === nums.length) {
    result.push(slate.slice(0));
    return;
  }

  for (let i = index; i < nums.length; i++) {
    slate.push(nums[i]);
    swap(nums, index, i);
    helper(nums, slate, index + 1, result);
    swap(nums, i, index);
    slate.pop();
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(permute([1, 2, 3]));
