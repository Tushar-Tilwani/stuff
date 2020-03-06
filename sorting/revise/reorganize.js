/**
 * https://leetcode.com/problems/reorganize-string/
 * @param {string} S
 * @return {string}
 */

function reorganizeString(str) {
  const resultStr = [];
  const len = str.length;
  const maxAllowed = Math.floor((len + 1) / 2);
  const strArr = str.split("");
  const freqMap = strArr.reduce((acc, v) => {
    acc[v] = acc[v] + 1 || 1;
    return acc;
  }, {});
  const uniqueValues = Object.keys(freqMap).sort(
    (a, b) => freqMap[b] - freqMap[a]
  );

  let index = 0;

  for (let uniqueValue of uniqueValues) {
    if (freqMap[uniqueValue] > maxAllowed) {
      return "";
    }
    while (freqMap[uniqueValue] > 0) {
      if (index >= str.length) {
        index = 1;
      }

      resultStr[index] = uniqueValue;
      index = index + 2;

      freqMap[uniqueValue] = freqMap[uniqueValue] - 1;
    }
  }

  return resultStr.join("");
}

console.log(reorganizeString("aab"));
