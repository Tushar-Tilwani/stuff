/**
 * @param {string} s
 * @return {number}
 */
var largestVariance = function (s) {
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    const freqMap = new Map();
    for (let j = i; j < s.length; j++) {
      freqMap.set(s[j], (freqMap.get(s[j]) ?? 0) + 1);
      if (freqMap.size > 2) {
        break;
      }
      if (freqMap.size === 2) {
        const [k1, k2] = freqMap.keys();
        result = Math.max(Math.abs(freqMap.get(k1) - freqMap.get(k2)), result);
      }
    }
  }
  return result;
};
