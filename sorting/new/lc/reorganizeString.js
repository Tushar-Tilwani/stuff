/**
 * @param {string} s
 * @return {string}
 */
function reorganizeString(s) {
  const len = s.length;
  const freqMap = s.split("").reduce((map, char) => {
    if (map.has(char)) {
      map.set(char, map.get(char) + 1);
    } else {
      map.set(char, 1);
    }
    return map;
  }, new Map());
  const entires = Array.from(freqMap.entries()).sort((a, b) => b[1] - a[1]);

  if (entires[0][1] > Math.ceil(len / 2)) {
    return "";
  }

  const result = [];
  let index = 0;
  for (const [char, freq] of entires) {
    for (let i = 0; i < freq; i++) {
      /**
       * This will happen only once since
       * none of the strings frequency
       * is more than half of array
       */
      if (index >= len) {
        index = 1;
      }
      result[index] = char;
      index += 2;
    }
  }
  return result.join("");
}

console.log(reorganizeString("aabbcc"));
