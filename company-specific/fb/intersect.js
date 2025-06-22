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

  let left = 0;
  let right = 0;
  let tempResult = [];
  let max = 0;
  while (right < nums1.length) {
    if (countMap.has(nums1[right]) && countMap.get(nums1[right]) > 0) {
      const localMax = right - left + 1;
      if (max < localMax) {
        tempResult = [left, right];
      }
      countMap.set(nums1[right], countMap.get(nums1[right]) - 1);
    } else {
      if (countMap.has(nums1[left])) {
        countMap.set(nums1[left], countMap.get(nums1[left]) + 1);
      }
      left++;
    }
    right++;
  }

  const [start, end] = tempResult;
  return nums1.slice(start, end + 1);
};
