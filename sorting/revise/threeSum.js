const sortFn = (a, b) => a - b;
const intParse = val => parseInt(val);
const strPlace = str => str.split(",").map(intParse);

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  const sortedNums = nums.sort();
  const result = new Set();

  for (let i = 0; i < sortedNums.length; i++) {
    const target = -sortedNums[i];
    let lp = 0;
    let rp = sortedNums.length - 1;

    while (lp < rp) {
      if (lp === i) {
        lp++;
        continue;
      }

      if (rp === i) {
        rp--;
        continue;
      }

      let sum = sortedNums[lp] + sortedNums[rp];
      if (sum === target) {
        result.add([sortedNums[lp], sortedNums[rp], -target].sort().join(","));
        lp++;
        rp--;
      } else if (sum < target) {
        lp++;
      } else {
        rp--;
      }
    }
  }

  return Array.from(result.values()).map(strPlace);
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
