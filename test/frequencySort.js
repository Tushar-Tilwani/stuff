/**
 * @param {number[]} nums
 * @return {number[]}
 */
var frequencySort = function (nums) {
  const freqMap = nums.reduce((acc, num) => {
    acc.set(num, (acc.get(num) ?? 0) + 1);
    return acc;
  }, new Map());
  const sortedEntries = Array.from(freqMap.entries()).sort((a, b) => {
    if (a[1] === b[1]) {
      return b[0] - a[0];
    }
    return a[1] - b[1];
  });
  return sortedEntries.reduce((acc, [val, freq]) => {
    const vals = new Array(freq).fill(val);
    return acc.concat(vals);
  }, []);
};
