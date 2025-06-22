// https://leetcode.com/problems/combination-sum/
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
  const result = [];
  helper(candidates, 0, target, [], result);
  return result;
};

function helper(s, index, target, path, result) {
  if (index === s.length) {
    return;
  }

  if (target === 0) {
    result.push(path.slice(0));
    return;
  }

  if (target < 0) {
    return;
  }

  path.push(s[index]);
  helper(s, index, target - s[index], path, result);
  path.pop();

  helper(s, index + 1, target, path, result);
}

var candidates = [2, 3, 6, 7],
  target = 7;

console.log(combinationSum(candidates, target));
