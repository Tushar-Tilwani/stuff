/**
 * @param {list_int32} s
 * @return {list_bool}
 */
function equal_subset_sum_partition(s) {
  const sum = s.reduce((acc, val) => acc + val, 0);

  if (sum % 2 !== 0) {
    return [];
  }
  const target = sum / 2;
  const resultSet = [];
  helper(s, [], target, 0, resultSet, new Map());
  // Write your code here.
  const set = resultSet[0];
  if (!set || set.size === 0) {
    return [];
  }

  const finalResult = [];
  for (let i = 0; i < s.length; i++) {
    if (set.has(i)) {
      finalResult.push(0);
    } else {
      finalResult.push(1);
    }
  }
  return finalResult;
}

function helper(s, slate, target, index, result, memo) {
  if (result[0]) {
    return;
  }
  if (target === 0) {
    result[0] = new Set(slate);
    return;
  }
  if (index === s.length) {
    return;
  }

  slate.push(index);
  helper(s, slate, target - s[index], index + 1, result, memo);
  slate.pop();

  helper(s, slate, target, index + 1, result, memo);
}
