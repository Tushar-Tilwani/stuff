/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
  const DP_TABLE = [];
  const l1 = text1.length;
  const l2 = text2.length;

  for (let t1 = 0; t1 <= l1; t1++) {
    DP_TABLE[t1] = [];
    for (let t2 = 0; t2 <= l2; t2++) {
      DP_TABLE[t1][t2] = 0;
    }
  }

  for (let t1 = 1; t1 <= l1; t1++) {
    for (let t2 = 1; t2 <= l2; t2++) {
      DP_TABLE[t1][t2] = Math.max(DP_TABLE[t1 - 1][t2], DP_TABLE[t1][t2 - 1]);
      if (text1[t1 - 1] === text2[t2 - 1]) {
        DP_TABLE[t1][t2] += 1;
      }
    }
  }

  console.log(DP_TABLE);
  return DP_TABLE[l1][l2];
};

let text1 = "bsbininm";
let text2 = "jmjkbkjkv";

longestCommonSubsequence(text1, text2);
