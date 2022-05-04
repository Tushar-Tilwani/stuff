/**
 * @param {number[]} nums
 * @return {SparseVector}
 */
var SparseVector = function (nums) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      map.set(i, nums[i]);
    }
  }
  this.numsMap = map;
};

// Return the dotProduct of two sparse vectors
/**
 * @param {SparseVector} vec
 * @return {number}
 */
SparseVector.prototype.dotProduct = function (vec) {
  const numsMap1 = this.numsMap;
  const numsMap2 = vec.numsMap;

  let sum = 0;
  for (const key of numsMap1.keys()) {
    if (numsMap2.has(key)) {
      sum += numsMap2.get(key) * numsMap1.get(key);
    }
  }

  return sum;
};

// Your SparseVector object will be instantiated and called as such:
// let v1 = new SparseVector(nums1);
// let v2 = new SparseVector(nums2);
// let ans = v1.dotProduct(v2);
