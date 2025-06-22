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
  let repeatCount = 0;
  for (let i = 0; i < sStr.length; i++) {
    if (lStr[i] !== sStr[j++]) {
      return "";
    }
    if (set.has(lStr[i])) {
      repeatCount++;
    } else {
      repeatCount = 0;
    }
    if (repeatCount === soFar.length / 2) {
      break;
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
