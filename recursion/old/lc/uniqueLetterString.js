/**
 * @param {string} s
 * @return {number}
 */
var uniqueLetterString = function(s) {
  const result = [0];
  getAllSubstr(s.split(""), 0, [], result);
  return result[0];
};

function getAllSubstr(strArr, index, path, result) {
  if (index === strArr.length) {
    return;
  }
  for (let i = index + 1; i <= strArr.length; i++) {
    result[0] += countUniqueChars(strArr.slice(index, i));

    // result.push(strArr.slice(index, i).join(""));
  }
  getAllSubstr(strArr, index + 1, path, result);
}

function countUniqueChars(strArr) {
  const map = strArr.reduce((acc, val) => {
    acc.set(val, acc.get(val) + 1 || 1);
    return acc;
  }, new Map());
  let result = 0;
  for (const val of map.values()) {
    if (val === 1) {
      result += 1;
    }
  }
  return result;
}

console.log(uniqueLetterString("LEETCODE"));
