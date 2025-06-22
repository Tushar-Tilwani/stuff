/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  const sortedNums = nums.sort((a, b) => a - b);
  let closest = Infinity;
  let result = null;
  for (let i = 0; i < sortedNums.length; i++) {
    const newTarget = target - sortedNums[i];
    let start = 0;
    let end = sortedNums.length - 1;

    while (start < end) {
      if (start === i) {
        start++;
        continue;
      }

      if (end === i) {
        end--;
        continue;
      }

      const newCloset = newTarget - (sortedNums[start] + sortedNums[end]);
      const absNewCloset = Math.abs(newCloset);
      if (absNewCloset < closest) {
        console.log(sortedNums[start], sortedNums[end], sortedNums[i]);
        result = sortedNums[start] + sortedNums[end] + sortedNums[i];
        closest = absNewCloset;
      }

      if (newCloset < 0) {
        start++;
      } else {
        end--;
      }
    }
  }

  return result;
};
