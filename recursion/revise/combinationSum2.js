/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
  const result = [];
  helper(candidates.sort(), 0, target, [], result);
  return result;
};

function helper(s, index, target, path, result) {
  if (target === 0) {
    result.push(path.slice(0));
    return;
  }

  if (target < 0) {
    return;
  }

  if (index === s.length) {
    return;
  }

  if (s[index] === s[index - 1]) {
    // skip if duplicate
    index = index + 1;
  }
  path.push(s[index]);
  helper(s, index + 1, target - s[index], path, result);
  path.pop();

  helper(s, index + 1, target, path, result);
}

var candidates = [10, 1, 2, 7, 1, 6, 5],
  target = 8;

console.log(combinationSum2(candidates, target));
