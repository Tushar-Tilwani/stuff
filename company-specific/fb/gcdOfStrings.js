/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function (str1, str2) {
  const isStr1Longer = str1.length > str2.length;
  const lStr = isStr1Longer ? str1 : str2;
  const sStr = isStr1Longer ? str2 : str1;
  const set = new Set();
  const soFar = [];
  let j = 0;
  let isRepeating = false;
  for (let i = 0; i < lStr.length; i++) {
    if (lStr[i] !== sStr[j++]) {
      return "";
    }
    if (j === sStr.length) {
      j = 0;
    }
    isRepeating = isRepeating || (lStr[i] === lStr[0] && i !== 0);
    if (isRepeating) {
      continue;
    }
    set.add(lStr[i]);
    soFar.push(lStr[i]);
  }

  const subStr = soFar.join("");
  const regex = new RegExp(`${subStr}`, "g");
  const count1 = (lStr.match(regex) || []).length;
  const count2 = (sStr.match(regex) || []).length;

  return count1 % count2 === 0 ? sStr : subStr;
};
