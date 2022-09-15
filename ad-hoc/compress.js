/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function (chars) {
  chars.sort();
  let index = 0;
  let currentCount = 0;
  let prevChar = chars[0];
  const len = chars.length;
  for (let i = 0; i <= len; i++) {
    if (chars[i] !== prevChar) {
      chars[index++] = chars[i - 1];
      if (currentCount > 1) {
        const stringNum = `${currentCount}`.split("");
        for (const d of stringNum) {
          chars[index++] = d;
        }
      }

      currentCount = 0;
    }
    currentCount++;
    prevChar = chars[i];
  }

  return index;
};
