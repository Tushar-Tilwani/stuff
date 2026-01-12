/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function(nums) {
    return check(nums, 0, new Map(), new Map());
};

function check(nums, index, tookset, memo, prev) {
  if (nums.length === index) {
    return 0;
  }
  const key = index + prev;
  if(memo.has(key)) {
    return memo.get(key);
  }
  let result = 0;
  // pick

  if (!tookset.has(nums[index])) {
    const next = nums[index] - 1;
    const prev = nums[index] + 1;
    tookset.set(next, (tookset.get(next) ?? 0) + 1);
    tookset.set(prev, (tookset.get(prev) ?? 0) + 1);
    result = check(nums, index + 1, tookset, memo, 1) + nums[index];
    tookset.set(next, (tookset.get(next) ?? 0) - 1);
    tookset.set(prev, (tookset.get(prev) ?? 0) - 1);
    if (tookset.get(next) === 0) {
      tookset.delete(next);
    }
    if (tookset.get(prev) === 0) {
      tookset.delete(prev);
    }
  }

  // don't pick

  result = Math.max(result, check(nums, index + 1, tookset, memo, 0));

  memo.set(key, result);

  return result;
}