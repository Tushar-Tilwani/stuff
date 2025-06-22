/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
  const result = new Set();
  helper(candidates, 0, target, [], result);
  return [...result.values()].map(v => v.split(",").map(s => parseInt(s)));
};

function helper(s, index, target, path, result) {
  if (target === 0) {
    result.add(
      path
        .slice(0)
        .sort()
        .join()
    );
    return;
  }

  if (target < 0) {
    return;
  }

  if (index === s.length) {
    return;
  }

  path.push(s[index]);
  helper(s, index + 1, target - s[index], path, result);
  path.pop();

  helper(s, index + 1, target, path, result);
}

var candidates = [10, 1, 2, 7, 1, 6, 5],
  target = 8;

console.log(combinationSum2(candidates, target));
