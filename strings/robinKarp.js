/**
 * @param {string} str
 * @param {string} pattern
 * @return {number}
 */
var strStr = function(str, pattern) {
  if (!pattern) {
    return 0;
  }
  if (pattern.length > str.length) {
    return -1;
  }
  const strArr = str.split("");
  const set = new Set(strArr);
  const valueMap = Array.from(set.values()).reduce((map, value, index) => {
    map.set(value, index);
    return map;
  }, new Map());

  const l = pattern.length;
  const base = valueMap.size;
  const patternHash = calculateHash(pattern.split(""), valueMap); // O(M)
  const initialSubStrArr = strArr.slice(0, l); // O(M)
  let subStrHash = calculateHash(initialSubStrArr, valueMap); // O(M)

  for (let i = 0; i < strArr.length; i++) {
    if (patternHash === subStrHash) {
      return i;
    }

    /**
     * Calculating rolling Hash for the next substring. 8212,3
     * 8212 - 8*1000 = 212
     * 212 * 10 = 2120
     * 2120 + 3 = 2123
     * O(1) operation
     */

    subStrHash -= valueMap.get(strArr[i]) * Math.pow(base, pattern.length - 1);
    subStrHash *= base;
    subStrHash += valueMap.get(strArr[i + l]);
  }
  return -1;
};

function calculateHash(pattern, map) {
  const base = map.size;
  /* Reverse so that for ab we do a*10^1+b*10^0 */
  return pattern.reverse().reduce((hash, char, index) => {
    hash += map.get(char) * Math.pow(base, index);
    return hash;
  }, 0);
}

console.log(strStr("aaa", "aaaa"));
