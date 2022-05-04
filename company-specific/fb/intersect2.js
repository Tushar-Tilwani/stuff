/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  const countMap = nums2.reduce((acc, value) => {
    acc.set(value, (acc.get(value) ?? 0) + 1);
    return acc;
  }, new Map());

  const result = [];
  for (let i = 0; i < nums1.length; i++) {
    if ((countMap.get(nums1[i]) ?? 0) > 0) {
      result.push(nums1[i]);
      countMap.set(nums1[i], countMap.get(nums1[i]) - 1);
    }
  }
  return result;
};
