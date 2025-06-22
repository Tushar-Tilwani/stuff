// https://leetcode.com/problems/wildcard-matching/
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
const isMatch = function(s, p) {
  // Adding hash for special cases of empty strings
  const pattern = removeExtraStars(p) + "#";
  const str = s + "#";

  const DP_TABLE = [];

  const MAX_ROW = str.length;
  const MAX_COL = pattern.length;

  for (let i = 0; i <= MAX_ROW; i++) {
    DP_TABLE[i] = [];
    for (let j = 0; j <= MAX_COL; j++) {
      DP_TABLE[i][j] = false;
    }
  }
  DP_TABLE[MAX_ROW][MAX_COL] = true;

  for (let i = MAX_ROW - 1; i >= 0; i--) {
    for (let j = MAX_COL - 1; j >= 0; j--) {
      if (str[i] === pattern[j] || pattern[j] === "?") {
        DP_TABLE[i][j] = DP_TABLE[i + 1][j + 1];
      } else if (pattern[j] === "*") {
        DP_TABLE[i][j] =
          DP_TABLE[i + 1][j] || DP_TABLE[i][j + 1] || DP_TABLE[i + 1][j + 1];
      }
    }
  }
  return DP_TABLE[0][0];
};

function removeExtraStars(p) {
  const formattedPattern = [];
  const pattern = p.split("");
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i - 1] === pattern[i] && pattern[i] === "*") {
      continue;
    }
    formattedPattern.push(pattern[i]);
  }
  return formattedPattern.join("");
}

console.log(isMatch("", "*"));
