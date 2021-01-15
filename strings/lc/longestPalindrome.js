/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function (s) {
  const map = s.split("").reduce((acc, val) => {
    acc.set(val, acc.get(val) + 1 || 1);
    return acc;
  }, new Map());

  let totalEven = 0;
  let hasOdd = false;
  for (const freq of map.values()) {
    totalEven += Math.floor(freq / 2);
    hasOdd = freq % 2 === 1;
  }
  if (hasOdd) {
    return totalEven * 2 + 1;
  }
  return totalEven * 2;
};
