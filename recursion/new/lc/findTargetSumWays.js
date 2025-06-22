/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function findTargetSumWays(nums, target) {
  const result = [0];
  helper(nums, target, 0, 0, result);
  return result[0];
}

function helper(nums, target, partialSum, index, result) {
  if (index === nums.length) {
    if (target === partialSum) {
      result[0] += 1;
    }
    return;
  }

  helper(nums, target, partialSum - nums[index], index + 1, result);
  helper(nums, target, partialSum + nums[index], index + 1, result);
}

let nums = [1, 1, 1, 1, 1],
  target = 3;

console.log(findTargetSumWays(nums, target));

[
  {
    orgRank: 20,
    rank: 1,
    serviceGuid: "cloudguard",
    overdue: 0,
    current: 0,
    future: 0,
    completed: 1,
    percentComplete: 1.0,
    trends: {
      orgRank: -2,
      rank: -1,

      overdue: 4,
      current: -2,
      future: 3,
      completed: 2,
      percentComplete: 0.23,
      comparedTo: "2021-12-20T19:31:39.624Z",
    },
  },
  {
    orgRank: 54,
    rank: 2,
    serviceGuid: "secux",
    overdue: 0,
    current: 2,
    future: 0,
    completed: 2,
    percentComplete: 0.5,
    trends: {
      orgRank: -2,
      rank: -1,
      overdue: 4,
      current: -2,
      future: 3,
      completed: 2,
      percentComplete: 0.23,
      comparedTo: "2021-12-20T19:31:39.624Z",
    },
  },
];
