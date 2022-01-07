/**
 * @param {string} S
 * @param {string} T
 * @return {string}
 */
var minWindow = function(S, T) {
  const tempMap = T.split("").reduce((map, char) => {
    map.set(char, map.get(char) + 1 || 1);
    return map;
  }, new Map());
  let numVals = T.length;
  let left = 0;
  let right = 0;
  let end = S.length;
  let result = [-Infinity, Infinity];

  while (right <= end) {
    let [lResult, rResult] = result;
    if (numVals === 0) {
      if (right - left < rResult - lResult) {
        result = [left, right];
      }

      const leftChar = S[left];
      if (tempMap.has(leftChar)) {
        numVals += 1;
        tempMap.set(leftChar, tempMap.get(leftChar) + 1);
      }
      left++;
    } else {
      const rightChar = S[right];
      if (tempMap.has(rightChar)) {
        numVals -= 1;
        tempMap.set(rightChar, tempMap.get(rightChar) - 1);
      }
      right++;
    }
  }

  return S.slice(result[0], result[1]);
};
