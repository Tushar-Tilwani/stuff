/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
const checkInclusion = function (s1, s2) {
  const FREQ_MAP = s1.split("").reduce((acc, char) => {
    acc.set(char, (acc.get(char) ?? 0) + 1);
    return acc;
  }, new Map());
  const WINDOW_SIZE = s1.length;

  let unFoundChars = WINDOW_SIZE;
  let tempFreqMap = new Map(FREQ_MAP);

  for (let i = 0; i < s2.length - WINDOW_SIZE + 1; i++) {
    for (let j = i; j < i + WINDOW_SIZE; j++) {
      const char = s2[j];
      const currentFreq = tempFreqMap.get(char);
      if (!tempFreqMap.has(char) || currentFreq === 0) {
        break;
      }
      unFoundChars--;
      tempFreqMap.set(char, currentFreq - 1);
    }
    if (unFoundChars === 0) {
      return true;
    }
    unFoundChars = WINDOW_SIZE;
    tempFreqMap = new Map(FREQ_MAP);
  }
  return false;
};

console.log(checkInclusion("adc", "dcda"));
console.log(checkInclusion("ab", "eidboadoo"));
