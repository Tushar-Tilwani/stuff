// https://leetcode.com/problems/maximum-length-of-repeated-subarray/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findLength = function (nums1, nums2) {
  const DP_TABLE = new Array(nums1.length)
    .fill()
    .map(() => new Array(nums2.length).fill(0));

  const len1 = nums1.length;
  const len2 = nums2.length;
  let max = 0;

  // fill first row
  for (let j = 0; j < len2; j++) {
    if (nums2[j] === nums1[0]) {
      DP_TABLE[0][j] = 1;
      max = 1;
    }
  }
  // fill first col
  for (let i = 0; i < len1; i++) {
    if (nums2[0] === nums1[i]) {
      DP_TABLE[i][0] = 1;
      max = 1;
    }
  }

  for (let i = 1; i < len1; i++) {
    for (let j = 1; j < len2; j++) {
      if (nums2[j] === nums1[i]) {
        DP_TABLE[i][j] = DP_TABLE[i - 1][j - 1] + 1;
        max = Math.max(DP_TABLE[i][j]);
      }
    }
  }

  console.log(DP_TABLE);
  return max;
};
