// Lc 47. Permutations II

/* Skip the subtree which has same value */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permuteUnique = function(nums) {
  const result = [];
  _permuteUnique(nums, 0, [], result);
  return result;
};

const _permuteUnique = function(nums, start, slate, result) {
  if (start === nums.length) {
    result.push([...slate]);
    return;
  }
  const hashSet = new Set();

  for (let i = start; i < nums.length; i++) {
    const num = nums[i];
    if (hashSet.has(num)) {
      continue;
    }
    hashSet.add(num);

    swap(nums, start, i);
    slate.push(num);

    _permuteUnique(nums, start + 1, slate, result);

    slate.pop();
    swap(nums, i, start);
  }
};

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

console.log(permuteUnique([0, 1, 2]));
