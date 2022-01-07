/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var shortestCommonSupersequence = function(str1, str2) {
  return matchBegin(str1.split(""), str2.split(""));
};

function matchBegin(strArr1, strArr2) {
  let i = 0;
  let j = 0;
  const len1 = strArr1.length;
  const len2 = strArr2.length;
  let match = [];

  while (i < len1 && j < len2) {
    if (strArr2[j] === strArr1[i]) {
      match.push(strArr1[i]);
      j++;
      i++;
    } else {
      match = [];
      j++;
    }
  }

  return match;
}
