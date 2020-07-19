/**
 * @param {string} S
 * @param {string} T
 * @return {string}
 */
var minWindow = function(S, T) {
  let i = 0;

  let result = [-Infinity, Infinity];

  for (let start = 0; start < S.length; start++) {
    let sP = start;
    let tP = 0;

    if (S[start] !== T[tP]) {
      continue;
    }

    while (tP < T.length && sP < S.length) {
      if (T.charAt(tP) === S.charAt(sP)) {
        tP++;
      }
      sP++;
    }

    const [lResult, rResult] = result;
    if (tP === T.length && sP - start < rResult - lResult) {
      result = [start, sP];
    }
  }

  if (!Number.isFinite(result[0])) {
    return "";
  }
  return S.slice(result[0], result[1]);
};

let S = "abcdebdde",
  T = "bde";

console.log(minWindow(S, T));
