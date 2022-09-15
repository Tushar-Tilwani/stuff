/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  const indexMap = nums2.reduce((acc, v, i) => {
    acc.set(v, i);
    return acc;
  }, new Map());
  const result = [];
  for (let i = 0; i < nums1.length; i++) {
    const num = nums1[i];
    for (let j = indexMap.get(num) + 1; j < nums2.length; j++) {
      if (nums2[j] > num) {
        result.push(nums2[j]);
        break;
      }
    }
    if (result.length - 1 < i) {
      // no push
      result.push(-1);
    }
  }
  return result;
};
