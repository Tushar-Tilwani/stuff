/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var minSteps = function (s, t) {
  const s1 = s.split("").sort();
  const s2 = t.split("").sort();
  const len = s1.length;
  const DP_TABLE = new Array(s1.length).fill().map(() => new Array(s2.length));

  DP_TABLE[0][0] = s1[0] === s2[0] ? 0 : 1;
  for (let i = 1; i < s1.length; i++) {
    DP_TABLE[i][0] = DP_TABLE[i - 1][0] + s1[i] === s2[0] ? 0 : 1;
  }

  for (let j = 1; j < s1.length; j++) {
    DP_TABLE[0][j] = DP_TABLE[0][j - 1] + s1[0] === s2[j] ? 0 : 1;
  }

  for (let i = 1; i < s1.length; i++) {
    for (let j = 1; j < s1.length; j++) {
      const min = Math.min(
        DP_TABLE[i - 1][j - 1],
        DP_TABLE[i - 1][j],
        DP_TABLE[i][j - 1]
      );
      if (s1[i] === s2[j]) {
        DP_TABLE[i][j] = min;
      } else {
        DP_TABLE[i][j] = min + 1;
      }
    }
  }

  // console.log(DP_TABLE);

  return DP_TABLE[len - 1][len - 1];
};
