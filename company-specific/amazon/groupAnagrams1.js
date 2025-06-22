/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const anaMap = strs.reduce((acc, val) => {
    const key = val.split("").sort().join("");
    if (!acc.has(key)) {
      acc.set(key, []);
    }
    acc.get(key).push(val);
    return acc;
  }, new Map());

  return Array.from(anaMap.values());
};
