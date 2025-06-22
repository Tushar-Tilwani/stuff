/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  const ransomNoteMap = getFreqMap(ransomNote);
  const magazineMap = getFreqMap(magazine);
  for (const key of ransomNoteMap.keys()) {
    if (ransomNoteMap.get(key) < magazineMap.get(key)) {
      continue;
    }
    return false;
  }
  return true;
};

function getFreqMap(str) {
  return str.split("").reduce((map, char) => {
    map.set(char, (map.get(char) ?? 0) + 1);
    return map;
  }, new Map());
}
