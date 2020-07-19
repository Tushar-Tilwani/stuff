/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  const result = merge(nums1, nums2);
  const isEven = result.length % 2 === 0;
  const mid = Math.floor(result.length / 2);
  if (isEven) {
    const floor = result[mid];
    const ceil = result[mid + 1];
    return (floor + ceil) / 2;
  }
  return result[mid];
};

function merge(nums1, nums2) {
  const result = [];
  let p1 = 0;
  let p2 = 0;

  while (p1 < nums1.length && p2 < nums2.length) {
    if (nums1[p1] < nums2[p2]) {
      result.push(nums1[p1]);
      p1++;
    } else {
      result.push(nums2[p2]);
      p2++;
    }
  }

  while (p1 < nums1.length) {
    result.push(nums1[p1]);
    p1++;
  }

  while (p2 < nums2.length) {
    result.push(nums2[p2]);
    p2++;
  }

  return result;
}
