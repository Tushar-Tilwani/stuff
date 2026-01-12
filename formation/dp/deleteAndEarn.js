/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function (nums) {
  const freqMap = nums.reduce((acc, num) => {
    acc.set(num, (acc.get(num) ?? 0) + 1);
    return acc;
  }, new Map());
  const sortedNums = Array.from(freqMap.keys()).sort((a, b) => a - b);
  //   console.log(freqMap);

  return helper(sortedNums, 0, freqMap, new Map());
};

function helper(sortedNums, i, freqMap, memo) {
  let index = i;
  if (index >= sortedNums.length) {
    return 0;
  }

  if (memo.has(i)) {
    return memo.get(i);
  }

  // don't pick
  let result = helper(sortedNums, index + 1, freqMap, memo);

  // pick
  const num = sortedNums[index] * freqMap.get(sortedNums[index]);

  //    console.log(index, sortedNums[index], sortedNums[index+1])

  if (sortedNums[index] === sortedNums[index + 1] - 1) {
    index += 1;
  }

  //  console.log(index)
  result = Math.max(result, helper(sortedNums, index + 1, freqMap, memo) + num);
  memo.set(i, result);
  return result;
}
