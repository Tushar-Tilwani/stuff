const sortFn = (a, b) => a - b;

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  const sortedNums = nums.sort(sortFn);
  const len = sortedNums.length;
  const skipSet = new Set();
  const result = new Set();
  for (let i = 0; i < len; i++) {
    skipSet.add(i);
    for (let j = i + 1; j < len; j++) {
      skipSet.add(j);
      const newTarget = target - sortedNums[i] - sortedNums[j];
      const partialResult = twoSum(sortedNums, skipSet, newTarget).map((arr) =>
        [sortedNums[i], sortedNums[j], ...arr].sort(sortFn).join()
      );
      partialResult.forEach((r) => {
        result.add(r);
      });
      skipSet.delete(j);
    }
    skipSet.delete(i);
  }
  console.log(result);
  return Array.from(result.values()).map((str) =>
    str.split(",").map((v) => parseInt(v))
  );
};

function twoSum(sortedNums, skipSet, target) {
  let start = 0;
  let end = sortedNums.length - 1;
  const result = [];
  while (start < end) {
    const sum = sortedNums[start] + sortedNums[end];
    if (skipSet.has(start) || sum < target) {
      start++;
      continue;
    }
    if (skipSet.has(end) || sum > target) {
      end--;
      continue;
    }
    //sum === target
    result.push([sortedNums[start], sortedNums[end]]);
    start++;
    end--;
  }

  return result;
}
