/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  const TABLE = new Array(nums1.length)
    .fill()
    .map(() => new Array(nums2.length).fill(0));

  let max = 0;
  let pos = [];
  for (let i = 0; i < nums1.length; i++) {
    if (nums1[i] === nums2[0]) {
      TABLE[i][0] = 1;
      max = 1;
      pos = [i, 0];
    }
  }

  for (let j = 0; j < nums2.length; j++) {
    if (nums1[0] === nums2[j]) {
      TABLE[0][j] = 1;
      max = 1;
      pos = [0, j];
    }
  }

  for (let i = 1; i < nums1.length; i++) {
    for (let j = 1; j < nums2.length; j++) {
      if (nums1[i] === nums2[j]) {
        TABLE[i][j] = TABLE[i - 1][j - 1] + 1;
        if (TABLE[i][j] > max) {
          max = TABLE[i][j];
          pos = [i, j];
        }
      }
    }
  }

  const result = [];
  let [e1] = pos;
  for (let c = 0; c < max; c++) {
    result.push(nums1[e1--]);
  }
  return result.reverse();
};
