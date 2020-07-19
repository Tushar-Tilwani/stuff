/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
  const DP_TABLE = [];
  const sLen = s.length;
  const pLen = p.length;

  for (let i = 0; i <= pLen; i++) {
    DP_TABLE[i] = [];
    for (let j = 0; j <= sLen; j++) {
      DP_TABLE[i][j] = false;
    }
  }

  // null === null
  DP_TABLE[pLen][sLen] = true;

  // Check for star on empty string.
  // * === null
  for (let i = pLen - 1; i >= 0; i--) {
    DP_TABLE[i][sLen] = p[i] === "*" && DP_TABLE[i + 1][sLen];
  }

  //DP_TABLE[pLen - 1][sLen] = true;

  for (let i = pLen - 1; i >= 0; i--) {
    for (let j = sLen - 1; j >= 0; j--) {
      if (p[i] === "*") {
        DP_TABLE[i][j] =
          DP_TABLE[i][j + 1] || DP_TABLE[i + 1][j] || DP_TABLE[i + 1][j + 1];
      } else if (p[i] === "?") {
        DP_TABLE[i][j] = DP_TABLE[i + 1][j + 1];
      } else {
        DP_TABLE[i][j] = p[i] === s[j] && DP_TABLE[i + 1][j + 1];
      }
    }
  }

  // console.log(DP_TABLE);

  return DP_TABLE[0][0];
};
