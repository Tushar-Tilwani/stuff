/**
 * @param {string} s
 * @return {string}
 */

var longestPalindrome = function(s) {
  if (!s) {
    return "";
  }

  const len = s.length;
  const DP_TABLE = initializeDP_TABLE(s);
  let result = [0, 0];

  for (let end = 0; end < len; end++) {
    for (let start = 0; start < end; start++) {
      if (DP_TABLE[start][end] === null) {
        DP_TABLE[start][end] =
          DP_TABLE[start + 1][end - 1] && s.charAt(start) === s.charAt(end);
      }
      if (DP_TABLE[start][end]) {
        const [rStart, rEnd] = result;
        if (rEnd - rStart < end - start) {
          result = [start, end];
        }
      }
    }
  }
  // console.log(DP_TABLE, result);
  const [rStart, rEnd] = result;
  return s.slice(rStart, rEnd + 1);
};

function initializeDP_TABLE(s) {
  const DP_TABLE = [];
  const l = s.length;
  for (let i = 0; i < l; i++) {
    DP_TABLE[i] = [];
    for (let j = 0; j < l; j++) {
      if (i === j) {
        DP_TABLE[i].push(true);
      } else if (j - i === 1) {
        DP_TABLE[i].push(s.charAt(i) === s.charAt(j));
      } else {
        DP_TABLE[i].push(null);
      }
    }
  }
  return DP_TABLE;
}

console.log(longestPalindrome("babad"));
