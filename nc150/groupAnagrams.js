/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const groupAnagrams = function (strs) {
  const reduceFn = (acc, str) => {
    //const key = str.split("").sort().join("");
    const key = getHash(str);
    const anagrams = acc.get(key) ?? [];
    anagrams.push(str);
    acc.set(key, anagrams);
    return acc;
  };
  const anaMap = strs.reduce(reduceFn, new Map());

  return Array.from(anaMap.values());
};

// Better time complexity o(k) k = is
const getHash = (str) => {
  const arr = new Array(26).fill(0);
  const strArr = str.split("");
  for (const char of strArr) {
    arr[getCode(char)] += 1;
  }

  return arr.join("");
};
const getCode = (char) => char.charCodeAt(0) - "a".charCodeAt(0);
