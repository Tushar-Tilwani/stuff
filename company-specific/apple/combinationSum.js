/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const result = [];
  allSets(candidates, 0, target, [], result);
  return result;
};

function allSets(candidates, index, target, partial, result, wasPrevSame) {
  if (target === 0) {
    result.push(partial.slice(0));
    return;
  }

  if (target < 0 || index >= candidates.length) {
    return;
  }

  partial.push(candidates[index]);
  allSets(candidates, index, target - candidates[index], partial, result, true);
  partial.pop();

  partial.push(candidates[index]);
  allSets(
    candidates,
    index + 1,
    target - candidates[index],
    partial,
    result,
    false
  );
  partial.pop();

  if (!wasPrevSame) {
    //skip current
    allSets(candidates, index + 1, target, partial, result, false);
  }
}
