/**
 * @param {string} s
 * @return {number}
 */
var countBinarySubstrings = function (s) {
  const map = new Map();
  map.set("0", 0);
  map.set("1", 0);
  map.set(s[0], 1);

  let result = 0;

  for (let i = 1; i < s.length; i++) {
    if (s[i] !== s[i - 1]) {
      map.set(s[i], 0);
    }
    map.set(s[i], map.get(s[i]) + 1);
    const reverseChar = s[i] === "1" ? "0" : "1";
    if (map.get(reverseChar) > 0) {
      result += 1;
      map.set(reverseChar, map.get(reverseChar) - 1);
    }
  }

  return result;
};
