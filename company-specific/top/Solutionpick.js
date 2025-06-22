/**
 * @param {number[]} nums
 */
var Solution = function (nums) {
  const numsMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (!numsMap.has(num)) {
      numsMap.set(num, []);
    }
    numsMap.get(num).push(i);
  }
  this.numsMap = numsMap;
};

/**
 * @param {number} target
 * @return {number}
 */
Solution.prototype.pick = function (target) {
  return getRand(this.numsMap.get(target));
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.pick(target)
 */

function getRand(arr) {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
}
