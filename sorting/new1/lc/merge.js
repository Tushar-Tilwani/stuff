/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const merge = function (nums1, m, nums2, n) {
  let i = nums1.length - 1;
  let i1 = m - 1;
  let i2 = n - 1;

  while (i1 >= 0 && i2 >= 0) {
    if (nums1[i1] >= nums2[i2]) {
      nums1[i] = nums1[i1];
      i1--;
    } else {
      nums1[i] = nums2[i2];
      i2--;
    }
    i--;
  }

  while (i1 >= 0) {
    nums1[i] = nums1[i1];
    i1--;
    i--;
  }

  while (i2 >= 0) {
    nums1[i] = nums2[i2];
    i2--;
    i--;
  }
};
