// https://leetcode.com/problems/longest-consecutive-sequence/
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
  const numMap = nums.reduce((map, num) => {
    map.set(num, 0);
    return map;
  }, new Map());

  //   console.log(numMap, nums);
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    console.log(num);

    if (!numMap.has(num)) {
      continue;
    }

    let currentNum = num;
    let count = 0;

    if (numMap.get(currentNum + 1) > 0) {
      numMap.set(num, numMap.get(currentNum + 1) + 1);
      numMap.delete(currentNum + 1);
      break;
    }

    while (numMap.has(currentNum)) {
      numMap.delete(currentNum);
      count += 1;
      currentNum += 1;
    }
    numMap.set(num, count);
  }
  return numMap;
  //   return Math.max(...Array.from(numMap.values()));
};

let arr = [1, 2, 0, 1];
arr = [100, 4, 200, 1, 3, 2];

arr = [1, 0, -1];

console.log(longestConsecutive(arr));
